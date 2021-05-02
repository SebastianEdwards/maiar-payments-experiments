import { AwesomeQR } from 'awesome-qr'

import { MAIAR_LOGO } from './maiar-logo'
import { buildPaymentUrl } from './url-builder'

export const generatePaymentQR = async ({
  paymentId,
  paymentRouterAddress,
  size = 256,
  tokenAmount,
  tokenIdentifier
}: {
  paymentId: string
  paymentRouterAddress: string
  size: number
  tokenAmount: number
  tokenIdentifier: string
}) => {
  const buffer = await new AwesomeQR({
    text: buildPaymentUrl({ paymentId, paymentRouterAddress, tokenAmount, tokenIdentifier }),
    size,
    logoImage: MAIAR_LOGO
  }).draw()

  return `data:image/gif;base64,${buffer.toString('base64')}`
}
