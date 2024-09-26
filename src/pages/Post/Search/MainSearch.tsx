import { useLocation } from "react-router-dom";
import MainContent from "../../Home/MainContent";

const MainSearch = () => {
  const location = useLocation();
  const search = location.search.slice(8)
  
  return (
    <div className="flex w-full h-auto pt-4">
      <div className="w-[35%] h-full"></div>
      <div className="w-full">
        <div className="p-4">
          <p className="text-xl sm:text-2xl font-medium">Từ khoá tìm kiếm: <span className=" font-normal">{decodeURIComponent(search)}</span></p>
        </div>
        <div>
          <MainContent />
        </div>
      </div>
      <div className="w-[35%] h-full"></div>
    </div>
  );
};

export default MainSearch;
