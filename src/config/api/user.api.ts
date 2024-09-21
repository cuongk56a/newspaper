import { UserModel } from "../../models/User";
import { updateUserSuccess } from "../../redux/features/authSlice";
import { _API_ } from "../api.contains";
import axios_client from "../axios";
import { toast } from "react-toastify";
// import { refreshToken } from './auth.api';

export const changePassword = async (
  access_token: string,
  data: { old_password: string; new_password: string }
) => {
  try {
    const response = await axios_client.patch(
      `${_API_.USER}/change-password/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status == 200) {
      toast.success("Đổi mật khẩu thành công");
      return response.data;
    } else {
      throw new Error("Bad Request");
    }
  } catch (error) {
    throw error;
  }
};

export const getDetailUser = async (
  access_token: string,
  data: { user_id: string }
) => {
  try {
    const response = await axios_client.get(`${_API_.USER}/${data.user_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateAvatar = async (
  access_token: string,
  data: { avatar: any },
  dispatch: any,
  user: UserModel
) => {
  try {
    const response = await axios_client.patch(
      `${_API_.USER}/update_avatar/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(updateUserSuccess({ ...user, avatar: response.data.avatar_link }));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, avatar: response.data.avatar_link })
    );
    toast.success('Cập nhật avatar thành công!')
    return response.data;
  } catch (error) {
    toast.error("Có lỗi xảy ra khi cập nhật avatar!");
    throw error;
  }
};

export const updateUser = async (
  access_token: string,
  data: {
    user_id: string;
    full_name: string;
    address: string;
    phone: string;
    birthday: string;
  },
  dispatch: any,
  user: UserModel
) => {
  try {
    const response = await axios_client.patch(
      `${_API_.USER}/${data.user_id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    dispatch(updateUserSuccess({ ...user, ...response.data }));
    localStorage.setItem("user", JSON.stringify({ ...user, ...response.data }));
    toast.success("Cập nhật thông tin thành công!");
    return response.data;
  } catch (error) {
    toast.error("Có lỗi xảy ra khi cập nhật thông tin!");
    throw error;
  }
};
