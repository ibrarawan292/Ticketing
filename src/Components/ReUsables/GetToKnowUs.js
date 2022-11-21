import React, { useContext } from "react";
import { ThemeContext } from "../../App";
// import faq from "../../Assets/Images/faq-img1.png";
import Accordion from "./Accordion";

function GetToKnowUs() {
  const { DarkMode } = useContext(ThemeContext);

  return (
    <section
      style={DarkMode === true ? { color: "var(--txtColor2)" } : { color: "" }}
      className="lg:pb-10 flex justify-center"
    >
      <div className="w-10/12 flex flex-col justify-center items-center lg:w-2/3">
        <h2 className="text-4xl py-5">Get To Know Us</h2>
        <Accordion />
      </div>
    </section>
  );
}

export default GetToKnowUs;
