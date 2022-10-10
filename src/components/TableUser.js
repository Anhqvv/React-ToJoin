import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../services/userService";

const TableUser = () => {
   const [listUser, setListUser] = useState([]);

   useEffect(() => {
      //call api
      getUser();
   }, []);

   const getUser = async () => {
      let res = await fetchAllUser();
      if (res && res.data) {
         setListUser(res.data);
      }
   };
   console.log("lis getUser: ", listUser);
   return (
      <>
         <Container>
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Email</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                  </tr>
               </thead>
               <tbody>
                  {listUser &&
                     listUser.length > 0 &&
                     listUser.map((item, index) => {
                        return (
                           <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.email}</td>
                              <td>{item.first_name}</td>
                              <td>{item.last_name}</td>
                           </tr>
                        );
                     })}
               </tbody>
            </Table>
         </Container>
      </>
   );
};

export default TableUser;
