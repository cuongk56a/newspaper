import { _API_ } from "../api.contains";
import axios_client from "../axios";

export const getPosts = async () => {
  try {
    const response = await axios_client.get(`${_API_.POST}`, {
      headers: {
        // Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailPost = async (id: string) => {
  try {
    const response = await axios_client.get(`${_API_.POST}/${id}/`, {
      headers: {
        // Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
