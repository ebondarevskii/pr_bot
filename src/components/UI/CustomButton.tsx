import React from "react";
import { Loading as LoadingIcon } from "../icons/Loading";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center outline-none rounded-lg font-medium transition-colors";

  const variantClasses = {
    primary:
      "flex-1 h-9 px-4 py-2 bg-green-50 rounded-lg flex justify-center items-center gap-2 text-green-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger:
      "flex-1 h-9 px-4 py-2 bg-red-100 rounded-lg flex justify-center items-center gap-2 text-red-600",
  };

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <LoadingIcon />}
      {children}
    </button>
  );
};
