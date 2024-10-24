import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [setup, setSetup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null); // Store user data
  const navigate = useNavigate();

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (!storedUser) {
      // If no user is found, redirect to login
      navigate("/login");
    } else {
      setUser(storedUser); // Set user data to state
    }

    // Fetch joke data from JokeAPI
    const getJoke = async () => {
      try {
        const res = await axios.get("https://v2.jokeapi.dev/joke/Any");
        setSetup(res.data.setup || "Here's a joke");
        setDelivery(res.data.delivery || "But no punchline?");
      } catch (error) {
        console.error("Failed to fetch joke:", error);
      }
    };

    getJoke();
  }, [navigate]);

  // Logout function: Clear user data and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  // Navigate to edit page
  const handleEdit = () => {
    navigate("/edit");
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-white bg-opacity-30 p-10 rounded-lg shadow-2xl">
      <h1 className="p-2 bg-purple-400 bg-opacity-50 rounded-md m-2 text-xl font-bold">
       User Details
      </h1>

      {/* Display user details */}
      <div className="flex flex-col items-r mt-4 gap-2">
      <p className="font-semibold">Name: {user?.name}</p>
        <p className="font-semibold">Email: {user?.email}</p>
        <p className="font-semibold">Phone: {user?.phone}</p>

      </div>

      {/* Edit and Logout buttons */}
      <div className="flex gap-4 mt-4 w-full">
        <button
          onClick={handleEdit}
          className="w-1/2 p-2 rounded-md mb-2 font-semibold hover:bg-purple-300 border border-black"
        >
          Edit
        </button>
        <button
          onClick={handleLogout}
          className="w-1/2 p-2 rounded-md mb-2 font-semibold hover:bg-purple-300 border border-black"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
