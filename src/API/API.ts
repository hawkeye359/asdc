import axios from "axios";

export type APIResponse =
  | {
      success: true;
      data: any;
    }
  | {
      success: false;
      data: string;
    };

export const API = {
  async sendPostRequest(url: string, body: any): Promise<APIResponse> {
    try {
      const res = await axios.post(url, body);
      const data = await res.data;
      console.log("returned data", data);
      return { success: true, data: data };
    } catch (e) {
      return { success: false, data: "Could not post" };
    }
  },
  async sendGetRequest(url: string, auth?: true) {
    try {
      const res = await axios(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.data;
      return { success: true, data: data };
    } catch (e) {
      return { success: false, data: "Could not Get" };
    }
  },
  async sendPutRequest(
    url: string,
    data: any,
    auth?: true
  ): Promise<APIResponse> {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, data: data };
    } else {
      return { success: false, data: "Could not put" };
    }
  },
};
