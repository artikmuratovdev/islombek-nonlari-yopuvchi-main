import { MdEditDocument } from "react-icons/md";
import { RiHome5Fill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

export const CLOSER_MENU_LIST = [
  {
    icon: <RiHome5Fill size={25} />,
    label: "Asosiy",
    link: "/",
  },
  {
    icon: <TbReportAnalytics size={25} />,
    label: "Kassa hisoboti",
    link: "/kassa-hisoboti",
  },
  {
    icon: <MdEditDocument size={25} />,
    label: "Zakazlar",
    link: "/zakazlar",
  },
];


export const CLOSER_ORDER_FORM_LIST = [
  {
    type: "text",
    name: "client",
    labelText: "Mijoz",
    placeholder: "Mijoz ismi",
    value: "Afruz to’yxona",
  },
  {
    type: "phone",
    name: "phone",
    labelText: "Telefon",
    placeholder: "+998 99 999 99 99",
    value: "+998 99 123 45 67",
  },
  {
    type: "text",
    name: "address",
    labelText: "Manzil",
    placeholder: "Mijoz manzili",
    value: "Shohbekat",
  },
  {
    type: "text",
    name: "commit",
    labelText: "Izoh",
    placeholder: "Buyurtma haqida izoh",
    value: "Qolgan pulini bo’lib to’lar ekan",
  },
  {
    type: "dateAndTime",
    name: "deliveryTime",
    labelText: "Topshrish vaqti",
    placeholder: "Topshirish vaqti",
    value: "16.04.2025 10:30",
  },
  {
    type: "number",
    name: "paidAmount",
    labelText: "Olingan pul",
    placeholder: "Pul miqdori",
    value: "100000"
  },
];

export const LOAVESES_NUMBER_LIST = [
  {
    name: "Chig'atoy",
    price: 5000,
    theNumber: 100,
  },
  {
    name: "Patir",
    price: 4000,
    theNumber: 200,
  },
  {
    name: "Buxonka",
    price: 3000,
    theNumber: 150,
  },
];
