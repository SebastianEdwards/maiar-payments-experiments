WALLET_PEM="${PROJECT}/../testnet/wallets/users/carol.pem"
ADDRESS=$(erdpy data load --key=address-devnet)
DEPLOY_TRANSACTION=$(erdpy data load --key=deployTransaction-devnet)

deploy() {
  erdpy --verbose contract deploy --project=${PROJECT} --recall-nonce --pem=${WALLET_PEM} --gas-limit=1400000000 \
        --gas-limit=1400000000 --outfile="deploy-testnet.interaction.json" --send || return

  TRANSACTION=$(erdpy data parse --file="deploy-testnet.interaction.json" --expression="data['emitted_tx']['hash']")
  ADDRESS=$(erdpy data parse --file="deploy-testnet.interaction.json" --expression="data['emitted_tx']['address']")

  erdpy data store --key=address-devnet --value=${ADDRESS}
  erdpy data store --key=deployTransaction-devnet --value=${TRANSACTION}

  echo "Smart contract address: ${ADDRESS}"
}

checkDeployment() {
  erdpy tx get --hash=$DEPLOY_TRANSACTION --omit-fields="['data', 'signature']"
  erdpy account get --address=$ADDRESS --omit-fields="['code']"
}

uploadContractCode() {
  echo "STARTING TO PUSH NEW CODE TEMPLATE"
  CODE_HEX="$(xxd -p ../sc-payment-account-rs/output/payment_account.wasm | tr -d '\n')"

  erdpy --verbose contract call ${ADDRESS} --recall-nonce \
        --pem=${WALLET_PEM} \
        --gas-limit=1400000000 \
        --function=startCodeTemplate \
        --send
  sleep 6

  for i in 3 4 5 6 7
  do
    bytes="$(gsplit -n 1/$i <<<$CODE_HEX | wc -c)"

    if [[ $((bytes % 2)) -eq 0 ]];
      then break;
    fi
  done

  a=0
  while [ $a -lt $i ]
  do
    a=`expr $a + 1`
    chunk="0x$(gsplit -n $a/$i <<<$CODE_HEX)"
    echo "SENDING BATCH ${a}"
    erdpy --verbose contract call ${ADDRESS} --recall-nonce \
          --pem=${WALLET_PEM} \
          --gas-price=1400000000 \
          --gas-limit=1400000000 \
          --function=appendCodeTemplate \
          --arguments $chunk \
          --send
    sleep 10
  done

  echo "ENDING CODE TEMPLATE"
  erdpy --verbose contract call ${ADDRESS} --recall-nonce \
        --pem=${WALLET_PEM} \
        --gas-price=1400000000 \
        --gas-limit=1400000000 \
        --function=endCodeTemplate \
        --send
  sleep 6
}

getCode() {
  erdpy --verbose contract query ${ADDRESS} --function="getCodeTemplate"
}
