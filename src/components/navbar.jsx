import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context";

export default function Navbar() {
  // to get the context value and pass the state
  const { search, setSearch, handleSubmit } = useContext(GlobalContext);

  // console.log(search);

  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      <h2 className="text-2xl font-semibold">
        {" "}
        <NavLink
          className="text-black hover:text-gray-700 duration-300"
          to={"/"}
        >
          FoodRecipe
        </NavLink>
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search Recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-black-100 focus:shadow-black-200 "
        />
      </form>
      <ul className="flex gap-4">
        <li>
          <NavLink
            className="text-black hover:text-gray-700 duration-300"
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-black hover:text-gray-700 duration-300"
            to={"/favorite"}
          >
            Favorite
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
