import type {Variant} from './content';

export const STRUCTURE = Object.freeze({width: 10.6, rows: 5, tread: 1.06, rise: .38, rearDeck: 2.1, stairX: -.65});
export const ROW_LIMITS = Object.freeze([-2.02, 2.02]);
export type SeatPoint = {id: string; x: number; y: number; z: number; width: number; module: 'base' | 'reserve'};
export const hookSeats = (wide: boolean) => Array.from({length: wide ? 4 : 5}, (_, i) => ({
  id: `hook-${i}`, x: wide ? -1.47 + i * .98 : -1.56 + i * .78,
  y: 0, z: 0, width: wide ? .64 : .51,
}));
export const sectorSeats = (variant: Variant): SeatPoint[] => {
  const seats: SeatPoint[] = [];
  for (let row = 0; row < STRUCTURE.rows; row++) {
    const xs = variant === 'C' ? [-4.3, -3.1, -1.9, .8, 2.2] : [-4.45, -3.66, -2.87, -2.08, .3, 1.09, 1.88, 2.67, 3.46, 4.25];
    xs.forEach((x, col) => {
      const reserve = x > 1.3;
      if (variant === 'base' && reserve) return;
      seats.push({id: `r${row}c${col}`, x, y: row * STRUCTURE.rise, z: -row * STRUCTURE.tread, width: variant === 'C' ? .66 : .51, module: reserve ? 'reserve' : 'base'});
    });
  }
  return seats;
};

export const PHONE = {x: 108, y: 420, w: 822, h: 1150};
export const SECTOR_BOX = {x: 20, y: 555, w: 1040, h: 845};
