import axios from "axios";

export async function axiosApi({
  endpoint,
  method = "GET",
  bodyData,
  contentType = null,
}) {
  try {
    const result = await axios.request({
      url: ` https://books-list-api.vercel.app/${endpoint}`,
      method,
      ...(method !== "DELETE" && {
        data:
          method === "PUT" || method === "POST" || method === "PATCH"
            ? bodyData
            : null,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": contentType ? contentType : "application/json",
        "x-api-key": "#b0@6hX8YasCq6^unOaPw1tqR",
      },
    });

    const { data, ...response } = result;
    return { data, response };
  } catch (error) {
    const { response, request, message } = error;
    if (response.status === 403) {
      window.location.href = "/auth/login";
      // Cookies.remove('userInfo');
    } else if (error.request) {
      console.log("The request was made but no response was received");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(message);
    }
    throw error;
  }
}
