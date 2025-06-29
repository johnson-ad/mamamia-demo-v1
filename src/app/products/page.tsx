'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import products from '@/data/products.json';

export default function Products() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Extraire les catégories uniques des produits
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Refs for scroll animations
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [filtersRef, filtersInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [productsRef, productsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Animation controls
  const headerControls = useAnimation();
  const filtersControls = useAnimation();
  const productsControls = useAnimation();

  // Update animations when sections come into view
  useEffect(() => {
    if (headerInView) headerControls.start('visible');
  }, [headerInView, headerControls]);

  useEffect(() => {
    if (filtersInView) filtersControls.start('visible');
  }, [filtersInView, filtersControls]);

  useEffect(() => {
    if (productsInView) productsControls.start('visible');
  }, [productsInView, productsControls]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800); // Légère pause pour montrer l'animation de chargement
  }, []);

  useEffect(() => {
    // Filtrer les produits en fonction de la catégorie et du terme de recherche
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm]);

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="bg-background min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la page */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">Nos Produits</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de glaces artisanales et de boissons rafraîchissantes, 
            élaborées avec passion et des ingrédients de qualité.
          </p>
        </motion.div>

        {/* Filtres et recherche */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Filtres par catégorie */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </motion.div>

            {/* Barre de recherche */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full md:w-64"
            >
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Grille de produits */}
        <AnimatePresence>
          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -10 }}
                  className="bg-card rounded-xl shadow-md overflow-hidden transition-all"
                >
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-accent">{product.price.toFixed(2)} €</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-button text-white px-4 py-2 rounded-full hover:bg-accent transition-colors"
                      >
                        Ajouter
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold text-text mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="bg-accent text-white px-6 py-2 rounded-full hover:bg-button transition-colors"
              >
                Réinitialiser les filtres
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}