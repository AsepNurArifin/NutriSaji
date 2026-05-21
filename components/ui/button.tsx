import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 active:bg-emerald-700":
              variant === "default",
            "bg-red-500 text-white shadow-sm hover:bg-red-650":
              variant === "destructive",
            "border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 hover:text-zinc-900":
              variant === "outline",
            "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-200":
              variant === "secondary",
            "hover:bg-zinc-100 hover:text-zinc-900":
              variant === "ghost",
            "text-emerald-600 underline-offset-4 hover:underline":
              variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-11 rounded-md px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
