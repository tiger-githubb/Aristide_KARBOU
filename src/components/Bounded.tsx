import React from "react";
import clsx from "clsx";

type BondedProps = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
};

const Bounded = React.forwardRef<HTMLDivElement, BondedProps>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx(`px-6 py-10 md:py-14 lg:py-16`, className)}
        {...restProps}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";

export default Bounded;
