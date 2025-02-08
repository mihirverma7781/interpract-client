import axios from "axios";

export default ({ headers }) => {
    const parsedHeaders = Object.fromEntries(headers.entries());

    return axios.create({
        baseURL: "http://localhost:8000",
        headers: parsedHeaders,
        withCredentials: true
    });
};
