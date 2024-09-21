import LeftContent from "./LeftContent";
import MainContent from "./MainContent";
import RightContent from "./RightContent";

const Main = () => {
  return (
    <div className="flex w-full h-auto pt-4">
      <div className="w-[30%] h-full"></div>
      <div className="w-full">
        <div className="flex h-[400px] border-b-2 pb-4">
            <div className="w-[30%]"><LeftContent /></div>
            <div className="w-[70%] border-l-2 pl-4 pr-4"><RightContent /></div>
        </div>
        <div>
          <MainContent />
        </div>
      </div>
      <div className="w-[30%] h-full"></div>
    </div>
  );
};

export default Main;
