import { Login } from "@/models/user";
import config from "@/utils/config";
import axios from "axios";

const login = async (data: Login) => {
    const request = axios.post(`${config.API_URL}api/login`, data);
    return request.then((response) => response.data);
}

export default {
    login
}