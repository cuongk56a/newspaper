import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/defaultAvatar.jpg";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/features/authSlice";
import { Category } from "../models/Category";
import { getCategory } from "../config/api/category.api";

const Header = () => {
  const nav = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownMenu = useRef<HTMLDivElement | null>(null);
  const user = useSelector((store: any) => store.auth.currentUser);
  const dispatch = useDispatch();

  const handleShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
    if (dropdownMenu.current && !dropdownMenu.current.contains(event.target)) {
      setShowCategory(false);
    }
  };

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      nav(`/search?search=${searchTerm}`);
    }
  };

  const toggleMenu = () => {
    setShowCategory(!showCategory);
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const dataCategories = await getCategory();
      setCategories(dataCategories.results);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="w-full h-24 bg-red-500 flex items-center justify-between px-2 sm:px-8 border-b-1 border-black">
        <div className="basis-3/5 lg:basis-auto flex justify-center items-center gap-2 sm:gap-8">
          <div className="w-[50px] h-[30px] bg-white rounded-lg flex flex-col lg:hidden items-center justify-center cursor-pointer">
            <Icon
              icon="material-symbols:menu"
              className="w-full h-full text-red-500"
              onClick={toggleMenu}
            />
            {showCategory && (
              <div
                className="absolute top-[65px] left-0 mt-2 px-2 w-[200px] sm:w-[300px] h-auto bg-red-500 shadow-md rounded-lg text-white border z-50"
                ref={dropdownMenu}
              >
                <div className="flex flex-col w-full rounded-t-md mt-2">
                  <p className="pl-2 text-2xl font-semibold">TÌM KIẾM</p>
                  <div className="flex gap-4 mt-2 bg-white w-[90%] mx-auto rounded-md mb-2 justify-center items-center">
                    <input
                      type="text"
                      name="search"
                      placeholder="Nhập từ khoá..."
                      className="w-[85%] border-l-2 border pl-2 rounded-l-md h-[30px]"
                      value={searchTerm}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="flex items-center">
                    <Icon
                      icon="material-symbols:search"
                      className="w-[20px] h-[20px] sm:w-[20px] sm:h-[30px] text-red-500 rounded-r-md mr-2"
                      onClick={() => {
                        nav(`/search?search=${searchTerm}`);
                      }}
                    />
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="pl-2 text-2xl font-semibold mb-2">DANH MỤC</p>
                  {categories.map((category: Category, index: number) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          nav(`/category/${category.id}`);
                        }}
                        className="pl-4 mb-2"
                      >
                        <a
                          className="text-[12px] font-bold uppercase cursor-pointer"
                          onClick={() => {
                            nav(`/category`);
                          }}
                        >
                          {category.title}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <a
            href="/"
            className="text-yellow-500 text-2xl sm:text-[35px] lg:text-[40px] w-full h-full font-extrabold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            NEWSPAPER
          </a>
        </div>
        <div className="hidden lg:flex items-center border border-white rounded-lg bg-white">
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm tiêu đề"
            className="h-[30px] w-[400px] pl-3 pr-10 text-gray-800 placeholder-gray-500 rounded-l-lg"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />{" "}
          <button className="h-[30px] w-[40px] flex items-center justify-center bg-red-500 text-white rounded-r-lg hover:bg-red-700">
            <Icon
              icon="material-symbols:search"
              className="w-[20px] h-[20px]"
              onClick={() => {
                nav(`/search?search=${searchTerm}`);
              }}
            />
          </button>
        </div>{" "}
        <div className="flex gap-8 basis-2/5 lg:basis-auto justify-end">
          {user ? (
            <div>
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleShowDropDown}
              >
                <span className="text-[12px] sm:text-[15px] text-white">{user.full_name}</span>
                <img
                  src={user.avatar ? user.avatar : defaultAvatar}
                  alt="avatar"
                  className="w-[35px] h-[35px] object-cover rounded-[50%]"
                />
              </div>
              {showDropDown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-2 sm:right-8 mt-2 w-[170px] h-auto bg-white shadow-md rounded-lg z-50"
                >
                  <div
                    className="p-4 flex items-center hover:bg-gray-200 cursor-pointer hover:rounded-t-lg border-transparent hover:border-gray-300 gap-2"
                    onClick={() => nav("/user-detail")}
                  >
                    <Icon
                      icon="fa6-solid:user-pen"
                      width="1.5rem"
                      height="1.5rem"
                      className="mx-1"
                    />
                    <span className="text-xl">Hồ sơ</span>
                  </div>
                  <div
                    className="p-4 flex items-center hover:bg-gray-200 cursor-pointer border-transparent hover:border-gray-300 gap-2"
                    onClick={() => nav("/change-password")}
                  >
                    <Icon
                      icon="mdi:password"
                      width="1.5rem"
                      height="1.5rem"
                      style={{ color: "black" }}
                      className="mx-1"
                    />
                    <span className="text-xl">Đổi mật khẩu</span>
                  </div>
                  <div
                    className="p-4 flex items-center hover:bg-gray-200 cursor-pointer hover:rounded-b-lg border-transparent hover:border-gray-300 gap-2"
                    onClick={() => {
                      dispatch(logoutSuccess());
                      localStorage.clear();
                      nav("/");
                      toast.success("Đăng xuất thành công!");
                    }}
                  >
                    <Icon
                      icon="material-symbols:logout"
                      width="1.5rem"
                      height="1.5rem"
                      className="mx-1"
                    />
                    <span className="text-xl">Đăng xuất</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                nav("/login");
              }}
            >
              <p className="text-[15px] text-white hidden sm:block">Đăng nhập</p>
              <button className="text-[30px] flex items-center justify-center bg-red-600 p-1 rounded-full transition duration-300">
                <Icon icon="mingcute:user-4-fill" style={{ color: "white" }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
