"use client";

import { Star, Clock, Plus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface FoodCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    cookTime: string;
  };
  onAddToCart: () => void;
}

export function FoodCard({ item, onAddToCart }: FoodCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart();
    // Reset animation state after animation completes
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
      <div className="relative overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {item.rating}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-background/90">
            <Clock className="w-3 h-3 mr-1" />
            {item.cookTime}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-card-foreground">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className={`w-full group-hover:bg-primary/90 transition-all duration-300 ${
            isAdding ? "animate-pulse bg-green-500 hover:bg-green-500" : ""
          }`}
          size="lg"
          disabled={isAdding}>
          <Plus
            className={`w-4 h-4 mr-2 transition-transform duration-300 ${
              isAdding ? "rotate-90 scale-125" : ""
            }`}
          />
          {isAdding ? "Added!" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
