// components/DeleteConfirmModal.jsx
import { useState } from 'react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message, type = 'expense' }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UX
    onConfirm();
    setIsDeleting(false);
    onClose();
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'expense': return '🗑️';
      case 'clearAll': return '⚠️';
      default: return '❓';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'expense': return 'bg-red-600 hover:bg-red-700';
      case 'clearAll': return 'bg-red-700 hover:bg-red-800';
      default: return 'bg-red-600 hover:bg-red-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getIcon()}</span>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">{message}</p>
          
          {type === 'clearAll' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm font-medium">
                ⚠️ This action cannot be undone!
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className={`flex-1 px-4 py-2 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${getButtonColor()}`}
          >
            {isDeleting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </div>
            ) : (
              <>
                {type === 'expense' && '🗑️ Delete'}
                {type === 'clearAll' && '⚠️ Clear All'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
