import { get, patch, post } from "../utils/request"

export const getUser = async (gmail = "", password = "") => {
    let pass = "";
    if(password !== "") {
        pass = `&password=${password}`;
    }
    const result = await get(`user?gmail=${gmail}${pass}`);
    return result;
}

export const getUser1 = async (id ="") => {
    const result = await get("user/" + id);
    return result;
}

export const createUser = async (options) => {
    const result = await post("user/", options);
    return result;
}

export const pushMoney = async (options) => {
    const result = await post("user-naptien", options);
    return result;
}

export const rutTien = async (options) => {
    const result = await post("user-ruttien", options);
    return result;
}

export const search = async (options) => {
    const result = await post("search/hostel", options);
    return result;
}

export const checkUser = async (gmail = "", password="") => {
    const result = await post("api/auth/signin", gmail, password);
    return result;
}

export const getMessage = async () => {
    const result = await get("api/auth/signup");
    return result;
}

export const getVerify = async () => {
    const result = await get("api/auth/verify");
    return result;
}

export const editUser = async (id, options) => {
    const result = await patch("user/" + id, options);
    return result;
}