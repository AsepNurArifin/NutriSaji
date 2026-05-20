import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  id?: string
  disabled?: boolean
  className?: string
  required?: boolean
}

export function Checkbox({
  checked,
  onCheckedChange,
  id,
  disabled = false,
  className,
  required,
}: CheckboxProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      onCheckedChange(!checked)
    }
  }

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-required={required}
      tabIndex={disabled ? -1 : 0}
      id={id}
      onClick={() => !disabled && onCheckedChange(!checked)}
      onKeyDown={handleKeyDown}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded border border-zinc-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700",
        checked
          ? "bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500"
          : "bg-white dark:bg-zinc-950",
        "flex items-center justify-center cursor-pointer transition-colors",
        className
      )}
    >
      {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
    </div>
  )
}
export default Checkbox;
