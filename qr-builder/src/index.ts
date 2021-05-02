import { AwesomeQR } from 'awesome-qr'

import { MAIAR_LOGO } from './maiar-logo'
import { buildPaymentUrl } from './url-builder'

window['MaiarPayments'] = {
  generatePaymentsQR: async ({
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
    return new AwesomeQR({
      text: buildPaymentUrl({ paymentId, paymentRouterAddress, tokenAmount, tokenIdentifier }),
      size,
      logoImage: MAIAR_LOGO
    }).draw()
  }
}
