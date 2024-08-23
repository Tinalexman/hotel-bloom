import { BASE_URL } from "./base";

import axios from "axios";

export interface iCreateManagerPayload {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  password: string;
}

export async function getAllManagers(token: string, search: string) {
  const response = await axios.get(
    `${BASE_URL}/admin/retrieveAllManager?search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  //@ts-ignore
  //   let count = response.headers.get("x-pagination-totalcount");
  //@ts-ignore
  //   let pages = response.headers.get("x-pagination-totalpages");

  return {
    data: response.data.data,
    // count,
    // pages,
  };
}

export async function updateManagerStatus(
  token: string,
  email: string,
  operation: "enableManager" | "disableManager"
) {
  const response = await axios.put(
    `${BASE_URL}/admin/${operation}?email=${email}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updateManagerData(
  token: string,
  email: string,
  firstName: string,
  lastName: string,
  businessName: string
) {
  const response = await axios.put(
    `${BASE_URL}/manager/updateManagerDetails`,
    {
      email,
      firstName,
      lastName,
      businessName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updateManagerPassword(
  token: string,
  email: string,
  oldPassword: string,
  newPassword: string
) {
  const response = await axios.put(
    `${BASE_URL}/manager/resetPassword`,
    {
      email,
      oldPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function createManager(
  token: string,
  payload: iCreateManagerPayload
) {
  const response = await axios.post(
    `${BASE_URL}/admin/registerManager`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
