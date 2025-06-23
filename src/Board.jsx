const Board = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "160px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
      }}>
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "2px solid #333",
          borderRadius: "6px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        }}>
        🚩
      </div>
    </div>
  );
};

export default Board;
