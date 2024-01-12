import { backendUrls } from "@/lib/backendUrls";
import { BackEndApi } from "../BackEndApi";
import { OrderCreationResponse } from "@/lib/Types/API/Razorpay/OrderCreationResponse";
const username = process.env.RAZORPAY_USERID;
const password = process.env.RAZORPAY_PASSWORD;
const base64Credentials = btoa(`${username}:${password}`);

type createOrderReturnType =
  | {
      success: true;
      data: OrderCreationResponse;
    }
  | {
      success: false;
      data: string;
    };

export const createOrder = async function (
  amount: number,
  internalOrderId: string
): Promise<createOrderReturnType> {
  const url = backendUrls.rpay_create_order();
  const data = {
    amount: amount,
    currency: "INR",
    receipt: `Receipt no. ${internalOrderId}`,
    notes: {
      key1: "value3",
      key2: "value2",
    },
  };
  const res = await BackEndApi.sendPostRequest(
    url,
    data,
    `Basic ${base64Credentials}`
  );
  if (res.success) {
    const data: OrderCreationResponse = res.data;
    return {
      success: true,
      data: res.data,
    };
  } else {
    return {
      success: false,
      data: "Couldn't create order",
    };
  }
};
