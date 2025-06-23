import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import RollsBar from "./RollsBar";

const Dice3D = ({ value, rolling }) => {
  const getTransform = (diceValue) => {
    switch (diceValue) {
      case 1:
        return "rotateX(0deg) rotateY(0deg)";
      case 6:
        return "rotateX(180deg) rotateY(0deg)";
      case 2:
        return "rotateX(-90deg) rotateY(0deg)";
      case 5:
        return "rotateX(90deg) rotateY(0deg)";
      case 3:
        return "rotateX(0deg) rotateY(90deg)";
      case 4:
        return "rotateX(0deg) rotateY(-90deg)";
      default:
        return "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <motion.div
      style={{
        position: "relative",
        width: "68px",
        height: "68px",
        transformStyle: "preserve-3d",
      }}
      animate={
        rolling
          ? {
              rotateX: 455,
              rotateY: 455,
            }
          : {
              rotateX:
                value === 1 ? 0 : value === 6 ? 180 : value === 2 ? -90 : value === 5 ? 90 : 0,
              rotateY: value === 3 ? 90 : value === 4 ? -90 : 0,
            }
      }
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          border: "5px solid #f6f3f0",
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #dddbd8, #fff)",
          transform: "translateZ(34px)",
        }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#131210",
            margin: "-10px 0 0 -10px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          border: "5px solid #f6f3f0",
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #dddbd8, #fff)",
          transform: "rotateX(180deg) translateZ(34px)",
        }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#131210",
            margin: "-25px 0 0 -20px",
            boxShadow: "30px 0, 0 20px, 30px 20px, 0 40px, 30px 40px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          border: "5px solid #f6f3f0",
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #dddbd8, #fff)",
          transform: "rotateX(90deg) translateZ(34px)",
        }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#131210",
            margin: "-20px 0 0 -20px",
            boxShadow: "30px 30px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          border: "5px solid #f6f3f0",
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #dddbd8, #fff)",
          transform: "rotateX(-90deg) translateZ(34px)",
        }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#131210",
            margin: "-24px 0 0 -24px",
            boxShadow: "20px 20px, 40px 40px, 40px 0, 0 40px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          border: "5px solid #f6f3f0",
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #dddbd8, #fff)",
          transform: "rotateY(90deg) translateZ(34px)",
        }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#131210",
            margin: "-20px 0 0 -20px",
            boxShadow: "30px 0, 0 30px, 30px 30px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          border: "5px solid #f6f3f0",
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #dddbd8, #fff)",
          transform: "rotateY(-90deg) translateZ(34px)",
        }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#131210",
            margin: "-25px 0 0 -25px",
            boxShadow: "20px 20px, 40px 40px",
          }}
        />
      </div>
    </motion.div>
  );
};

