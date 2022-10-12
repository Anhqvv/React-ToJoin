import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../services/userService";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
   const { handleClose, isShow, dataUserEdit, handleEditUserFromModal } = props;
   const [name, setName] = useState("");
   const [job, setJob] = useState("");

   useEffect(() => {
      if (isShow) {
         setName(dataUserEdit.first_name);
      }
   }, [dataUserEdit]);

   const handleEditUser = async () => {
      let res = await putUpdateUser(name, job);
      if (res && res.updatedAt) {
         handleEditUserFromModal({
            first_name: name,
            id: dataUserEdit.id,
         });
      }
      handleClose()
      toast.success('Updating is succeed!')
      console.log('handleEditUser get res = ',res)
   };

   return (
      <>
         <Modal centered show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="modal-add-user">
                  <form>
                     <div className="mb-3">
                        <label className="form-label">Name : </label>
                        <input
                           type="text"
                           className="form-control"
                           placeholder="Enter your name..."
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>
                     <div className="mb-3">
                        <label className="form-label">Job : </label>
                        <input
                           type="text"
                           className="form-control"
                           placeholder="Enter your job..."
                           value={job}
                           onChange={(e) => setJob(e.target.value)}
                        />
                     </div>
                  </form>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={() => handleEditUser()}>
                  Confirm
               </Button>
            </Modal.Footer>
         </Modal>
         ;
      </>
   );
};

export default ModalEditUser;
