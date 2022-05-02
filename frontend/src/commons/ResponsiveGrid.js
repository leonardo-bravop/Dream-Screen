import Card from "../commons/Card/Card";
// import "./Grid.css";

const ResponsiveGrid = ({ media }) => {
  return (
    <>
      {media.map((element) => (
        <Card
          data={element}
          itemId={element.id}
          title={element.name || element.title}
          key={element.id}
        />
      ))}
    </>
  );
};

export default ResponsiveGrid;
