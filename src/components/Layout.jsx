import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";




function Layout ( {products, carts, setToken} )  {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar products={products} carts={carts} setToken={setToken}/>
      <main className="flex-1 bg-accent">
        <div className="container mx-auto px-4 py-12">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
