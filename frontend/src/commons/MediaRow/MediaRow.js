import axios from "axios";
import { useEffect, useState } from "react";
import ResponsiveGrid from "../../commons/ResponsiveGrid";
import Spinner from "../../components/Spinner/Spinner";
import "./MediaRow.css";

const MediaRow = ({ mediaType, state }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/media/${mediaType}/${state}/en-US/1`).then((res) => {
      setMedia(res.data.results);
      setLoading(false);
    });
    setLoading(true);
  }, [state]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "20px",
      }}
      className="gridContainer"
    >
      {loading && (
        <div style={{ position: "absolute", marginTop: "20px" }}>
          <Spinner size={"3em"} />
        </div>
      )}
      {!loading && <ResponsiveGrid media={media} />}
    </div>
  );
};
export default MediaRow;
