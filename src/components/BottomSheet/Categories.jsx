import useGame from "../../hooks/useGame";
import words from "../../assets/words.json";
export default function Categories() {
  const { game, selectCategory } = useGame();
  const categories = [...new Set(words.map((word) => word.category))];
  const categoriesDOM = categories.map((category, index) => {
    return (
      <button
        key={index}
        id={category.toLocaleLowerCase()}
        onClick={() => selectCategory(category.toLocaleLowerCase())}
        className="text-l  font-normal text-center text-red-800 cursor-pointer p-3 border capitalize"
      >
        {category}
      </button>
    );
  });
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-gray-900">Categories</h2>
      <p>{...game.selectedCategories}</p>
      <div className="flex flex-col gap-2">
        <button
          key="all"
          onClick={() => selectCategory("all")}
          className="text-l font-normal text-center text-red-800 cursor-pointer p-3 border capitalize"
        >
          All
        </button>
        {categoriesDOM}
      </div>
    </div>
  );
}
