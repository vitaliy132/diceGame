import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import RollsBar from "./RollsBar";
import value1 from "../assets/value=1.png";
import value2 from "../assets/value=2.png";
import value3 from "../assets/value=3.png";
import value4 from "../assets/value=4.png";
import value5 from "../assets/value=5.png";
import value6 from "../assets/value=6.png";

const diceImages = [value1, value2, value3, value4, value5, value6];

function Dice({ buttonClick, dicePhoto }) {
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [rollingFace, setRollingFace] = useState(1);
  const [rolls, setRolls] = useState(10);
  const refillQueue = useRef([]); // stores timeouts for refills
  const [nextRefill, setNextRefill] = useState(null); // timestamp for next refill
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Helper to get a random face different from the current one
  const getRandomFace = (exclude) => {
    let face;
    do {
      face = Math.floor(Math.random() * 6) + 1;
    } while (face === exclude);
    return face;
  };

  // Refill logic
  useEffect(() => {
    // Clean up on unmount
    return () => {
      refillQueue.current.forEach(clearTimeout);
    };
  }, []);

  const handleRefill = () => {
    setRolls((prev) => (prev < 10 ? prev + 1 : prev));
    refillQueue.current.shift();
    // Update nextRefill to the next timeout if any
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
    if (rolling || rolls <= 0) return;
    setRolling(true);
    setRolls((prev) => prev - 1);
    // Schedule a refill in 30 minutes
    const refillTimeout = setTimeout(handleRefill, 1800000);
    refillQueue.current.push(refillTimeout);
    if (rolls === 10) {
      setNextRefill(Date.now() + 1800000);
    }
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setRollingFace((prev) => getRandomFace(prev));
      rollCount++;
      if (rollCount > 10) {
        clearInterval(rollInterval);
        const newFace = getRandomFace(dice);
        setDice(newFace);
        setRolling(false);
      }
    }, 100);
  };

  // Timer effect
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

  // Helper to format seconds as HH:MM:SS
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
      <div style={{ margin: "20px", perspective: 600 }}>
        <motion.img
          src={diceImages[(rolling ? rollingFace : dice) - 1]}
          alt={`Dice showing ${rolling ? rollingFace : dice}`}
          style={{
            width: 68,
            height: 68,
            display: "block",
            margin: "0 auto",
          }}
          animate={rolling ? { rotateX: 1080, rotateY: 720 } : { rotateX: 0, rotateY: 0 }}
          transition={{ duration: rolling ? 0.7 : 0.3, ease: "easeInOut" }}
        />
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
