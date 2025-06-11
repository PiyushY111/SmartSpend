import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiPlus, FiRefreshCw, FiTrash2, FiStar, FiDollarSign } from 'react-icons/fi';

const MultiCurrencyManager = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [favorites, setFavorites] = useState(['USD', 'EUR', 'GBP']);

  const popularCurrencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }
  ];

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvert = () => {
    if (!amount || !selectedCurrency) return;
    const rate = exchangeRates[selectedCurrency];
    const converted = parseFloat(amount) * rate;
    setConvertedAmount(converted);
  };

  const toggleFavorite = (currencyCode) => {
    setFavorites(prev => 
      prev.includes(currencyCode)
        ? prev.filter(code => code !== currencyCode)
        : [...prev, currencyCode]
    );
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
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={itemVariants}>
          <label htmlFor="base-currency" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <FiGlobe className="w-4 h-4" />
            Base Currency
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            id="base-currency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
          >
            {popularCurrencies.map(currency => (
              <option key={currency.code} value={currency.code} className="text-black">
                {currency.code} - {currency.name}
              </option>
            ))}
          </motion.select>
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
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <label htmlFor="target-currency" className="block text-indigo-100 font-medium mb-1 flex items-center gap-2">
          <FiGlobe className="w-4 h-4" />
          Target Currency
        </label>
        <motion.select
          whileFocus={{ scale: 1.02 }}
          id="target-currency"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
        >
          {popularCurrencies.map(currency => (
            <option key={currency.code} value={currency.code} className="text-black">
              {currency.code} - {currency.name}
            </option>
          ))}
        </motion.select>
      </motion.div>

      <motion.button
        onClick={handleConvert}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FiRefreshCw className="w-5 h-5" />
            </motion.div>
          ) : (
            <FiRefreshCw className="w-5 h-5" />
          )}
          {isLoading ? "Converting..." : "Convert"}
        </span>
      </motion.button>

      {convertedAmount !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-1">Converted Amount</p>
            <p className="text-2xl font-bold text-white">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurrency
              }).format(convertedAmount)}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              1 {baseCurrency} = {exchangeRates[selectedCurrency]} {selectedCurrency}
            </p>
          </div>
        </motion.div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <FiStar className="w-5 h-5 text-yellow-400" />
          Favorite Currencies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {popularCurrencies.map(currency => (
            <motion.button
              key={currency.code}
              onClick={() => toggleFavorite(currency.code)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg flex items-center justify-between ${
                favorites.includes(currency.code)
                  ? 'bg-yellow-500/20 border border-yellow-500/30'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <span className="text-white font-medium">{currency.code}</span>
              <FiStar
                className={`w-4 h-4 ${
                  favorites.includes(currency.code)
                    ? 'text-yellow-400'
                    : 'text-gray-400'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        onClick={fetchExchangeRates}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 px-4 rounded-lg bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh Exchange Rates
      </motion.button>
    </motion.div>
  );
};

export default MultiCurrencyManager; 