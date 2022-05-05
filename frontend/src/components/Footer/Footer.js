import { AiFillGithub } from "react-icons/ai";
import { IoRocketSharp } from "react-icons/io5";
import "./Footer.css";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#02175a",
        minHeight: "100px",
        marginTop: "40px",
      }}
    >
      <div style={{}}>
        <div className="externalLink">
          <a
            href="https://github.com/leonardo-bravop/Dream-Screen"
            id="repoLink"
          >
            <AiFillGithub size={"1.6em"} />
            <span style={{ marginLeft: "10px" }}>Source Code here!</span>
          </a>
        </div>
        <div className="externalLink">
          <a
            href="https://leonardo-bravop.netlify.app/"
            className="externalLink"
            id="portfolioLink"
          >
            <IoRocketSharp size={"1.4em"} id="rocket-icon" />
            <span style={{ marginLeft: "10px" }}>Visit my portfolio :)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
