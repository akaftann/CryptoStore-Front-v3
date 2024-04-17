import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { close, logo, menu } from "../../assets";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const {isUserLogged, isUserActivate, isUserVerified, isFirst2FApassed, handleLogOut} = useContext(AuthContext)
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  console.log('navbar isloged:', isUserLogged)
  const updatedNavLinks = !isUserLogged
    ? [{ id: "sign-in", title: "Sign-in"}, { id: "sign-up", title: "Sign-up"}]
    : [{ id: "demo", title: "Home" }, { id: "profile", title: "Profile" }, { id: "log-out", title: "Log-out" }];

  const handleNavItemClick = (nav) => {
    setActive(nav.title);
    if (nav.title === "Log-out") {
      handleLogOut()
    }
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {updatedNavLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === updatedNavLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => handleNavItemClick(nav)}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {updatedNavLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === updatedNavLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => handleNavItemClick(nav)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
