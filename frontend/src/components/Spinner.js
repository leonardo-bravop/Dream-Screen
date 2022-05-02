import { ImSpinner9 } from "react-icons/im";
import "./Spinner.css"

const Spinner = ({size}) => {
  return (
    <div className="spinner">
      <ImSpinner9 size={size}/>
    </div>
  );
};

export default Spinner;
