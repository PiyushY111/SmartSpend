import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FiPieChart, FiDollarSign, FiEdit2, FiTag, FiPaperclip } from 'react-icons/fi';
// import { useCurrency } from "../contexts/CurrencyContext";

const ExpenseList = ({ expenses, onRemove, onUpdate, onViewDetails, loading }) => {
  const [showAllExpenses, setShowAllExpenses] = useState(false);

  const displayedExpenses = showAllExpenses ? expenses : expenses.slice(0, 3);
  const hasMoreExpenses = expenses.length > 3;

  // const { convertAmount, formatAmount, selectedCurrency } = useCurrency();

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const convertAmount = (amount) => {
    // Since we are removing multi-currency, we'll assume all amounts are already in INR or convert them as needed.
    // For now, we'll just return the amount as is, assuming it's in INR.
    return amount;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const hasNotesOrAttachments = (expense) => {
    return (expense.notes && expense.notes.trim() !== '') || 
           (expense.tags && expense.tags.length > 0) || 
           (expense.attachments && expense.attachments.length > 0);
  };

  const SkeletonItem = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-4 bg-gray-700 rounded w-3/4"
          />
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="h-3 bg-gray-700 rounded w-1/2"
          />
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="h-4 bg-gray-700 rounded w-24"
          />
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
            className="h-3 bg-gray-700 rounded w-20"
          />
        </div>
      </div>
    </motion.div>
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
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
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="glass-card p-6 rounded-2xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-white mb-6 flex items-center gap-2"
      >
        <FiPieChart className="w-6 h-6 text-cyan-400" />
        Your Expenses
      </motion.h2>
      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {[1, 2, 3].map((i) => (
            <SkeletonItem key={i} />
          ))}
        </motion.div>
      ) : expenses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-card text-center text-gray-400 py-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-4"
          >
            <FiDollarSign className="w-12 h-12 mx-auto text-gray-500" />
          </motion.div>
          <p className="text-lg">No expenses found. Start by adding your first expense!</p>
        </motion.div>
      ) : (
        <>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {displayedExpenses.map((expense) => (
                <motion.li
                  key={expense.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 cursor-pointer hover:bg-gray-700/60 transition-colors relative overflow-hidden group"
                  onClick={() => onViewDetails(expense)}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:gap-8 relative z-10">
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <motion.span
                          whileHover={{ scale: 1.02 }}
                          className="text-lg font-semibold text-white"
                        >
                          {expense.description}
                        </motion.span>
                        {hasNotesOrAttachments(expense) && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-1 text-blue-400"
                          >
                            <FiEdit2 className="w-4 h-4" />
                            {expense.tags && expense.tags.length > 0 && (
                              <FiTag className="w-4 h-4" />
                            )}
                            {expense.attachments && expense.attachments.length > 0 && (
                              <FiPaperclip className="w-4 h-4" />
                            )}
                          </motion.div>
                        )}
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        className="text-gray-400 text-sm"
                      >
                        {expense.category}
                      </motion.span>
                    </div>
                    <div className="flex flex-col gap-1 md:items-end">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="text-lg font-bold text-blue-400"
                      >
                        {formatAmount(expense.amount)}
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        className="text-gray-400 text-xs"
                      >
                        {formatDate(expense.date)}
                      </motion.span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {hasMoreExpenses && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-center"
            >
              <button
                onClick={() => setShowAllExpenses(!showAllExpenses)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {showAllExpenses ? "Show Less" : `Show All (${expenses.length - 3} more)`}
              </button>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ExpenseList;
