import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import urlImage from "../../assets/images/Design-Studio-2024-09-17.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../config/api/auth.api";
import { toast } from "react-toastify";

const Register = () => {
  const nav = useNavigate();
  const user = useSelector((store: any) => store.auth.currentUser);

  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, []);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const hanldeClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const hanldeClickShowCfPassword = () => {
    setShowCfPassword(!showCfPassword);
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().max(100).required("Họ tên không được để trống"),
    email: Yup.string()
      .email("Định dạng email k chính xác!")
      .max(255)
      .required("Email không được để trống"),
    phone: Yup.string().max(11).min(10),
    password: Yup.string().max(255).required("Mật khẩu không được để trống"),
    cf_password: Yup.string().max(255).required("Mật khẩu không được để trống"),
  });

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      cf_password: "",
      phone: "",
      birthday: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      if (data.cf_password != data.password) {
        toast.error("Mật khẩu và mật khẩu nhập lại không chính xác");
      } else {
        const {full_name,email, phone, password, birthday} = data;
        await registerUser({full_name,email, phone, password, birthday}, dispatch, nav);
      }
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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                ĐĂNG KÝ
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jonhny Mice"
                    required
                    value={formik.values.full_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
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
                <div>
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0*********"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="relative">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Mật khẩu
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="*******"
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
                    <Icon
                      icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                <div className="relative">
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type={showCfPassword ? "text" : "password"}
                    name="cf_password"
                    placeholder="*******"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formik.values.cf_password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    onClick={hanldeClickShowCfPassword}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7"
                  >
                    <Icon
                      icon={showCfPassword ? "mdi:eye" : "mdi:eye-off"}
                      className="w-5 h-5"
                    />
                  </button>
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
                <div className="flex items-center gap-4 ">
                  <div className="border-t-2 w-full"></div>
                  <div>or</div>
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
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Đăng ký
                </button>
                <p className="text-base font-light text-black dark:text-gray-400">
                  Bạn đã có tài khoản?{" "}
                  <a
                    // href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1"
                    onClick={() => {
                      nav("/login");
                    }}
                  >
                    Đăng nhập tại đây!
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
