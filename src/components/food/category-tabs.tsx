"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "popular", label: "Popular" },
  { id: "pizza", label: "Pizza" },
  { id: "burgers", label: "Burgers" },
  { id: "sushi", label: "Sushi" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export function CategoryTabs({
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="mb-6">
      <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
        <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-none lg:flex">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
