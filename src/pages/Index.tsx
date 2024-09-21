import Footer from "./Footer";
import Header from "./Header";
import Main from "./Home/Main";
import MainNav from "./MainNav";

function Index() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MainNav />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default Index;
