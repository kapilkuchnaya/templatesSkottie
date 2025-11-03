"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SortDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SortDropdown({ value, onValueChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort-order" className="text-sm font-medium">Sort by:</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]" id="sort-order">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
