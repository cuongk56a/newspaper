import Footer from "./Footer";
import Header from "./Header";
import MainNav from "./MainNav";
import urlImage from "../assets/images/not-found-page.jpg"

function PageError() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MainNav />
        <div
          className="flex items-center justify-center w-[600px] h-[600px] bg-cover bg-center m-auto"
          style={{
            backgroundImage: `url(${urlImage})`
          }}
        ></div>
        <Footer />
      </div>
    </>
  );
}

export default PageError;