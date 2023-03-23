import React from "react";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL, PROD_BASE_URL } from "./api";

export default function AuthenticateRoute(props) {
  const navigate = useNavigate();
  const authenticateUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/authenticate`, {
        credentials: "include",
      });
      if (res.status !== 200) {
        navigate("/login");
      }
    } catch (err) {}
  };

  React.useEffect(() => {
    authenticateUser();
  }, []);

  return props.children ?? <Outlet />;
}
