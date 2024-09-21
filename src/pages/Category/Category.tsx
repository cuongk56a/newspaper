import Footer from "../Footer";
import Header from "../Header";
import MainContainCategory from "./MainContentCategory";
import MainNav from "../MainNav";

function Category() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MainNav />
        <MainContainCategory />
        <Footer />
      </div>
    </>
  );
}

export default Category;
