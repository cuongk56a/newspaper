import { toast } from "react-toastify";
import { _API_ } from "../api.contains";
import axios_client from "../axios";

export const getPostsByCategory = async (categories?:string) => {
  try {
    const response = await axios_client.get(`${_API_.POST}/?categories=${categories}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await axios_client.get(`${_API_.POST}/`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailPost = async (id: string) => {
  try {
    const response = await axios_client.get(`${_API_.POST}/${id}/`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostsBySearch = async (search: string) => {
  try {
    const response = await axios_client.get(`${_API_.POST}/${search}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostsSortLike = async () => {
  try {
    const response = await axios_client.get(`${_API_.POST}/sort_like/`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLikePost = async (id:string) => {
  try {
    const response = await axios_client.get(`${_API_.POST}/${id}/like_post/`);
    if(response.status==200){
      toast.success('Like bài viết thành công!')
      return response.data;
    }else{
      toast.error('Like bài viết không thành công!')
      return;
    }
  } catch (error:any) {
    throw error;
  }
};
