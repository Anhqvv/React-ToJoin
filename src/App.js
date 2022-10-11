import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import Container from "react-bootstrap/Container";
import ModalAddUser from "./components/ModalAddUser";
import { useState } from "react";

function App() {
   const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);
  //  console.log('isShowModalAddUser: ',isShowModalAddUser)
   const handleCloseToProps = () => {
      setIsShowModalAddUser(!isShowModalAddUser);
   };
   return (
      <div className="app-container">
         <Header />
         <Container>
            <div className="my-3 list-users">
               <h3>List Users</h3>
               <button
                  className="btn btn-primary"
                  type=""
                  onClick={() => setIsShowModalAddUser(true)}
               >
                  Add New User
               </button>
            </div>
         </Container>
         <TableUser />
         <ModalAddUser isShow={isShowModalAddUser} handleClose={handleCloseToProps} />
      </div>
   );
}

export default App;
