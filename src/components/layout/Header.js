import React, { useState } from 'react';
import { FiHome, FiPieChart, FiPlusCircle, FiSettings, FiLogOut, FiTrendingUp, FiDollarSign, FiRepeat, FiTarget, FiDownload, FiMenu, FiX, FiCheckCircle, FiDollarSign as FiDollarSignAlt, FiBarChart2, FiCalendar, FiCreditCard } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function Header({ currentUser, totalBalance, onLogout, expenses }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(amount);
  };

  const handleExportData = () => {
    // Convert expenses to CSV format
    const headers = ['Date', 'Description', 'Category', 'Amount', 'Currency'];
    const csvData = expenses.map(expense => [
      new Date(expense.date).toLocaleDateString(),
      expense.description,
      expense.category,
      expense.amount,
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-7 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-extrabold text-gradient">SpendSmart</h1>
          <nav className="hidden md:flex space-x-6">
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-lg font-semibold glass-card px-5 py-2 flex items-center space-x-2">
                  <FiDollarSign className="w-5 h-5 text-blue-400" />
                  <span className="text-white">{formatAmount(totalBalance)}</span>
                </div>
                <button
                  onClick={handleExportData}
                  className="btn py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 relative overflow-hidden group flex items-center space-x-2"
                >
                  <FiDownload className="w-5 h-5" />
                  <span>Export Data</span>
                </button>
                <button
                  onClick={onLogout}
                  className="btn py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 relative overflow-hidden group flex items-center space-x-2"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <button className="hidden md:flex btn btn-primary flex items-center space-x-2">
              <FiPlusCircle className="w-5 h-5" />
              <span>Get Started</span>
            </button>
          )}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
              {isMobileMenuOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-14 left-0 right-0 bg-gray-900/95 backdrop-blur-md p-4 pb-6 border-t border-white/10 shadow-lg"
          >
            {currentUser ? (
              <div className="flex flex-col space-y-4">
                <div className="text-lg font-semibold glass-card px-5 py-2 flex items-center space-x-2 justify-center">
                  <FiDollarSign className="w-5 h-5 text-blue-400" />
                  <span className="text-white">{formatAmount(totalBalance)}</span>
                </div>
                <button
                  onClick={() => { handleExportData(); setIsMobileMenuOpen(false); }}
                  className="btn py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 relative overflow-hidden group flex items-center space-x-2 w-full justify-center"
                >
                  <FiDownload className="w-5 h-5" />
                  <span>Export Data</span>
                </button>
                <button
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                  className="btn py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 relative overflow-hidden group flex items-center space-x-2 w-full justify-center"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button className="btn btn-primary flex items-center space-x-2 w-full justify-center">
                <FiPlusCircle className="w-5 h-5" />
                <span>Get Started</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header; 