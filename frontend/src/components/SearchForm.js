import { useMatch, useNavigate } from "react-router";
import useInput from "../hooks/useInput"
import "./SearchForm.css"

const SearchForm = () =>{

    const search = useInput();
    const matchUser = useMatch("/user/:id/*");
    const navigate = useNavigate();

    const match1 = useMatch("/media/tv");
    const match2 = useMatch("/media/tv/:id");
    const matchTv = match1 || match2;

    let mediaType;
    if (matchTv) mediaType = "tv";
    else if (matchUser) mediaType = "user";
    else mediaType = "movie";

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (search.value !== "") {
          if (matchUser) navigate(`user/search/${search.value}`);
          else navigate(`search/${mediaType}/${search.value}`);
          document.querySelector(".searchForm").value = "";
          search.onChange(event);
        } else {
          alert("Please enter a search value.");
        }
      };

      
    return (
        <form className="searchForm" onSubmit={handleSubmit}>
              <input
                type={"text"}
                name="search"
                {...search}
                className="searchInput"
                placeholder={
                  matchTv
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
                <img src="/lens.svg" style={{height: "30px", width: "30px"}}/>
              </button>
            </form>
    )
}

export default SearchForm