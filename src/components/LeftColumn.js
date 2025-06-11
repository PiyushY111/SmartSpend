import React from 'react';
import { motion } from 'framer-motion';
import { FiPlusCircle, FiSettings, FiRepeat, FiTrendingUp, FiPieChart, FiTarget, FiGlobe } from 'react-icons/fi';
import ExpenseForm from './ExpenseForm';
import CategoryManager from './CategoryManager';
import RecurringExpenseForm from './RecurringExpenseForm';
import ExpenseAnalytics from './ExpenseAnalytics';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';
import FinancialGoals from './FinancialGoals';
import MultiCurrencyManager from './MultiCurrencyManager';

function LeftColumn({
  onAddExpense,
  onAddCategory,
  onRemoveCategory,
  onAddRecurringExpense,
  categories,
  loading,
  recurringExpenses
}) {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="glass-card">
          <ExpenseForm onAddExpense={onAddExpense} categories={categories} />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="glass-card">
          <CategoryManager 
            categories={categories}
            onAddCategory={onAddCategory}
            onRemoveCategory={onRemoveCategory}
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="glass-card">
          <RecurringExpenseForm 
            onAddRecurringExpense={onAddRecurringExpense}
            categories={categories}
            recurringExpenses={recurringExpenses}
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="glass-card">
          <div className="flex items-center gap-2 mb-6">
            <FiGlobe className="text-2xl text-blue-500" />
            <h2 className="text-2xl font-bold text-white">Currency Manager</h2>
          </div>
          <MultiCurrencyManager />
        </div>
      </motion.div>
    </div>
  );
}

export default LeftColumn;
