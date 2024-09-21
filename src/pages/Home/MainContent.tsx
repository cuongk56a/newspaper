import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getPosts } from "../../config/api/post.api.ts";
import { timeAgo } from "../../utils/timeAgo.ts";
import { PostModel } from "../../models/Post.ts";

const MainContent = () => {
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(false);
  const [dataPost, setDataPost] = useState<PostModel[]>([]);
  const nav = useNavigate();

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
    const fetchPost = async () => {
      const dataPost = await getPosts();
      setDataPost(dataPost.results);
    };
    fetchPost();
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div>
        {dataPost.slice(0, 20).map((data: any, index: number) => (
          <div
            key={index}
            className="flex w-full h-[200px] gap-4 p-4 border-b-2 border-dashed"
          >
            <div
              className="w-[40%] cursor-pointer"
              onClick={() => {
                nav(`/post-detail/${data.id}`);
              }}
            >
              <img
                src={data?.thumbnail}
                alt={data?.title}
                className="h-full w-full object-cover rounded"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <h1
                className="text-[25px] font-medium line-clamp-1 cursor-pointer"
                onClick={() => {
                  nav(`/post-detail/${data.id}`);
                }}
              >
                {data?.title}
              </h1>
              <Markdown className="text-[18px] line-clamp-3">
                {data?.summary}
              </Markdown>
              <div className="flex justify-between text-[15px] mt-2 absolute bottom-0 w-full">
                <p className="text-left">
                  <span>Tag: </span>
                  {data.keywords
                    .slice(0, 4)
                    .map(
                      (
                        item: { id: string; keyword: string },
                        indexTag: any
                      ) => (
                        <Tag
                          key={indexTag}
                          className="bg-gray-300 cursor-pointer"
                        >
                          {item.keyword}
                        </Tag>
                      )
                    )}
                </p>
                <p className="text-right">{timeAgo(data.publish_date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
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

export default MainContent;
