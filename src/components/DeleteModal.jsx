import React from "react";
import { Dialog } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { Icon } from "@iconify/react";
import {
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { deleteAtomState } from "../atoms/deleteAtom";
import { toast } from "react-toastify";
import { firestoreDb } from "../../firebase";

function DeleteModal({id}) {
  const [isOpen, setIsOpen] = useRecoilState(deleteAtomState);
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try{
        await deleteDoc(doc(firestoreDb, "widgets", id));
        setIsOpen(false);
        navigate('/dashboard', { replace: true });
        toast.info("Success Delete Snippet")
    } catch(err){
        console.error(err);
    }
  };

  const cancelHandler = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={cancelHandler} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4 shadow-xl w-[650px]">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-semibold flex items-center gap-2">
              <div className="p-1 rounded-full bg-red-100 text-red-600">
                <Icon icon="clarity:warning-line" width="24" />
              </div>
              <p>Delete Confirmation</p>
            </Dialog.Title>
            <Icon
              icon="octicon:x-16"
              className="cursor-pointer"
              onClick={cancelHandler}
            />
          </div>
          <div className="mt-2 mb-5">
            <p className="text-gray-800">
              Are you sure to delete this widgets?
            </p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={cancelHandler} 
              className="bg-gray-100 text-gray-800 border-[1px] border-gray-600 outline-none py-1 px-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={deleteHandler}
              className="bg-red-600 font-medium hover:bg-red-700 text-white py-1 px-2 rounded"
            >
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default DeleteModal;
