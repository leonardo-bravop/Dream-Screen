import { useContext } from "react";
import { Link } from "react-router-dom";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import "./Card.css";

const Card = ({ data, itemId, title, onClick }) => {

  const visibility = useContext(VisibilityContext);

  let mediaType;
  data.name ? (mediaType = "tv") : (mediaType = "movie");

  return (
    <div className="card"  onClick={() => onClick(visibility)} tabIndex={0}>
      <Link to={`/media/${mediaType}/${data.id}`}>
        {/* <div className="card-img"> */}
        <figure className="image">
          <img
            className="card-img"
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w154/${data.poster_path}`
                : `/placeholder-image.png`
            }
            alt={title}
          />
        </figure>
        {/* </div> */}
        <div className="card-content">
          <p>{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
