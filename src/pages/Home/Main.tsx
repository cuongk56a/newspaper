import LeftContent from "./LeftContent";
import MainContent from "./MainContent";
import RightContent from "./RightContent";

const Main = () => {
  return (
    <div className="flex w-full h-auto pt-4">
      <div className="sm:w-[10%] h-full lg:w-[30%]"></div>
      <div className="w-full min-h-[538px] sm:min-h-[658px] lg:min-h-[670px]">
        <div className="h-[400px] border-b-2 pb-4  hidden sm:flex">
            <div className="w-[30%] hidden lg:flex"><LeftContent /></div>
            <div className="w-full lg:w-[70%] lg:border-l-2 pl-4 pr-4"><RightContent /></div>
        </div>
        <div>
          <MainContent />
        </div>
      </div>
      <div className="sm:w-[10%] h-full lg:w-[30%]"></div>
    </div>
  );
};

export default Main;
