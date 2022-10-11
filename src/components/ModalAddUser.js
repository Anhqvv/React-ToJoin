import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateNewUser } from "../services/userService";
import { toast } from "react-toastify";

const ModalAddUser = (props) => {
   const { handleClose, isShow, handleUpdateTable } = props;
   const [name, setName] = useState("");
   const [job, setJob] = useState("");

   const handleClickSaveState = async () => {
      const res = await postCreateNewUser(name, job);
      console.log('>>>Cheking res: ', res)
      if (res && res.id) {
         handleClose();
         setName("");
         setJob("");
         toast.success("Create user is success!");
         handleUpdateTable({
            id: res.id,
            first_name: name,
         });
      } else {
         toast.error("Error!");
      }
   };
   return (
      <>
         <Modal centered show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Add New User</Modal.Title>
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
               <Button variant="primary" onClick={handleClickSaveState}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
         ;
      </>
   );
};

export default ModalAddUser;
