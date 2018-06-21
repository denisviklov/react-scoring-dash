export const chooseColor = (() => {
  let i = 0;
  const COLORS = ["#bcbcbc", "#777777", "#d74b4b", "#476077", "#6685a3"];
  return (reset = false) => {
    if (reset) {
      i = 0;
    }
    const color = COLORS[i];
    i = (i + 1) % COLORS.length;
    return color;
  };
})();
