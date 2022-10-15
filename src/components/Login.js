import { useState } from "react";

import "./Login.scss";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isShowPassword, setIsShowPassword] = useState("false");
   return (
      <>
         <div className="login-container col-4 my-3">
            <div className="title">Login</div>
            <form>
               <div className="desc">Email or Username</div>
               <input
                  type="text"
                  className="login-input"
                  placeholder="Email or username"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
               <div className="login-password">
                  <input
                     type={ isShowPassword ? "password" : "text"}
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
                  type=""
               >
                  Login
               </button>
            </form>
            <div className="btn-back">
               <i class="fa-solid fa-angles-left"></i> Go back
            </div>
         </div>
      </>
   );
};

export default Login;
