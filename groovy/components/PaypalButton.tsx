'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

type Props = {
  amount: string
  onSuccess: (details: any) => void
}

export default function PayPalButton({ amount, onSuccess }: Props) {
  const [{ isPending }] = usePayPalScriptReducer()

  return (
    <>
      {isPending && <p>Chargement de PayPal...</p>}
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) return
          const details = await actions.order.capture()
          onSuccess(details)
        }}
        onError={(err) => {
          console.error('Erreur PayPal :', err)
        }}
      />
    </>
  )
}