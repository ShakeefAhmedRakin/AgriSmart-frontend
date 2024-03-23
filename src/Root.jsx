import { FaSeedling } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import "./Root.css";
import { toast } from "sonner";
import useAuth from "./hooks/useAuth";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GiPlantRoots } from "react-icons/gi";
import { PiPlant } from "react-icons/pi";
import { GiPlantSeed } from "react-icons/gi";
import { GoTools } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { MdOutlineForum } from "react-icons/md";

const Root = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("User Logged Out");
      })
      .catch((error) => console.log(error));
  };

  const closeSidebar = () => {
    const closeBtn = document.getElementById("my-drawer-2");
    if (closeBtn) {
      closeBtn.checked = false;
    }
  };

  const location = useLocation();

  return (
    <>
      <>
        <div className="drawer md:drawer-open h-full">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content overflow-x-auto">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-md text-lg bg-secondary border-none text-white hover:bg-secondary drawer-button md:hidden mb-3 fixed left-2 top-2 rounded-xl z-50"
            >
              <span className="text-xs">Menu</span>
              <TbLayoutSidebarLeftExpandFilled />
            </label>
            <div className="p-2 md:p-4 md:h-full ml-0 md:ml-[285px]">
              <hr className="mt-[54px] block md:hidden" />
              <Outlet />
            </div>
          </div>
          <div className="drawer-side h-full z-50">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu h-full p-4 w-72 bg-base-200 text-base-content fixed">
              {/* Sidebar content here */}
              <div className="flex justify-between items-center gap-2">
                <div className="text-secondary flex items-center gap-4">
                  <FaSeedling className="text-3xl text-primary"></FaSeedling>
                  <h1 className="font-heading text-xl md:text-3xl font-bold">
                    AgriSmart
                  </h1>
                </div>
                <label
                  onClick={closeSidebar}
                  className="btn text-xl bg-secondary text-white hover:bg-secondary drawer-button md:hidden"
                >
                  <TbLayoutSidebarLeftCollapseFilled />
                </label>
              </div>
              <hr className="my-2" />
              <div className="flex flex-col text-lg font-heading font-medium gap-4">
                {user ? (
                  <>
                    <div className="flex flex-col justify-center items-center gap-2 rounded-lg text-white mt-4">
                      <img
                        src={user?.photoURL}
                        className="w-12 aspect-square rounded-full"
                      />
                      <p className="text-secondary font-bold">
                        {user?.displayName}
                      </p>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <hr />
                {/* SHARED ROUTE */}
                <NavLink
                  to={"/agriguide"}
                  onClick={closeSidebar}
                  className={`p-2 w-full border-2 hover:underline rounded-xl flex items-center gap-2 ${
                    location.pathname === "/agriguide" ? "font-bold" : ""
                  }`}
                >
                  <IoBookOutline className="text-primary text-2xl"></IoBookOutline>
                  <li
                    className={`duration-300 flex  ${
                      location.pathname === "/agriguide" ? "text-primary" : ""
                    }`}
                  >
                    AgriGuide
                  </li>
                </NavLink>
                <NavLink
                  to={"/community"}
                  onClick={closeSidebar}
                  className={`p-2 w-full border-2 hover:underline rounded-xl flex items-center gap-2 ${
                    location.pathname === "/community" ? "font-bold" : ""
                  }`}
                >
                  <MdOutlineForum className="text-primary text-2xl"></MdOutlineForum>
                  <li
                    className={`duration-300 flex  ${
                      location.pathname === "/community" ? "text-primary" : ""
                    }`}
                  >
                    Community
                  </li>
                </NavLink>
                <hr />
                <NavLink
                  to={"/"}
                  onClick={closeSidebar}
                  className={`p-2 w-full border-2 hover:underline rounded-xl flex items-center gap-2 ${
                    location.pathname === "/" ? "text-primary font-bold" : ""
                  }`}
                >
                  <MdOutlineSpaceDashboard className="text-primary text-2xl"></MdOutlineSpaceDashboard>
                  <li
                    className={`duration-300 ${
                      location.pathname === "/" ? "text-primary" : ""
                    }`}
                  >
                    Dashboard
                  </li>
                </NavLink>
                <NavLink
                  to={"/soils"}
                  onClick={closeSidebar}
                  className={`p-2 w-full border-2 hover:underline rounded-xl flex items-center gap-2 ${
                    location.pathname === "/soils"
                      ? "text-primary font-bold"
                      : ""
                  } `}
                >
                  <GiPlantRoots className="text-primary text-2xl"></GiPlantRoots>
                  <li
                    className={`duration-300 ${
                      location.pathname === "/soils" ? "text-primary" : ""
                    }`}
                  >
                    Soil Monitoring
                  </li>
                </NavLink>
                <NavLink
                  to={"/crops"}
                  onClick={closeSidebar}
                  className={`p-2 w-full border-2 hover:underline rounded-xl flex items-center gap-2 ${
                    location.pathname === "/crops"
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  <PiPlant className="text-primary text-2xl"></PiPlant>
                  <li
                    className={`duration-300 ${
                      location.pathname === "/crops" ? "text-primary" : ""
                    }`}
                  >
                    Crop Monitoring
                  </li>
                </NavLink>
                <NavLink
                  to={"/seeds"}
                  onClick={closeSidebar}
                  className={`p-2 w-full border-2 hover:underline rounded-xl flex items-center gap-2  ${
                    location.pathname === "/seeds"
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  <GiPlantSeed className="text-primary text-2xl"></GiPlantSeed>
                  <li
                    className={`duration-300 ${
                      location.pathname === "/seeds" ? "text-primary" : ""
                    }`}
                  >
                    Seeds
                  </li>
                </NavLink>
                <NavLink
                  to={"/equipments"}
                  onClick={closeSidebar}
                  className={`p-2 w-full border-2 hover:underline rounded-xl flex items-center gap-2  ${
                    location.pathname === "/equipments"
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  <GoTools className="text-primary text-2xl"></GoTools>
                  <li
                    className={`duration-300 ${
                      location.pathname === "/equipments" ? "text-primary" : ""
                    }`}
                  >
                    Equipments
                  </li>
                </NavLink>
              </div>
              <div className="flex items-end flex-1">
                <button
                  className="btn bg-red-500 text-white hover:bg-red-600 border-none w-full"
                  onClick={() => handleLogOut()}
                >
                  <CiLogout className="text-2xl"></CiLogout>
                  Logout
                </button>
              </div>
            </ul>
          </div>
        </div>
      </>
    </>
  );
};

export default Root;
