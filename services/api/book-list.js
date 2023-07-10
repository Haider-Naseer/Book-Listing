import { axiosApi } from "../axios/axiosApi";

export async function getBooks(serviceData) {
  try {
    const { data, response } = await axiosApi({
      endpoint: `books`,
      method: "GET",
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}
