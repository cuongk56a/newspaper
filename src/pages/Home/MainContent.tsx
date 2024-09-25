import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Tag } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  getPosts,
  getPostsByCategory,
  getPostsBySearch,
} from "../../config/api/post.api.ts";
import { timeAgo } from "../../utils/timeAgo.ts";
import { PostModel } from "../../models/Post.ts";
import urlImage from "../../assets/images/not-found-page.jpg";

const MainContent = () => {
  const { id } = useParams();
  const location = useLocation();
  const search = location.search;
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(false);
  const [dataPost, setDataPost] = useState<PostModel[]>([]);
  const [urlNext, setUrlNext] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLButtonElement | null>(null);
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
      let posts = [];
      if (id) {
        posts = await getPostsByCategory(id);
      } else if (search) {
        posts = await getPostsBySearch(decodeURIComponent(search));
      } else {
        posts = await getPosts();
      }
      if (!!posts.results) {
        setDataPost(posts.results);
        setUrlNext(posts.next);
      } else {
        setDataPost([]);
        setUrlNext(null);
      }
    };
    fetchPost();
  }, [id || search]);

  useEffect(() => {
    const loadMore = async () => {
      if (urlNext) {
        const posts = await fetch(urlNext).then((res) => res.json());
        if (posts.results.length > 0) {
          setDataPost((prevDataPost) => [...prevDataPost, ...posts.results]);
          setUrlNext(posts.next);
        }
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [urlNext]);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {dataPost.length <= 0 && !!search ? (
        <div
          className="flex items-center justify-center w-[600px] h-[600px] bg-cover bg-center m-auto"
          style={{
            backgroundImage: `url(${urlImage})`,
          }}
        ></div>
      ) : (
        <div>
          {dataPost.map((data: any, index: number) => (
            <>
              <div
                key={index}
                className="hidden sm:flex w-full h-[200px] gap-4 p-4 border-b-2 border-dashed"
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
                              onClick={() => {
                                nav(`/search/?search=${item.keyword}`);
                              }}
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
              <div
                key={index}
                className="flex flex-col sm:hidden w-full h-[350px] gap-4 px-4 border-b-2 border-dashed"
              >
                <div className="w-full flex flex-col pt-2">
                  <h1
                    className="text-[15px] sm:text-[25px] font-medium line-clamp-1 cursor-pointer"
                    onClick={() => {
                      nav(`/post-detail/${data.id}`);
                    }}
                  >
                    {data?.title}
                  </h1>
                  <Markdown className="text-[14px] sm:text-[18px] line-clamp-3 h-[63px]">
                    {data?.summary}
                  </Markdown>
                </div>
                <div
                  className="w-full h-[236px] cursor-pointer"
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
              </div>
            </>
          ))}
          {urlNext && dataPost.length <= 100 && (
            <button ref={loadMoreRef} className="load-more-button">
              Load More
            </button>
          )}
        </div>
      )}

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
