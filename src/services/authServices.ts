import { BASE_URL } from "./base";

import axios from "axios";

export interface iLoginResponse {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  status: string;
  businessName?: string;
  categoryId?: string;
}

export async function login(
  email: string,
  password: string,
  route: "admin" | "manager"
) {
  let response = await axios.post(
    `${BASE_URL}/${route}/authenticate`,
    {
      email,
      password,
    },
    {
      headers: {
        Authorization:
          "Basic " + btoa(`clientFrontend:cX9qV4kW36YcQFYqf1xz60twmBCNNJ`),
      },
    }
  );

  let loginResponse: iLoginResponse = {
    token: "",
    firstName: response.data.data.firstName,
    lastName: response.data.data.lastName,
    email: response.data.data.email,
    id: response.data.data.id,
    status: response.data.data.status,
    businessName: response.data.data.businessName,
    categoryId: response.data.data.categoryId,
  };

  //@ts-ignore
  let token = response.headers.get("bearer-token");
  response = await axios.post(
    `${BASE_URL}/admin/decryptToken`,
    {
      token,
    },
    {
      headers: {
        Authorization:
          "Basic " + btoa(`clientFrontend:cX9qV4kW36YcQFYqf1xz60twmBCNNJ`),
      },
    }
  );

  loginResponse.token = response.data.data.decryptedToken;
  return loginResponse;
}
