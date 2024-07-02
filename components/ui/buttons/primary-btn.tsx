import { cn } from "@/lib/utils";
import React from "react";
interface BtnProps {
  children: React.ReactNode;
  className?: string;
  onClick: (e?: any) => void;
  loading?: boolean;
}
export const PrimaryBtn = ({
  children,
  className,
  onClick,
  loading = false,
}: BtnProps) => {
  return (
    <button
      disabled={loading || undefined}
      onClick={onClick || undefined}
      className={cn(
        "p-3 rounded-full border-[#F0F0F0] border-[1px] bg-primary w-full text-[20px] font-[500] text-white",
        className
      )}
    >
      {children}
    </button>
  );
};
