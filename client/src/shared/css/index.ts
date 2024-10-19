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

export const menu = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" }
};
