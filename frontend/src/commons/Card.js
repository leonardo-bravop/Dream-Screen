import { Link } from "react-router-dom";
import "./Card.css"

const Card = ({ data }) => {
  let mediaType;
  data.name ? (mediaType = "tv") : (mediaType = "movie");

  return (
    <div className="card">
      <Link to={`/${mediaType}/${data.id}`}>
        <div>
          <figure className="image">
            <img
              style={{
                width: "180px",
                height: "270px",
                objectFit: "cover",
                borderRadius: "4px 4px 0 0",
              }}
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w154/${data.poster_path}`
                  : `/placeholder-image.png`
              }
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div style={{ textAlign: "center", width: "180px" }}>
          {data.title || data.name}
        </div>
      </Link>
    </div>
  );
};

export default Card;
