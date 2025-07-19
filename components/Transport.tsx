"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function ScrollTriggered() {
    const { t } = useTranslation();
    
   type TransportType = {
  title?: string;       
  subtitle?: string;    
  services?: any[];    
};

const transportData = t('transport', { returnObjects: true }) as TransportType;
    const services = transportData?.services || []; 
    
    return (
        <div className="relative w-full py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div style={container}>
                <motion.div 
                    style={headerText}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h2 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A388A] mb-4 md:mb-6"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {transportData.title || "Our Awesome Services"}
                    </motion.h2>
                    <motion.p 
                        className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base px-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {transportData.subtitle || "Providing various transportation modes for your logistics needs"}
                    </motion.p>
                </motion.div>
                
                <div style={cardsGrid}>
                    {services.map((service: any, i: number) => (
                        <Card
                            i={i}
                            emoji={service.emoji}
                            title={service.title}
                            desc={service.description}
                            features={service.features}
                            key={service.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface CardProps {
    emoji: string;
    title: string;
    desc: string;
    features: string[];
    i: number;
}

function Card({ emoji, title, desc, features, i }: CardProps) {
    const [isActive, setIsActive] = useState(false);
    
    const gradientColors = [
        "linear-gradient(135deg, #2A388A 0%, #4F46E5 100%)", 
        "linear-gradient(135deg, #E92429 0%, #F87171 100%)", 
        "linear-gradient(135deg, #2A388A 0%, #E92429 100%)"  
    ];

    const accentColors = ["#2A388A", "#E92429", "#7C3AED"];
    const background = gradientColors[i % gradientColors.length];
    const accentColor = accentColors[i % accentColors.length];

    // Handle both hover and touch interactions
    const handleInteractionStart = () => {
        setIsActive(true);
    };

    const handleInteractionEnd = () => {
        setIsActive(false);
    };

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={handleInteractionStart}
            onHoverEnd={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onTapStart={handleInteractionStart}
            onTap={handleInteractionEnd}
        >
            <motion.div 
                style={{ ...splash, background }} 
                variants={splashVariants}
                animate={isActive ? "active" : "rest"}
            />
            
            <motion.div 
                style={{ ...card, borderTop: `4px solid ${accentColor}` }} 
                variants={cardVariants} 
                className="card"
                custom={i}
            >
                <motion.div 
                    style={{ 
                        fontSize: 48, 
                        marginBottom: 16,
                        cursor: "pointer",
                        userSelect: "none"
                    }}
                    variants={iconVariants}
                    whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                    }}
                    whileTap={{ 
                        scale: 0.9,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.3 }
                    }}
                    onTap={() => {
                        // Add haptic feedback for mobile
                        if (navigator.vibrate) {
                            navigator.vibrate(50);
                        }
                    }}
                >
                    {emoji}
                </motion.div>
                
                <motion.div 
                    style={{ 
                        fontWeight: 700, 
                        fontSize: 20, 
                        marginBottom: 14, 
                        textAlign: "center",
                        color: accentColor,
                        lineHeight: 1.2,
                        cursor: "pointer",
                        userSelect: "none"
                    }}
                    variants={titleVariants}
                    whileHover={{ 
                        scale: 1.05,
                        color: "#1a1a1a",
                        transition: { duration: 0.3 }
                    }}
                    whileTap={{ 
                        scale: 0.95,
                        color: "#1a1a1a",
                        transition: { duration: 0.2 }
                    }}
                >
                    {title}
                </motion.div>
                
                <motion.div 
                    style={{ 
                        fontSize: 14, 
                        color: "#555", 
                        textAlign: "center", 
                        lineHeight: 1.5, 
                        padding: "0 16px",
                        marginBottom: 16,
                        userSelect: "none"
                    }}
                    variants={descVariants}
                >
                    {desc}
                </motion.div>
                
                <motion.div 
                    style={featuresContainer}
                    variants={featuresVariants}
                >
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            style={{ 
                                ...featureItem, 
                                backgroundColor: `${accentColor}15`,
                                borderLeft: `3px solid ${accentColor}`,
                                cursor: "pointer",
                                userSelect: "none"
                            }}
                            variants={featureItemVariants}
                            custom={idx}
                            whileHover={{ 
                                x: 10,
                                backgroundColor: `${accentColor}25`,
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ 
                                scale: 0.95,
                                x: 5,
                                backgroundColor: `${accentColor}30`,
                                transition: { duration: 0.2 }
                            }}
                            onTap={() => {
                                // Add haptic feedback for mobile
                                if (navigator.vibrate) {
                                    navigator.vibrate(30);
                                }
                            }}
                        >
                            <motion.span 
                                style={{ color: accentColor, marginRight: 8 }}
                                animate={{ 
                                    scale: isActive ? [1, 1.2, 1] : 1,
                                    rotate: isActive ? [0, 360] : 0
                                }}
                                transition={{ 
                                    duration: 0.6,
                                    delay: idx * 0.1
                                }}
                            >
                                ✓
                            </motion.span>
                            {feature}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Floating particles effect */}
                <motion.div
                    style={particlesContainer}
                    variants={particlesVariants}
                    animate={isActive ? "active" : "rest"}
                >
                    {[...Array(5)].map((_, idx) => (
                        <motion.div
                            key={idx}
                            style={{
                                ...particle,
                                backgroundColor: accentColor,
                                left: `${20 + idx * 15}%`,
                                top: `${30 + idx * 10}%`,
                            }}
                            variants={particleVariants}
                            custom={idx}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// === ANIMASI VARIANTS ===
const cardVariants: Variants = {
    offscreen: {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotateX: -15,
    },
    onscreen: (i: number) => ({
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
            delay: i * 0.2,
            staggerChildren: 0.1,
        },
    }),
    hover: {
        y: -15,
        scale: 1.03,
        rotateX: 5,
        rotateY: 5,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 0.4,
        },
    },
    tap: {
        y: -10,
        scale: 0.98,
        rotateX: 2,
        rotateY: 2,
        transition: {
            type: "spring",
            bounce: 0.5,
            duration: 0.3,
        },
    },
};

const splashVariants: Variants = {
    rest: {
        scale: 1,
        opacity: 0.1,
        rotate: 0,
    },
    active: {
        scale: 1.1,
        opacity: 0.2,
        rotate: 5,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const iconVariants: Variants = {
    offscreen: { 
        scale: 0, 
        rotate: -180,
        opacity: 0
    },
    onscreen: { 
        scale: 1, 
        rotate: 0,
        opacity: 1,
        transition: { 
            type: "spring", 
            bounce: 0.6,
            delay: 0.2,
            duration: 0.8
        }
    },
    hover: { 
        scale: 1.1, 
        rotate: 10,
        y: -5,
        transition: { duration: 0.3 }
    },
};

const titleVariants: Variants = {
    offscreen: { 
        opacity: 0, 
        y: 20,
        scale: 0.8
    },
    onscreen: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
            delay: 0.3,
            type: "spring",
            bounce: 0.4
        }
    },
};

const descVariants: Variants = {
    offscreen: { 
        opacity: 0, 
        y: 20,
        blur: 10
    },
    onscreen: { 
        opacity: 1, 
        y: 0,
        blur: 0,
        transition: { 
            delay: 0.4,
            duration: 0.6
        }
    },
};

const featuresVariants: Variants = {
    offscreen: { opacity: 0 },
    onscreen: { 
        opacity: 1,
        transition: { 
            delay: 0.5,
            staggerChildren: 0.1
        }
    },
};

const featureItemVariants: Variants = {
    offscreen: { 
        opacity: 0, 
        x: -30,
        scale: 0.8
    },
    onscreen: (i: number) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: i * 0.1,
            type: "spring",
            bounce: 0.4,
            duration: 0.6
        }
    }),
};

