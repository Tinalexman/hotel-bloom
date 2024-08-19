import { BASE_URL } from "./base";

import axios from "axios";

interface iLoginResponse {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export async function login(email: string, password: string) {
  let response = await axios.post(
    `${BASE_URL}/admin/authenticate`,
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
