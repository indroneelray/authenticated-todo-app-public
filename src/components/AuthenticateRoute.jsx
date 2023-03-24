import React from "react";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL, PROD_BASE_URL } from "../api";

export default function AuthenticateRoute(props) {
  const navigate = useNavigate();
  const authenticateUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/authenticate`, {
        credentials: "include",
      });
      if (res.status !== 200) {
        // console.log("SHUBHAM DEKH NAVIGATE HOGA");
        navigate("/login");
      }
    } catch (err) {}
  };

  React.useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <div className="fixed top-0 w-fulll text-center text-2xl text-green-400">
      Welcome!

      <Outlet />
    </div>
  );
}
