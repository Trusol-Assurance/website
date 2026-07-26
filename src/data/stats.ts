export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  /** The last stat ("0 surprises") is static in the original — no count-up. */
  animate: boolean;
};

export const stats: Stat[] = [
  { value: 25, suffix: "+", label: "Frameworks & standards covered", animate: true },
  { value: 2, label: "Disciplines under one roof", animate: true },
  { value: 365, label: "Days a year we're in your corner", animate: true },
  { value: 0, label: "Surprises — at audit time or tax time", animate: false },
];
