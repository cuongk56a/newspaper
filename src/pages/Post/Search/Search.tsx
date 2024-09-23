import Footer from "../../Footer";
import Header from "../../Header";
import MainNav from "../../MainNav";
import MainSearch from "./MainSearch";

function Search() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MainNav />
        <MainSearch />
        <Footer />
      </div>
    </>
  );
}

export default Search;