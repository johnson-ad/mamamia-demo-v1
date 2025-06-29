'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Refs pour l'animation basée sur le scroll
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [infoRef, infoInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Contrôles d'animation
  const headerControls = useAnimation();
  const formControls = useAnimation();
  const infoControls = useAnimation();

  // Déclencher les animations lorsque les éléments sont visibles
  useEffect(() => {
    if (headerInView) headerControls.start('visible');
  }, [headerInView, headerControls]);

  useEffect(() => {
    if (formInView) formControls.start('visible');
  }, [formInView, formControls]);

  useEffect(() => {
    if (infoInView) infoControls.start('visible');
  }, [infoInView, infoControls]);

  useEffect(() => {
     // Simuler un temps de chargement pour montrer l'animation
     const timer = setTimeout(() => {
       setIsLoaded(true);
     }, 800);

    // Charger la carte Google Maps
    const loadGoogleMaps = () => {
      if (typeof window !== 'undefined' && !window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap;
        document.head.appendChild(script);
      } else if (typeof window !== 'undefined' && window.google) {
        initMap();
      }
    };

    const initMap = () => {
      const location = { lat: 48.856614, lng: 2.3522219 }; // Paris
      
      // Vérifier si l'API Google Maps est chargée
      if (mapRef.current && typeof window !== 'undefined' && window.google && window.google.maps) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: 15,
          styles: [
            {
              "featureType": "all",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            }
          ]
        });

        // Ajouter un marqueur
        new window.google.maps.Marker({
          position: location,
          map: map,
          title: "Glaces Délices",
          animation: window.google.maps.Animation.DROP
        });
      } else {
        // Fallback si Google Maps n'est pas chargé
        console.log('Google Maps API not loaded');
      }
    };

    loadGoogleMaps();

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setFormStatus('success');
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormStatus(null);
      }, 3000);
    }, 1000);
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants : Variants = {
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

  const cardVariants : Variants = {
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

  const inputVariants: Variants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(var(--color-accent-rgb), 0.3)",
      borderColor: "var(--color-accent)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    unfocused: {
      scale: 1,
      boxShadow: "0 0 0 0px rgba(var(--color-accent-rgb), 0)",
      borderColor: "#e2e8f0",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const iconVariants: Variants = {
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

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.5
      }
    },
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

  const socialIconVariants: Variants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };

  const mapVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.6
      }
    }
  };

  const notificationVariants: Variants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.3
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
              Nous sommes à votre écoute
            </motion.span>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            Contactez-<span className="text-accent">nous</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Une question, une suggestion ou une envie de collaborer ? N&apos;hésitez pas à nous contacter, nous serons ravis d&apos;échanger avec vous.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Formulaire de contact */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={formControls}
            variants={containerVariants}
            className="bg-white p-10 rounded-2xl shadow-md border border-gray-100"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <motion.span 
                className="inline-block mr-3 text-accent bg-accent/10 p-2 rounded-full"
                variants={iconVariants}
                custom={0}
                whileHover="hover"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.span>
              Envoyez-nous un message
            </motion.h2>

            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  key="success"
                  variants={notificationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-8 flex items-center"
                >
                  <svg className="h-5 w-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  key="error"
                  variants={notificationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center"
                >
                  <svg className="h-5 w-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Une erreur s&apos;est produite lors de l&apos;envoi de votre message. Veuillez réessayer ultérieurement.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-gray-800 font-medium mb-2">
                  Nom complet
                </label>
                <motion.div
                  variants={inputVariants}
                  animate={focusedField === 'name' ? 'focused' : 'unfocused'}
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                  Email
                </label>
                <motion.div
                  variants={inputVariants}
                  animate={focusedField === 'email' ? 'focused' : 'unfocused'}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none transition-all duration-300"
                    placeholder="votre.email@exemple.com"
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-gray-800 font-medium mb-2">
                  Sujet
                </label>
                <motion.div
                  variants={inputVariants}
                  animate={focusedField === 'subject' ? 'focused' : 'unfocused'}
                >
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none transition-all duration-300 bg-white"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="question">Question générale</option>
                    <option value="feedback">Retour d'expérience</option>
                    <option value="partnership">Proposition de partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-gray-800 font-medium mb-2">
                  Message
                </label>
                <motion.div
                  variants={inputVariants}
                  animate={focusedField === 'message' ? 'focused' : 'unfocused'}
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                    rows={5}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none transition-all duration-300"
                    placeholder="Votre message ici..."
                  ></textarea>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                  className="bg-accent text-white px-8 py-4 rounded-xl font-medium hover:bg-button transition-colors w-full shadow-md"
                >
                  Envoyer le message
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Informations de contact et carte */}
          <motion.div
            ref={infoRef}
            initial="hidden"
            animate={infoControls}
            variants={containerVariants}
            className="space-y-10"
          >
            <motion.div 
              variants={cardVariants} 
              custom={0}
              whileHover="hover"
              className="bg-white p-10 rounded-2xl shadow-md border border-gray-100"
            >
              <motion.h2 
                variants={itemVariants} 
                className="text-2xl font-bold text-gray-900 mb-8 flex items-center"
              >
                <motion.span 
                  className="inline-block mr-3 text-button bg-button/10 p-2 rounded-full"
                  variants={iconVariants}
                  custom={0}
                  whileHover="hover"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.span>
                Nos coordonnées
              </motion.h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
                    secondIcon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
                    title: "Adresse",
                    content: "123 Avenue des Glaces\n75001 Paris, France"
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                    title: "Téléphone",
                    content: "+33 1 23 45 67 89"
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                    title: "Email",
                    content: "contact@glacesdelices.fr"
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                    title: "Horaires d'ouverture",
                    content: "Lundi - Vendredi: 10h - 19h\nSamedi - Dimanche: 11h - 20h"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start"
                    variants={itemVariants}
                    custom={i}
                  >
                    <motion.div 
                      className="flex-shrink-0 h-12 w-12 rounded-full bg-button/10 flex items-center justify-center mr-5 text-button"
                      variants={iconVariants}
                      custom={i}
                      whileHover="hover"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon}
                        {item.secondIcon && item.secondIcon}
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                variants={itemVariants} 
                className="mt-10 flex space-x-4"
              >
                {[
                  {
                    href: "https://facebook.com",
                    bg: "bg-blue-600",
                    icon: <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  },
                  {
                    href: "https://instagram.com",
                    bg: "bg-gradient-to-r from-purple-500 via-pink-600 to-orange-500",
                    icon: <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  },
                  {
                    href: "https://twitter.com",
                    bg: "bg-blue-400",
                    icon: <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap="tap"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`h-12 w-12 rounded-full ${social.bg} flex items-center justify-center text-white shadow-md`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon}
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              variants={mapVariants} 
              className="rounded-2xl overflow-hidden shadow-md h-96 border border-gray-100"
            >
              {/* Carte Google Maps */}
              <div ref={mapRef} className="w-full h-full">
                {/* Fallback si la carte ne se charge pas */}
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <p className="text-gray-500 flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-accent" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement de la carte...
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}