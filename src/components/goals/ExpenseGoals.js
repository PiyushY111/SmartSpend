import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiAward, FiTrendingDown, FiPlus, FiTrash2, FiEdit2, FiCalendar } from 'react-icons/fi';

const ExpenseGoals = ({ expenses = [], categories = [] }) => {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('expenseGoals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    duration: '30', // days
    startDate: new Date().toISOString().split('T')[0],
  });
  const [showAllGoals, setShowAllGoals] = useState(false);

  // Save goals to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('expenseGoals', JSON.stringify(goals));
  }, [goals]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Calculate progress for each goal
  const goalsWithProgress = useMemo(() => {
    return goals.map(goal => {
      const startDate = new Date(goal.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + parseInt(goal.duration));

      const relevantExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate >= startDate &&
          expenseDate <= endDate &&
          expense.category === goal.category
        );
      });

      const spentAmount = relevantExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const progress = (spentAmount / goal.targetAmount) * 100;
      const remainingAmount = goal.targetAmount - spentAmount;
      const isCompleted = new Date() > endDate;
      const isOnTrack = spentAmount <= goal.targetAmount;

      return {
        ...goal,
        spentAmount,
        progress: Math.min(progress, 100),
        remainingAmount,
        isCompleted,
        isOnTrack,
      };
    });
  }, [goals, expenses]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.category) return;

    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      category: '',
      duration: '30',
      startDate: new Date().toISOString().split('T')[0],
    });
    setIsAddingGoal(false);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setNewGoal({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      category: goal.category,
      duration: goal.duration,
      startDate: goal.startDate,
    });
  };

  const handleUpdateGoal = (e) => {
    e.preventDefault();
    if (!editingGoal) return;

    const updatedGoal = {
      ...editingGoal,
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
    };

    setGoals(prev => prev.map(goal => 
      goal.id === editingGoal.id ? updatedGoal : goal
    ));
    setEditingGoal(null);
    setNewGoal({
      name: '',
      targetAmount: '',
      category: '',
      duration: '30',
      startDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FiTarget className="w-6 h-6 text-blue-400" />
          Spending Goals & Challenges
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingGoal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Goal
        </motion.button>
      </div>

      <AnimatePresence>
        {(isAddingGoal || editingGoal) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingGoal ? 'Edit Goal' : 'Add New Goal'}
            </h3>
            <form onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Target Amount</label>
                <input
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name} className="text-black">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Duration (days)</label>
                <input
                  type="number"
                  value={newGoal.duration}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={newGoal.startDate}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingGoal(false);
                    setEditingGoal(null);
                    setNewGoal({
                      name: '',
                      targetAmount: '',
                      category: '',
                      duration: '30',
                      startDate: new Date().toISOString().split('T')[0],
                    });
                  }}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {editingGoal ? 'Update Goal' : 'Add Goal'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        { (showAllGoals ? goalsWithProgress : goalsWithProgress.slice(0, 3)).map(goal => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FiTarget className="w-5 h-5 text-blue-400" />
                {goal.name}
              </h3>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEditGoal(goal)}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FiEdit2 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <FiTrash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-2">Category: <span className="font-medium text-white">{goal.category}</span></p>
            <p className="text-gray-300 text-sm mb-2">Target: <span className="font-medium text-white">{formatAmount(goal.targetAmount)}</span> over <span className="font-medium text-white">{goal.duration} days</span></p>
            <p className="text-gray-300 text-sm mb-4">Spent: <span className="font-medium text-white">{formatAmount(goal.spentAmount)}</span></p>

            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
              <motion.div
                className={`h-2.5 rounded-full ${goal.progress > 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(goal.progress, 100)}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <p className="text-right text-sm text-gray-300 mb-4">{goal.progress.toFixed(1)}% complete</p>
            
            {!goal.isCompleted ? (
              <p className={`text-sm font-medium ${goal.isOnTrack ? 'text-green-400' : 'text-red-400'}`}>
                {goal.isOnTrack ? 
                  `You are on track! Remaining: ${formatAmount(goal.remainingAmount)}` :
                  `You are over budget by ${formatAmount(Math.abs(goal.remainingAmount))}`}
              </p>
            ) : (
              <p className="text-sm font-medium text-yellow-400">Goal ended.</p>
            )}
            
            {goal.progress >= 100 && goal.isOnTrack && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 flex items-center gap-2 text-green-400 font-semibold"
              >
                <FiAward className="w-5 h-5" />
                <span>Goal Achieved!</span>
              </motion.div>
            )}
          </motion.div>
        ))}
        {goalsWithProgress.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 text-center"
          >
            <button
              onClick={() => setShowAllGoals(!showAllGoals)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {showAllGoals ? "Show Less" : `Show All (${goalsWithProgress.length - 3} more)`}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExpenseGoals; 