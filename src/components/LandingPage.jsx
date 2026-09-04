import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Apple, ArrowRight, BusFront, CarTaxiFront, Carrot, Cat, Cherry, Citrus, CookingPot, Drumstick, Egg, EggFried, Fish, Milk, Pizza, Rabbit, Salad, Sandwich, Soup, Wheat } from "lucide-react";

const titleRows = [
  { text: "FRIDGE", className: "intro-title-row-fridge", delay: 2.05 },
  { text: "to", className: "intro-title-row-to", delay: 2.95 },
  { text: "RECIPE", className: "intro-title-row-recipe", delay: 3.35 },
];
const foodIcons = [
  { Icon: Drumstick, color: "#de663d" },
  { Icon: Fish, color: "#79a6c8" },
  { Icon: Pizza, color: "#ecbd45" },
  { Icon: Milk, color: "#92bdca" },
  { Icon: Egg, color: "#e7bd4e" },
  { Icon: Pizza, color: "#dc7750" },
  { Icon: Wheat, color: "#dbab3e" },
  { Icon: Salad, color: "#65ad61" },
  { Icon: Carrot, color: "#df6c3f" },
  { Icon: Apple, color: "#d8564d" },
  { Icon: Cherry, color: "#b95368" },
  { Icon: Citrus, color: "#d8b841" },
  { Icon: Sandwich, color: "#c78f43" },
  { Icon: Soup, color: "#729fc5" },
  { Icon: CookingPot, color: "#566d74" },
  { Icon: EggFried, color: "#e8ba45" },
];

function FoodOrbit({ isOrbiting, isLeaving }) {
  return (
    <div className={`food-orbit${!isOrbiting ? " food-orbit-paused" : ""}${isLeaving ? " food-orbit-leaving" : ""}`} aria-hidden="true">
      {foodIcons.map(({ Icon, color }, index) => {
        const startAngle = index * (360 / foodIcons.length);
        const pauseAngle = startAngle + (1 / 22) * 360;

        return (
          <span
            className="food-orbit-item"
            key={`${Icon.displayName || Icon.name}-${index}`}
            style={{
              "--start-angle": `${startAngle}deg`,
              "--counter-angle": `${-startAngle}deg`,
              "--end-angle": `${startAngle + 360}deg`,
              "--end-counter-angle": `${-startAngle - 360}deg`,
              "--pause-angle": `${pauseAngle}deg`,
              "--pause-counter-angle": `${-pauseAngle}deg`,
              "--orbit-radius": "clamp(225px, 25vw, 390px)",
              "--orbit-duration": "22s",
              "--exit-delay": `${index * 55}ms`,
              "--line-offset": `${index * 28}px`,
              "--food-color": color,
            }}
          >
            <Icon aria-hidden="true" />
          </span>
        );
      })}
    </div>
  );
}

function FallingTitle({ shouldReduceMotion }) {
  return (
    <h1 className="intro-title" aria-label="FRIDGE to RECIPE">
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
      <div className="fridge-intro-copy" aria-hidden="true">
        <span>OPEN THE FRIDGE</span>
        <p>Your next recipe is waiting inside.</p>
      </div>

      <div className="fridge-unit">
        <div className="fridge-cavity" aria-hidden="true">
          <span className="fridge-light" />
          <span className="fridge-shelf fridge-shelf-one" />
          <span className="fridge-shelf fridge-shelf-two" />
        </div>

        <button
          type="button"
          className="fridge-door fridge-door-top fridge-door-left"
          onClick={onOpen}
          disabled={isOpening}
          aria-label="Open both upper fridge doors"
        >
          <span className="fridge-door-shine" />
          <span className="fridge-magnet fridge-magnet-bus" aria-hidden="true"><BusFront /></span>
          <span className="fridge-magnet fridge-magnet-cat" aria-hidden="true"><Cat /></span>
          <span className="fridge-handle" />
        </button>

        <button
          type="button"
          className="fridge-door fridge-door-top fridge-door-right"
          onClick={onOpen}
          disabled={isOpening}
          aria-label="Open both upper fridge doors"
        >
          <span className="fridge-door-shine" />
          <span className="fridge-magnet fridge-magnet-taxi" aria-hidden="true"><CarTaxiFront /></span>
          <span className="fridge-magnet fridge-magnet-rabbit" aria-hidden="true"><Rabbit /></span>
          <span className="fridge-handle" />
        </button>

        <div className="fridge-door fridge-door-bottom fridge-door-left" aria-hidden="true">
          <span className="fridge-door-shine" />
          <span className="fridge-handle" />
        </div>

        <div className="fridge-door fridge-door-bottom fridge-door-right" aria-hidden="true">
          <span className="fridge-door-shine" />
          <span className="fridge-handle" />
        </div>

        <span className="fridge-tap-hint fridge-tap-hint-left" aria-hidden="true">Tap the</span>
        <span className="fridge-tap-hint fridge-tap-hint-right" aria-hidden="true">top door</span>
      </div>
    </section>
  );
}

function LandingPage({ onGetStarted }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [showHero, setShowHero] = useState(false);
  const [isFridgeOpening, setIsFridgeOpening] = useState(false);
  const [isOrbiting, setIsOrbiting] = useState(!shouldReduceMotion);
  const [isEmojiLeaving, setIsEmojiLeaving] = useState(shouldReduceMotion);
  const [showChefWater, setShowChefWater] = useState(shouldReduceMotion);

  useEffect(() => {
    if (!showHero) {
      return undefined;
    }

    if (shouldReduceMotion) {
      setIsOrbiting(false);
      setIsEmojiLeaving(true);
      setShowChefWater(true);
      return undefined;
    }

    setIsOrbiting(true);
    setIsEmojiLeaving(false);
    setShowChefWater(false);

    const revealTimer = window.setTimeout(() => {
      setIsOrbiting(false);
      setIsEmojiLeaving(true);
      setShowChefWater(true);
    }, 1000);

    return () => {
      window.clearTimeout(revealTimer);
    };
  }, [shouldReduceMotion, showHero]);

  const handleFridgeOpen = () => {
    if (isFridgeOpening) {
      return;
    }

    setIsFridgeOpening(true);
    window.setTimeout(() => {
      setShowHero(true);
    }, shouldReduceMotion ? 0 : 1000);
  };

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
      {!showHero && <FridgeIntro isOpening={isFridgeOpening} onOpen={handleFridgeOpen} />}

      {showHero && <section className="intro-layout" aria-label="Fridge to Recipe introduction">
        <div className="cartoon-scene-stage">
          <svg className={`chef-water-backdrop${showChefWater ? " chef-water-backdrop-visible" : ""}`} viewBox="0 0 600 850" aria-hidden="true">
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
          {!shouldReduceMotion && <FoodOrbit isOrbiting={isOrbiting} isLeaving={isEmojiLeaving} />}
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
