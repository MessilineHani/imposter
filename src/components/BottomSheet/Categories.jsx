import useGame from "../../hooks/useGame";
import words from "../../assets/words.json";
export default function Categories() {
  const categories = [...new Set(words.map((word) => word.category))];
  const categoriesDOM = categories.map((category, index) => {
    return (
      <button
        key={index}
        id={category.toLocaleLowerCase()}
        className="text-l font-normal text-center text-red-800 cursor-pointer p-3 border capitalize"
      >
        {category}
      </button>
    );
  });
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-gray-900">Categories</h2>
      <div className="flex flex-col gap-2">
        <button key="all" className="text-l font-normal text-center text-red-800 cursor-pointer p-3 border capitalize">
          All
        </button>
        {categoriesDOM}
      </div>
    </div>
  );
}
