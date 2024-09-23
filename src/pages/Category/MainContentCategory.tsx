import MainContent from "../Home/MainContent";

const MainContainCategory = () => {
  return (
    <div className="flex w-full h-auto pt-4">
      <div className="w-[35%] h-full"></div>
      <div className="w-full">
        <div>
          <MainContent />
        </div>
      </div>
      <div className="w-[35%] h-full"></div>
    </div>
  );
};

export default MainContainCategory;
