import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiPlus, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CategoryManager = ({ categories, onAddCategory, onRemoveCategory, onUpdateBudget }) => {
  const [newCategory, setNewCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      setIsSubmitting(true);
      try {
        await onAddCategory({
          id: Date.now(),
          name: newCategory.trim(),
          budget: parseFloat(budgetAmount) || 0
        });
        setNewCategory('');
        setBudgetAmount('');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 3);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="glass-card p-6 rounded-2xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-white mb-6 flex items-center gap-2"
      >
        <FiSettings className="w-6 h-6 text-purple-400" />
        Category Management
      </motion.h2>
      <form onSubmit={handleAddCategory} className="space-y-5 mb-6">
        <motion.div variants={itemVariants}>
          <label htmlFor="newCategory" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiPlus className="w-4 h-4" />
            New Category Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            id="newCategory"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <label htmlFor="budgetAmount" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiPlus className="w-4 h-4" />
            Monthly Budget ($)
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            id="budgetAmount"
            type="number"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            placeholder="Monthly Budget"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
          />
        </motion.div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FiPlus className="w-5 h-5" />
              </motion.div>
            ) : (
              <FiPlus className="w-5 h-5" />
            )}
            {isSubmitting ? "Adding..." : "Add Category"}
          </span>
        </motion.button>
      </form>
      <div>
        <h3 className="text-xl font-bold text-white mb-3">Current Categories</h3>
        <div className="space-y-3">
          {categories.length > 0 ? (
            <AnimatePresence>
              {displayedCategories.map(category => (
                <motion.div 
                  key={category.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3"
                >
                  <span className="text-white font-medium w-32 truncate">{category.name}</span>
                  <input
                    type="number"
                    value={category.budget}
                    onChange={(e) => onUpdateBudget(category.id, parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                    className="w-24 px-2 py-1 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 text-sm"
                  />
                  <button
                    onClick={() => onRemoveCategory(category.id)}
                    className="text-red-400 hover:text-red-500 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <p className="text-gray-400 text-center py-4">No categories found. Add your first category!</p>
          )}
          
          {categories.length > 3 && (
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 px-4 mt-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {showAll ? (
                <>
                  <FiChevronUp className="w-5 h-5" />
                  Show Less
                </>
              ) : (
                <>
                  <FiChevronDown className="w-5 h-5" />
                  See More
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryManager; 