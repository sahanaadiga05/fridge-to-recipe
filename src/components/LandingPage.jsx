import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const titleLetters = Array.from("Fridge to Recipe");

function FallingTitle({ shouldReduceMotion }) {
  return (
    <h1 className="intro-title" aria-label="Fridge to Recipe">
      {titleLetters.map((letter, index) => {
        if (letter === " ") {
          return <span className="intro-title-space" key={`space-${index}`}>&nbsp;</span>;
        }

        const fallDistance =
          typeof window === "undefined"
            ? 900 + (index % 5) * 85
            : window.innerHeight + 130 + (index % 5) * 85;
        const horizontalOffset = ((index * 13) % 5 - 2) * 18;

        return (
          <motion.span
            className="intro-title-letter"
            key={`${letter}-${index}`}
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0, rotate: 0 }
                : {
                    opacity: 1,
                    x: horizontalOffset,
                    y: -fallDistance,
                    rotate: index % 2 === 0 ? -14 - (index % 3) * 2 : 11 + (index % 3) * 2,
                  }
            }
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 5.25 + index * 0.1,
              type: "spring",
              stiffness: 175,
              damping: 13,
              mass: 0.72,
            }}
          >
            <span
              className="intro-title-letter-inner"
              style={{ animationDelay: `${7.15 + (index % 4) * 0.26}s` }}
            >
              {letter}
            </span>
          </motion.span>
        );
      })}
    </h1>
  );
}

function LandingPage({ onGetStarted }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleGetStarted = () => {
    setIsLeaving(true);
    window.setTimeout(onGetStarted, 420);
  };

  return (
    <motion.main
      className="intro-landing"
      initial={{ opacity: 0 }}
      animate={isLeaving ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeInOut" }}
    >
      <section className="intro-layout" aria-label="Fridge to Recipe introduction">
        <div className="cartoon-scene-stage">
          <img
            className="static-chef-image"
            src="/chef-reference.png"
            alt="Comic chef cooking with a chicken and vegetables"
          />
        </div>

        <div className="intro-content">
          <FallingTitle shouldReduceMotion={shouldReduceMotion} />

          <motion.button
            type="button"
            className="intro-cta"
            onClick={handleGetStarted}
            initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: 0.78 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 7.35,
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
          >
            Go Make Food
            <ArrowRight size={20} strokeWidth={2.5} />
          </motion.button>
        </div>
      </section>
    </motion.main>
  );
}

export default LandingPage;
