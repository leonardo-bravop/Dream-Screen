import Card from "../commons/Card";
import "./Card.css"

const Grid = ({ media }) => {
  return (
    <div className="flexRowJustified">
      {media.map((element) => (
        <div className="column" key={element.id}>
          <Card data={element} />
        </div>
      ))}
    </div>
  );
};

export default Grid;
