import type { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "../../lib/services/createOrder";
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
import {
  createOrderInDatabase,
  generateUniqueId,
} from "@/lib/services/database";
export interface SubmitFormResponseType {
  key: string;
  orderId: string;
  amount: number;
  name: string;
  email: string;
  contact: string;
  internalId: string;
}
const username = process.env.RAZORPAY_USERID || "";
interface submitFormDataType {
  [PHONENUMBER]: string;
  [FIRST_NAME]: string;
  [LAST_NAME]: string;
  [EMAIL]: string;
  [FATHER_NAME]: string;
  [MOTHER_NAME]: string;
  [DATE_OF_BIRTH]: Date;
  [COURSE]: number;
}
let id = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<SubmitFormResponseType>>
) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  let error = false;
  const body: submitFormDataType = req.body;
  const internalId = await generateUniqueId();
  const orderCreationResponse = await createOrder(1000, internalId);
  if (orderCreationResponse.success) {
    try {
      const order = await createOrderInDatabase(
        {
          phoneNumber: body[PHONENUMBER],
          firstName: body[FIRST_NAME],
          lastName: body[LAST_NAME],
          dateOfBirth: body[DATE_OF_BIRTH],
          fatherName: body[FATHER_NAME],
          motherName: body[MOTHER_NAME],
          course: body[COURSE],
          email: body[EMAIL],
          orderId: orderCreationResponse.data.id,
        },
        internalId
      );
    } catch (e) {
      res.status(500).json({
        success: false,
        code: 500,
        data: "order creation failed",
      });
      return;
    }
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
        internalId: internalId,
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
