import type { ButtonHTMLAttributes } from "react";

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "default" }
) {
  const { className = "", variant = "default", ...rest } = props;
  const base = "btn";
  const v = variant === "primary" ? "btn-primary" : "";
  return <button className={`${base} ${v} ${className}`} {...rest} />;
}
