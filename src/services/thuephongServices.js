import { get, post, del } from "../utils/request"

export const layNguoiThue = async (id = "") => {
    const result = await get("thuephong/" + id);
    return result;
}

export const taoNguoiThue = async (options) => {
    const result = await post("thuephong", options);
    return result;
}

export const xoaNguoiThue = async (id) => {
    const result = await del("thuephongf/" + id);
    return result;
}