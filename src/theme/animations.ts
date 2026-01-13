export const timing = {
  fast: 150,
  normal: 250,
  slow: 400,
  verySlow: 600,
  stagger: 50,
} as const;

export const spring = {
  gentle: {
    damping: 20,
    stiffness: 100,
  },
  bouncy: {
    damping: 10,
    stiffness: 150,
  },
  snappy: {
    damping: 15,
    stiffness: 200,
  },
  stiff: {
    damping: 25,
    stiffness: 300,
  },
} as const;

export const easing = {
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  sharp: [0.4, 0, 0.6, 1],
} as const;

export type Timing = typeof timing;
export type Spring = typeof spring;
