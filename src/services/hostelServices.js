import { get, patch, post, del } from "../utils/request"

export const getHostel = async (id = "") => {
    const result = await get("hostel/" + id);
    return result;
}

export const getHostel1 = async (ids = "") => {
    const result = await get("hostel/" + ids);
    return result;
}

export const createHostel = async (options) => {
    const result = await post("hostel", options);
    return result;
}

export const deleteHostel = async (id) => {
    const result = await del("hostel/" + id);
    return result;
}

export const editHostel = async (id, options) => {
    const result = await patch("hostel/" + id, options);
    return result;
}

export const getHostelSearch = async (id = "") => {
    const result = await get("search-hostel/" + id);
    return result;
}

export const postHostelSearch = async (option) => {
    const result = await get("search-hostel/", option);
    return result;
}

export const postHostelRating = async (option) => {
    const result = await get("hostel-rating/", option);
    return result;
}

export const postHostelVote = async (option) => {
    const result = await get("hostel-vote/", option);
    return result;
}