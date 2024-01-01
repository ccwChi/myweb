import { Link } from "react-router-dom";
import sidebarRoutes from "../../data/sidebarRoutes";

const Index = () => {
  return (
    <div>
      <div
        className="grid grid-cols-2 
        sm:grid-cols-3 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-8 gap-8 mt-4"
      >
        {sidebarRoutes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className="
            relative group flex flex-col items-center justify-center 
            rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 
            cursor-pointer hover:bg-neutral-400/10 
            transition p-3 bg-green-200"
          >
            <div className="p-3">{route.icon && <route.icon size={20} />}</div>
            <div className="p-2">{route.label}</div>
          </Link>
        ))}
        <div
          className="
            relative group flex flex-col items-center justify-center 
            rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 
            cursor-pointer  hover:bg-neutral-400/10 
            transition p-3 border"
        >
          +
        </div>
      </div>
    </div>
  );
};

export default Index;
