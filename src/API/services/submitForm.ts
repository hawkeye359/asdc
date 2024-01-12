import { SubmitFormResponseType } from "@/pages/api/submitform";
import { API } from "../API";
import { urls } from "../urls";

type ReturnType =
  | {
      success: true;
      data: SubmitFormResponseType;
    }
  | {
      success: false;
      data: string;
    };

export const submitForm = async function (data: any): Promise<ReturnType> {
  const url = urls.submitForm();
  const res = await API.sendPostRequest(url, data);
  if (res.success) {
    return { success: true, data: res.data.data };
  } else {
    return { success: false, data: "Not authorized" };
  }
};
