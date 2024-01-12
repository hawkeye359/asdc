import axios from "axios";

type APIResponse =
  | {
      success: true;
      data: any;
    }
  | { success: false; data: string };

export const BackEndApi = {
  sendPostRequest: async (
    url: string,
    data: any,
    AuthorizationHeader?: string
  ): Promise<APIResponse> => {
    try {
      const res = await axios.post(url, data, {
        headers: {
          Authorization: AuthorizationHeader ? AuthorizationHeader : "",
        },
      });
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: true,
          data: "Could not send post request",
        };
      }
    } catch (e) {
      return {
        success: false,
        data: "Could not send post request",
      };
    }
  },
};
