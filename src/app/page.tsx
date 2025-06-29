'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {   useLoadScript } from "@react-google-maps/api";
import { motion, useScroll, useTransform, useInView, useAnimation, Variants } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const presentationRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuredInView = useInView(featuredRef, { once: false, amount: 0.2 });
  const presentationInView = useInView(presentationRef, { once: false, amount: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.2 });
  const featuredControls = useAnimation();
  const presentationControls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Stocke ta clé dans .env
  });

  

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simuler un chargement de données
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Erreur lors du chargement des produits');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // Animation controls based on section visibility
  useEffect(() => {
    if (featuredInView) {
      featuredControls.start('visible');
    }
    if (presentationInView) {
      presentationControls.start('visible');
    }
    if (testimonialsInView) {
      testimonialsControls.start('visible');
    }
    if (ctaInView) {
      ctaControls.start('visible');
    }
  }, [featuredInView, presentationInView, testimonialsInView, ctaInView, featuredControls, presentationControls, testimonialsControls, ctaControls]);

  // Variants pour les animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
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

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.1
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const featureIconVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.2
      }
    }),
    hover: {
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  // Filtrer les produits pour n'afficher que les 3 premiers
  const featuredProducts = products.slice(0, 3);
  
  // Testimonials data
  const testimonials = [
    {
      text: "Les glaces sont absolument délicieuses ! J'ai particulièrement adoré la saveur pistache qui est incroyablement crémeuse et authentique.",
      name: "Sophie Martin",
      title: "Cliente fidèle"
    },
    {
      text: "Le service est impeccable et les boissons sont rafraîchissantes. J'apprécie particulièrement l'engagement de l'entreprise envers la qualité et la durabilité.",
      name: "Thomas Dubois",
      title: "Client régulier"
    },
    {
      text: "J'ai découvert cette marque il y a peu et je suis déjà conquise ! Les saveurs sont originales et l'expérience en magasin est toujours agréable.",
      name: "Émilie Petit",
      title: "Nouvelle cliente"
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section avec vidéo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            className="w-full h-full object-cover" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="https://cdn.pixabay.com/video/2023/01/27/147565-800282177_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Rafraîchissez vos <span className="text-accent">moments</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Des glaces artisanales et des boissons rafraîchissantes pour tous les moments de plaisir.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/products" 
                className="bg-accent text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-button transition-colors inline-block"
              >
                Découvrir nos produits
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl font-bold text-text mb-4"
          >
            Notre passion, votre plaisir
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Depuis plus de 10 ans, nous créons des glaces et des boissons qui éveillent vos papilles et rafraîchissent vos journées.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text mb-2">Qualité Premium</h3>
              <p className="text-gray-600">Nous sélectionnons les meilleurs ingrédients pour vous offrir des produits d&apos;exception.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text mb-2">Saveurs Uniques</h3>
              <p className="text-gray-600">Découvrez des combinaisons de saveurs originales qui vous surprendront.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text mb-2">Fraîcheur Garantie</h3>
              <p className="text-gray-600">Nos produits sont préparés quotidiennement pour vous garantir une fraîcheur optimale.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section Produits Vedettes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">Nos produits vedettes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez nos produits les plus populaires, élaborés avec passion et savoir-faire.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-card rounded-xl shadow-md overflow-hidden"
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
          </div>

          <div className="text-center mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/products" 
                className="border-2 border-accent text-accent px-8 py-3 rounded-full text-lg font-medium hover:bg-accent hover:text-white transition-colors inline-block"
              >
                Voir tous nos produits
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">Ce que nos clients disent</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-gray-500 font-bold">S</span>
              </div>
              <div>
                <h4 className="font-bold text-text">Sophie L.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"Les glaces sont absolument délicieuses ! La texture est parfaite et les saveurs sont intenses. Je recommande vivement !"</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-gray-500 font-bold">T</span>
              </div>
              <div>
                <h4 className="font-bold text-text">Thomas M.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"Les boissons sont rafraîchissantes et originales. J&apos;adore particulièrement le milkshake fraise qui est un vrai délice !"</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-gray-500 font-bold">L</span>
              </div>
              <div>
                <h4 className="font-bold text-text">Laura B.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"Le service est impeccable et les produits sont de grande qualité. Je suis une cliente fidèle depuis plusieurs années !"</p>
          </motion.div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Prêt à vous rafraîchir ?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Rejoignez-nous et découvrez notre univers de saveurs glacées et rafraîchissantes.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact" 
                className="bg-white text-accent px-8 py-3 rounded-full text-lg font-medium hover:bg-button hover:text-white transition-colors inline-block"
              >
                Contactez-nous
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
