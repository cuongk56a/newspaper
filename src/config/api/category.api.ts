import { _API_ } from "../api.contains";
import axios_client from "../axios";

export const getCategory= async () => {
  try {
    const response = await axios_client.get(`${_API_.CATEGORY}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};