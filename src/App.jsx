import Dice from "./Dice";
import patterntop from "../assets/pattern_top.png";
import patternBottom from "../assets/pattern_bottom.png";
import buttonClick from "../assets/icon.png";
import dicePhoto from "../assets/3.png";

function App() {
  return (
    <div
      style={{
        width: 428,
        height: 926,
        position: "relative",
        margin: "0 auto",
        boxSizing: "border-box",
        overflow: "hidden",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "radial-gradient(102.36% 100% at 50% 0%, #9955FF 0%, #181A20 100%)",
      }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${patterntop})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "auto",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${patternBottom})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "auto",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Dice buttonClick={buttonClick} dicePhoto={dicePhoto} />
      </div>
    </div>
  );
}

export default App;
