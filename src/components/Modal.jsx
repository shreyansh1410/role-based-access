import React from "react";
import { Dialog } from "@headlessui/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Assuming this is where your ThemeContext is defined

const Modal = ({
  isOpen,
  closeModal,
  children,
  title = "Manage User or Role",
  description = "Use this modal to add or edit users and roles.",
}) => {
  const { isDarkMode } = useContext(ThemeContext); // Access dark mode state

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={`w-full max-w-md rounded-lg p-6 shadow-xl ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <Dialog.Title
            className={`text-lg font-medium leading-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className={`mt-2 text-sm ${
              isDarkMode ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {description}
          </Dialog.Description>
          <div className={`mt-4 `}>{children}</div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeModal}
              className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                  : "bg-blue-100 text-blue-900 hover:bg-blue-200 focus:ring-blue-500"
              }`}
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
