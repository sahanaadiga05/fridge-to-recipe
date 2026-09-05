import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BusFront, CarTaxiFront, Cat, Rabbit } from "lucide-react";

const titleRows = [
  { text: "FriDGe", className: "intro-title-row-fridge", delay: 2.05 },
  { text: "to", className: "intro-title-row-to", delay: 2.95 },
  { text: "rECiPe", className: "intro-title-row-recipe", delay: 3.35 },
];
function FallingTitle({ shouldReduceMotion }) {
  return (
    <h1 className="intro-title" aria-label="FRiDGe to rECiPe">
      {titleRows.map(({ text, className, delay }, rowIndex) => (
        <span className={`intro-title-row ${className}`} key={text}>
          {Array.from(text).map((letter, index) => {
            const sequenceIndex = rowIndex * 7 + index;
            const fallDistance =
              typeof window === "undefined"
                ? 900 + (sequenceIndex % 5) * 85
                : window.innerHeight + 130 + (sequenceIndex % 5) * 85;
            const horizontalOffset = ((sequenceIndex * 13) % 5 - 2) * 18;

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
                        rotate: sequenceIndex % 2 === 0 ? -14 - (sequenceIndex % 3) * 2 : 11 + (sequenceIndex % 3) * 2,
                      }
                }
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : delay + index * 0.1,
                  type: "spring",
                  stiffness: 175,
                  damping: 13,
                  mass: 0.72,
                }}
              >
                <span
                  className="intro-title-letter-inner"
                  style={{ animationDelay: `${3.95 + (sequenceIndex % 4) * 0.26}s` }}
                >
                  {letter}
                </span>
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function FridgeIntro({ isOpening, onOpen }) {
  return (
    <section className={`fridge-intro${isOpening ? " fridge-intro-opening" : ""}`} aria-label="Open the fridge to begin">
      <div className="fridge-kitchen-decor" aria-hidden="true" />

      <div className="fridge-unit">
        <div className="fridge-cavity" aria-hidden="true">
          <span className="fridge-light" />
          <span className="fridge-shelf fridge-shelf-one" />
          <span className="fridge-shelf fridge-shelf-two" />
        </div>

        <button
          type="button"
          className="fridge-door fridge-door-top"
          onClick={onOpen}
          disabled={isOpening}
          aria-label="Open the top fridge door"
        >
          <span className="fridge-door-shine" />
          <span className="fridge-tap-hint fridge-tap-hint-single" aria-hidden="true">Tap this<br />door</span>
          <span className="fridge-magnet fridge-magnet-eiffel" aria-hidden="true"><img src="/eiffel-tower-magnet.png" alt="" /></span>
          <span className="fridge-handle" />
        </button>

        <div className="fridge-door fridge-door-bottom" aria-hidden="true">
          <span className="fridge-door-shine" />
          <span className="fridge-magnet fridge-magnet-bus"><BusFront /></span>
          <span className="fridge-magnet fridge-magnet-cat"><Cat /></span>
          <span className="fridge-magnet fridge-magnet-taxi"><CarTaxiFront /></span>
          <span className="fridge-magnet fridge-magnet-rabbit"><Rabbit /></span>
          <span className="fridge-handle" />
        </div>
      </div>
    </section>
  );
}

function LandingPage({ onGetStarted }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [showHero, setShowHero] = useState(false);
  const [isFridgeOpening, setIsFridgeOpening] = useState(false);

  const handleFridgeOpen = () => {
    if (isFridgeOpening) {
      return;
    }

    setIsFridgeOpening(true);
    window.setTimeout(() => {
      setShowHero(true);
    }, shouldReduceMotion ? 0 : 1300);
  };

  const handleGetStarted = () => {
    setIsLeaving(true);
    window.setTimeout(onGetStarted, 420);
  };

  return (
    <motion.main
      className={`intro-landing${showHero ? " intro-landing-hero" : ""}`}
      initial={{ opacity: 0 }}
      animate={isLeaving ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeInOut" }}
    >
      {!showHero && <FridgeIntro isOpening={isFridgeOpening} onOpen={handleFridgeOpen} />}

      {showHero && <section className="intro-layout" aria-label="Fridge to Recipe introduction">
        <div className="cartoon-scene-stage">
          <svg className="chef-water-backdrop chef-water-backdrop-visible" viewBox="0 0 600 850" aria-hidden="true">
            <defs>
              <path id="chef-water-shape" d="M132 16 C232 -12 275 52 211 88 C151 122 91 86 81 160 C69 243 183 218 184 289 C185 362 55 354 61 440 C67 521 194 493 184 580 C174 667 66 643 92 727 C116 806 225 762 274 807 C321 850 384 779 447 808 C519 841 584 781 540 714 C505 663 429 677 447 599 C466 518 587 532 570 447 C554 368 432 381 447 295 C461 217 582 219 544 143 C508 72 426 116 377 67 C323 13 227 65 132 16 Z" />
              <mask id="chef-water-dash-mask" x="-20%" y="-20%" width="140%" height="140%">
                <rect x="-100" y="-100" width="800" height="1050" fill="#ffffff" />
                <use href="#chef-water-shape" fill="#000000" stroke="#000000" strokeWidth="25" />
              </mask>
            </defs>
            <use className="water-dashed-outline" href="#chef-water-shape" mask="url(#chef-water-dash-mask)" />
            <use className="water-outline-gap" href="#chef-water-shape" />
            <use className="water-fill" href="#chef-water-shape" />
            <path className="water-ripple water-ripple-one" d="M115 205 C150 173 188 176 217 198" />
            <path className="water-ripple water-ripple-two" d="M416 139 C455 112 498 120 522 148" />
            <path className="water-ripple water-ripple-three" d="M427 614 C463 579 506 590 527 621" />
            <path className="water-ripple water-ripple-four" d="M119 662 C150 632 190 642 210 670" />
            <path className="water-squiggle" d="M478 309 C450 322 461 343 481 339 C501 335 494 361 473 366" />
            <path className="water-squiggle water-squiggle-low" d="M143 412 C118 425 132 445 150 440 C169 435 164 458 143 463" />
          </svg>
          <img
            className="static-chef-image"
            src="/chef-reference.png"
            alt="Chef cooking with a chicken and vegetables"
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
              delay: shouldReduceMotion ? 0 : 4.8,
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
          >
            Prepare food
            <ArrowRight size={20} strokeWidth={2.5} />
          </motion.button>
        </div>
      </section>}
    </motion.main>
  );
}

export default LandingPage;
