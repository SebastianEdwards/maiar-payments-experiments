WALLET_PEM="${PROJECT}/../testnet/wallets/users/alice.pem"
ADDRESS=$(erdpy data load --key=address-devnet)
DEPLOY_TRANSACTION=$(erdpy data load --key=deployTransaction-devnet)

deploy() {
  erdpy --verbose contract deploy --project=${PROJECT} --recall-nonce --pem=${WALLET_PEM} \
        --gas-limit=80000000 --outfile="deploy-devnet.interaction.json" \
        --send --metadata-payable || return

  TRANSACTION=$(erdpy data parse --file="deploy-devnet.interaction.json" --expression="data['emitted_tx']['hash']")
  ADDRESS=$(erdpy data parse --file="deploy-devnet.interaction.json" --expression="data['emitted_tx']['address']")

  erdpy data store --key=address-devnet --value=${ADDRESS}
  erdpy data store --key=deployTransaction-devnet --value=${TRANSACTION}

  echo ""
  echo "Smart contract address: ${ADDRESS}"
}

checkDeployment() {
  erdpy tx get --hash=$DEPLOY_TRANSACTION --omit-fields="['data', 'signature']"
  erdpy account get --address=$ADDRESS --omit-fields="['code']"
}

uploadContractCode() {
  echo "STARTING TO PUSH NEW CODE TEMPLATE"
  CODE_HEX="$(xxd -p ../sc-payment-account-rs/output/payment_account.wasm | tr -d '\n')"
  CODE_HEX1="0x$(gsplit -n1/4 <<<$CODE_HEX)"
  CODE_HEX2="0x$(gsplit -n2/4 <<<$CODE_HEX)"
  CODE_HEX3="0x$(gsplit -n3/4 <<<$CODE_HEX)"
  CODE_HEX4="0x$(gsplit -n4/4 <<<$CODE_HEX)"

  erdpy --verbose contract call ${ADDRESS} --recall-nonce \
        --pem=${WALLET_PEM} \
        --gas-limit=1400000000 \
        --function=startCodeTemplate \
        --send
  sleep 6

  echo "SENDING BATCH 1"
  erdpy --verbose contract call ${ADDRESS} --recall-nonce \
        --pem=${WALLET_PEM} \
        --gas-price=1400000000 \
        --gas-limit=1400000000 \
        --function=appendCodeTemplate \
        --arguments $CODE_HEX1 \
        --send
  sleep 10

  echo "SENDING BATCH 2"
  erdpy --verbose contract call ${ADDRESS} --recall-nonce \
        --pem=${WALLET_PEM} \
        --gas-price=1400000000 \
        --gas-limit=1400000000 \
        --function=appendCodeTemplate \
        --arguments $CODE_HEX2 \
        --send
  sleep 10

  echo "SENDING BATCH 3"
  erdpy --verbose contract call ${ADDRESS} --recall-nonce \
        --pem=${WALLET_PEM} \
        --gas-price=1400000000 \
        --gas-limit=1400000000 \
        --function=appendCodeTemplate \
        --arguments $CODE_HEX3 \
        --send
  sleep 10

  echo "SENDING BATCH 4"
  erdpy --verbose contract call ${ADDRESS} --recall-nonce \
        --pem=${WALLET_PEM} \
        --gas-price=1400000000 \
        --gas-limit=1400000000 \
        --function=appendCodeTemplate \
        --arguments $CODE_HEX4 \
        --send
  sleep 10

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

createPaymentAccount() {
  erdpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${WALLET_PEM} \
        --gas-limit=37000000 --function="createPaymentAccount" --send
}
