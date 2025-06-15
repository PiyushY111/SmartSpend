import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiDollarSign, FiCalendar, FiEdit3, FiPlus } from 'react-icons/fi';

const FinancialGoals = ({ goals, onAddGoal, onUpdateGoal, onRemoveGoal }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [savedAmount, setSavedAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllGoals, setShowAllGoals] = useState(false);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goalName || !targetAmount || !targetDate) {
      alert('Please fill in all goal fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddGoal({
        name: goalName,
        target: parseFloat(targetAmount),
        saved: parseFloat(savedAmount) || 0,
        targetDate: targetDate,
        currency: 'INR'
      });
      setGoalName('');
      setTargetAmount('');
      setSavedAmount('');
      setTargetDate('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSavings = (id, amount) => {
    onUpdateGoal(id, (prevGoal) => ({
      ...prevGoal,
      saved: prevGoal.saved + parseFloat(amount),
    }));
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this goal?')) {
      onRemoveGoal(id);
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
        <FiTarget className="w-6 h-6 text-yellow-400" />
        Financial Goals
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-5 mb-8">
        <motion.div variants={itemVariants}>
          <label htmlFor="goalName" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiEdit3 className="w-4 h-4" />
            Goal Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            id="goalName"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            placeholder="e.g., New Car Down Payment"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div variants={itemVariants}>
            <label htmlFor="targetAmount" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
              <FiDollarSign className="w-4 h-4" />
              Target Amount
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="number"
              id="targetAmount"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="5000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="savedAmount" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
              <FiDollarSign className="w-4 h-4" />
              Current Saved
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="number"
              id="savedAmount"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="0"
              value={savedAmount}
              onChange={(e) => setSavedAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="targetDate" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              Target Date
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="date"
              id="targetDate"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </motion.div>
        </div>

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
            {isSubmitting ? "Adding..." : "Add Goal"}
          </span>
        </motion.button>
      </form>

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Your Financial Goals</h3>
        {goals.length === 0 ? (
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
              <FiTarget className="w-12 h-12 mx-auto text-gray-500" />
            </motion.div>
            <p className="text-lg">No financial goals set yet. Start by adding your first goal!</p>
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              { (showAllGoals ? goals : goals.slice(0, 3)).map(goal => (
                <motion.div 
                  key={goal.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 rounded-2xl relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-white">{goal.name}</h4>
                      <button 
                        onClick={() => handleRemove(goal.id)}
                        className="text-red-400 hover:text-red-500 transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Target: {formatAmount(goal.target)} | 
                      Saved: {formatAmount(goal.saved)}
                    </p>
                    <p className="text-gray-300 text-sm mb-2">Due: {new Date(goal.targetDate).toLocaleDateString()}</p>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                        style={{ width: `${Math.min(100, (goal.saved / goal.target) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-gray-300">{Math.min(100, (goal.saved / goal.target) * 100).toFixed(0)}% Complete</p>

                    <div className="mt-3 flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Add savings"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                        id={`add-savings-${goal.id}`}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddSavings(goal.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        min="0"
                        step="0.01"
                      />
                      <button 
                        onClick={() => handleAddSavings(goal.id, document.getElementById(`add-savings-${goal.id}`).value)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {goals.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={() => setShowAllGoals(!showAllGoals)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {showAllGoals ? "Show Less" : `Show All (${goals.length - 3} more)`}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default FinancialGoals; 