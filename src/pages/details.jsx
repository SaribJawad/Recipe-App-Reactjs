import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context";
import { MdArrowOutward } from "react-icons/md";

export default function Details() {
  const params = useParams();
  const { recipeDetails, setRecipeDetails, favList, handleOnClick } =
    useContext(GlobalContext);

  async function getRecipeDetail() {
    // search the recipe by id
    const resp = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${params.id}`
    );
    const data = await resp.json();
    if (data?.data) {
      setRecipeDetails(data?.data);
    }
  }
  useEffect(() => {
    getRecipeDetail();
  }, []);

  return (
    // item details
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* item details img */}
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
            src={recipeDetails?.recipe?.image_url}
          />
        </div>
      </div>
      {/* item detail info */}
      <div className="flex flex-col gap-3">
        <span className="text-lg text-cyan-700 font-medium ">
          {recipeDetails?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetails?.recipe?.title}
        </h3>
        <div>
          <button
            onClick={() => handleOnClick(recipeDetails?.recipe)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 flex items-center gap-2 bg-black text-white"
          >
            {favList &&
            favList.length > 0 &&
            favList.findIndex((item) => item.id === recipeDetails.recipe.id) !==
              -1
              ? `Remove from favorites `
              : `Save as favorites`}
          </button>
        </div>
        {/* ingredients */}
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients :
          </span>
          <ul className="mt-4 flex flex-col gap-3">
            {recipeDetails?.recipe?.ingredients.map((x) => (
              <li>
                <span className="text-xl font-normal text-black">
                  {x.quantity} {x.unit}
                </span>
                <span className="text-xl font-normal text-black">
                  {x.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
