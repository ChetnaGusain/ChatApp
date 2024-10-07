import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setloading] = useState(false);
  const handleLogout = async () => {
    setloading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setloading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in logout", error);
      toast.error("Error in logging out")
    }
  };
  return (
    <div className="h-[10vh] bg-slate-800">
      <BiLogOutCircle
        className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
        onClick={handleLogout}
      />
    </div>
  );
}

export default Logout;
