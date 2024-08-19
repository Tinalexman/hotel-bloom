import { BASE_URL } from "./base";

import axios from "axios";

export interface iCreateAdminPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function getAllAdmins(token: string, search: string) {
  const response = await axios.get(
    `${BASE_URL}/admin/retrieveAllAdmin?search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  //@ts-ignore
  let count = response.headers.get("x-pagination-totalcount");
  //@ts-ignore
  let pages = response.headers.get("x-pagination-totalpages");

  return {
    data: response.data.data,
    count,
    pages,
  };
}


export async function updateAdminStatus(
  token: string,
  email: string,
  operation: "enableAdmin" | "disableAdmin"
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

export async function updateAdminData(
  token: string,
  email: string,
  firstName: string,
  lastName: string
) {
  const response = await axios.put(
    `${BASE_URL}/admin/updateAdminDetails`,
    {
      email,
      firstName,
      lastName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updateAdminPassword(
  token: string,
  email: string,
  oldPassword: string,
  newPassword: string
) {
  const response = await axios.put(
    `${BASE_URL}/admin/resetPassword`,
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

export async function createAdmin(token: string, payload: iCreateAdminPayload) {
  const response = await axios.post(`${BASE_URL}/admin/register`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
