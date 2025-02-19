import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const validate = () => {
    const { firstName, lastName, email, password, address, phoneNumber } = user;
    if (firstName.length < 5 || firstName.length > 20)
      return toast.error(
        "First Name is required and should be between 5 to 20 characters"
      );
    if (lastName.length < 5 || lastName.length > 20)
      return toast.error(
        "Last Name is required and should be between 5 to 20 characters"
      );
    if (!email.trim()) return toast.error("Email is required");
    if (password.length < 8 || password.length > 20)
      return toast.error(
        "Password is required and should be between 8 to 20 characters"
      );

    if (address.length < 5 || address.length > 50)
      return toast.error(
        "Address is required and should be between 5 to 50 characters"
      );
    if (phoneNumber.length < 10 || phoneNumber.length > 11)
      return toast.error(
        "phone number is required and should be between 10 to 11 characters"
      );
    return true;
  };

  const SignUpUser = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    try {
      const res = await fetch("https://hmb-official.onrender.com/api/sign-up", options);
      if (res.ok == true) {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          address: "",
          phoneNumber: "",
        });
        navigate("/login");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = validate();
    if (check === true) {
      SignUpUser();
    }
  };
  return (
    <div className="flex h-full items-center justify-center py-2 m-auto ">
      <form
        className="flex flex-col px-10 md:px-36 py-20 shadow-2xl bg-[url('bg.jpg')]"
        onSubmit={handleSubmit}
      >
        <img src="hmb-logo.png" alt="" className="h-14 w-14 mx-auto" />
        <p className="mt-3 text-2xl">Create an account</p>
        <label htmlFor="firstName" className="mt-3">
          FirstName
        </label>
        <input
          type="text"
          placeholder="Enter Your First Name"
          id="firstName"
          name="firstName"
          value={user.firstName}
          autoFocus
          onChange={handleChange}
          className="border-slate-400 border-2 w-[250px] md:w-[350px] outline-none rounded-md px-4 py-2 mt-2"
        />
        <label htmlFor="lastName" className="mt-3">
          LastName
        </label>
        <input
          type="text"
          placeholder="Enter Your Last Name"
          id="lastName"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          className="border-slate-400 border-2 w-[250px] md:w-[350px] outline-none rounded-md px-4 py-2 mt-2"
        />
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
          className="border-slate-400 border-2 w-[250px] md:w-[350px] outline-none rounded-md px-4 py-2 mt-2"
        />
        <label htmlFor="password" className="mt-5">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter Your Password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="border-slate-400 border-2 w-[250px] md:w-[350px] outline-none rounded-md px-4 py-2 mt-2"
        />
        <label htmlFor="address" className="mt-3">
          Address
        </label>
        <textarea
          placeholder="Address"
          id="address"
          name="address"
          value={user.address}
          onChange={handleChange}
          className="border-slate-400 border-2 w-[250px] md:w-[350px] outline-none rounded-md px-4 py-2 mt-2"
        />
        <label htmlFor="phoneNumber" className="mt-3">
          Mobile.No
        </label>
        <input
          type="phone"
          placeholder="+91"
          id="phoneNumber"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          className="border-slate-400 border-2 w-[250px] md:w-[350px] outline-none rounded-md px-4 py-2 mt-2"
        />

        <button className="bg-violet-600 w-20 h-10 mx-auto mt-10 rounded-md text-slate-200">
          Register
        </button>
        <Link className="mt-5 text-center underline" to="/login">
          Already have an account? Click Here
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
