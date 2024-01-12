interface RazorpaySuccessResponse {
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
  contact: string
) {
  var options = {
    key: key,
    amount: amount,
    currency: "INR",
    name: "Zain Education",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: orderId,
    handler: function (response: RazorpaySuccessResponse) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
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
  };
  return options;
}
