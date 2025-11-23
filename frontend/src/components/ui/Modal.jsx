import React, { useEffect } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md', 
  showCloseButton = true,
  closeOnBackdropClick = true 
}) => {
  // Handle ESC key press and body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl', 
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Modal container with floating effect */}
      <div 
        className={`
          relative
          bg-white dark:bg-slate-800 
          rounded-xl shadow-2xl 
          w-full mx-auto
          ${sizeClasses[size]}
          max-h-[90vh]
          overflow-hidden
          animate-scale-in
          border border-white/10
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Optional close button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-full p-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Scrollable content */}
        <div className="max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;