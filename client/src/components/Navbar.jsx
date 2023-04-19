import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user, setShowModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = `transition-all left-0 mx-auto right-0 duration-200 bg-gray-800 flex py-4 items-center justify-between py-3 ${
    isScrolled
      ? "fixed top-0 w-full shadow-lg rounded-none px-28"
      : "absolute w-[90%] top-10 rounded-[100px] px-14"
  }`;

  const newCharityButtonClass = `mr-4 inline-block text-sm  hover:bg-green-600 text-gray-900 uppercase px-4 py-2 rounded hover:shadow-lg mr-2 ease-linear transition-all duration-150 ${
    isScrolled ? "bg-green-500" : "text-green-500 border border-green-500"
  }`;

  return (
    <nav className={navbarClass}>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/" className="font-semibold text-2xl tracking-tight">
          Attendance Management
        </a>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-base lg:flex-grow">
          <Link
            to="history"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
          >
            History
          </Link>
        </div>
        {setShowModal !== null ? (
          <div>
            <button
              // onClick={() => setShowModal(true)}
              className={newCharityButtonClass}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Do Something Here
            </button>
            {/* <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
            type="button"
          >
            <FontAwesomeIcon icon={faHeart} className="mr-2" />
            Fight For a Cause
          </button> */}
          </div>
        ) : null}
        <div>
          {/* user profile */}
          {/* <a
            href="/profile"
            className="inline-block text-base px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
          >
            Profile
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
