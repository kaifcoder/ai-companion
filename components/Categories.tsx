"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";

interface CategoriesProps {
  data: Category[];
}

const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      {data.map((category) => (
        <button
          className={cn(
            "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transistion"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
