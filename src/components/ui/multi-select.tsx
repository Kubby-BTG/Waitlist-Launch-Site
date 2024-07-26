import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ISelectProps {
  values: {
    key: string;
    value: string;
  }[];
  placeholder: string;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelect = ({
  values,
  placeholder,
  selectedItems,
  setSelectedItems,
}: ISelectProps) => {
  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== value));
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2 font-bold">
          <span>{placeholder}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {values.map((value, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            onSelect={(e) => e.preventDefault()}
            checked={isOptionSelected(value.key)}
            onCheckedChange={() => handleSelectChange(value.key)}
          >
            {value.value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
