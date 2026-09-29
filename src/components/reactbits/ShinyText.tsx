import React from 'react';

interface ShinyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  style,
  ...props
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${disabled ? 'shiny-text--disabled' : ''} ${className}`}
      style={{
        animationDuration: `${speed}s`,
        ...style,
      }}
      {...props}
    >
      {text}
    </span>
  );
}
