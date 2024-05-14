import { API_ENDPOINTS, API_URL, HEADERS } from "../Common/constants";
const LOGIN = async (username = "", password = "") => {
  try {
    const response = await fetch(API_URL + API_ENDPOINTS.login, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: HEADERS,
    });
    return response;
  } catch (error) {
    console.log("error: ", error);
    throw Error(error.message);
  }
};

export default LOGIN;
