import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/defaultAvatar.jpg";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/features/authSlice";

const Header = () => {
  const nav = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((store: any) => store.auth.currentUser);
  const dispatch = useDispatch()

  const handleShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropDown(false);
    }
  };

  const handleInputChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      nav(`/search?search=${searchTerm}`)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-24 bg-red-500 flex items-center justify-between px-8 border-b-1 border-black">
      <div>
        <a
          href="/"
          className="text-yellow-500 text-[40px] font-extrabold"
          style={{ WebkitTextStroke: "2px black" }}
        >
          NEWSPAPER
        </a>
      </div>
      <div className="flex items-center border border-white rounded-lg bg-white">
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
          <Icon icon="material-symbols:search" className="w-[20px] h-[20px]" onClick={()=>{nav(`/search?search=${searchTerm}`)}}/>
        </button>
      </div>{" "}
      {user ? (
        <div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleShowDropDown}
          >
            <span className="text-[15px] text-white">{user.full_name}</span>
            <img
              src={user.avatar ? user.avatar : defaultAvatar}
              alt="avatar"
              className="w-[35px] h-[35px] object-cover rounded-[50%]"
            />
          </div>
          {showDropDown && (
            <div
              ref={dropdownRef}
              className="absolute right-8 mt-2 w-[170px] h-auto bg-white shadow-md rounded-lg"
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
                  nav('/')
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
          className="flex items-center  gap-2 cursor-pointer"
          onClick={() => {
            nav("/login");
          }}
        >
          <p className="text-[15px] text-white">Đăng nhập</p>
          <button className="text-[30px] flex items-center justify-center bg-red-600 p-1 rounded-full transition duration-300">
            <Icon icon="mingcute:user-4-fill" style={{ color: "white" }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
