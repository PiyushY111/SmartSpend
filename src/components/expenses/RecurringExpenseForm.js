import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRepeat, FiDollarSign, FiTag, FiCalendar, FiPlus, FiTrash2 } from 'react-icons/fi';

const RecurringExpenseForm = ({ categories, onAddRecurringExpense, recurringExpenses, handleRemoveRecurringExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [frequency, setFrequency] = useState('monthly'); // e.g., daily, weekly, monthly, yearly
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllRecurring, setShowAllRecurring] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !category) {
      // Consider using a toast notification instead of alert for better UX
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddRecurringExpense({
        description,
        amount: parseFloat(amount),
        category,
        frequency,
      });
      setDescription('');
      setAmount('');
      setCategory('');
      setFrequency('monthly');
    } finally {
      setIsSubmitting(false);
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
        <FiRepeat className="w-6 h-6 text-green-400" />
        Add Recurring Expense
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div variants={itemVariants}>
          <label htmlFor="description" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiTag className="w-4 h-4" />
            Description
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            id="description"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            placeholder="e.g., Monthly Rent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="amount" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiDollarSign className="w-4 h-4" />
            Amount ($)
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            id="amount"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="category" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiTag className="w-4 h-4" />
            Category
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            id="category"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name} className="text-black">
                {cat.name}
              </option>
            ))}
          </motion.select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="frequency" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiCalendar className="w-4 h-4" />
            Frequency
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            id="frequency"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </motion.select>
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
            {isSubmitting ? "Adding..." : "Add Recurring Expense"}
          </span>
        </motion.button>
      </form>
      <div className="mt-6 space-y-3">
        <h3 className="text-xl font-bold text-white mb-3">Current Recurring Expenses</h3>
        {recurringExpenses.length > 0 ? (
          <AnimatePresence>
            { (showAllRecurring ? recurringExpenses : recurringExpenses.slice(0, 3)).map(recExp => (
              <motion.div
                key={recExp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3"
              >
                <div>
                  <p className="text-white font-medium">{recExp.description} - ${recExp.amount.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">{recExp.category} | Every {recExp.frequency}</p>
                </div>
                <button 
                  onClick={() => handleRemoveRecurringExpense(recExp.id)}
                  className="text-red-400 hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
              </motion.div>
            ))}
            {recurringExpenses.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-center"
              >
                <button
                  onClick={() => setShowAllRecurring(!showAllRecurring)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {showAllRecurring ? "Show Less" : `Show All (${recurringExpenses.length - 3} more)`}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <p className="text-gray-400 text-center py-4">No recurring expenses found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default RecurringExpenseForm; 