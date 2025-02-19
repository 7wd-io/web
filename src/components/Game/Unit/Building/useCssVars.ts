const ratio = 290 / 422;

export function useCssVars(size = 'calc(var(--swd-game-unit) * 8)') {
  const cardWidth = size;
  const cardHeight = `calc(${size} / ${ratio})`;
  const cardHeightDense = `calc(${cardHeight} * .23)`;

  const cardChainBadgeSize = `calc(${cardWidth} * .2)`;
  const cardPriceBadgeSize = `calc(${cardWidth} * .18)`;
  const cardRadius = `calc(${size} * .05)`;

  return {
    cardWidth,
    cardHeight,
    cardHeightDense,
    cardRadius,
    cardChainBadgeSize,
    cardPriceBadgeSize,
  };
}
