import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiPieChart, FiTarget, FiUsers } from 'react-icons/fi';
import ExpenseAnalytics from './ExpenseAnalytics';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';
import FinancialGoals from './FinancialGoals';
import ExpenseInsights from './ExpenseInsights';
import ExpenseGoals from './ExpenseGoals';

function RightColumn({
  filteredExpenses,
  expenses,
  categories,
  financialGoals,
  loading,
  handleFilterExpenses,
  handleRemoveExpense,
  handleUpdateExpense,
  handleViewExpenseDetails,
  handleAddFinancialGoal,
  handleUpdateFinancialGoal,
  handleRemoveFinancialGoal,
}) {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="glass-card">
          <ExpenseAnalytics expenses={filteredExpenses} />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="glass-card">
          <ExpenseInsights expenses={expenses} />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="glass-card">
          <ExpenseGoals expenses={expenses} categories={categories} />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="glass-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
              <FiPieChart className="w-7 h-7 text-cyan-400" />
              <span>Your Expenses</span>
            </h2>
          </div>
          <ExpenseFilter onFilter={handleFilterExpenses} categories={categories} />
          <ExpenseList 
            expenses={filteredExpenses} 
            onRemove={handleRemoveExpense}
            onUpdate={handleUpdateExpense}
            onViewDetails={handleViewExpenseDetails}
            loading={loading}
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className="glass-card">
          <FinancialGoals 
            goals={financialGoals}
            onAddGoal={handleAddFinancialGoal}
            onUpdateGoal={handleUpdateFinancialGoal}
            onRemoveGoal={handleRemoveFinancialGoal}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default RightColumn; 