WALLET_PEM="${PROJECT}/../testnet/wallets/users/carol.pem"
ADDRESS=$(erdpy data load --key=address-devnet)
DEPLOY_TRANSACTION=$(erdpy data load --key=deployTransaction-devnet)
TEMPLATE_ADDRESS=$(erdpy data parse --file ../sc-payment-account-template-rs/erdpy.data-storage.json --expression "data['*']['address-devnet']")

deployOne() {
  ARGUMENTS="0x$(erdpy wallet bech32 --decode $TEMPLATE_ADDRESS)"

  erdpy contract deploy --project=${PROJECT} --recall-nonce --pem=${WALLET_PEM} \
        --gas-limit=80000000 --outfile="deploy-devnet.interaction.json" \
        --arguments=${ARGUMENTS} --send --metadata-payable || return

  ADDRESS=$(erdpy data parse --file="deploy-devnet.interaction.json" --expression="data['emitted_tx']['address']")

  erdpy data store --key=address-devnet --value=${ADDRESS}

  echo "Smart contract address: ${ADDRESS}"
}

checkDeployment() {
  erdpy tx get --hash=$DEPLOY_TRANSACTION --omit-fields="['data', 'signature']"
  erdpy account get --address=$ADDRESS --omit-fields="['code']"
}

createPaymentAccount() {
  erdpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${WALLET_PEM} \
        --gas-limit=260000000 --function="createPaymentAccount" --send
}

# prepareAddresses() {
#   i=0
#   while [ $i -lt 256 ]
#   do
#     i=225
#     DEPLOY_PEM="${PROJECT}/../deploy-wallets/${i}.pem"
#     DEPLOY_ADDRESS="$(erdpy wallet pem-address $DEPLOY_PEM)"

#     erdpy tx new --recall-nonce --pem=${DEPLOY_PEM} \
#           --gas-limit=0 --receiver=${DEPLOY_ADDRESS} \
#           --value 0 --send

#     i=`expr $i + 1`
#   done
# }

# sendGas() {
#   i=0
#   while [ $i -lt 256 ]
#   do
#     DEPLOY_PEM="${PROJECT}/../deploy-wallets/${i}.pem"
#     DEPLOY_ADDRESS="$(erdpy wallet pem-address $DEPLOY_PEM)"

#     erdpy tx new --recall-nonce --pem=${WALLET_PEM} \
#           --gas-limit=80000000 --receiver=${DEPLOY_ADDRESS} \
#           --value 20816810000000000 --send

#     i=`expr $i + 1`
#   done
# }

# getBalances() {
#   i=0
#   while [ $i -lt 256 ]
#   do
#     DEPLOY_PEM="${PROJECT}/../deploy-wallets/${i}.pem"
#     DEPLOY_ADDRESS="$(erdpy wallet pem-address $DEPLOY_PEM)"

#     BALANCE="$(erdpy account get --balance --address $DEPLOY_ADDRESS)"
#     echo "Shard ${i}, address ${DEPLOY_ADDRESS} has balance: ${BALANCE}"

#     i=`expr $i + 1`
#   done
# }

# deploy() {
#   i=0
#   while [ $i -lt 256 ]
#   do
#     DEPLOY_PEM="${PROJECT}/../deploy-wallets/${i}.pem"
#     DEPLOY_ADDRESS="$(erdpy wallet pem-address $DEPLOY_PEM)"

#     erdpy contract deploy --project=${PROJECT} --recall-nonce --pem=${DEPLOY_PEM} \
#           --gas-limit=80000000 --outfile="deploy-devnet.interaction.json" \
#           --send --metadata-payable || return

#     ADDRESS=$(erdpy data parse --file="deploy-devnet.interaction.json" --expression="data['emitted_tx']['address']")

#     erdpy data store --key=address-devnet-${i} --value=${ADDRESS}

#     echo "Shard ${i} smart contract address: ${ADDRESS}"
#     i=`expr $i + 1`
#   done
# }
