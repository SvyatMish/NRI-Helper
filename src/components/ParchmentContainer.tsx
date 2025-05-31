import React from "react";

export const ParchmentContainer: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      style={{
        backgroundImage: 'url("/parchment-texture.jpg")',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
