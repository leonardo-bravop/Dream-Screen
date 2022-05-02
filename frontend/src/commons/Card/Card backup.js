import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ data, itemId }) => {

  

  let mediaType;
  data.name ? (mediaType = "tv") : (mediaType = "movie");

  return (
    <div className="card">
      <Link to={`/${mediaType}/${data.id}`}>
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
