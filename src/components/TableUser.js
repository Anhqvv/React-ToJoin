import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";

const TableUser = () => {
   const [listUsers, setListUsers] = useState([]);
   const [totalUsers, setTotalUsers] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [totalPerPages, setTotalPerPages] = useState(0);
   const [page, setPage] = useState(0);

   useEffect(() => {
      //call api
      getUser(page);
   }, [0]);

   console.log("current page", page);
   const getUser = async (page1) => {
      let res = await fetchAllUser(page1);
      if (res && res.data) {
         setListUsers(res.data);
         setTotalUsers(res.total);
         setTotalPages(res.total_pages);
         setTotalPerPages(res.per_pages);
         setPage(res.page);
      }
      console.log(">>> Checking getUser res", res.page);
   };

   const handlePageClick = (event) => {
      // console.log(event)
      getUser(event.selected + 1);
   };
   // console.log("lis getUser: ", listUsers);
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
                  {listUsers &&
                     listUsers.length > 0 &&
                     listUsers.map((item, index) => {
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

            <ReactPaginate
               breakLabel="..."
               nextLabel="next >"
               onPageChange={handlePageClick}
               pageRangeDisplayed={totalPerPages}
               pageCount={totalPages}
               previousLabel="< previous"
               renderOnZeroPageCount={null}
               //css
               breakClassName={"page-item"}
               breakLinkClassName={"page-link"}
               containerClassName={"pagination"}
               pageClassName={"page-item"}
               pageLinkClassName={"page-link"}
               previousClassName={"page-item"}
               previousLinkClassName={"page-link"}
               nextClassName={"page-item"}
               nextLinkClassName={"page-link"}
               activeClassName={"active"}
            />
         </Container>
      </>
   );
};

export default TableUser;
