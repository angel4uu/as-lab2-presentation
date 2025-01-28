"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface ComboboxProps {
  data: { value: string; label: string }[];
  elementName: string;
  onSelect: (value: string) => void;
}

export function ComboboxDemo({ data, elementName, onSelect }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : `Select ${elementName}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-white">
      <Command
    filter={(value, search, keywords = []) => {
      const extendValue = value + " " + keywords.join(" ");
      if (extendValue.toLowerCase().includes(search.toLowerCase())) {
        return 1;
      }
      return 0;
    }}
>
          <CommandInput placeholder={`Search ${elementName}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {elementName} found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={[item.label]}
                  onSelect={(currentValue:string) => {
                    console.log(currentValue);
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onSelect(currentValue)
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
