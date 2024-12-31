import { useContext, useState } from "react";
import { RoleContext } from "../contexts/RoleContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import logo from "../assets/images/logo.png";

const Registration = () => {
  const roleContext = useContext(RoleContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    role: roleContext?.role,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Perform validation and submit form

    try {
      const response = await axios.post("http://localhost:3000/register", form);
      console.log("user reg data ", response.data);
      // localStorage.setItem("role", JSON.stringify(response.data.user.role));
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("regToken", JSON.stringify(response.data.token));
      console.log("reg token from user reg ", response.data.token);
      console.log("Registration successful");

      switch (response.data.user.role) {
        case "mother":
          navigate("/mother/registration");
          break;
        case "phm":
          navigate("/phmdashboard");
          break;
        case "moh":
          navigate("/mohregistration");
          break;
        default:
          navigate("/dashboard");
      }

      // Handle successful registration here
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <img
          src={logo}
          alt=""
          className="lg:size-1/12 md:size-1/12 ss:size-1/6 sm:size-1/6 size-1/6"
        />
        <header className="text-blue_primary lg:text-4xl ss:text-4xl text-2xl lg:mb-8 mb-6">
          Registration <span className="text-pink_primary">Form</span>
        </header>
        <div className="w-5/12 flex flex-col items-center lg:mb-9 mb-4">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="w-5/12 flex flex-col items-center lg:mb-9 mb-4">
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="w-5/12 flex flex-col items-center lg:mb-9 mb-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        </div>
        
        <div className="w-5/12 flex flex-col items-center lg:mb-9 mb-4">
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        </div>

      
        <button
          type="submit"
          className="block w-5/12 p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Registration;
