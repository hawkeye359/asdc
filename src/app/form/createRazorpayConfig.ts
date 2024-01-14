export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
export function createRazorpayConfig(
  key: string,
  amount: number,
  orderId: string,
  name: string,
  email: string,
  contact: string,
  handler: (response: RazorpaySuccessResponse) => void,
  ondismiss: () => void
) {
  var options = {
    key: key,
    amount: amount,
    currency: "INR",
    name: "Zain Education",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: orderId,
    handler: handler,
    prefill: {
      name: name,
      email: email,
      contact: contact,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
    modal: {
      ondismiss,
    },
  };
  return options;
}
