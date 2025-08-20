import { CLOSER_MENU_LIST } from "@/constants";
import { Link, useLocation } from "react-router-dom";

export const Menu = () => {
  const location = useLocation();

  return (
    <div className="border-t-2 border-[#FFCC15] rounded-t-[40px] bg-[#1C2C57] p-[12px] fixed bottom-0 w-full">
      <div className="flex items-center justify-around">
        {
          // localStorage.getItem("ROLE") === roles.YOPUVCHI  &&
          CLOSER_MENU_LIST.map((item, i) => (
            <Link
              to={item?.link}
              key={i}
              className={`${
                location.pathname === item.link
                  ? "text-[#FFCC15]"
                  : "text-white"
              } flex items-center flex-col cursor-pointer`}
            >
              <span>{item.icon}</span>
              <p className="text-[11px] font-semibold">{item.label}</p>
            </Link>
          ))
        }
      </div>
    </div>
  );
};
