import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loading from "./components/Loading";
import Search from "./components/Search";
import FotgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Chat from "./components/Chat";
import OrderHistory from "./components/OrderHistory";
import Compare from "./components/Compare";
import Bill from "./components/Bill";

const Home = lazy(() => import("./modules/Home"));
const Product = lazy(() => import("./modules/Product"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const MainLayout = lazy(() => import("./modules/MainLayout"));
const Cart = lazy(() => import("./components/Carrt"));
const NotFound = lazy(() => import("./components/NotFound"));
const ProductGrid = lazy(() => import("./components/ProductGridView"));
const News = lazy(() => import("./components/News"));
const Tablet = lazy(() => import("./components/Tablet"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product_grid" element={<ProductGrid />} />
            <Route path="/tablet" element={<Tablet />} />
            <Route path="/news" element={<News />} />
            <Route path="/search" element={<Search />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/compare" element={<Compare />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<FotgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/returnbill" element={<Bill />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Suspense>
    //   )}
    //   )
    // </div>
  );
}

export default App;
