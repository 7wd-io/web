export function useCssVars(recordWidth?: string) {
  recordWidth = recordWidth || '250px';

  return {
    cardSize: `calc(${recordWidth} * .3)`,
    wonderSize: `calc(${recordWidth} * .7)`,
    tokenSize: `calc(${recordWidth} * .3)`,
    nameSize: `calc(${recordWidth} * .05)`,
    playerSize: `calc(${recordWidth} * .1)`,
    cardOverlaySize: `calc(${recordWidth} * .35)`,
  };
}
