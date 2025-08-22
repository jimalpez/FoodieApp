import { FoodCard } from "@/components/food/food-card";

interface FoodGridProps {
  category: string;
  onAddToCart: (item: any) => void;
  searchQuery: string;
}

const foodItems = {
  popular: [
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, and basil",
      price: 18.99,
      image: "/margherita-pizza-basil.png",
      rating: 4.8,
      cookTime: "25-30 min",
    },
    {
      id: "2",
      name: "Classic Burger",
      description: "Beef patty, lettuce, tomato, and special sauce",
      price: 15.99,
      image: "/classic-beef-burger.png",
      rating: 4.6,
      cookTime: "15-20 min",
    },
    {
      id: "3",
      name: "Salmon Sushi Roll",
      description: "Fresh salmon, avocado, and cucumber",
      price: 22.99,
      image: "/salmon-avocado-sushi.png",
      rating: 4.9,
      cookTime: "10-15 min",
    },
    {
      id: "4",
      name: "Chocolate Cake",
      description: "Rich chocolate cake with cream frosting",
      price: 8.99,
      image: "/chocolate-cake-cream-frosting.png",
      rating: 4.7,
      cookTime: "5 min",
    },
  ],
  pizza: [
    {
      id: "5",
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella cheese",
      price: 20.99,
      image: "/pizza-pepperoni.png",
      rating: 4.7,
      cookTime: "25-30 min",
    },
    {
      id: "6",
      name: "Veggie Supreme",
      description: "Bell peppers, mushrooms, olives, and onions",
      price: 19.99,
      image: "/placeholder-ajj9l.png",
      rating: 4.5,
      cookTime: "25-30 min",
    },
  ],
  burgers: [
    {
      id: "7",
      name: "BBQ Bacon Burger",
      description: "BBQ sauce, bacon, and cheddar cheese",
      price: 17.99,
      image: "/bbq-bacon-cheddar-burger.png",
      rating: 4.8,
      cookTime: "15-20 min",
    },
    {
      id: "8",
      name: "Veggie Burger",
      description: "Plant-based patty with fresh vegetables",
      price: 14.99,
      image: "/veggie-burger-fresh.png",
      rating: 4.4,
      cookTime: "15-20 min",
    },
  ],
  sushi: [
    {
      id: "9",
      name: "Dragon Roll",
      description: "Eel, cucumber, and avocado with special sauce",
      price: 24.99,
      image: "/dragon-eel-avocado-sushi.png",
      rating: 4.9,
      cookTime: "10-15 min",
    },
    {
      id: "10",
      name: "California Roll",
      description: "Crab, avocado, and cucumber",
      price: 18.99,
      image: "/california-roll.png",
      rating: 4.6,
      cookTime: "10-15 min",
    },
  ],
  desserts: [
    {
      id: "11",
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: 9.99,
      image: "/tiramisu-dessert.png",
      rating: 4.8,
      cookTime: "5 min",
    },
    {
      id: "12",
      name: "Ice Cream Sundae",
      description: "Vanilla ice cream with chocolate sauce and nuts",
      price: 7.99,
      image: "/ice-cream-sundae.png",
      rating: 4.5,
      cookTime: "5 min",
    },
  ],
  drinks: [
    {
      id: "13",
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 4.99,
      image: "/fresh-orange-juice.png",
      rating: 4.7,
      cookTime: "2 min",
    },
    {
      id: "14",
      name: "Iced Coffee",
      description: "Cold brew coffee with ice and cream",
      price: 5.99,
      image: "/iced-coffee-cream.png",
      rating: 4.6,
      cookTime: "3 min",
    },
  ],
};

export function FoodGrid({
  category,
  onAddToCart,
  searchQuery,
}: FoodGridProps) {
  const items = foodItems[category as keyof typeof foodItems] || [];

  const filteredItems = items.filter(
    (item) =>
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.length === 0 && searchQuery !== "" ? (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground text-lg">
            No items found for "{searchQuery}"
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Try searching for something else
          </p>
        </div>
      ) : (
        filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="animate-in slide-in-from-bottom-8 fade-in-0 duration-700"
            style={{ animationDelay: `${index * 150}ms` }}>
            <FoodCard item={item} onAddToCart={() => onAddToCart(item)} />
          </div>
        ))
      )}
    </div>
  );
}