const particlesVariants: Variants = {
    rest: {
        opacity: 0,
    },
    active: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const particleVariants: Variants = {
    rest: {
        scale: 0,
        y: 0,
        opacity: 0,
    },
    active: (i: number) => ({
        scale: [0, 1, 0],
        y: [-20, -40, -60],
        opacity: [0, 1, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
        }
    })
};

// === STYLES ===
const headerText: React.CSSProperties = {
    textAlign: "center",
    marginBottom: 60,
    maxWidth: 900,
    marginLeft: "auto",
    marginRight: "auto",
};

const container: React.CSSProperties = {
    margin: "40px auto",
    maxWidth: 1400,
    paddingBottom: 80,
    width: "100%",
    padding: "0 20px",
    position: "relative",
    zIndex: 10,
};

const cardsGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0 10px",
    maxWidth: 1200,
    margin: "0 auto",
};

const cardContainer: React.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    maxWidth: 320,
    margin: "0 auto",
    paddingTop: 0,
    marginBottom: 0,
    perspective: "1000px",
    touchAction: "manipulation", 
};

const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
    opacity: 0.1,
};

const card: React.CSSProperties = {
    fontSize: 16,
    width: "100%",
    maxWidth: 300,
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05)",
    transformOrigin: "center center",
    padding: "30px 16px 24px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    position: "relative",
    overflow: "hidden",
    touchAction: "manipulation",
    margin: "20px 0",
};

const featuresContainer: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: 0,
};

const featureItem: React.CSSProperties = {
    fontSize: 12,
    padding: "8px 12px",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    margin: "0 8px",
    lineHeight: 1.3,
    transition: "all 0.3s ease",
    minHeight: 32,
};

const particlesContainer: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
};

const particle: React.CSSProperties = {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: "50%",
    opacity: 0.7,
};