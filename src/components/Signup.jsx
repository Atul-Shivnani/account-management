import { useState } from "react";
import { signupSchema } from "../schemas";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        name: formattedErrors.name?._errors[0],
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
    } else {
      setErrors({});
      localStorage.setItem("userData", JSON.stringify(formData));
      console.log("Data saved to localStorage:", formData);
      // Redirect to the Home page after successful signup
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col items-center gap-4 bg-white bg-opacity-30 p-10 rounded-lg shadow-2xl">
      <h1 className="text-xl font-bold p-2 bg-purple-400 bg-opacity-50 rounded-md m-2">
        Sign-up
      </h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          className="p-2 rounded-md border border-gray-300"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

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
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="p-2 rounded-md mb-2 font-semibold hover:bg-purple-300 border border-black"
      >
        Sign-up
      </button>
      <i
            className="hover:text-purple-900 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Already have an account?
          </i>
    </form>
  );
};

export default Signup;
