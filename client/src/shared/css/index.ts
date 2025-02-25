export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delayChildren: 1 } }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const linkHoverTap = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 }
};

export const linkHoverTapLight = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.9 }
};

export const menu = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" }
};

export const slideOnHoverRight = {
  whileHover: {
    x: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const cardAnimations = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: {
    scale: 0.9
  }
};
