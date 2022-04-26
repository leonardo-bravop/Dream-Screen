import { useMatch, useNavigate } from "react-router";
import useInput from "../../hooks/useInput";
import "./SearchForm.css";

const SearchForm = () => {
  const search = useInput();

  const matchUser = useMatch("/user/search/*");
  const navigate = useNavigate();

  const match1 = useMatch("/");
  const match2 = useMatch("/media/multi/*");
  const matchGeneral = match1 || match2;
  const matchTv = useMatch("/media/tv/*");
  const matchMovie = useMatch("/media/movie/*");
  // const matchTv = match1 || match2;

  let mediaType;
  if (matchTv) mediaType = "tv";
  else if (matchMovie) mediaType = "movie";
  else if (matchUser) mediaType = "user";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.value !== "") {
      if (matchGeneral) navigate(`media/multi/search/${search.value}`);
      else if (matchUser) navigate(`user/search/${search.value}`);
      else navigate(`media/${mediaType}/search/${search.value}`);
      document.querySelector(".searchForm").value = "";
      search.onChange(event);
    } else {
      alert("Please enter a search value.");
    }
  };

  return (
    (matchGeneral || matchTv || matchMovie || matchUser) && (
      <form className="searchForm" onSubmit={handleSubmit}>
        <input
          type={"text"}
          name="search"
          {...search}
          className="searchInput"
          placeholder={
            matchGeneral
              ? "What are we watching?"
              : matchTv
              ? "Search a TV show"
              : matchUser
              ? "Search a user"
              : "Search a movie"
          }
        ></input>
        <button type="submit" className="searchSubmitButton">
          SEARCH
        </button>
        <button type="submit" className="searchLens">
          <img src="/lens.svg" style={{ height: "30px", width: "30px" }} />
        </button>
      </form>
    )
  );
};

export default SearchForm;
