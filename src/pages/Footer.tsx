import { Icon } from "@iconify/react";
import urlImage from "../assets/images/Design-Studio-2024-09-16.jpg";
import { ComponentPropsWithoutRef } from "react";

const Footer = () => {
  return (
    <footer className="w-full h-auto pt-8 border-t-2 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center md:h-[80px] px-4 md:px-8 gap-20">
        <div className="w-full md:w-[15%] flex justify-center items-center md:mb-0 bg-red-500">
          <img
            src={urlImage}
            alt="logo"
            className="w-full h-[120px] object-fill rounded"
          />
        </div>

        <div className="w-full md:w-[50%] text-center md:text-left">
          <p className="text-lg font-semibold mb-2">
            Địa chỉ: Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội
          </p>
          <p className="text-lg font-semibold mb-2">Hotline: 0123456789</p>
          <p className="text-lg font-semibold mb-2">Liên hệ khác:</p>

          <ul className="flex md:justify-start space-x-4 mt-4">
            <ListCommon
              href="https://www.facebook.com/"
              icon="devicon:facebook"
            />
            <ListCommon
              href="https://www.instagram.com/"
              icon="skill-icons:instagram"
            />
            <ListCommon
              href="https://www.google.com/intl/vi/gmail/about/"
              icon="skill-icons:gmail-light"
            />
          </ul>
        </div>
        <div className="w-full md:w-[35%] text-center">
          <div className="flex flex-col items-center justify-between">
            <p className="text-2xl font-semibold mb-4">
              Đăng ký email - Mở cổng thông tin
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center">
              Đăng ký tại đây
              <span className="ml-2">
                <Icon icon="ic:baseline-message" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t-2 border-dashed h-[20px]">
        <p className="text-[13px] text-gray-400 text-center">
          © Copyright 2024 Newspaper Online, All rights reserved ® Flash &
          Accurate
        </p>
      </div>
    </footer>
  );
};

export default Footer;

type ListCommonProps = ComponentPropsWithoutRef<"a"> & {
  icon: string;
  href: string;
};

const ListCommon = ({ icon, href, ...props } : ListCommonProps) => {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        <Icon icon={icon} className="text-2xl" />
      </a>
    </li>
  );
};
