import { ImSpinner9 } from "react-icons/im";
import "./Spinner.css"

const Spinner = ({size, color="black"}) => {
  return (
    <div className="spinner">
      <ImSpinner9 size={size} color={color}/>
    </div>
  );
};

export default Spinner;
