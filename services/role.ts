import config from "@/utils/config";
import axios from "axios";

const getAllRoles = () => {
    const request = axios.get(`${config.API_URL}api/role`);
    return request.then((response) => response.data)
}

export default {
    getAllRoles
}