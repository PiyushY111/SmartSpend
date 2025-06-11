import React from 'react';
import { motion } from 'framer-motion';
import { FiPieChart, FiTrendingUp, FiDollarSign, FiCreditCard, FiBarChart2, FiTarget, FiGlobe, FiShield } from 'react-icons/fi';

function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-20 left-0 -ml-20 hidden lg:block animate-float"
      >
        <FiPieChart className="w-48 h-48 text-purple-500 opacity-20" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-40 right-0 -mr-20 hidden lg:block animate-float animation-delay-500"
      >
        <FiTrendingUp className="w-48 h-48 text-green-500 opacity-20" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 right-0 -mr-20 -mb-20 hidden lg:block animate-float animation-delay-1000"
      >
        <FiDollarSign className="w-72 h-72 text-blue-500 opacity-20" />
      </motion.div>

      {/* Additional decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-1/4 left-1/4 hidden lg:block animate-float animation-delay-300"
      >
        <FiCreditCard className="w-32 h-32 text-pink-500 opacity-15" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-1/4 right-1/4 hidden lg:block animate-float animation-delay-700"
      >
        <FiBarChart2 className="w-40 h-40 text-cyan-500 opacity-15" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute top-1/3 right-1/3 hidden lg:block animate-float animation-delay-900"
      >
        <FiTarget className="w-36 h-36 text-yellow-500 opacity-15" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-1/3 left-1/3 hidden lg:block animate-float animation-delay-1100"
      >
        <FiGlobe className="w-44 h-44 text-emerald-500 opacity-15" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute top-2/3 left-2/3 hidden lg:block animate-float animation-delay-1300"
      >
        <FiShield className="w-28 h-28 text-indigo-500 opacity-15" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-6 relative z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-4 border-blue-500/30 flex items-center justify-center"
          >
            <FiDollarSign className="w-12 h-12 text-blue-400" />
          </motion.div>
        </div>
        <h1 className="text-6xl font-extrabold text-gradient leading-tight">
          Take Control of Your Finances
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Easily track your expenses, manage budgets, and stay in control of your finances with a simple and intuitive personal finance platform.
        </p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="btn btn-primary text-lg px-10 py-4 mt-8 group relative overflow-hidden"
        >
          <span className="relative z-10">Get Started Now</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
}

export default HeroSection; 