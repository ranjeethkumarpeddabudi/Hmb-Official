import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    Cookies.remove("jwt");
    navigate("/login");
    toast.success("Logout Successful");
  };
  return (
    <nav className="h-[10%] px-5 py-3 flex items-center justify-between bg-yellow-50 italic">
      <img src="hmb-logo.png" alt="" className="h-16 w-16" />
      <ul className="flex space-x-10 hidden md:flex">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Guidelines</li>
      </ul>

      <button
        onClick={onLogout}
        className="bg-cyan-600 px-3 py-1 text-white rounded-md"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
