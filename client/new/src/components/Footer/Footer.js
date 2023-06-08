import React from "react";
import "./Footer.css";

function Footer() {
    const getFullYear = () => new Date().getFullYear();
    const getFooterCopy = (isIndex) => (isIndex ? "Collaborative Education" : "Collaborative Education main dashboard");

  return (
    <>
      <div className="App-footer">
        Copyright {getFullYear()} - {getFooterCopy()}
      </div>
    </>
  );
}

export default Footer;