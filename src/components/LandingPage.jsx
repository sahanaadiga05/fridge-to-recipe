import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function LandingPage({ onGetStarted }) {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleGetStarted = () => {
    setIsLeaving(true);
    window.setTimeout(onGetStarted, 420);
  };

  return (
    <motion.main
      className="minimal-landing"
      initial={{ opacity: 0 }}
      animate={isLeaving ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeInOut" }}
    >
      <section className="minimal-landing-inner">
        <motion.div
          className="minimal-chef-stage"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            className="minimal-chef-image"
            src="/chef-presentingus.jpeg"
            alt="Chef presenting Fridge to Recipe"
          />
        </motion.div>

        <motion.h1
          className="minimal-title"
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.48, duration: 0.55, ease: "easeOut" }}
        >
          <span>Fridge</span>
          <em>to</em>
          <span>Recipe</span>
        </motion.h1>

        <motion.p
          className="minimal-quote"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.67, duration: 0.5 }}
        >
          Turn what's in your fridge into something delicious.
        </motion.p>

        <motion.button
          type="button"
          className="minimal-cta"
          onClick={handleGetStarted}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Go Make Food
          <ArrowRight size={19} />
        </motion.button>
      </section>
    </motion.main>
  );
}

export default LandingPage;