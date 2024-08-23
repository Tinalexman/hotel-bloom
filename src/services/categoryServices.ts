import { BASE_URL } from "./base";

import axios from "axios";

export interface iCreateCategoryPayload {
  name: string;
  svgIcon: string;
  tagColor: string;
  content: {
    title: string;
    body: string;
  }[];
}

export interface iUpdateCategoryPayload {
  categoryId: string;
  name: string;
  svgIcon: string;
  tagColor: string;
}

export interface iUpdateContentPayload {
  contentId: string;
  title: string;
  content: string;
}

export interface iAddContentPayload {
  categoryId: string;
  content: {
    title: string;
    body: string;
  }[];
}

export interface iGetContentsResponse {
  id: string;
  categoryId: string;
  title: string;
  content: string;
}

export interface iCreateManagerContent {
  managerId: string;
  content: {
    title: string;
    body: string;
  }[];
}

export async function createCategory(
  token: string,
  payload: iCreateCategoryPayload
) {
  const response = await axios.post(
    `${BASE_URL}/category/createCategory`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function getAllCategories(token: string, search: string) {
  const response = await axios.get(
    `${BASE_URL}/category/retrieveAllCategory?search=${search}`,
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

export async function updateCategory(
  token: string,
  payload: Partial<iUpdateCategoryPayload>
) {
  const response = await axios.put(
    `${BASE_URL}/category/updateCategory`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function updateContent(
  token: string,
  payload: iUpdateContentPayload,
  isManager: boolean
) {
  const response = await axios.put(
    `${BASE_URL}/${isManager ? "manager" : "categoryContent"}/updateContent`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function addContent(
  token: string,
  payload: iAddContentPayload | iCreateManagerContent,
  isManager: boolean
) {
  const response = await axios.post(
    `${BASE_URL}/${
      isManager ? "manager/addNewContent" : "categoryContent/addNewContent"
    }`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteCategory(token: string, id: string) {
  await axios.delete(`${BASE_URL}/category/deleteCategory?categoryId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteContents(
  token: string,
  contentId: string[],
  isManager: boolean
) {
  await axios.post(
    `${BASE_URL}/${isManager ? "manager" : "categoryContent"}/deleteContent`,
    {
      contentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deleteCategoryWithAllContents(
  token: string,
  categoryID: string,
  ids: string[],
  isManager: boolean
) {
  await deleteContents(token, ids, isManager);
  await deleteCategory(token, categoryID);
}

export async function getContents(
  token: string,
  id: string,
  isManager: boolean
) {
  const response = await axios.get(
    `${BASE_URL}/${
      isManager
        ? `manager/retrieveContents?email=${id}`
        : `categoryContent/retrieveContentsByCategory?categoryId=${id}`
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
}
