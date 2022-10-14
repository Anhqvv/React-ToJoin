import _ from "lodash";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import "./TableUser.scss";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Papa from "papaparse";

const TableUser = () => {
   const [listUsers, setListUsers] = useState([]);
   const [totalUsers, setTotalUsers] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [totalPerPages, setTotalPerPages] = useState(0);
   const [page, setPage] = useState(0);

   const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);
   const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
   const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
   const [dataUserEdit, setDataUserEdit] = useState({});
   const [dataUserDelete, setDataUserDelete] = useState({});
   //  console.log('isShowModalAddUser: ',isShowModalAddUser)

   const [sortBy, setSortBy] = useState("asc");
   const [sortField, setSortField] = useState("id");

   //csv
   const [dataExport, setDataExport] = useState([]);

   const handleCloseToProps = () => {
      setIsShowModalAddUser(false);
      setIsShowModalEditUser(false);
      setIsShowModalDeleteUser(false);
   };

   useEffect(() => {
      //call api
      getUser(page);
   }, [0]);

   // console.log("current page", page);
   const getUser = async (page1) => {
      let res = await fetchAllUser(page1);
      if (res && res.data) {
         setListUsers(res.data);
         setTotalUsers(res.total);
         setTotalPages(res.total_pages);
         setTotalPerPages(res.per_pages);
         setPage(res.page);
      }
   };

   const handlePageClick = (event) => {
      // console.log(event)
      getUser(event.selected + 1);
   };
   // console.log("lis getUser: ", listUsers);
   const handleUpdateTable = (user) => {
      setListUsers([user, ...listUsers]);
   };

   //Edit
   const handleClickEditUser = (user) => {
      setIsShowModalEditUser(true);
      setDataUserEdit(user);
      // console.log(">>> Checking user: ", user);
   };

   const handleEditUserFromModal = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers);
      let index = listUsers.findIndex((item) => item.id === user.id);
      cloneListUsers[index].first_name = user.first_name;
      setListUsers(cloneListUsers);
      console.log(">>>", listUsers, cloneListUsers);
      // console.log("index = ", index);
      // console.log('user',user)
   };
   //Delete user
   const handleClickDeleteUser = (user) => {
      setIsShowModalDeleteUser(true);
      console.log("data user: ", user);
      setDataUserDelete(user);
   };
   const handleDeleteFromUserFromModal = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = listUsers.filter((item) => item.id !== user.id);
      setListUsers(cloneListUsers);
   };
   //Sort
   const handleSort = (sortBy, sortField) => {
      setSortBy(sortBy);
      setSortField(sortField);
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = _.orderBy(cloneListUsers, sortField, sortBy);
      setListUsers(cloneListUsers);
   };
   const handleSearch = _.debounce((e) => {
      let keyWord = e.target.value;
      if (keyWord) {
         // console.log("call Api event");
         let cloneListUsers = _.cloneDeep(listUsers);
         cloneListUsers = cloneListUsers.filter((item) =>
            item.email.includes(keyWord)
         );
         setListUsers(cloneListUsers);
      } else {
         getUser(1);
      }
   }, 500);

   // const csvData = [
   //    ["firstname", "lastname", "email"],
   //    ["Ahmed", "Tomi", "ah@smthing.co.com"],
   //    ["Raed", "Labes", "rl@smthing.co.com"],
   //    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
   // ];
   const handleDataExport = (event, done) => {
      let data = [];

      if (listUsers && listUsers.length > 0) {
         data.push(["Id", "Email", "First Name", "Last Name"]);
         listUsers.map((user) => {
            let arr = [];
            arr[0] = user.id;
            arr[1] = user.email;
            arr[2] = user.first_name;
            arr[3] = user.last_name;
            data.push(arr);
         });

         setDataExport(data);
         done();
      }
   };
   const handleImportCSV = (e) => {
      if (e.target && e.target.files[0]) {
         let file = e.target.files[0];
         console.log("Checking file: ", file);
         if (file.type !== "text/csv") {
            toast.error("Your file is not CSV file , please try again");
            return;
         }
         Papa.parse(file, {
            complete: function (results) {
               let dataCSV = results.data;
               if (dataCSV.length > 1) {
                  if (dataCSV[0] && dataCSV[0].length === 4) {
                     if (
                        dataCSV[0][1] !== "email" ||
                        dataCSV[0][2] !== "firstName" ||
                        dataCSV[0][3] !== "lastName"
                     ) {
                        toast.error(
                           "Wrong header format, We need format like this: id,email,fisrtName,lastName"
                        );
                        return;
                     } else {
                        let result = [];
                        dataCSV.forEach((item, index) => {
                           if (index > 0 && item.length === 4) {
                              let obj = {};
                              obj.email = item[1];
                              obj.first_name = item[2];
                              obj.last_name = item[3];
                              result.push(obj);
                           }
                        });
                        setListUsers(result);
                        toast.success("Your CSV file is imported");
                     }
                  }
               }
            },
         });
      }
   };

   return (
      <>
         <Container>
            <div className="my-3 list-users">
               <h3>List Users</h3>
               <div className="group-btns">
                  <label className="btn btn-success" htmlFor="import-btn">
                     <i className="fa-sharp fa-solid fa-file-import"></i> Import
                  </label>
                  <input
                     type="file"
                     id="import-btn"
                     hidden
                     onChange={(e) => handleImportCSV(e)}
                  />

                  <CSVLink
                     data={dataExport}
                     filename={"my-user.csv"}
                     className="btn btn-secondary"
                     asyncOnClick={true}
                     onClick={(event, done) => handleDataExport(event, done)}
                  >
                     <i className="fa-solid fa-file-arrow-down"></i> Export
                  </CSVLink>
                  <button
                     className="btn btn-primary"
                     type=""
                     onClick={() => setIsShowModalAddUser(true)}
                  >
                     <i className="fa-solid fa-plus"></i> Add New
                  </button>
               </div>
            </div>
            <div className="col-4 my-3">
               <input
                  className="form-control"
                  placeholder="Search user by email..."
                  autoFocus
                  onChange={(e) => handleSearch(e)}
               />
            </div>
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th>
                        <div className="header-sort">
                           <span>ID</span>
                           <span className="icon-sort">
                              <i
                                 className="fa-solid fa-arrow-down"
                                 onClick={() => handleSort("desc", "id")}
                              ></i>
                              <i
                                 className="fa-solid fa-arrow-up"
                                 onClick={() => handleSort("asc", "id")}
                              ></i>
                           </span>
                        </div>
                     </th>
                     <th>Email</th>
                     <th>
                        <div className="header-sort">
                           <span>First Name</span>
                           <span className="icon-sort">
                              <span className="icon-sort">
                                 <i
                                    className="fa-solid fa-arrow-down"
                                    onClick={() =>
                                       handleSort("desc", "first_name")
                                    }
                                 ></i>
                                 <i
                                    className="fa-solid fa-arrow-up"
                                    onClick={() =>
                                       handleSort("asc", "first_name")
                                    }
                                 ></i>
                              </span>
                           </span>
                        </div>
                     </th>
                     <th>Last Name</th>
                     <th>Actions</th>
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
                              <td>
                                 <button
                                    className="btn btn-warning"
                                    type=""
                                    onClick={() => handleClickEditUser(item)}
                                 >
                                    Edit
                                 </button>
                                 <button
                                    className="btn btn-danger mx-3"
                                    type=""
                                    onClick={() => handleClickDeleteUser(item)}
                                 >
                                    Delete
                                 </button>
                              </td>
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
         <ModalAddUser
            isShow={isShowModalAddUser}
            handleClose={handleCloseToProps}
            handleUpdateTable={handleUpdateTable}
         />
         <ModalEditUser
            isShow={isShowModalEditUser}
            handleClose={handleCloseToProps}
            dataUserEdit={dataUserEdit}
            handleEditUserFromModal={handleEditUserFromModal}
         />
         <ModalDeleteUser
            isShow={isShowModalDeleteUser}
            handleClose={handleCloseToProps}
            dataUserDelete={dataUserDelete}
            handleDeleteFromUserFromModal={handleDeleteFromUserFromModal}
         />
      </>
   );
};

export default TableUser;
