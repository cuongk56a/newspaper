import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser, updateAvatar, updateUser } from "../../config/api/user.api";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg"
import { UserModel } from "../../models/User";

const UserDetail = () => {
  const user = useSelector((store: any) => store.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState<UserModel>(user.currentUser);

  const [imagePreview, setImagePreview] = useState(user.currentUser.avatar);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        nav("/login");
        return;
      }
      try {
        const response = await getDetailUser({
          user_id: user.currentUser.user_id,
        });
        setUserDetail(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
  }, [user.currentUser]);

  const validationSchema = Yup.object().shape({
    full_name: Yup.string()
      .max(100)
      .required("Họ tên không được để trống"),
    address: Yup.string()
      .max(255)
      .required("Địa chỉ không được để trống"),
    phone: Yup.string()
      .max(255)
      .required("Số điện thoại không được để trống"),
    birthday: Yup.string()
      .max(255)
      .required("Ngày sinh không được để trống"),
  });

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      full_name: userDetail.full_name || "",
      address: userDetail.address || "",
      phone: userDetail.phone || "",
      birthday: userDetail.birthday || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      try {
        await updateUser(
          {
            user_id: user.currentUser.user_id,
            full_name: data.full_name,
            phone: data.phone,
            address: data.address,
            birthday: data.birthday,
          },
          dispatch,
          user.currentUser,
        );
      } catch (error) {
        toast.error("Cập nhật thông tin thất bại!");
      }
    },
  });

  const handleImageChange =async (e:any) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo URL để preview ảnh
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      const access_token=localStorage.getItem('access_token');
      if(!access_token){
        toast.error('Cập nhật avatar thất bại')
        return;
      }
      await updateAvatar({avatar:file},dispatch, user.currentUser);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Header />
        <div className="w-full flex justify-center h-full">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[650px] mx-auto border shadow-lg rounded-xl py-8 px-12">
              <p className="font-medium text-2xl">Thông tin tài khoản</p>
              <form>
                <div className="pb-8 flex relative mx-auto size-[200px]">
                  <img
                    src={imagePreview || defaultAvatar}
                    alt="default avatar"
                    className="size-[200px] rounded-full object-cover"
                  />
                  <span
                    className="absolute bottom-1 right-8 bg-gray-200 p-2 rounded-full cursor-pointer"
                    onClick={handleIconClick}
                  >
                    <Icon icon="bi:camera-fill" className="w-[20px] h-[20px]" />
                  </span>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </form>
              <form onSubmit={formik.handleSubmit} className="mt-4">
                <div className="pb-4">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.full_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="pb-4">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="pb-4">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="pb-8">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Sinh nhật
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.birthday}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-auto text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
