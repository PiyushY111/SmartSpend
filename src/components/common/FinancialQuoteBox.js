import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiBookmark, FiShare2, FiHeart } from 'react-icons/fi';

const financialFacts = [
  {
    quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "Investment"
  },
  {
    quote: "Don't save what is left after spending; spend what is left after saving.",
    author: "Warren Buffett",
    category: "Saving"
  },
  {
    quote: "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
    category: "Investment"
  },
  {
    quote: "A budget is telling your money where to go instead of wondering where it went.",
    author: "Dave Ramsey",
    category: "Budgeting"
  },
  {
    quote: "The goal isn't more money. The goal is living life on your terms.",
    author: "Chris Brogan",
    category: "Mindset"
  },
  {
    quote: "Wealth consists not in having great possessions, but in having few wants.",
    author: "Epictetus",
    category: "Mindset"
  },
  {
    quote: "The most important single ingredient in the formula of success is knowing how to get along with people.",
    author: "Theodore Roosevelt",
    category: "Career"
  },
  {
    quote: "The biggest risk is not taking any risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
    author: "Mark Zuckerberg",
    category: "Risk"
  },
  {
    quote: "Money is a tool. Used properly it makes something beautiful; used wrong, it makes a mess!",
    author: "Bradley Vinson",
    category: "Mindset"
  },
  {
    quote: "The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought.",
    author: "T.T. Munger",
    category: "Saving"
  }
];

const FinancialQuoteBox = () => {
  const [currentFact, setCurrentFact] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * financialFacts.length);
    setCurrentFact(financialFacts[randomIndex]);
    setIsLiked(false);
  };

  useEffect(() => {
    getRandomFact();
    const interval = setInterval(getRandomFact, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!currentFact) return null;

  const handleShare = () => {
    setShowShare(true);
    setTimeout(() => setShowShare(false), 2000);
    // You can implement actual sharing functionality here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-3xl transform -translate-x-16 translate-y-16 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-2000" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm font-medium text-blue-300 backdrop-blur-sm"
          >
            {currentFact.category}
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={getRandomFact}
            className="p-2.5 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
          >
            <FiRefreshCw className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentFact.quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed italic">
              "{currentFact.quote}"
            </blockquote>
            <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50"></span>
              — {currentFact.author}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-700/50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2.5 rounded-full transition-all duration-200 ${
              isLiked 
                ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2.5 rounded-full transition-all duration-200 ${
              isBookmarked 
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            <FiBookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2.5 bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 rounded-full transition-all duration-200"
          >
            <FiShare2 className="w-5 h-5" />
          </motion.button>

          <AnimatePresence>
            {showShare && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-20 right-4 bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-300"
              >
                Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 30, ease: "linear" }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FinancialQuoteBox;