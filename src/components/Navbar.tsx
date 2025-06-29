'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [0, 1]);
  const blur = useTransform(scrollY, [0, 50], [0, 8]);
  
  useEffect(() => {
    // Mettre à jour le lien actif en fonction de l'URL actuelle
    if (typeof window !== 'undefined') {
      setActiveLink(window.location.pathname);
    }
    
    // Détecter le défilement pour changer l'apparence de la navbar
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants: Variants = {
    open: { 
      opacity: 1, 
      height: 'auto', 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    closed: { 
      opacity: 0, 
      height: 0, 
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    }
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring" as const,  // Properly typed
        stiffness: 200,
        delay: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        type: 'spring' as const,  // Proper const assertion
        stiffness: 150
      }
    })
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-card/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <motion.div
                variants={logoVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial="hidden"
                animate="visible"
                className="relative"                
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-accent to-button bg-clip-text text-transparent">Glacé & Frais</span>
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-accent" 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: '/', label: 'Accueil' },
              { path: '/products', label: 'Produits' },
              { path: '/about', label: 'À propos' },
              { path: '/contact', label: 'Contact' }
            ].map((link, i) => (
              <motion.div
                key={link.path}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href={link.path} className="relative group">
                  <span className={`text-${activeLink === link.path ? 'accent font-medium' : 'text'} transition-colors duration-300 group-hover:text-accent`}>
                    {link.label}
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent origin-left"
                    initial={{ scaleX: activeLink === link.path ? 1 : 0 }}
                    animate={{ scaleX: activeLink === link.path ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.button
              variants={navItemVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-accent to-button text-white px-6 py-2.5 rounded-full transition-all duration-300 hover:from-button hover:to-accent"
            >
              Commander
            </motion.button>
          </div>
          
          <div className="md:hidden flex items-center">
            <motion.button
              variants={navItemVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-text hover:text-accent focus:outline-none"
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden bg-card/95 backdrop-blur-md"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 sm:px-5">

              {[
                { path: '/', label: 'Accueil' },
                { path: '/products', label: 'Produits' },
                { path: '/about', label: 'À propos' },
                { path: '/contact', label: 'Contact' }
              ].map((link, i) => (
                <motion.div
                  key={link.path}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="overflow-hidden"
                >
                  <Link 
                    href={link.path} 
                    className={`block px-3 py-3 rounded-lg ${activeLink === link.path ? 'bg-accent/10 text-accent font-medium' : 'text-text'} hover:bg-accent/5 hover:text-accent transition-all duration-300`}
                    onClick={() => {
                      setActiveLink(link.path);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">
                        {link.path === '/' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        )}
                        {link.path === '/products' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        )}
                        {link.path === '/about' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {link.path === '/contact' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                      </span>
                      {link.label}
                    </div>
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} initial="hidden"
                animate="visible">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-3 px-3 bg-gradient-to-r from-accent to-button text-white rounded-lg font-medium hover:from-button hover:to-accent transition-all duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Commander
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
