import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiTag, FiCalendar, FiDollarSign } from 'react-icons/fi';

const ExpenseFilter = ({ categories, onFilter }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    dateRange: 'all',
    amountRange: 'all',
    searchTerm: ''
  });

  useEffect(() => {
    // Apply filter whenever filters state changes
    onFilter(filters);
  }, [filters, onFilter]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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

  const inputClass = "w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300";

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
        <FiFilter className="w-6 h-6 text-orange-400" />
        Filter Expenses
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={itemVariants}>
          <label htmlFor="category-filter" className="block text-gray-300 font-medium mb-1 flex items-center gap-2">
            <FiTag className="w-4 h-4" />
            Category
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            id="category-filter"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={inputClass}
          >
            <option value="all" className="text-black">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name} className="text-black">
                {category.name}
              </option>
            ))}
          </motion.select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="date-range-filter" className="block text-gray-300 font-medium mb-1 flex items-center gap-2">
            <FiCalendar className="w-4 h-4" />
            Date Range
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            id="date-range-filter"
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className={inputClass}
          >
            <option value="all" className="text-black">All Time</option>
            <option value="today" className="text-black">Today</option>
            <option value="week" className="text-black">This Week</option>
            <option value="month" className="text-black">This Month</option>
            <option value="year" className="text-black">This Year</option>
          </motion.select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="amount-range-filter" className="block text-gray-300 font-medium mb-1 flex items-center gap-2">
            <FiDollarSign className="w-4 h-4" />
            Amount Range
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            id="amount-range-filter"
            value={filters.amountRange}
            onChange={(e) => handleFilterChange('amountRange', e.target.value)}
            className={inputClass}
          >
            <option value="all" className="text-black">All Amounts</option>
            <option value="0-100" className="text-black">$0 - $100</option>
            <option value="100-500" className="text-black">$100 - $500</option>
            <option value="500-1000" className="text-black">$500 - $1000</option>
            <option value="1000+" className="text-black">$1000+</option>
          </motion.select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="search-term" className="block text-gray-300 font-medium mb-1 flex items-center gap-2">
            <FiSearch className="w-4 h-4" />
            Search
          </label>
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="search-term"
              placeholder="Search expenses..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className={inputClass}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExpenseFilter; 