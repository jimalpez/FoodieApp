"use client";

import { ShoppingCart, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({
  cartItemCount,
  onCartClick,
  onProfileClick,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                F
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground">FoodieApp</h1>
          </div>

          <div className="flex items-center gap-3">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 animate-in slide-in-from-right-5 duration-200">
                <Input
                  placeholder="Search food..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-64"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange("");
                  }}>
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Button variant="ghost" size="icon" onClick={onProfileClick}>
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
