import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import Container from "react-bootstrap/Container";
import Toastify from "./components/Toastify";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
   return (
      <>
         <div className="app-container">
            <Header />
            <Container>
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/users" element={<TableUser />} />
                  <Route path="/login" element={<Login />} />
               </Routes>
            </Container>
            {/* <TableUser /> */}
         </div>
         <Toastify />
      </>
   );
}

export default App;
