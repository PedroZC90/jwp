import Axios from "axios";

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
            const token = localStorage.getItem("token");
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            return JSON.stringify(data);
        }
    ]
});
