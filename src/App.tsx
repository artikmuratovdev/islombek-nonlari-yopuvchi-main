import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./layout";
import Login from "./app/auth/login";
import {
  InOven,
  NewOrder,
  Order,
  Zuvala,
  Profile,
  ReadyBread,
  Sale,
  Sotuv,
  SotuvEdit,
  AddSotuv,
} from "./page-ui";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./app/home/home"));
const Notification = lazy(() => import("./app/notification/notification"));
const Chatting = lazy(() => import("./app/chatting/chatting"));
const OrderHome = lazy(() => import("./app/order/order"));
const Cash = lazy(() => import("./app/cash/cash"));

const App = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/notification" element={<Notification />} />

          <Route path="/zakazlar" element={<OrderHome />} />
          <Route path="/buyurtma/:id" element={<Order />} />
          <Route path="/yangi-buyurtma" element={<NewOrder />} />

          <Route path="/kassa-hisoboti" element={<Cash />} />
          
          <Route path="/tandirda" element={<InOven />} />
          <Route path="/nonlar" element={<ReadyBread />} />
          <Route path="/sotuv" element={<Sale />} />
          <Route path="/sotuv/:id" element={<Sotuv />} />
          <Route path="/sotuv/:id/edit" element={<SotuvEdit />} />
          <Route path="/sotuv/add" element={<AddSotuv />} />
          <Route path="/zuvala" element={<Zuvala />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/message/:id" element={<Chatting />} />
      </Routes>
    </Suspense>
  );
};

export default App;
