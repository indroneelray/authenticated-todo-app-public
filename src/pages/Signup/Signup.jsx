import React from "react";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:5500";
const PROD_BASE_URL =
  "https://cyx9e2ptzg.execute-api.ap-south-1.amazonaws.com";

export default function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${PROD_BASE_URL}/users`, {
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
      const resJson = await res.json();
      if(res.status !== 200) throw resJson.error
      return Swal.fire("Congratulations", resJson.message, "success").then(()=>{
        navigate('/login')
      })

    } catch (err) {
      console.log(err);
      return Swal.fire("Error", err, "error");
    }
  };

  return (
    <div className="w-full max-w-xs">
      <h1 className="text-black text-center mb-2 text-3xl font-semibold">
        Sign up
      </h1>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
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
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
