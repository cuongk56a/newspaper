import { useNavigate } from "react-router-dom";

const categorys = [
  'Thời Sự',
  'Pháp Luật',
  'Kinh Doanh',
  'Công Nghệ',
  'Đời Sống',
  'Y Tế',
  'Thể Thao',
  'Du Lịch',
  'Giải Trí'
]

const MainNav = () => {
  const nav = useNavigate();
  return (
    <div className="bg-white border-b-2 h-[40px] w-full items-center flex justify-evenly shadow-md">
      {categorys.map((category:string, index:number)=>{
        return (
          <div key={index}>
            <a className="text-[12px] font-bold uppercase cursor-pointer" onClick={()=>{nav( `/category`)}}>{category}</a>
          </div>
        )
      })}
    </div>
  );
};

export default MainNav;
