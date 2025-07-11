import { CreateUsuarioRequest } from "@/models/user";
import config from "@/utils/config";
import axios from "axios";

const create = async (usuario: CreateUsuarioRequest) => {
    const request = axios.post(`${config.API_URL}api/user`, usuario);
    return request.then((response) => response.data);
}

export default {
    create
}