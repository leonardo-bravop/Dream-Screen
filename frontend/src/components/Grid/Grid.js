import Card from "../../commons/Card/Card";
import "./Grid.css";

const Grid = ({ media }) => {
  return (
    <div className="grid">
      {media.map((element) => (
        <Card
          data={element}
          itemId={element.id}
          title={element.name || element.title}
          key={element.id}
        />
      ))}
    </div>
  );
};

export default Grid;
