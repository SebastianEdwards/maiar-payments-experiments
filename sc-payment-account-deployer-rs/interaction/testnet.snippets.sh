WALLET_PEM="${PROJECT}/../testnet/wallets/users/mike.pem"
ADDRESS=$(erdpy data load --key=address-testnet)
DEPLOY_TRANSACTION=$(erdpy data load --key=deployTransaction-testnet)
TEMPLATE_ADDRESS=$(erdpy data parse --file ../sc-payment-account-template-rs/erdpy.data-storage.json --expression "data['*']['address-testnet']")
PROXY="https://testnet-gateway.elrond.com"

deployOne() {
  ARGUMENTS="0x$(erdpy wallet bech32 --decode $TEMPLATE_ADDRESS)"

  erdpy contract deploy --project=${PROJECT} --recall-nonce --pem=${WALLET_PEM} \
        --gas-limit=80000000 --outfile="deploy-testnet.interaction.json" \
        --arguments=${ARGUMENTS} --send --metadata-payable --proxy=${PROXY} --chain=T || return

  ADDRESS=$(erdpy data parse --file="deploy-testnet.interaction.json" --expression="data['emitted_tx']['address']")

  erdpy data store --key=address-testnet --value=${ADDRESS}

  echo "Smart contract address: ${ADDRESS}"
}

checkDeployment() {
  erdpy tx get --hash=$DEPLOY_TRANSACTION --omit-fields="['data', 'signature']"
  erdpy account get --address=$ADDRESS --omit-fields="['code']"
}

createPaymentAccount() {
  erdpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${WALLET_PEM} --gas-limit=260000000 \
        --function="createPaymentAccount" --send --proxy=${PROXY} --chain=T
}
