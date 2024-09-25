import Footer from "./Footer";
import Header from "./Header";
import Main from "./Home/Main";
import MainNav from "./MainNav";

function Index() {
  return (
    <>
      <div className="flex flex-col min-h-screen content-wraapper mx-auto w-full">
        <header>
          <Header />
          <MainNav />
        </header>
        <main>
          <Main />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Index;
