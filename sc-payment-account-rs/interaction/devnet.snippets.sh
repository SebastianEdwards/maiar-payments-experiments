ALICE="${PROJECT}/../testnet/wallets/users/alice.pem"
ADDRESS=$(erdpy data load --key=address-devnet)
DEPLOY_TRANSACTION=$(erdpy data load --key=deployTransaction-devnet)
DEPLOY_ARGUMENTS="0x0139472eff6886771a982f3083da5d421f24c29181e63888228dc81ca60d69e1"
DEPLOY_GAS="80000000"

deploy() {
  erdpy --verbose contract deploy --project=${PROJECT} --recall-nonce --pem=${ALICE} \
        --gas-limit=${DEPLOY_GAS} --arguments ${DEPLOY_ARGUMENTS} \
        --outfile="deploy-devnet.interaction.json" --send || return

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

deposit() {
  erdpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${ALICE} \
        --gas-limit=${DEPLOY_GAS} --value=5000 --function=deposit --send
}
