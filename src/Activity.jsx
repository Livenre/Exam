import "./Activity.css";

const hexToRgb = (hex) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

const interpolateColor = (fromHex, toHex, factor) => {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  const result = {
    r: Math.round(from.r + (to.r - from.r) * factor),
    g: Math.round(from.g + (to.g - from.g) * factor),
    b: Math.round(from.b + (to.b - from.b) * factor),
  };
  return rgbToHex(result);
};

const getColorByCount = (count, colors) => {
  if (count === 0) return colors.inactiveColor;

  let factor;
  if (count >= 20) factor = 1;
  else if (count >= 10) factor = 0.75;
  else if (count >= 5) factor = 0.5;
  else if (count >= 1) factor = 0.25;

  return interpolateColor(colors.inactiveColor, colors.activeColor, factor);
};

const Activity = ({ data, colors, startDayOfTheWeek = 0 }) => {
  const days = [];
  const today = new Date();
  const totalDays = 52 * 7;

  for (let i = 0; i < totalDays; i++) {
    const date = new Date();
    date.setDate(today.getDate() - (totalDays - 1 - i));
    days.push(date);
  }

  const countByDate = {};
  data.forEach((timestamp) => {
    const date = new Date(timestamp);
    const dateKey = date.toISOString().slice(0, 10);
    countByDate[dateKey] = (countByDate[dateKey] || 0) + 1;
  });

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="activity-graph">
      <div className="activity-content">
        <div className="activity-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week-column">
              {week.map((day, dayIndex) => {
                const dateKey = day.toISOString().slice(0, 10);
                const count = countByDate[dateKey] || 0;
                const bgColor = getColorByCount(count, colors);

                return (
                  <div
                    key={dayIndex}
                    className="day-cell"
                    title={`${dateKey} (${count} activities)`}
                    style={{ backgroundColor: bgColor }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="activity-legend">
        <span>0</span>
        <div
          className="legend-cell"
          style={{ backgroundColor: getColorByCount(0, colors) }}
        />
        <div
          className="legend-cell"
          style={{ backgroundColor: getColorByCount(1, colors) }}
        />
        <div
          className="legend-cell"
          style={{ backgroundColor: getColorByCount(5, colors) }}
        />
        <div
          className="legend-cell"
          style={{ backgroundColor: getColorByCount(10, colors) }}
        />
        <div
          className="legend-cell"
          style={{ backgroundColor: getColorByCount(20, colors) }}
        />
        <span>20+</span>
      </div>
    </div>
  );
};

export default Activity;
