import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiEye, FiEyeOff, FiMail, FiLock, FiLoader, FiCheckCircle, FiKey, FiAlertCircle, FiShield, FiUserPlus, FiDollarSign, FiTrendingUp, FiCreditCard, FiPieChart, FiTarget, FiGlobe, FiBarChart2, FiActivity, FiPercent, FiTrendingDown, FiCalendar, FiRepeat } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signup, googleSignIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (isSignUp) {
        await signup(email, password);
        setSuccess('Account created! You can now log in.');
        setIsSignUp(false);
      } else {
        await login(email, password);
        setSuccess('Login successful! Redirecting...');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await googleSignIn();
      setSuccess('Login successful! Redirecting...');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const floatingElements = [
    { icon: FiDollarSign, delay: 0, x: -100, y: -50, color: 'text-blue-500', size: 'w-8 h-8' },
    { icon: FiTrendingUp, delay: 0.5, x: 100, y: -30, color: 'text-green-500', size: 'w-8 h-8' },
    { icon: FiCreditCard, delay: 1, x: -80, y: 50, color: 'text-pink-500', size: 'w-8 h-8' },
    { icon: FiPieChart, delay: 1.5, x: 80, y: 30, color: 'text-purple-500', size: 'w-8 h-8' },
    { icon: FiTarget, delay: 2, x: -60, y: -40, color: 'text-yellow-500', size: 'w-8 h-8' },
    { icon: FiGlobe, delay: 2.5, x: 60, y: 40, color: 'text-emerald-500', size: 'w-8 h-8' },
    { icon: FiBarChart2, delay: 3, x: -120, y: 20, color: 'text-cyan-500', size: 'w-8 h-8' },
    { icon: FiActivity, delay: 3.5, x: 120, y: -60, color: 'text-orange-500', size: 'w-8 h-8' },
    { icon: FiPercent, delay: 4, x: -40, y: -80, color: 'text-red-500', size: 'w-8 h-8' },
    { icon: FiTrendingDown, delay: 4.5, x: 40, y: 80, color: 'text-rose-500', size: 'w-8 h-8' },
    { icon: FiCalendar, delay: 5, x: -140, y: -20, color: 'text-violet-500', size: 'w-8 h-8' },
    { icon: FiRepeat, delay: 5.5, x: 140, y: 60, color: 'text-indigo-500', size: 'w-8 h-8' },
  ];

  const backgroundShapes = [
    { type: 'circle', size: 'w-96 h-96', color: 'bg-blue-900/20', position: '-top-40 -left-40', delay: 0 },
    { type: 'circle', size: 'w-96 h-96', color: 'bg-indigo-900/20', position: '-bottom-40 -right-40', delay: 1000 },
    { type: 'circle', size: 'w-96 h-96', color: 'bg-purple-900/20', position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', delay: 2000 },
    { type: 'circle', size: 'w-72 h-72', color: 'bg-cyan-900/20', position: 'top-1/4 right-1/4', delay: 1500 },
    { type: 'circle', size: 'w-72 h-72', color: 'bg-pink-900/20', position: 'bottom-1/4 left-1/4', delay: 2500 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundShapes.map((shape, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              delay: shape.delay / 1000,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute ${shape.size} ${shape.color} blur-3xl ${shape.position} animate-pulse-glow`}
          />
        ))}
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Floating financial icons */}
      <AnimatePresence>
        {floatingElements.map(({ icon: Icon, delay, x, y, color, size }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: x, y: y }}
            animate={{ 
              opacity: [0.15, 0.3, 0.15],
              y: [y, y - 20, y],
              x: [x, x + 10, x],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute pointer-events-none"
          >
            <Icon className={`${size} ${color} opacity-20`} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Animated currency symbols */}
      <div className="absolute inset-0 overflow-hidden">
        {['$', '€', '£', '¥', '₹'].map((symbol, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -100 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              y: ['100%', '-100%']
            }}
            transition={{
              duration: 8,
              delay: index * 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-4xl font-bold text-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 1.5}s`
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 rounded-2xl shadow-2xl border border-white/10">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
                repeat: Infinity,
                ease: "linear",
                duration: 20
              }}
              className="flex justify-center mb-6"
            >
              <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, y: 0 }}
                  animate={{
                    scale: [0.9, 1.1, 0.9],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FiDollarSign className="w-12 h-12 text-blue-400" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-extrabold text-gradient mb-2">SpendSmart</h1>
              <p className="text-gray-300 font-light">{isSignUp ? 'Create your account' : 'Welcome back'}</p>
            </motion.div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm text-white rounded-xl border border-red-500/40 flex items-center"
                >
                  <FiAlertCircle className="w-5 h-5 mr-2 text-red-300" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-green-500/20 backdrop-blur-sm text-white rounded-xl border border-green-500/40 flex items-center"
                >
                  <FiCheckCircle className="w-5 h-5 mr-2 text-green-300" />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Email
                </label>
                <motion.div 
                  className="relative group"
                >
                  <div className="relative bg-gray-900/50 rounded-xl">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 px-10 bg-transparent text-white placeholder-gray-400 border-none rounded-xl ring-0 focus:ring-0 focus:outline-none"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Password
                </label>
                <motion.div 
                  className="relative group"
                >
                  <div className="relative bg-gray-900/50 rounded-xl">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 px-10 bg-transparent text-white placeholder-gray-400 border-none rounded-xl ring-0 focus:ring-0 focus:outline-none"
                      placeholder={isSignUp ? "Create a password" : "Enter your password"}
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {!isSignUp && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/50 hover:shadow-blue-900/75 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 overflow-hidden group relative"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  {loading ? (
                    <FiLoader className="w-5 h-5 animate-spin mr-2" />
                  ) : isSignUp ? (
                    <FiUserPlus className="w-5 h-5 mr-2" />
                  ) : (
                    <FiKey className="w-5 h-5 mr-2" />
                  )}
                  {isSignUp ? 'Create Account' : 'Login'}
                </span>
              </motion.button>
            </motion.form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-950 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="mt-6 w-full py-3 px-6 bg-gray-900/50 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center border border-gray-700"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isSignUp ? 'Sign up with Google' : 'Login with Google'}
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;