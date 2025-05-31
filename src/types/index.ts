export type CustomComponent<T = unknown> = T & {
  className?: string;
  children?: React.ReactNode;
};
