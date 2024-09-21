import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { loginUser } from "../../config/api/auth.api";
import urlImage from "../../assets/images/Design-Studio-2024-09-17.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const nav = useNavigate();
  const user = useSelector((store: any) => store.auth.currentUser);

  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const hanldeClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Định dạng email k chính xác!")
      .max(255)
      .required("Email không được để trống"),
    password: Yup.string().max(255).required("Mật khẩu không được để trống"),
  });

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      await loginUser(
        { email: data.email, password: data.password },
        dispatch,
        nav
      );
      toast.success("Đăng nhập thành công!");
    },
  });

  return (
    <>
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${urlImage})`,
            filter: "blur(5px)", // Làm mờ hình nền
            WebkitFilter: "blur(5px)", // Đảm bảo hoạt động trên Safari
            zIndex: -1, // Đảm bảo background ở phía sau nội dung
            width: "100%", // Đảm bảo phủ toàn bộ chiều rộng
            height: "100%", // Đảm bảo phủ toàn bộ chiều cao
            backgroundSize: "cover", // Đảm bảo ảnh bao phủ toàn bộ phần tử
            backgroundPosition: "center", // Căn giữa hình ảnh
          }}
        ></div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <a
            // href="/"
            className="flex items-center mb-6 text-[50px] font-extrabold text-yellow-500 cursor-pointer"
            style={{ WebkitTextStroke: "2px black" }}
            onClick={() => {
              nav("/");
            }}
          >
            {/* <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            /> */}
            NEWSPAPER
          </a>
          <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 border">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                ĐĂNG NHẬP
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="relative">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Mật khẩu
                  </label>
                  {showPassword ? (
                    <>
                      <input
                        type="text"
                        name="password"
                        placeholder=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      <button
                        type="button"
                        onClick={hanldeClickShowPassword}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7"
                      >
                        <Icon icon="mdi:eye" className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      <button
                        type="button"
                        onClick={hanldeClickShowPassword}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7"
                      >
                        <Icon icon="mdi:eye-off" className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-4 ">
                  <div className="border-t-2 w-full"></div>
                  <div>hoặc</div>
                  <div className="border-t-2 w-full"></div>
                </div>
                <div className="flex items-center justify-center border border-1 border-gray-200 gap-2 p-2 rounded-md">
                  <a href="/" className="flex" type="button">
                    <img
                      className="w-6 h-6"
                      src="https://i.pinimg.com/736x/74/65/f3/7465f30319191e2729668875e7a557f2.jpg"
                      alt=""
                    />
                    <p className="px-2">Đăng nhập với Google</p>
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        name="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-base">
                      <label className="text-black dark:text-gray-300">
                        Ghi nhớ đăng nhập
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    type="button"
                    className="text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={handleShowModal}
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Đăng nhập
                </button>
                <p className="text-base font-light text-black dark:text-gray-400">
                  Bạn chưa có tài khoản?{" "}
                  <a
                    // href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1"
                    onClick={() => {
                      nav("/register");
                    }}
                  >
                    Đăng ký!
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        className="flex justify-center items-center fixed inset-0"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Quên mật khẩu ư??
        </h2>
        <p>
          Đó là lỗi do bạn nên hãy cố gắng nhớ lại. Hoặc dùng chức năng đăng
          nhập bằng --
          <a href="" className="text-blue-500 font-bold hover:underline">
            Google
          </a>
          --
        </p>
      </Modal>
    </>
  );
};

export default Login;
