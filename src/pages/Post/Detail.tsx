import { Icon } from "@iconify/react/dist/iconify.js";
import { Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailPost, getLikePost } from "../../config/api/post.api";
import { PostModel } from "../../models/Post";
import { formmatPublishTime } from "../../utils/timeAgo";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DetailPost = () => {
  const { id } = useParams();
  const user = useSelector((store: any) => store.auth.currentUser);
  const nav = useNavigate();
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(false);
  const [detailPost, setDetailPost] = useState<PostModel | null>();

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 300);
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setButtonStyle(footerRect.top <= 900);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchDetailPost = async () => {
      const response = await getDetailPost(id || "");
      setDetailPost(response);
    };
    fetchDetailPost();
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handClickLike = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để sử dụng tính năng này!");
    } else if (id) {
      if (detailPost?.liked_by.some((u: any) => u.id == user.user_id)) {
        toast.error("Đã like thì đừng hòng chạy");
      } else {
        const fetchLike = async () => {
          const response = await getLikePost(id);
          if (!!response) {
            setDetailPost(response);
          }
        };
        fetchLike();
      }
    }
  };

  return (
    <div className="flex w-full h-auto pt-4 text-justify">
      <div className="w-[35%] h-full"></div>
      <div className="container mx-auto p-4">
        <div className="text-gray-600 flex justify-between">
          <span className="text-[18px] font-bold leading-[22px]">
            {detailPost?.category?.title}
          </span>
          <span className="text-[15px] leading-[18px] text-[#656565]">
            {formmatPublishTime(detailPost?.publish_date)}
          </span>
        </div>
        <div className="border-b-2 border-dashed">
          <h1 className="text-[36px] leading-[46px] font-bold mt-8 mb-4 ">
            {detailPost?.title}
          </h1>
        </div>
        <div className="mt-4 mb-6">
          <h2 className="font-bold text-[18px] leading-[30px]">
            {detailPost?.summary}
          </h2>
        </div>
        <div>
          {detailPost?.contents?.map((section, index) => (
            <div key={index} className="mb-6">
              {section.title && (
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              )}
              {section.title
                ? section.paragraph
                    .slice(1, section.paragraph.length)
                    .map((para, pIndex) => (
                      <p
                        key={pIndex}
                        className={`${
                          para.below_img ? "mb-8" : "mb-4"
                        } text-[16px]`}
                      >
                        {para.text}
                      </p>
                    ))
                : section.paragraph.map((para, pIndex) => (
                    <p
                      key={pIndex}
                      className={`${
                        para.below_img ? "mb-8" : "mb-4"
                      } text-[16px]`}
                    >
                      {para.text}
                    </p>
                  ))}
              {section.image && (
                <div className="items-center justify-center text-center mb-8">
                  <img
                    src={section.image}
                    alt={section.description_img}
                    className="w-full h-[650px] mb-4 object-fill"
                  />
                  <span>{section.description_img}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-[16px]">
          <div className="flex items-center gap-2 py-4">
            <strong>Lượt yêu thích: </strong>
            <div
              className="flex items-center gap-1 bg-gray-300 w-auto h-full rounded-md px-2"
              onClick={handClickLike}
            >
              {detailPost &&
              detailPost?.liked_by.some((u: any) => u.id == user.user_id) ? (
                <Icon
                  icon="ion:heart-sharp"
                  width="2rem"
                  height="2rem"
                  style={{ color: "red" }}
                />
              ) : (
                <Icon
                  icon="ion:heart-outline"
                  width="2rem"
                  height="2rem"
                  style={{ color: "black" }}
                />
              )}
              <span>{detailPost?.likes}</span>
            </div>
          </div>
          <p className="mb-4">
            <strong>Nguồn:</strong>
            <a href={detailPost?.source?.domain}>
              "{detailPost?.source?.domain}"
            </a>
          </p>
          <p className="text-left">
            <strong>Tag: </strong>
            {detailPost?.keywords
              .slice(0, 4)
              .map((item: { id: string; keyword: string }, index: number) => (
                <Tag key={index} className="bg-gray-300 cursor-pointer" onClick={()=>nav(`/search?search=${item.keyword}`)}>
                  {item.keyword}
                </Tag>
              ))}
          </p>
        </div>
      </div>
      <div className="w-[35%] h-full"></div>
      {showGoToTop && (
        <button
          className={`fixed right-20 p-3 bg-red-500 text-white rounded-full shadow-lg ${
            buttonStyle ? "bottom-[200px]" : "bottom-20"
          }`}
          onClick={handleScroll}
        >
          <Icon icon="fluent:arrow-up-12-filled" />
        </button>
      )}
    </div>
  );
};

export default DetailPost;
