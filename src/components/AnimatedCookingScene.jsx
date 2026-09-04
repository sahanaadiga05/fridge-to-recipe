import { motion } from "framer-motion";

function AnimatedCookingScene({ shouldReduceMotion }) {
  const instant = shouldReduceMotion ? { duration: 0 } : undefined;

  return (
    <motion.svg
      className="cartoon-scene"
      viewBox="0 0 800 720"
      role="img"
      aria-label="A cartoon chef cooks while a chicken reacts dramatically"
      initial={shouldReduceMotion ? { opacity: 1, x: 0, y: 0, scaleX: 0.92, scaleY: 0.92 } : { opacity: 0, x: 190, y: 180, scaleX: 0.7, scaleY: 1.28 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0, scaleX: 0.92, scaleY: 0.92 }
          : {
              opacity: [0, 1, 1, 1, 1],
              x: [190, 190, 190, 125, 0],
              y: [180, -18, 10, 0, 0],
              scaleX: [0.7, 1.17, 0.96, 0.94, 0.9],
              scaleY: [1.28, 0.88, 1.05, 0.96, 0.9],
            }
      }
      transition={instant || { duration: 4.8, times: [0, 0.1, 0.2, 0.72, 1], ease: "easeInOut" }}
    >
      <motion.g
        style={{ transformOrigin: "398px 282px" }}
        animate={shouldReduceMotion ? {} : { rotate: [0, 0, 3, -4, 0, 0] }}
        transition={instant || { duration: 3.25, times: [0, 0.28, 0.42, 0.55, 0.7, 1], ease: "easeInOut" }}
      >
        <path className="cartoon-body" d="M255 630 L282 418 Q395 370 515 420 L562 630 Z" />
        <path className="cartoon-apron" d="M300 430 Q400 465 505 430 L530 630 L275 630 Z" />
        <path className="cartoon-collar" d="M344 420 L395 478 L450 420" />

        <motion.g
          style={{ transformOrigin: "395px 270px" }}
          animate={shouldReduceMotion ? {} : { rotate: [0, -2, 4, -3, 0] }}
          transition={instant || { duration: 2.5, delay: 0.65, times: [0, 0.28, 0.56, 0.78, 1], ease: "easeInOut" }}
        >
          <path className="cartoon-hat" d="M280 202 Q242 114 332 105 Q383 40 444 101 Q534 80 554 157 Q566 219 485 229 Q387 254 280 202 Z" />
          <ellipse className="cartoon-head" cx="397" cy="290" rx="125" ry="124" />
          <path className="cartoon-ear" d="M280 284 Q238 272 252 331 Q268 359 297 334" />
          <path className="cartoon-ear" d="M514 284 Q552 272 538 331 Q522 359 493 334" />

          <motion.path
            className="cartoon-brow"
            d="M327 244 Q356 218 382 244"
            animate={shouldReduceMotion ? {} : { y: [0, 0, -8, 3, 0] }}
            transition={instant || { duration: 1.1, delay: 1.1, times: [0, 0.4, 0.58, 0.78, 1] }}
          />
          <motion.path
            className="cartoon-brow"
            d="M412 244 Q443 216 470 245"
            animate={shouldReduceMotion ? {} : { y: [0, 0, -8, 3, 0] }}
            transition={instant || { duration: 1.1, delay: 1.1, times: [0, 0.4, 0.58, 0.78, 1] }}
          />
          <ellipse className="cartoon-eye" cx="355" cy="276" rx="25" ry="34" />
          <ellipse className="cartoon-eye" cx="443" cy="276" rx="25" ry="34" />
          <circle className="cartoon-pupil" cx="361" cy="281" r="10" />
          <circle className="cartoon-pupil" cx="437" cy="281" r="10" />
          <motion.path
            className="cartoon-eyelid"
            d="M418 275 Q443 254 468 275"
            style={{ transformOrigin: "443px 275px" }}
            animate={shouldReduceMotion ? {} : { scaleY: [0, 0, 1.8, 0, 0] }}
            transition={instant || { duration: 0.65, delay: 1.35, times: [0, 0.38, 0.53, 0.7, 1], ease: "easeInOut" }}
          />
          <path className="cartoon-nose" d="M388 293 Q397 276 409 293 Q407 315 395 315 Q384 315 388 293 Z" />
          <motion.g
            style={{ transformOrigin: "396px 331px" }}
            animate={shouldReduceMotion ? {} : { rotate: [0, 0, 4, -3, 0] }}
            transition={instant || { duration: 1.25, delay: 1.55, times: [0, 0.4, 0.6, 0.8, 1] }}
          >
            <path className="cartoon-moustache" d="M393 323 Q350 290 310 326 Q337 355 390 341 Q443 355 484 326 Q444 290 400 323 Z" />
          </motion.g>
          <motion.path
            className="cartoon-mouth"
            d="M359 365 Q397 405 439 365 Q399 386 359 365 Z"
            style={{ transformOrigin: "399px 368px" }}
            animate={shouldReduceMotion ? {} : { scaleY: [1, 1, 1.6, 0.85, 1] }}
            transition={instant || { duration: 1.25, delay: 1.7, times: [0, 0.42, 0.61, 0.8, 1] }}
          />
        </motion.g>

        <motion.g
          style={{ transformOrigin: "289px 430px" }}
          animate={shouldReduceMotion ? {} : { rotate: [0, -3, -21, -8, -3] }}
          transition={instant || { duration: 2.6, delay: 1.35, times: [0, 0.27, 0.52, 0.72, 1], ease: "easeInOut" }}
        >
          <path className="cartoon-sleeve" d="M303 424 Q222 421 176 499 Q170 548 224 557 Q276 519 333 476 Z" />
          <path className="cartoon-hand" d="M193 500 Q157 509 167 544 Q180 566 214 547 L248 515 Q232 480 193 500 Z" />
          <path className="cartoon-spoon-handle" d="M194 509 L100 350" />
          <ellipse className="cartoon-spoon" cx="85" cy="327" rx="34" ry="54" transform="rotate(-31 85 327)" />
        </motion.g>

        <motion.g
          style={{ transformOrigin: "507px 430px" }}
          animate={shouldReduceMotion ? {} : { rotate: [0, 2, 8, -16, -4] }}
          transition={instant || { duration: 2.6, delay: 1.35, times: [0, 0.27, 0.52, 0.72, 1], ease: "easeInOut" }}
        >
          <path className="cartoon-sleeve" d="M492 426 Q574 408 631 476 Q650 523 605 552 Q548 514 470 473 Z" />
          <path className="cartoon-hand" d="M592 488 Q634 486 642 520 Q638 555 603 551 L566 522 Q565 490 592 488 Z" />
          <path className="cartoon-knife-handle" d="M609 511 L657 416" />
          <path className="cartoon-knife" d="M652 424 L686 266 L746 286 L685 445 Z" />
          <motion.path
            className="cartoon-glint"
            d="M691 306 L704 330 L729 340 L705 352 L694 376 L682 352 L658 340 L681 330 Z"
            animate={shouldReduceMotion ? {} : { opacity: [0, 0, 1, 0, 0], scale: [0.5, 0.5, 1.2, 0.8, 0.8] }}
            transition={instant || { duration: 1.15, delay: 2.15, times: [0, 0.35, 0.54, 0.72, 1] }}
          />
        </motion.g>
      </motion.g>

      <motion.g
        style={{ transformOrigin: "290px 565px" }}
        animate={shouldReduceMotion ? {} : { x: [0, 0, -10, 13, -8, 0], y: [0, 0, -6, 8, -5, 0], rotate: [0, 0, -4, 5, -4, 0] }}
        transition={instant || { duration: 1.05, delay: 2.35, times: [0, 0.22, 0.4, 0.58, 0.78, 1], ease: "easeInOut" }}
      >
        <ellipse className="cartoon-pan" cx="285" cy="584" rx="150" ry="64" />
        <path className="cartoon-pan-rim" d="M145 577 Q285 526 426 577" />
        <path className="cartoon-pan-handle" d="M418 583 L536 546" />
        <motion.g
          style={{ transformOrigin: "282px 525px" }}
          animate={shouldReduceMotion ? {} : { y: [0, 0, -6, 6, -4, 0], scaleY: [1, 1, 1.08, 0.95, 1] }}
          transition={instant || { duration: 1.05, delay: 2.35, times: [0, 0.2, 0.45, 0.62, 0.8, 1] }}
        >
          <ellipse className="cartoon-chicken" cx="278" cy="516" rx="85" ry="93" />
          <path className="cartoon-wing" d="M220 525 Q174 510 191 574 Q226 590 250 551" />
          <path className="cartoon-wing" d="M337 525 Q384 510 366 574 Q331 590 306 551" />
          <circle className="cartoon-chicken-eye" cx="252" cy="492" r="13" />
          <circle className="cartoon-chicken-eye" cx="302" cy="492" r="13" />
          <motion.ellipse
            className="cartoon-chicken-mouth"
            cx="277"
            cy="530"
            rx="18"
            ry="11"
            animate={shouldReduceMotion ? {} : { scaleY: [0.3, 0.3, 1.7, 0.5, 1.35, 0.3] }}
            transition={instant || { duration: 0.82, delay: 2.4, times: [0, 0.18, 0.42, 0.58, 0.76, 1] }}
          />
          <path className="cartoon-comb" d="M239 438 Q249 414 261 438 Q274 406 286 438 Q301 415 312 445" />
        </motion.g>
        <path className="cartoon-motion-line" d="M155 485 Q111 504 150 528" />
        <path className="cartoon-motion-line" d="M385 483 Q426 505 386 530" />
      </motion.g>

      <motion.g animate={shouldReduceMotion ? {} : { y: [0, 0, -12, 7, 0], rotate: [0, 0, -5, 4, 0] }} transition={instant || { duration: 1.05, delay: 2.42, times: [0, 0.22, 0.48, 0.68, 1] }}>
        <ellipse className="cartoon-pepper" cx="538" cy="622" rx="50" ry="35" />
        <path className="cartoon-leaf" d="M523 589 Q541 566 562 591 Q541 604 523 589" />
        <ellipse className="cartoon-mushroom" cx="457" cy="639" rx="38" ry="25" />
      </motion.g>

      <motion.g className="cartoon-steam" animate={shouldReduceMotion ? {} : { y: [0, -34, -58], opacity: [0, 0.9, 0] }} transition={instant || { duration: 1.5, delay: 2.45, repeat: 1, repeatDelay: 0.2 }}>
        <path d="M335 484 Q315 450 343 425" />
        <path d="M370 479 Q349 442 378 414" />
        <path d="M405 484 Q428 448 403 420" />
      </motion.g>
    </motion.svg>
  );
}

export default AnimatedCookingScene;
