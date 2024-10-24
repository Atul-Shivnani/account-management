import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setFormData(storedUser); // Pre-fill the form with user data
    } else {
      navigate("/login"); // If no user data, redirect to login
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission: Update the user data in localStorage
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Details updated successfully!");
    navigate("/"); // Redirect back to Home
  };

  // Redirect to Home on cancel
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 bg-white bg-opacity-30 p-10 rounded-lg shadow-2xl"
    >
      <h1 className="text-xl font-bold p-2 bg-purple-400 bg-opacity-50 rounded-md m-2">
        Edit Profile
      </h1>

      {/* Name Field */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="p-2 rounded-md border border-gray-300 w-full"
          required
        />
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="p-2 rounded-md border border-gray-300 w-full"
          required
        />
      </div>

      {/* Phone Field */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="phone" className="font-semibold">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="p-2 rounded-md border border-gray-300 w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4 w-full">
        <button
          type="submit"
          className="w-1/2 p-2 rounded-md mb-2 font-semibold hover:bg-purple-300 border border-black"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-1/2 p-2 rounded-md mb-2 font-semibold hover:bg-purple-300 border border-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Edit;
