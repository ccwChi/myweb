import React from "react";
import DropDownTodoList from "./DropDownTodoList";
import PomodoroTimer from "./PomodoroTimer";
import { Label } from "flowbite-react";

const Header = React.memo(() => {
  // console.log("header");
  return (
    <div className="Header bg-slate-50 w-full h-[4.5rem] flex justify-between border-b-[1px] border-gray-400 dark:bg-gray-800">
      {/* <DropDownTodoList /> */}
      <Label className=" flex justify-center items-center text-xl font-bold ms-6">
        待辦事項
      </Label>
      <div className="p-2 sm:flex gap-1 rounded-lg items-center hidden ">
        <DropDownTodoList />
        <PomodoroTimer />
      </div>
    </div>
  );
});

Header.displayName = "Header";

export default Header;
// const MemoizedHeader = () => {
//   return useMemo(() => <Header />, []); // 這裡使用 useMemo 包裹 Header
// };

// export default MemoizedHeader;
