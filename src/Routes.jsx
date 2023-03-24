import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import App from "./App";
import Signup from "./pages/Signup/Signup";
import { PROD_BASE_URL } from "./api";
import AuthenticateRoute from "./components/AuthenticateRoute";
import { UserContextProvider } from "./store/UserContext";
import ProductPage from "./pages/ProductPage/ProductPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserContextProvider />}>
          <Route path="/" Component={() => <h1>Hello</h1>} />
          <Route path="/login" Component={Login} />
          <Route path="/sign-up" Component={Signup} />
          <Route path="/products/:product_id" Component={ProductPage} />
          <Route element={<AuthenticateRoute />}>
            <Route path="/todos" Component={App} />
            <Route path="/blogs" Component={App} />
            <Route path="/completed-tasks" Component={App} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
