import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "./layout";
import Login from "./app/auth/login";
import { useStorage } from "./utils";
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
  AddSotuv
} from "./page-ui";
import { Toaster } from "react-hot-toast";
import Complaints from "./app/complaints/complaints";
import { Messages } from "./app/message/message";
import { Chat } from "./app/chat";

const Home = lazy(() => import("./app/home/home"));
const Notification = lazy(() => import("./app/notification/notification"));
const OrderHome = lazy(() => import("./app/order/order"));
const Cash = lazy(() => import("./app/cash/cash"));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useStorage.getTokens()?.accessToken;

  useEffect(() => {
    // Agar token yo'q bo'lsa va login sahifasida emas bo'lsa, login ga yo'naltirish
    if (!token && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
    // Agar token bor va login sahifasida bo'lsa, home ga yo'naltirish
    else if (token && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [token, location.pathname, navigate]);

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
          <Route path="/shikoyatlar" element={<Complaints />} />

          <Route path="/kassa-hisoboti" element={<Cash />} />

          <Route path="/tandirda" element={<InOven />} />
          <Route path="/nonlar" element={<ReadyBread />} />
          <Route path="/sotuv" element={<Sale />} />
          <Route path="/sotuv/:id" element={<Sotuv />} />
          <Route path="/sotuv/:id/edit" element={<SotuvEdit />} />
          <Route path="/sotuv/add" element={<AddSotuv />} />
          <Route path="/zuvala" element={<Zuvala />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
