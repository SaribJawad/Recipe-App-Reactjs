import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favList, setFavList] = useState([]);

  // to navigate to the home page on search
  const navigate = useNavigate();

  // onSubmit of form
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`
      );
      const data = await response.json();
      if (data?.data?.recipes) {
        setRecipes(data.data.recipes);
        setLoading(false);
        setSearch("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  // on click fav BTN
  function handleOnClick(getCurrentId) {
    let copyFavList = [...favList];
    // check index
    const index = copyFavList.findIndex((item) => item.id === getCurrentId.id);

    if (index === -1) {
      copyFavList.push(getCurrentId);
    } else {
      copyFavList.splice(index);
    }

    setFavList(copyFavList);
  }

  console.log(favList, "favlist");

  return (
    <GlobalContext.Provider
      value={{
        search,
        loading,
        recipes,
        setSearch,
        handleSubmit,
        recipeDetails,
        setRecipeDetails,
        favList,
        setFavList,
        handleOnClick,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
