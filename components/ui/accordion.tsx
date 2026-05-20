"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

export function Accordion({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode
  defaultValue?: string
  className?: string
}) {
  const [activeValue, setActiveValue] = React.useState<string | undefined>(defaultValue)

  const onValueChange = React.useCallback((val: string) => {
    setActiveValue((prev) => (prev === val ? undefined : val))
  }, [])

  return (
    <AccordionContext.Provider value={{ value: activeValue, onValueChange }}>
      <div className={cn("space-y-1", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItemContext = React.createContext<{ value: string }>({ value: "" })

export function AccordionItem({
  children,
  value,
  className,
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("border-b border-zinc-200 dark:border-zinc-800", className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { value, onValueChange } = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  const isOpen = value === item.value

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline text-left text-zinc-900 dark:text-zinc-100",
        className
      )}
      onClick={() => onValueChange?.(item.value)}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-250 dark:text-zinc-400",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { value } = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  const isOpen = value === item.value

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[800px] pb-4 opacity-100" : "max-h-0 opacity-0 pb-0",
        className
      )}
    >
      {children}
    </div>
  )
}
export default Accordion;
