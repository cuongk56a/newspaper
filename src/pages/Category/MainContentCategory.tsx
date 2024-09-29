import MainContent from "../Home/MainContent";

const MainContainCategory = () => {
  return (
    <div className="flex w-full h-auto pt-4 min-h-[600px] sm:min-h-[670px] lg:min-h-[680px]">
      <div className="sm:w-[10px] lg:w-[35%] h-full"></div>
      <div>
        <MainContent />
      </div>
      <div className="sm:w-[10px] lg:w-[35%] h-full"></div>
    </div>
  );
};

export default MainContainCategory;
