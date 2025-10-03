import dynamic from "next/dynamic"; 

import Choose from "./choose";
import Tools from "./tools";
import Crack from "./Crack";
import Smart from "./smart";
import Capture from "./Capture";
import Accqrate from "./accqrate";

export default function Home() {
  return (
    <>
      <Accqrate />
      <Smart />
      <Capture />
      <Crack />
      <Tools />
      <Choose />
    </>
  );
}
