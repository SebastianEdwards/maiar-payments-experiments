WALLET_PEM="${PROJECT}/../testnet/wallets/users/mike.pem"
ADDRESS=$(erdpy data load --key=address-testnet)
DEPLOY_TRANSACTION=$(erdpy data load --key=deployTransaction-testnet)
PROXY="https://testnet-gateway.elrond.com"

deploy() {
  erdpy --verbose contract deploy --project=${PROJECT} --recall-nonce --pem=${WALLET_PEM} --metadata-not-upgradeable \
        --gas-limit=390000000 --outfile="deploy-testnet.interaction.json" --send --proxy=${PROXY} --chain=T || return

  TRANSACTION=$(erdpy data parse --file="deploy-testnet.interaction.json" --expression="data['emitted_tx']['hash']")
  ADDRESS=$(erdpy data parse --file="deploy-testnet.interaction.json" --expression="data['emitted_tx']['address']")

  erdpy data store --key=address-testnet --value=${ADDRESS}
  erdpy data store --key=deployTransaction-testnet --value=${TRANSACTION}

  echo "Smart contract address: ${ADDRESS}"
}

checkDeployment() {
  erdpy tx get --hash=$DEPLOY_TRANSACTION --omit-fields="['data', 'signature']" --proxy=${PROXY} --chain=T
  erdpy account get --address=$ADDRESS --omit-fields="['code']" --proxy=${PROXY} --chain=T
}

deposit() {
  erdpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${WALLET_PEM} \
        --gas-limit=1400000000 --value=10000000000000000 --function=deposit --send --proxy=${PROXY} --chain=T
}

migrate() {
  CODE_HEX="0x$(xxd -p ./output/payment_account.wasm | tr -d '\n')"

  erdpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${WALLET_PEM} \
        --gas-limit=1400000000 --arguments ${CODE_HEX} --function=migrate --send --proxy=${PROXY} --chain=T
}

migrated() {
  erdpy --verbose contract query ${ADDRESS} --function=migratedTo --proxy=${PROXY}
}

test() {
  erdpy --verbose contract query erd1qqqqqqqqqqqqqpgqvfzyu8mwlfm9zkr7rarqatqm4gtseuppa4sqsavpn4 --function=migrating --proxy=${PROXY}
  # erdpy --verbose contract call erd1qqqqqqqqqqqqqpgq0ht9hsta02n73jakcj8jrn82mpwdmyc6a4sq8uh9fc --recall-nonce --pem=${WALLET_PEM} \
  #       --gas-limit=1400000000 --value=20000000000000000 --function=deposit --send --proxy=${PROXY} --chain=T
}
