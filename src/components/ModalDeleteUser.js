import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/userService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
   const {
      handleClose,
      isShow,
      dataUserDelete,
      handleDeleteFromUserFromModal,
   } = props;
   const handleClickDeleteConfirm = async () => {
      let res = await deleteUser(dataUserDelete.id);
      if (res && res.statusCode === 204) {
         toast.success("Delete user is succeed");
         handleDeleteFromUserFromModal(dataUserDelete);
         handleClose();
      } else {
         toast.error("Error delete user");
      }
   };
   // console.log("dataUserDelete = ", dataUserDelete);
   return (
      <>
         <Modal
            centered
            show={isShow}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
         >
            <Modal.Header closeButton>
               <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="modal-add-user">
                  Do you want to Delete this user?
                  <br />
                  <b>email = {dataUserDelete.email}</b>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button
                  variant="primary"
                  onClick={() => handleClickDeleteConfirm()}
               >
                  Delete Corfirm
               </Button>
            </Modal.Footer>
         </Modal>
         ;
      </>
   );
};

export default ModalDeleteUser;
