import RecipeItem from "../components/recipeitem.jsx";
import { useContext } from "react";
import { GlobalContext } from "../context";

export default function Home() {
  const { recipes, loading } = useContext(GlobalContext);


  if (loading)
    return (
      <div className="lg:text-4xl text-xl text-center text-black font-bold">
        Loading, Kindly wait.
      </div>
    );

  return (
    <div className="container py-8 mx-auto flex flex-wrap justify-center gap-10">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeItem item={recipe} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-bold">
            Nothing to show, Please search something valid.
          </p>
        </div>
      )}
    </div>
  );
}
