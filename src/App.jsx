import { useState } from "react";
import Activity from "./Activity";
import "./App.css";

const generateRandomData = () => {
  const dates = [];
  const today = new Date();
  const total = Math.floor(Math.random() * 4000);

  for (let i = 0; i < total; i++) {
    const randomOffset = Math.floor(Math.random() * 364);
    const d = new Date();
    d.setDate(today.getDate() - randomOffset);
    d.setHours(Math.floor(Math.random() * 24));
    d.setMinutes(Math.floor(Math.random() * 60));
    d.setSeconds(Math.floor(Math.random() * 60));
    dates.push(d.toISOString());
  }

  return dates;
};

function App() {
  const [data, setData] = useState(generateRandomData());
  const [inactiveColor, setInactiveColor] = useState("#eeeeee");
  const [activeColor, setActiveColor] = useState("#00008b");

  const handleRandomize = () => {
    setData(generateRandomData());
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "12px" }}>
        <label style={{ marginRight: "10px" }}>
          Active color:
          <input
            type="color"
            value={activeColor}
            onChange={(e) => setActiveColor(e.target.value)}
            style={{ marginLeft: "6px" }}
          />
        </label>

        <label>
          Inactive color:
          <input
            type="color"
            value={inactiveColor}
            onChange={(e) => setInactiveColor(e.target.value)}
            style={{ marginLeft: "6px" }}
          />
        </label>
      </div>

      <button onClick={handleRandomize}>Randomize Active</button>

      <Activity
        data={data}
        colors={{
          inactiveColor,
          activeColor,
        }}
        startDayOfTheWeek={0}
      />
    </div>
  );
}

export default App;
