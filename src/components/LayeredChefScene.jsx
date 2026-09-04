import { motion } from "framer-motion";

const asset = "/chef-reference.png";

function SpriteLayer({ className, children }) {
  return (
    <div className={`chef-layer ${className}`}>
      <img src={asset} alt="" aria-hidden="true" />
      {children}
    </div>
  );
}

function LayeredChefScene({ shouldReduceMotion }) {
  const noMotion = shouldReduceMotion ? { duration: 0 } : undefined;

  return (
    <motion.div
      className="layered-chef"
      aria-label="Comic chef preparing food with a reacting chicken"
      role="img"
      initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: "28vw" }}
      animate={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: [0, 1, 1, 1], x: ["28vw", "28vw", "28vw", 0] }}
      transition={noMotion || { duration: 5.1, times: [0, 0.08, 0.74, 1], ease: "easeInOut" }}
    >
      <motion.div
        className="chef-body-layer"
        initial={shouldReduceMotion ? { scaleX: 1, scaleY: 1 } : { scaleX: 0.72, scaleY: 1.24, y: 130 }}
        animate={
          shouldReduceMotion
            ? { scaleX: 1, scaleY: 1, y: 0 }
            : { scaleX: [0.72, 1.16, 0.95, 1, 1], scaleY: [1.24, 0.88, 1.06, 1, 1], y: [130, -22, 10, 0, 0] }
        }
        transition={noMotion || { duration: 1.25, times: [0, 0.35, 0.62, 0.78, 1], ease: "easeOut" }}
      >
        <SpriteLayer className="layer-torso" />
      </motion.div>

      <motion.div
        className="chef-head-layer"
        animate={shouldReduceMotion ? {} : { rotate: [0, 0, -3, 4, -2, 0] }}
        transition={noMotion || { duration: 1.75, delay: 1.1, times: [0, 0.2, 0.43, 0.64, 0.8, 1], ease: "easeInOut" }}
      >
        <SpriteLayer className="layer-head" />
      </motion.div>

      <motion.div
        className="chef-brows-layer"
        animate={shouldReduceMotion ? {} : { y: [0, 0, -8, 4, 0] }}
        transition={noMotion || { duration: 0.8, delay: 1.45, times: [0, 0.28, 0.52, 0.75, 1] }}
      >
        <SpriteLayer className="layer-brows" />
      </motion.div>

      <motion.div
        className="chef-moustache-layer"
        animate={shouldReduceMotion ? {} : { rotate: [0, 0, 4, -4, 0], y: [0, 0, -3, 2, 0] }}
        transition={noMotion || { duration: 0.9, delay: 1.65, times: [0, 0.25, 0.52, 0.75, 1] }}
      >
        <SpriteLayer className="layer-moustache" />
      </motion.div>

      <motion.div
        className="chef-mouth-layer"
        animate={shouldReduceMotion ? {} : { scaleY: [1, 1, 1.18, 0.88, 1] }}
        transition={noMotion || { duration: 0.75, delay: 1.8, times: [0, 0.28, 0.5, 0.72, 1] }}
      >
        <SpriteLayer className="layer-mouth" />
      </motion.div>

      <span className="chef-right-blink" aria-hidden="true" />

      <motion.div
        className="chef-spoon-arm"
        animate={shouldReduceMotion ? {} : { rotate: [0, 0, -11, 7, -4, 0] }}
        transition={noMotion || { duration: 1.85, delay: 2.05, times: [0, 0.22, 0.5, 0.68, 0.84, 1], ease: "easeInOut" }}
      >
        <SpriteLayer className="layer-spoon-arm" />
      </motion.div>

      <motion.div
        className="chef-knife-arm"
        animate={shouldReduceMotion ? {} : { rotate: [0, 0, 18, -20, -8, 0] }}
        transition={noMotion || { duration: 1.85, delay: 2.05, times: [0, 0.22, 0.5, 0.68, 0.84, 1], ease: "easeInOut" }}
      >
        <SpriteLayer className="layer-knife-arm" />
        <span className="knife-glint" aria-hidden="true">✦</span>
      </motion.div>

      <motion.div
        className="chef-chicken-layer"
        animate={shouldReduceMotion ? {} : { x: [0, 0, -14, 14, -9, 7, 0], y: [0, 0, -14, 8, -10, 4, 0], rotate: [0, 0, -5, 5, -4, 3, 0] }}
        transition={noMotion || { duration: 1.12, delay: 2.72, times: [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1], ease: "easeInOut" }}
      >
        <SpriteLayer className="layer-chicken" />
        <span className="chicken-mouth" aria-hidden="true" />
        <span className="chicken-shout" aria-hidden="true">!</span>
        <span className="chicken-motion chicken-motion-left" aria-hidden="true" />
        <span className="chicken-motion chicken-motion-right" aria-hidden="true" />
      </motion.div>

      <motion.div
        className="chef-pan-layer"
        animate={shouldReduceMotion ? {} : { y: [0, 0, -5, 5, 0] }}
        transition={noMotion || { duration: 0.95, delay: 2.75, times: [0, 0.22, 0.48, 0.7, 1] }}
      >
        <SpriteLayer className="layer-pan" />
      </motion.div>

      <motion.div
        className="chef-vegetables-layer"
        animate={shouldReduceMotion ? {} : { y: [0, 0, -12, 7, 0], rotate: [0, 0, -5, 3, 0] }}
        transition={noMotion || { duration: 0.95, delay: 2.8, times: [0, 0.22, 0.48, 0.7, 1] }}
      >
        <SpriteLayer className="layer-vegetables" />
      </motion.div>

      <div className="chef-steam" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </motion.div>
  );
}

export default LayeredChefScene;
