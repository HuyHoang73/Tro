import { get } from "../utils/request"

export const getCity = async () => {
    const result = await get("city/");
    return result;
}