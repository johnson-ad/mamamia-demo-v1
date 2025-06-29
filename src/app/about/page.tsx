'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  // Refs for scroll animations
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [historyRef, historyInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Animation controls
  const headerControls = useAnimation();
  const historyControls = useAnimation();
  const valuesControls = useAnimation();
  const teamControls = useAnimation();

  // Update animations when sections come into view
  useEffect(() => {
    if (headerInView) headerControls.start('visible');
  }, [headerInView, headerControls]);

  useEffect(() => {
    if (historyInView) historyControls.start('visible');
  }, [historyInView, historyControls]);

  useEffect(() => {
    if (valuesInView) valuesControls.start('visible');
  }, [valuesInView, valuesControls]);

  useEffect(() => {
    if (teamInView) teamControls.start('visible');
  }, [teamInView, teamControls]);

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const valueIconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -30 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: i * 0.1 + 0.3
      }
    }),
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-button/5 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête de la page */}
        <motion.div 
          ref={headerRef}
          variants={containerVariants}
          initial="hidden"
          animate={headerControls}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <motion.span 
              className="inline-block text-accent font-medium text-lg mb-4 px-4 py-1.5 rounded-full bg-accent/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Notre Entreprise
            </motion.span>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            À Propos de <span className="text-accent">Nous</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Découvrez notre histoire, nos valeurs et l'équipe passionnée derrière nos produits artisanaux.
          </motion.p>
        </motion.div>

        {/* Section Histoire */}
        <motion.section 
          ref={historyRef}
          className="max-w-7xl mx-auto mb-24 relative"
          variants={containerVariants}
          initial="hidden"
          animate={historyControls}
        >
          <motion.div variants={itemVariants} className="inline-block mb-8">
            <motion.span 
              className="inline-block text-button font-medium text-lg mb-4 px-4 py-1.5 rounded-full bg-button/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Depuis 2010
            </motion.span>
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center"
            variants={itemVariants}
          >
            Notre <span className="text-button">Histoire</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={imageVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/images/about-history.jpg" 
                  alt="Notre histoire"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.div variants={containerVariants}>
              <motion.p 
                className="text-lg text-gray-700 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Fondée en 2010 par deux amis passionnés de gastronomie, notre entreprise est née d'une vision simple : créer des produits glacés et des boissons de qualité exceptionnelle, en utilisant uniquement des ingrédients naturels et locaux.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-700 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Ce qui a commencé comme une petite boutique dans le centre-ville s'est transformé au fil des années en une marque reconnue pour son engagement envers la qualité, l'innovation et le respect des traditions artisanales.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-700 leading-relaxed"
                variants={itemVariants}
              >
                Aujourd'hui, nous sommes fiers de servir des milliers de clients chaque année et de continuer à développer de nouvelles saveurs et expériences gustatives tout en restant fidèles à nos valeurs fondatrices.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Section Valeurs */}
        <motion.section 
          ref={valuesRef}
          className="max-w-7xl mx-auto mb-24 py-20 bg-white rounded-2xl shadow-md relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={valuesControls}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </div>
          
          <motion.div variants={itemVariants} className="inline-block mb-8">
            <motion.span 
              className="inline-block text-accent font-medium text-lg mb-4 px-4 py-1.5 rounded-full bg-accent/10 mx-auto block w-fit"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Ce qui nous définit
            </motion.span>
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16 text-center"
            variants={itemVariants}
          >
            Nos <span className="text-accent">Valeurs</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 sm:px-6 lg:px-8">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                title: "Qualité Artisanale",
                description: "Nous croyons en la fabrication artisanale, où chaque produit est préparé avec soin et attention. Nous n'utilisons que des ingrédients de première qualité et respectons les méthodes traditionnelles pour garantir une expérience gustative authentique."
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                title: "Développement Durable",
                description: "Nous nous engageons à minimiser notre impact environnemental en privilégiant les fournisseurs locaux, en réduisant nos déchets et en utilisant des emballages écologiques. Nous croyons qu'il est possible de créer des produits délicieux tout en respectant notre planète."
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                title: "Innovation Constante",
                description: "Tout en respectant les traditions, nous croyons en l'innovation continue. Nous explorons constamment de nouvelles saveurs, techniques et concepts pour offrir à nos clients des expériences gustatives uniques et mémorables."
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-50 p-10 rounded-xl shadow-md border border-gray-100"
              >
                <motion.div 
                  className="text-accent text-4xl mb-6 bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center"
                  custom={i}
                  variants={valueIconVariants}
                  whileHover="hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {value.icon}
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section Équipe */}
        <motion.section 
          ref={teamRef}
          className="max-w-7xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={teamControls}
        >
          <motion.div variants={itemVariants} className="inline-block mb-8">
            <motion.span 
              className="inline-block text-button font-medium text-lg mb-4 px-4 py-1.5 rounded-full bg-button/10 mx-auto block w-fit"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Qui sommes-nous
            </motion.span>
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16 text-center"
            variants={itemVariants}
          >
            Notre <span className="text-button">Équipe</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                image: "/images/team-1.jpg",
                name: "Thomas Dupont",
                title: "Co-fondateur & Chef Pâtissier",
                description: "Avec plus de 15 ans d'expérience dans la pâtisserie de luxe, Thomas apporte son expertise et sa créativité à chaque recette que nous développons."
              },
              {
                image: "/images/team-2.jpg",
                name: "Sophie Martin",
                title: "Co-fondatrice & Directrice",
                description: "Sophie supervise les opérations quotidiennes et s'assure que chaque aspect de notre entreprise reflète notre engagement envers la qualité et le service client."
              },
              {
                image: "/images/team-3.jpg",
                name: "Lucas Moreau",
                title: "Chef de Développement",
                description: "Lucas est responsable de la recherche et du développement de nouvelles saveurs et produits, combinant innovation et respect des traditions artisanales."
              }
            ].map((member, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-100"
              >
                <motion.div 
                  className="relative h-64 w-64 rounded-full overflow-hidden mx-auto mb-8 border-4 border-accent/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{member.name}</h3>
                <p className="text-accent mb-6 font-medium">{member.title}</p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}