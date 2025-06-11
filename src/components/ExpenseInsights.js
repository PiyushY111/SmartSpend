import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiClock, FiCalendar, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseInsights = ({ expenses = [] }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Calculate spending by time of day
  const spendingByTimeOfDay = useMemo(() => {
    const timeSlots = {
      'Morning (6AM-12PM)': 0,
      'Afternoon (12PM-6PM)': 0,
      'Evening (6PM-12AM)': 0,
      'Night (12AM-6AM)': 0,
    };

    expenses.forEach(expense => {
      const hour = new Date(expense.date).getHours();
      if (hour >= 6 && hour < 12) timeSlots['Morning (6AM-12PM)'] += expense.amount;
      else if (hour >= 12 && hour < 18) timeSlots['Afternoon (12PM-6PM)'] += expense.amount;
      else if (hour >= 18 && hour < 24) timeSlots['Evening (6PM-12AM)'] += expense.amount;
      else timeSlots['Night (12AM-6AM)'] += expense.amount;
    });

    return Object.entries(timeSlots).map(([time, amount]) => ({
      time,
      amount,
    }));
  }, [expenses]);

  // Calculate spending trends (last 6 months)
  const spendingTrends = useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    }).reverse();

    const monthlySpending = last6Months.map(month => {
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.toLocaleString('default', { month: 'short', year: 'numeric' });
        return expenseMonth === month;
      });

      return {
        month,
        amount: monthExpenses.reduce((sum, exp) => sum + exp.amount, 0),
      };
    });

    return monthlySpending;
  }, [expenses]);

  // Calculate savings opportunities
  const savingsOpportunities = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const opportunities = Object.entries(categoryTotals)
      .filter(([_, amount]) => amount > 1000) // Only consider categories with significant spending
      .map(([category, amount]) => ({
        category,
        amount,
        potentialSavings: amount * 0.1, // Assume 10% potential savings
      }))
      .sort((a, b) => b.potentialSavings - a.potentialSavings)
      .slice(0, 3); // Top 3 opportunities

    return opportunities;
  }, [expenses]);

  // Calculate spending comparison with previous period
  const spendingComparison = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const previousMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return expenseDate.getMonth() === prevMonth && expenseDate.getFullYear() === prevYear;
    });

    const currentTotal = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const previousTotal = previousMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const difference = currentTotal - previousTotal;
    const percentageChange = previousTotal ? (difference / previousTotal) * 100 : 0;

    return {
      currentTotal,
      previousTotal,
      difference,
      percentageChange,
    };
  }, [expenses]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FiTrendingUp className="w-6 h-6 text-blue-400" />
          Spending Insights
        </h2>

        {/* Spending by Time of Day */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiClock className="w-5 h-5 text-purple-400" />
            Spending by Time of Day
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {spendingByTimeOfDay.map(({ time, amount }) => (
              <motion.div
                key={time}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <p className="text-gray-400 text-sm">{time}</p>
                <p className="text-white text-xl font-bold">{formatAmount(amount)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spending Trends */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiCalendar className="w-5 h-5 text-green-400" />
            Spending Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => [formatAmount(value), 'Amount']}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: '#6366f1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Opportunities */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiDollarSign className="w-5 h-5 text-yellow-400" />
            Savings Opportunities
          </h3>
          <div className="space-y-4">
            {savingsOpportunities.map(({ category, amount, potentialSavings }) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold">{category}</p>
                    <p className="text-gray-400 text-sm">Current spending: {formatAmount(amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">Potential savings</p>
                    <p className="text-green-400">{formatAmount(potentialSavings)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spending Comparison */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiAlertCircle className="w-5 h-5 text-red-400" />
            Month-over-Month Comparison
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <p className="text-gray-400 text-sm">Current Month</p>
              <p className="text-white text-xl font-bold">
                {formatAmount(spendingComparison.currentTotal)}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <p className="text-gray-400 text-sm">Change from Last Month</p>
              <p className={`text-xl font-bold ${
                spendingComparison.percentageChange > 0 ? 'text-red-400' : 'text-green-400'
              }`}>
                {spendingComparison.percentageChange > 0 ? '+' : ''}
                {spendingComparison.percentageChange.toFixed(1)}%
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpenseInsights; 