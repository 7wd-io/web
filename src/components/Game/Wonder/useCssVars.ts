const ratio = 1.543;

export default function useCssVars(size = 'calc(var(--swd-game-unit) * 12)') {
  const wonderWidth = size;
  const wonderHeight = `calc(${size} / ${ratio})`;
  const wonderBorderRadius = `calc(${size} * .05)`;

  const wonderCardSize = `calc(${wonderWidth} * .4)`;
  const wonderPriceBadgeSize = `calc(${wonderWidth} * .1)`;

  return {
    wonderWidth,
    wonderHeight,
    wonderBorderRadius,
    wonderCardSize,
    wonderPriceBadgeSize,
  };
}
