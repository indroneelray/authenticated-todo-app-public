import React, { useContext } from "react";
import { useNavigate } from "react-router";
import Wrapper from "../../components/Wrapper";
import { UserContext } from "../../store/UserContext";

const BASE_URL = "http://localhost:5500";
const PROD_BASE_URL = "https://cyx9e2ptzg.execute-api.ap-south-1.amazonaws.com";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [userDetails, setUserDetails] = useContext(UserContext);

  console.log(userDetails, setUserDetails);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${PROD_BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include",
      });

      const resjson = await res.json();
      console.log(resjson);
      if (res.status !== 200) throw resjson;
      else {
        console.log("should navigate");
        setUserDetails({ ...resjson });
        // navigate("/todos");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onSubmit}
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Ray Enterprises. All rights reserved.
      </p>

      <p>
        <b>Email:&nbsp;{!userDetails?.email ? 'No email set yet' : userDetails.email}</b>
      </p>
    </div>
  );
}
