import { Outlet } from "react-router-dom";
import FlowbiteSidebar from "./component/FlowbiteSidebar";
// import Header from "./component/Header";
import Header from "./component/Header";

const Root = () => {
  // console.log("root")
  return (
    <div className="w-full h-screen flex bg-gray-50 dark:bg-gray-800">
      <div className="hidden md:flex flex-col pl-2 py-2 ">
        <FlowbiteSidebar />
      </div>

      <div className="flex flex-col flex-1 p-2 overflow-hidden">
        <div className="">
          <Header />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
