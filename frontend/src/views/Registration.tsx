import { useContext, useState } from "react";
import { RoleContext } from "../contexts/RoleContextProvider";
import axios from "axios";

const Registration = () => {
  const roleContext = useContext(RoleContext);

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
      const response = await axios.post(
        "http://localhost:3000/register/",
        form
      );
      console.log(response.data);
      // Handle successful registration here
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="block w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="block w-full p-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
