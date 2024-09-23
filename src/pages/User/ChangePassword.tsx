import { useEffect, useState } from "react";
import Header from "../Header";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { changePassword, getDetailUser } from "../../config/api/user.api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ChangePassword() {
  const nav = useNavigate();
  const user = useSelector((store: any) => store.auth);
  const [userDetail, setUserDetail] = useState(user.currentUser);

  useEffect(() => {
    if (!user.currentUser) {
      nav("/login");
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCfNewPassword, setShowCfNewPassword] = useState(false);

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

  const hanldeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const hanldeShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const hanldeShowCfNewPassword = () => {
    setShowCfNewPassword(!showCfNewPassword);
  };

  const validationSchema = Yup.object().shape({
    old_password: Yup.string()
      .max(255)
      .required("Mật khẩu cũ không được để trống"),
    new_password: Yup.string()
      .max(255)
      .required("Mật khẩu mới không được để trống"),
    cf_new_password: Yup.string()
      .max(255)
      .required("Mật khẩu mới không được để trống"),
  });

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      old_password: "",
      new_password: "",
      cf_new_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { resetForm }) => {
      if (data.cf_new_password != data.new_password) {
        toast.error("Mật khẩu mới và mật khẩu nhập lại phải giống nhau");
        return;
      }
      try {
        await changePassword(
          {
            old_password: data.old_password,
            new_password: data.new_password,
          },
        );
        resetForm();
      } catch (error) {
        toast.error("Đổi mật khẩu không thành công!");
      }
    },
  });

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Header />
        <div className="w-full flex justify-center h-full">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[650px] border shadow-lg rounded-xl py-8 px-12">
              <p className="font-medium text-2xl">Đổi mật khẩu</p>
              <form
                className="space-y-4 md:space-y-6 mt-6"
                onSubmit={formik.handleSubmit}
              >
                <div className="">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <p className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                    {userDetail.email || ""}
                  </p>
                </div>
                <div className="relative">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Mật khẩu cũ
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="old_password"
                    placeholder="Nhập mật khẩu cũ..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formik.values.old_password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    onClick={hanldeShowPassword}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7"
                  >
                    <Icon
                      icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                <div className="relative">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Mật khẩu mới
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="new_password"
                    placeholder="Nhập mật khẩu mới..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formik.values.new_password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    onClick={hanldeShowNewPassword}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7"
                  >
                    <Icon
                      icon={showNewPassword ? "mdi:eye" : "mdi:eye-off"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                <div className="relative">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    type={showCfNewPassword ? "text" : "password"}
                    name="cf_new_password"
                    placeholder="Nhập lại mật khẩu mới..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formik.values.cf_new_password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    onClick={hanldeShowCfNewPassword}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7"
                  >
                    <Icon
                      icon={showCfNewPassword ? "mdi:eye" : "mdi:eye-off"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                <div className="flex justify-end mt-8">
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
}

export default ChangePassword;
