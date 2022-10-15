import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../services/userService";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isShowPassword, setIsShowPassword] = useState("false");
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      let token = localStorage.getItem("token");
      if (token) {
         navigate("/");
      }
   }, []);

   const handleLogin = async () => {
      setIsLoading(true);
      if (!email || !password) {
         toast.error("Please checking your email, password");
         return;
      }

      let res = await loginApi(email, password);
      if (res && res.token) {
         localStorage.setItem("token", res.token);
         navigate("/");
      } else {
         if (res && res.status === 400) {
            toast.error(res.data.error);
         }
      }
      setIsLoading(false);
      console.log("Checking res =", res);
   };
   return (
      <>
         <div className="login-container col-4 my-3">
            <div className="title">Login</div>
            <form>
               <div className="desc">Email or Username(eve.holt@reqres.in)</div>
               <input
                  type="text"
                  className="login-input"
                  placeholder="Email or username"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
               <div className="login-password">
                  <input
                     type={isShowPassword ? "password" : "text"}
                     className="login-input"
                     placeholder="Password"
                     onChange={(e) => setPassword(e.target.value)}
                     value={password}
                  />
                  <i
                     className={
                        isShowPassword
                           ? "fa-solid fa-eye-slash"
                           : "fa-solid fa-eye"
                     }
                     onClick={() => setIsShowPassword(!isShowPassword)}
                  ></i>
               </div>
               <button
                  disabled={email && password ? false : true}
                  className={
                     email && password ? "btn-login active" : "btn-login "
                  }
                  type="button"
                  onClick={() => handleLogin()}
               >
                  {isLoading && <i class="fa-solid fa-sync fa-spin"></i>}
                  &nbsp;Login
               </button>
            </form>
            <div className="btn-back">
               <i className="fa-solid fa-angles-left"></i> Go back
            </div>
         </div>
      </>
   );
};

export default Login;
