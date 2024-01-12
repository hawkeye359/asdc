import type { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "./services/createOrder";
import {
  COURSE,
  DATE_OF_BIRTH,
  EMAIL,
  FATHER_NAME,
  FIRST_NAME,
  LAST_NAME,
  MOTHER_NAME,
  PHONENUMBER,
} from "@/app/form/validations";
export interface SubmitFormResponseType {
  key: string;
  orderId: string;
  amount: number;
  name: string;
  email: string;
  contact: string;
}
const username = process.env.RAZORPAY_USERID || "";
interface submitFormDataType {
  [PHONENUMBER]: string;
  [FIRST_NAME]: string;
  [LAST_NAME]: string;
  [EMAIL]: string;
  [FATHER_NAME]: string;
  [MOTHER_NAME]: string;
  [DATE_OF_BIRTH]: string;
  [COURSE]: string;
}
let id = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<SubmitFormResponseType>>
) {
  console.log(req.body);
  let error = false;
  const body: submitFormDataType = req.body;
  const orderCreationResponse = await createOrder(162800, String(id++));
  if (orderCreationResponse.success) {
    res.status(200).json({
      success: true,
      code: 200,
      data: {
        key: username,
        orderId: orderCreationResponse.data.id,
        amount: orderCreationResponse.data.amount,
        name: body[FIRST_NAME] + " " + body[LAST_NAME],
        email: body[EMAIL],
        contact: body[PHONENUMBER],
      },
    });
  } else {
    res.status(500).json({
      success: false,
      code: 500,
      data: "order creation failed",
    });
  }
}
