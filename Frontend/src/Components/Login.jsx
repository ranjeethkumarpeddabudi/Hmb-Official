import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const loginUser = async () => {
    try {
      const res = await fetch("https://hmb-official.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const data = await res.json();
        setUser({
          email: "",
          password: "",
        });
        Cookies.set("jwt", data.jwt, { expires: 1 });
        navigate("/", { replace: true });
        toast.success("Login Successful");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <form
        className="flex flex-col px-5 md:px-10 py-20 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <img src="hmb-logo.png" alt="" className="h-14 w-14 mx-auto" />
        <label htmlFor="email" className="mt-3">
          Email
        </label>
        <input
          type="email"
          placeholder="abc@email.com"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="border-slate-400 border-2 w-[300px] outline-none rounded-md px-2 py-1 mt-2"
        />
        <label htmlFor="password" className="mt-5">
          Password
        </label>
        <div className="flex items-center space-x-2">
          <input
            type={!show ? "password" : "text"}
            placeholder="Enter Your Password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="border-slate-400 border-2 w-[300px] outline-none rounded-md px-2 py-1 mt-2"
          />
          <button onClick={() => setShow(!show)} type="button">
            {show ? <IoEye size={30} /> : <IoEyeOff size={30} />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-violet-600 w-20 h-10 mx-auto mt-10 rounded-md text-slate-200"
        >
          Login
        </button>
        <Link className="mt-5 text-center underline" to="/sign-up">
          Create an Account
        </Link>
      </form>
    </div>
  );
};

export default Login;
