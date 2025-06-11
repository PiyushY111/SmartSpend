import React from 'react';
import { motion } from 'framer-motion';
import { FiRepeat, FiTarget, FiBarChart2, FiCreditCard } from 'react-icons/fi';

const Features = () => {
  const featureCards = [
    {
      icon: <FiBarChart2 className="w-8 h-8 text-green-400" />,
      title: 'Expense Analytics',
      description: 'Gain insights into your spending habits with intuitive charts and graphs. Understand where your money goes and identify areas for savings.',
    },
    {
      icon: <FiTarget className="w-8 h-8 text-yellow-400" />,
      title: 'Financial Goal Setting',
      description: 'Set and track your financial aspirations, from saving for a down payment to building an emergency fund, all in your preferred currency.',
    },
    {
      icon: <FiRepeat className="w-8 h-8 text-red-400" />,
      title: 'Recurring Transactions',
      description: 'Manage your subscriptions and recurring payments with ease. Get reminders and stay on top of your regular expenses.',
    },
    {
      icon: <FiCreditCard className="w-8 h-8 text-pink-400" />,
      title: 'Budgeting Tools',
      description: 'Create and manage budgets for different categories to control your spending and achieve financial discipline.',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to manage your expenses effectively
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 