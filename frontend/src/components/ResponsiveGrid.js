import Card from "../commons/Card";
// import "./Grid.css";

const ResponsiveGrid = ({ media }) => {
  return (
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", width: "60%"}}>
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

export default ResponsiveGrid;
