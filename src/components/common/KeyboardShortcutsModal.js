import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function KeyboardShortcutsModal({ showShortcuts, onClose }) {
  return (
    <AnimatePresence>
      {showShortcuts && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="glass-card w-full max-w-lg mx-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Keyboard Shortcuts</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white">Show Shortcuts</span>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white">⌘K</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Close Modal</span>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white">Esc</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Add New Expense</span>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white">⌘N</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Export Data</span>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white">⌘E</kbd>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 btn bg-gray-600 hover:bg-gray-700 text-white w-full"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default KeyboardShortcutsModal; 