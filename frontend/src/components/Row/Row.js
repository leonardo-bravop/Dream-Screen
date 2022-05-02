import Card from "../../commons/Card/Card";
import "./Row.css";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { useContext, useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const Row = ({ media }) => {
  const [selected, setSelected] = useState([]);
  const [position, setPosition] = useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <div className="slider">
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
      >
        {media.map((element) => (
          <Card
            data={element}
            itemId={element.id} // NOTE: itemId is required for track items
            title={element.name || element.title}
            key={element.id}
            onClick={handleClick(element.id)}
            selected={isItemSelected(element.id)}
          />
        ))}
      </ScrollMenu>
    </div>
  );
};

export default Row;

export function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete,
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <div
        className="arrow-icon"
        style={{
          cursor: disabled ? "default" : "pointer",
        }}
      >
        <IoIosArrowDropleftCircle color="#02175a"/>
      </div>
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow
      disabled={disabled}
      onClick={() => {
        console.log(`flecha derecha`);
        scrollNext();
      }}
    >
      <div
        className="arrow-icon"
        style={{
          cursor: disabled ? "default" : "pointer",
        }}
      >
        <IoIosArrowDroprightCircle color="#02175a"/>
      </div>
    </Arrow>
  );
}

function Arrow({ children, disabled, onClick }) {
  return (
    <div
      style={{
        opacity: disabled ? "0" : "1",
        userSelect: "none",
      }}
      className="arrow-div"
    >
      <button disabled={disabled} onClick={onClick} className="arrow-button">
        {children}
      </button>
    </div>
  );
}

function onWheel(apiObj, ev) {
  var isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }
  if (ev.deltaY < 0) {
    apiObj.scrollPrev();
  } else if (ev.deltaY > 0) {
    apiObj.scrollNext();
  }
}
