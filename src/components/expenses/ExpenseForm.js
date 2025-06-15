import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiDollarSign, FiCalendar, FiTag } from "react-icons/fi";
// import { useCurrency } from "../contexts/CurrencyContext";

const ExpenseForm = ({ onAddExpense, categories }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { selectedCurrency, setSelectedCurrency, popularCurrencies } = useCurrency();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !category) return;

    setIsSubmitting(true);
    try {
      const expense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
        date
      };

      await onAddExpense(expense);

      // Reset form with animation
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().split('T')[0]);
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
        <FiPlus className="w-6 h-6 text-indigo-400" />
        Add New Expense
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter expense description"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="amount" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiDollarSign className="w-4 h-4" />
            Amount
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
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
          <label htmlFor="date" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiCalendar className="w-4 h-4" />
            Date
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
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
            {isSubmitting ? "Adding..." : "Add Expense"}
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ExpenseForm;
