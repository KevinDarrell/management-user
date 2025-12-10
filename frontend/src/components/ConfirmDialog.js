'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, isDanger = false }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"
            style={{ zIndex: 1050, backdropFilter: 'blur(4px)' }}
            onClick={onCancel}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="position-fixed top-50 start-50 translate-middle bg-white rounded-4 shadow-lg overflow-hidden"
            style={{ zIndex: 1055, width: '90%', maxWidth: '400px' }}
          >
            <div className="p-4 text-center">
            
              <div className={`mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center ${isDanger ? 'bg-danger bg-opacity-10 text-danger' : 'bg-primary bg-opacity-10 text-primary'}`} 
                   style={{ width: '64px', height: '64px' }}>
                <i className={`bi ${isDanger ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'} fs-3`}></i>
              </div>

            
              <h5 className="fw-bold text-dark mb-2">{title}</h5>
              <p className="text-secondary mb-4 small px-3">{message}</p>

              
              <div className="d-flex gap-2 justify-content-center">
                <button 
                  onClick={onCancel} 
                  className="btn btn-light border flex-grow-1"
                >
                  Cancel
                </button>
                <button 
                  onClick={onConfirm} 
                  className={`btn flex-grow-1 text-white ${isDanger ? 'btn-danger' : 'btn-primary'}`}
                >
                  {isDanger ? 'Yes, I\'m sure' : 'Confirm'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}