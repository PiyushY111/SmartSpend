import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiHeart } from 'react-icons/fi';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const socialLinks = [
    { icon: <FiGithub />, href: "https://github.com/PiyushY111", label: "GitHub" },
    { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/piyushy111/", label: "LinkedIn" }
  ];

  return (
    <motion.footer
      variants={footerVariants}
      initial="initial"
      animate="animate"
      className="glass-card py-8 px-4 sm:px-6 lg:px-8 mt-12 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          <motion.div
            variants={linkVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center md:items-start space-y-2"
          >
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-red-500"
              >
                <FiHeart />
              </motion.span>
              by Piyush
            </p>
            <p className="text-gray-400 text-sm">&copy; {currentYear} All rights reserved.</p>
          </motion.div>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="text-gray-400 hover:text-white transition-colors text-lg relative group"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                  />
                  <span className="relative z-10">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer; 