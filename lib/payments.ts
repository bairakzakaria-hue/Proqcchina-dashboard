'use client'

type PaymentSource = 'invoice' | 'report'
type PaymentMethod = 'paypal' | 'skrill'

interface StartPaymentParams {
  source: PaymentSource
  id: string
  amount: string
  method: PaymentMethod
}

export async function startWordPressPayment(params: StartPaymentParams) {
  const siteUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
  if (!siteUrl) {
    return { checkoutUrl: null, error: 'WordPress site URL not configured' }
  }

  try {
    // TODO: Replace with your WordPress payment endpoint.
    // Example endpoint: `${siteUrl}/wp-json/inspaction/v1/payments`
    // const response = await fetch(`${siteUrl}/wp-json/inspaction/v1/payments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(params),
    // })
    // const data = await response.json()
    // return { checkoutUrl: data.checkoutUrl || null, error: data.error }

    return { checkoutUrl: null, error: 'Payment gateway not configured' }
  } catch (error) {
    console.error('Payment gateway error:', error)
    return { checkoutUrl: null, error: 'Payment gateway error' }
  }
}
