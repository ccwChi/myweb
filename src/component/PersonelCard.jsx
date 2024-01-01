import {  DarkThemeToggle } from "flowbite-react";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const PersonelCard = () => {
  return (
    <div className="max-w-sm mt-5">
    <div className="flex flex-col items-center pb-10 relative">
      <DarkThemeToggle className=" absolute right-12 -top-4 m-0 p-1 rounded-full" />
      <img
        alt="Bonnie image"
        height="96"
        src="/src/assets/image/cala.png"
        width="96"
        className="mb-3 border rounded-full shadow-lg"
      />
      <h5 className="mb-1 text-md font-bold text-gray-900 dark:text-white">
        可拉可拉
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        p19901209@gmail.com
      </span>
      <div className="mt-4 flex space-x-3 lg:mt-6">
        <FaGithub />
        <MdEmail />
      </div>
    </div>
  </div>
  );
}

export default PersonelCard;
