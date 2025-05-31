export type CustomComponent<T = unknown> = React.FC<
  T & {
    className?: string;
    children?: React.ReactNode;
  }
>;
