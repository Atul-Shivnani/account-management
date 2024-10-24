import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate the form using Zod
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      // Extract and display validation errors
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      return;
    }

    // Check if the user exists in localStorage
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      // Successful login: Redirect to Home
      setErrors({});
      console.log("Login successful!");
      navigate("/");
    } else {
      setErrors({ general: "Invalid email or password." });
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center gap-4 bg-white bg-opacity-30 p-10 rounded-lg shadow-2xl"
    >
      <h1 className="text-xl font-bold p-2 bg-purple-400 bg-opacity-50 rounded-md m-2">
        Login
      </h1>

      {/* Email Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@mail.com"
          className="p-2 rounded-md border border-gray-300"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
          className="p-2 rounded-md border border-gray-300"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* General Error Message */}
      {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

      {/* Login Button */}
      <button
        type="submit"
        className="p-2 rounded-md mb-2 font-semibold hover:bg-purple-300 border border-black"
      >
        Login
      </button>
      <i
            className="hover:text-purple-900 cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Don't have an account?
          </i>
    </form>
  );
};

export default Login;
