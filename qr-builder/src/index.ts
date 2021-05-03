import { AwesomeQR } from 'awesome-qr'

import { MAIAR_LOGO } from './maiar-logo'

window['MaiarPayments'] = {
  generatePaymentsQR: async ({
    authorizationId,
    categoryHint,
    description,
    iconUrl,
    size = 256,
    paymentProcessorAddress,
    protocol = 'maiar:',
    tokenAmount,
    tokenIdentifier
  }: {
    authorizationId: string
    categoryHint?: string
    description?: string
    iconUrl?: string
    paymentProcessorAddress: string
    protocol?: string
    size: number
    tokenAmount: number
    tokenIdentifier: string
  }) => {
    const params = {
      address: paymentProcessorAddress,
      amount: tokenAmount,
      category: categoryHint,
      description,
      iconUrl,
      id: authorizationId,
      token: tokenIdentifier
    }

    return new AwesomeQR({
      logoImage: MAIAR_LOGO,
      size,
      text: protocol + 'payment?' + Object.keys(params).filter(k => params[k]).map(k => k + '=' + encodeURIComponent(params[k])).join('&')
    }).draw()
  }
}
