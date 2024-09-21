import Footer from "../Footer";
import Header from "../Header";
import MainNav from "../MainNav";
import DetailPost from "./Detail";


function IndexPost() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MainNav />
        <DetailPost />
        <Footer />
      </div>
    </>
  );
}

export default IndexPost;
