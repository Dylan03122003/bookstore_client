import { useBook } from "../../hooks/useBook";

type CategoriesProps = {
  categories: string[];
  contained?: boolean;
};

const Categories = ({ categories, contained = true }: CategoriesProps) => {
  const { getUniqueCategories } = useBook();
  const uniqueCategories = getUniqueCategories();

  const limitedCategories = contained ? categories : categories.slice(0, 2);

  const tagColors = [
    { bgColor: "bg-[#E57373]", textColor: "text-white" },
    { bgColor: "bg-[#FFD54F]", textColor: "text-[#333333]" },
    { bgColor: "bg-[#4DB6AC]", textColor: "text-white" },
    { bgColor: "bg-[#7986CB]", textColor: "text-white" },
    { bgColor: "bg-[#FF8A65]", textColor: "text-[#333333]" },
    { bgColor: "bg-[#66BB6A]", textColor: "text-white" },
    { bgColor: "bg-[#BA68C8]", textColor: "text-white" },
    { bgColor: "bg-[#4FC3F7]", textColor: "text-[#333333]" },
    { bgColor: "bg-[#FFB74D]", textColor: "text-[#333333]" },
    { bgColor: "bg-[#FF80AB]", textColor: "text-white" },
  ];

  const categoriesWithColor = uniqueCategories.map((category, i) => {
    return {
      category,
      bgColor:
        i + 1 <= tagColors.length ? tagColors[i].bgColor : "bg-[#9CCC65]",
      textColor:
        i + 1 <= tagColors.length ? tagColors[i].textColor : "text-white",
    };
  });

  function getBackgroundColor(category: string) {
    return categoriesWithColor.find((item) => item.category === category)
      ?.bgColor;
  }

  function getTextColor(category: string) {
    return categoriesWithColor.find((item) => item.category === category)
      ?.textColor;
  }

  return (
    <div className="flex items-center gap-2">
      {limitedCategories.map((category) => (
        <p
          className={`${getBackgroundColor(category)} ${getTextColor(
            category
          )} px-3 py-1 rounded-md text-sm`}
          key={category}
        >
          {category}
        </p>
      ))}
      {!contained && categories.length >= 3 && (
        <div className="px-3 py-1 rounded-md text-sm bg-gray-500 text-white">
          more...
        </div>
      )}
    </div>
  );
};

export default Categories;
