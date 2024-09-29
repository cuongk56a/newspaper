import MainContent from "../Home/MainContent";

const MainContainCategory = () => {
  return (
    <div className="flex w-full h-auto pt-4">
      <div className="sm:w-[10px] lg:w-[35%] h-full"></div>
      <div  className="min-h-[429px] sm:min-h-[658px] lg:min-h-[670px]">
        <MainContent />
      </div>
      <div className="sm:w-[10px] lg:w-[35%] h-full"></div>
    </div>
  );
};

export default MainContainCategory;
