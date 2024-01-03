import { get, patch, post, del } from "../utils/request"

export const getPostList = async (id = "") => {
    const result = await get("post/" + id);
    return result;
}

export const getImage = async (type = "", id = "") => {
    const result = await get(`${type}/` + id);
    return result;
}

export const createPost = async (options) => {
    const result = await post("post", options);
    return result;
}

export const deletePost = async (id) => {
    const result = await del("post/" + id);
    return result;
}

export const editPost = async (id, options) => {
    const result = await patch("post/" + id, options);
    return result;
}