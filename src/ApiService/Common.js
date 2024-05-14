import { HEADERS } from "../Common/constants";

export const getHeaders = () => {
    const headers = {...HEADERS};
    if(localStorage.getItem("token")){
        headers.token = localStorage.getItem("token")
    }
    return headers;
};
