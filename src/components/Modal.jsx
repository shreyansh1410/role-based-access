import React from "react";
import { Dialog } from "@headlessui/react"; // Headless UI Dialog component for modal

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-lg mx-auto">
          {/* Modal Header */}
          <Dialog.Title className="text-xl font-semibold">
            Manage User or Role
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-500">
            Use this modal to add or edit users and roles.
          </Dialog.Description>

          {/* Modal Body (Dynamic Content) */}
          <div className="mt-4">{children}</div>

          {/* Modal Footer */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