function Dice({ buttonClick, dicePhoto }) {
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [rollingFace, setRollingFace] = useState(1);
  const [rolls, setRolls] = useState(10);
  const refillQueue = useRef([]);
  const [nextRefill, setNextRefill] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [furthestDiceValue, setFurthestDiceValue] = useState(1);

  const BORDER_BOX_COUNT = 20;
  const [highlightedBorderIndex, setHighlightedBorderIndex] = useState(18);

  useEffect(() => {
    setHighlightedBorderIndex((prev) => {
      let next = (prev + dice) % BORDER_BOX_COUNT;
      return next;
    });
  }, [dice]);

  const getRandomFace = (exclude) => {
    let face;
    do {
      face = Math.floor(Math.random() * 6) + 1;
    } while (face === exclude);
    return face;
  };

  useEffect(() => {
    return () => {
      refillQueue.current.forEach(clearTimeout);
    };
  }, []);

  const handleRefill = () => {
    setRolls((prev) => (prev < 10 ? prev + 1 : prev));
    refillQueue.current.shift();
    if (refillQueue.current.length > 0) {
      setNextRefill(
        Date.now() +
          Math.max(
            0,
            refillQueue.current[0]._idleStart + refillQueue.current[0]._idleTimeout - Date.now(),
          ),
      );
    } else {
      setNextRefill(null);
    }
  };

  const rollDice = () => {
    if (rolling || rolls <= 0) {
      return;
    }
    setRolling(true);
    const random = Math.floor(Math.random() * 10);
    let finalFace;
    if (random >= 1 && random <= 6) {
      finalFace = random;
    } else {
      finalFace = Math.floor(Math.random() * 6) + 1;
    }
    setDice(finalFace);
    setRolling(false);
    setRolls((prev) => prev - 1);
    const refillTimeout = setTimeout(handleRefill, 1800000);
    refillQueue.current.push(refillTimeout);
    if (rolls === 10) {
      setNextRefill(Date.now() + 1800000);
    }
  };

  useEffect(() => {
    if (rolls === 10) {
      setSecondsLeft(0);
      return;
    }
    let interval;
    if (nextRefill) {
      interval = setInterval(() => {
        const left = Math.ceil((nextRefill - Date.now()) / 1000);
        setSecondsLeft(left > 0 ? left : 0);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [nextRefill, rolls]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    if (dice > furthestDiceValue) {
      setFurthestDiceValue(dice);
    }
  }, [dice]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 50,
          marginBottom: 8,
          width: "100%",
          justifyContent: "center",
          gap: 16,
        }}>
        <div
          style={{
            flex: 1,
            height: 2,
            background: "linear-gradient(90deg, #FFFFFF33 0%, #FFFFFF 100%)",
            maxWidth: 80,
            borderRadius: 2,
          }}
        />
        <h1
          style={{
            fontFamily: "font/main",
            fontWeight: 800,
            fontSize: 24,
            lineHeight: "100%",
            letterSpacing: 0,
            color: "#FFFFFF",
            margin: 0,
            padding: "0 16px",
            whiteSpace: "nowrap",
          }}>
          Roll Craft
        </h1>
        <div
          style={{
            flex: 1,
            height: 2,
            background: "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF33 100%)",
            maxWidth: 80,
            borderRadius: 2,
          }}
        />
      </div>
      <RollsBar rolls={rolls} secondsLeft={secondsLeft} formatTime={formatTime} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "400px",
        }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 56px)",
            gridTemplateRows: "repeat(6, 56px)",
            gap: "4px",
            justifyContent: "center",
            alignItems: "center",
            width: "356px",
            height: "356px",
          }}>
          {Array.from({ length: 36 }).map((_, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;
            const isBorder = row === 0 || row === 5 || col === 0 || col === 5;
            const isDiceCenter = (row === 2 || row === 3) && (col === 2 || col === 3);
            if (row === 2 && col === 2) {
              return (
                <div
                  key="dice-center"
                  style={{
                    gridColumn: "3 / span 2",
                    gridRow: "3 / span 2",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "transparent",
                    width: "calc(56px * 2 + 4px)",
                    height: "calc(56px * 2 + 4px)",
                  }}>
                  <div
                    style={{
                      perspective: 600,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                    }}>
                    <style>
                      {`
                        @keyframes rolling {
                          50% {
                            transform: rotateX(455deg) rotateY(455deg);
                          }
                        }
                      `}
                    </style>
                    <Dice3D value={dice} rolling={rolling} />
                  </div>
                </div>
              );
            }
            if (isDiceCenter && !(row === 2 && col === 2)) {
              return null;
            }
            if (isBorder) {
              let borderIndex = -1;
              if (row === 0) borderIndex = col;
              else if (col === 5) borderIndex = 6 + (row - 1);
              else if (row === 5) borderIndex = 16 - col;
              else if (col === 0) borderIndex = 16 + (5 - row);
              const isHighlighted = borderIndex === highlightedBorderIndex;
              return (
                <div
                  key={`flag-${row}-${col}`}
                  style={{
                    position: "relative",
                    width: "56px",
                    height: "56px",
                    borderRadius: "8px",
                    border: isHighlighted ? "2px solid #4cff4c" : "none",
                    background: "transparent",
                    boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "20px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    gridColumn: col + 1,
                    gridRow: row + 1,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}>
                  🚩
                </div>
              );
            }
            return <div key={`empty-${row}-${col}`} style={{ width: "56px", height: "56px" }} />;
          })}
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 36,
            gap: 8,
          }}>
          {dicePhoto && <img src={dicePhoto} alt="Dice Photo" style={{ width: 32, height: 32 }} />}
          <span
            style={{
              fontFamily: "font/main",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "100%",
              letterSpacing: 0,
              textAlign: "right",
              color: "#FFFFFF99",
            }}>
            9
          </span>
          {buttonClick && (
            <img src={buttonClick} alt="Button Icon" style={{ width: 22, height: 22 }} />
          )}
        </div>
        <button
          onClick={rollDice}
          style={{
            width: 348,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            fontSize: "1.5rem",
            background: "linear-gradient(180deg, #6DBF1D 0%, #498013 100%)",
            color: "#FFFFFFCC",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(40,167,69,0.10)",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "linear-gradient(180deg, #5fa617 0%, #38660f 100%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "linear-gradient(180deg, #6DBF1D 0%, #498013 100%)")
          }
          disabled={rolls === 0 || rolling}>
          Roll
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 48 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 32,
            gap: 0,
            borderRadius: 8,
            borderWidth: "1px",
            paddingRight: 16,
            paddingLeft: 16,
            fontFamily: "font/main",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: 0,
            textAlign: "center",
            color: "#FFFFFF99",
            border: "1px solid var(--border-20, #FFFFFF33)",
          }}>
          How to Play?
        </div>
      </div>
    </>
  );
}

export default Dice;
