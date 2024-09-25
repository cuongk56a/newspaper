import { useNavigate } from "react-router-dom";
import { Category } from "../models/Category";
import { useEffect, useState } from "react";
import { getCategory } from "../config/api/category.api";

const MainNav = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(()=>{
    const fetchCategory = async() => {
      const dataCategories = await getCategory()
      setCategories(dataCategories.results)
    }
    fetchCategory()
  },[])

  const nav = useNavigate();
  return (
    <div className="bg-white border-b-2 h-[40px] w-full items-center justify-evenly shadow-md hidden lg:flex text-center">
      {categories.map((category:Category, index:number)=>{
        return (
          <div key={index} onClick={()=>{nav(`/category/${category.id}`)}}>
            <a className="text-[12px] font-bold uppercase cursor-pointer" onClick={()=>{nav( `/category`)}}>{category.title}</a>
          </div>
        )
      })}
    </div>
  );
};

export default MainNav;
