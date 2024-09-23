import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostModel } from '../../models/Post.ts';
import { getPostsSortLike } from '../../config/api/post.api.ts';

const LeftContent = () => {
  const [dataPost, setDataPost] = useState<PostModel[]>([])

  useEffect(()=>{
    const fetchPost = async()=>{
      const respone = await getPostsSortLike()
      if(!!respone.results){
        setDataPost(respone.results)
      }
    }
    fetchPost()
  },[])

  const nav = useNavigate()
  return (
    <div className="max-w-md mx-auto h-full overflow-y-scroll scrollbar-hide">
      <div className="space-y-4">
        {dataPost.slice(0, 9).map((item: any, index: number) => (
          <div key={index} className="border-b-2 border-dashed pb-2" onClick={()=>{nav(`/post-detail/${item.id}`)}}>
            <p className="text-[13px] line-clamp-3 text-black font-semibold cursor-pointer"  onClick={()=>{nav('/post-detail')}}>{item.title || " "}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftContent;
