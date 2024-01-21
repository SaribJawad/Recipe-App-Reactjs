import { useContext } from "react";
import { GlobalContext } from "../context";
import RecipeItem from "../components/recipeitem.jsx";

export default function Favorite() {
  const { favList } = useContext(GlobalContext);

  return (
    <div className="container py-8 mx-auto flex flex-wrap justify-center gap-10">
      {favList && favList.length > 0 ? (
        favList.map((recipe) => <RecipeItem item={recipe} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-bold">
            Nothing is added.
          </p>
        </div>
      )}
    </div>
  );
}
