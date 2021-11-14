import Axios from "axios";
import AuthService from "./services/auth";

export const axios = Axios.create({
    baseURL: `${process.env.REACT_APP_ROOT_API || "http://127.0.0.1:9000" }/api`,
    headers: {
        "Content-Type": "application/json"
    },
    params: {},
    data: {},
    responseType: "json",
    transformRequest: [
        (data, headers) => {
            const token = AuthService.getToken();
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            return JSON.stringify(data);
        }
    ]
});
