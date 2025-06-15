import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiDollarSign } from 'react-icons/fi';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];


const ExpenseAnalytics = ({ expenses = [], categories = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const convertAmount = (amount, currency) => {
    // Since we are removing multi-currency, we'll assume all amounts are already in INR or convert them as needed.
    // For now, we'll just return the amount as is, assuming it's in INR.
    return amount;
  };

  // Calculate category-wise spending
  const categorySpending = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category.name)
      .reduce((sum, expense) => sum + convertAmount(expense.amount, expense.currency), 0);
    return {
      name: category.name,
      value: total,
      budget: category.budget || 0, // Assuming budget is set in INR
      spentPercentage: category.budget > 0 ? (total / category.budget) * 100 : 0
    };
  });

  // Calculate monthly spending
  const monthlySpending = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + convertAmount(expense.amount, expense.currency);
    return acc;
  }, {});

  const monthlyData = Object.entries(monthlySpending).map(([month, amount]) => ({
    month,
    amount
  }));

  // Custom tooltip for PieChart to show budget
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="custom-tooltip glass-card p-4 rounded-xl shadow-xl"
        >
          <p className="label text-white text-lg font-bold">{`${data.name}`}</p>
          <p className="intro text-gray-300">{`Spent: ${formatAmount(data.value)}`}</p>
          {data.budget > 0 && <p className="desc text-gray-300">{`Budget: ${formatAmount(data.budget)}`}</p>}
          {data.budget > 0 && <p className="desc text-gray-300">{`Remaining: ${formatAmount(data.budget - data.value)}`}</p>}
          {data.spentPercentage > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.spentPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"
            />
          )}
        </motion.div>
      );
    }
    return null;
  };

  // Custom tooltip for BarChart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="custom-tooltip glass-card p-4 rounded-xl shadow-xl"
        >
          <p className="label text-white text-lg font-bold">{`${label}`}</p>
          <p className="intro text-gray-300">{`Spent: ${formatAmount(payload[0].value)}`}</p>
        </motion.div>
      );
    }
    return null;
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
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
        <FiTrendingUp className="w-6 h-6 text-indigo-400" />
        Expense Analytics
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="charts-container grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="chart-wrapper glass-card p-6 rounded-2xl"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Category-wise Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorySpending}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex}
                activeShape={(props) => {
                  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
                  return (
                    <g>
                      <path
                        d={`M${cx},${cy}l${outerRadius * Math.cos(startAngle)},${outerRadius * Math.sin(startAngle)}A${outerRadius},${outerRadius} 0 0,1 ${cx + outerRadius * Math.cos(endAngle)},${cy + outerRadius * Math.sin(endAngle)}`}
                        fill={fill}
                        stroke="white"
                        strokeWidth={2}
                      />
                    </g>
                  );
                }}
              >
                {categorySpending.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend wrapperStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 space-y-2"
          >
            <h4 className="text-md font-semibold text-white">Budget Overview:</h4>
            {categorySpending.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-between items-center text-sm text-gray-300 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {cat.name}
                </span>
                <span className="font-medium">{formatAmount(cat.value)} / {formatAmount(cat.budget)}</span>
                <span className={`font-semibold ${cat.value > cat.budget ? 'text-red-400' : 'text-green-400'}`}>
                  {cat.value > cat.budget 
                    ? `Over: ${formatAmount(cat.value - cat.budget)}` 
                    : `Left: ${formatAmount(cat.budget - cat.value)}`}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="chart-wrapper glass-card p-6 rounded-2xl"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="month" stroke="#cbd5e0" />
              <YAxis stroke="#cbd5e0" />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Bar
                dataKey="amount"
                name="Spending"
                radius={[4, 4, 0, 0]}
              >
                {monthlyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="summary-cards grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="summary-card glass-card p-6 rounded-2xl relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ opacity: 1 }}
          />
          <div className="relative z-10">
            <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
              <FiDollarSign className="w-5 h-5 text-blue-400" />
              Total Spending
            </h3>
            <p className="text-white text-3xl font-bold mb-1">
              {formatAmount(expenses.reduce((sum, exp) => sum + convertAmount(exp.amount, exp.currency), 0))}
            </p>
            <p className="text-gray-400 text-sm">All time expenses</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="summary-card glass-card p-6 rounded-2xl relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ opacity: 1 }}
          />
          <div className="relative z-10">
            <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
              <FiDollarSign className="w-5 h-5 text-green-400" />
              Average Monthly Spending
            </h3>
            <p className="text-white text-3xl font-bold mb-1">{formatAmount(Object.values(monthlySpending).reduce((sum, val) => sum + val, 0) / (Object.keys(monthlySpending).length || 1))}</p>
            <p className="text-gray-400 text-sm">Based on recorded months</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseAnalytics;
