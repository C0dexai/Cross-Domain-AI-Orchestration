import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';
  const contentClasses = isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0';

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${overlayClasses}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div
        className={`relative bg-slate-800 text-slate-200 p-6 md:p-8 rounded-xl shadow-2xl w-11/12 max-w-md transform text-center border border-slate-700 transition-all duration-300 ease-in-out ${contentClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {children}
      </div>
    </div>
  );
};
