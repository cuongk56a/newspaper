import MainContent from "../Home/MainContent";

const MainContainCategory = () => {
  return (
    <div className="flex w-full h-auto pt-4">
      <div className="sm:w-[10px] lg:w-[35%] h-full"></div>
      <div className="w-full">
        <div>
          <MainContent />
        </div>
      </div>
      <div className="sm:w-[10px] lg:w-[35%] h-full"></div>
    </div>
  );
};

export default MainContainCategory;
