import { Pagination } from "antd";
import MainContent from "../Home/MainContent";

const MainContainCategory = () => {
  return (
    <div className="flex w-full h-auto pt-4">
      <div className="w-[35%] h-full"></div>
      <div className="w-full">
        <div>
          <MainContent />
        </div>
        <div className="flex justify-center items-center pt-4">
          <Pagination defaultCurrent={1} total={50} />;
        </div>
      </div>
      <div className="w-[35%] h-full"></div>
    </div>
  );
};

export default MainContainCategory;
