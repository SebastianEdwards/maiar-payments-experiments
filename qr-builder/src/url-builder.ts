// const PROTOCOL = 'maiar:'
const PROTOCOL = 'https://localhost:5000/'

const BEGIN_PAYMENT_PATH = 'payment'
const AUTHORIZE_SUBSCRIPTION_PATH = 'subscribe'
const AUTHORIZE_CARD_PATH = 'card'

export const buildPaymentUrl = ({
  paymentId,
  paymentRouterAddress,
  tokenAmount,
  tokenIdentifier
}: {
  paymentId: string,
  paymentRouterAddress: string
  tokenAmount: number
  tokenIdentifier: string
}) => {
  const params = {
    address: paymentRouterAddress,
    amount: tokenAmount,
    paymentId,
    token: tokenIdentifier
  }

  return PROTOCOL + BEGIN_PAYMENT_PATH + '?' + Object.keys(params).map(k => k + '=' + params[k]).join('&')
}
