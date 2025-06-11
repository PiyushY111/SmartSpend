import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiBarChart2, FiTarget, FiCreditCard, FiDownload, FiPieChart, FiFilter, FiTrendingUp, FiAward } from 'react-icons/fi';

function FeaturesSection() {
  const features = [
    {
      icon: <FiCheckCircle className="w-10 h-10 text-blue-400 mb-4" />,
      title: "Expense Tracking",
      description: "Easily track and categorize your daily expenses with our intuitive interface.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiBarChart2 className="w-10 h-10 text-purple-400 mb-4" />,
      title: "Expense Analytics",
      description: "Get detailed insights into your spending patterns with interactive charts.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiTarget className="w-10 h-10 text-yellow-400 mb-4" />,
      title: "Financial Goals",
      description: "Set and track your financial goals to stay motivated and focused.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <FiAward className="w-10 h-10 text-green-400 mb-4" />,
      title: "Spending Goals & Challenge",
      description: "Set spending targets and track your progress with interactive challenges.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiTrendingUp className="w-10 h-10 text-teal-400 mb-4" />,
      title: "Spending Insights",
      description: "Get personalized insights and recommendations to optimize your spending habits.",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: <FiCreditCard className="w-10 h-10 text-pink-400 mb-4" />,
      title: "Budget Management",
      description: "Create and monitor budgets for different expense categories.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: <FiFilter className="w-10 h-10 text-indigo-400 mb-4" />,
      title: "Smart Filtering",
      description: "Filter and search through your expenses with advanced options.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <FiPieChart className="w-10 h-10 text-red-400 mb-4" />,
      title: "Category Management",
      description: "Organize your expenses with customizable categories.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: <FiDownload className="w-10 h-10 text-orange-400 mb-4" />,
      title: "Data Export",
      description: "Export your financial data for backup or analysis.",
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-[4rem] shadow-2xl mt-12 mb-12">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 rounded-2xl md:rounded-3xl lg:rounded-[4rem]"
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-white text-center mb-16 leading-tight"
        >
          Powerful Features to Empower Your Financial Journey
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="glass-card p-6 rounded-3xl border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3
                className="text-xl font-bold text-white mb-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {feature.title}
              </motion.h3>
              <p className="text-gray-300">{feature.description}</p>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection; 