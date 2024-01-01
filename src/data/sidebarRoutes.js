import { FaHome, FaMoneyCheckAlt } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";

const sidebarRoutes = [
  {
    icon: FaHome,
    label: "Home",
    // active: pathname === "/",
    href: "/",
  },
  {
    icon: FaMoneyCheckAlt,
    label: "Account",
    // active: pathname === "/review",
    href: "/account",
  },
  {
    icon: GiTomato,
    label: "ToDo List",
    href: "todolist"
  },
  {
    icon: GiTomato,
    label: "Test",
    href: "test"
  }
];

export default sidebarRoutes;


