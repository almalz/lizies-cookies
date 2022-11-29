export const sendOrderConfirmationEmail = async (
  orderId: string,
  deliveryDate: Date
) => {
  const res = await fetch('/api/order/confirmed', {
    method: 'POST',
    body: JSON.stringify({ orderId, deliveryDate }),
  })
  const data = await res.json()
  return data
}
