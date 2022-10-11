import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import Container from "react-bootstrap/Container";
import Toastify from "./components/Toastify";

function App() {

   return (
      <>
         <div className="app-container">
            <Header />
            <Container>
               
            </Container>
            <TableUser />

         </div>
         <Toastify />
      </>
   );
}

export default App;
