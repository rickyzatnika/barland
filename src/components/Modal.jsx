import { useEffect } from 'react';

const Modal = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="w-full px-4 h-[100vh] fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 ">
      <div className="bg-white shadow-md w-full h-full overflow-y-auto sm:w-4/5 px-4 pb-8 pt-6 rounded-lg">
        <button onClick={onClose} className="absolute top-2  text-white right-2 text-4xl">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;