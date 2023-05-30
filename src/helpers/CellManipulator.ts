import { Cell, CellState, Coords, Field } from "./Field";

export const getNeigboursItems = ([y, x]: Coords): Record<
    string,
    [number, number]
> => ({
    top: [y - 1, x],
    topRight: [y - 1, x + 1],
    right: [y, x + 1],
    rightBottom: [y + 1, x + 1],
    bottom: [y + 1, x],
    bottomLeft: [y + 1, x - 1],
    left: [y, x - 1],
    leftTop: [y - 1, x - 1]
})

export const checkItemInField = ([y, x]: Coords, { length }: Field): boolean =>
  y >= 0 && x >= 0 && length - y > 0 && length - x > 0;

export const incrementNeigbors = (coords: Coords, field: Field): Field => {
    const items = getNeigboursItems(coords);

    for (const [y, x] of Object.values(items)) {
      if (checkItemInField([y, x], field)) {
        const cell = field[y][x];
        if (cell < 8) {
          field[y][x] = (cell + 1) as Cell;
        }
      }
    }

    return field;
}

/**
 * Open cell in the player field using game field info
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {Field}
 */
export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): Field => {
  const { empty, hidden, bomb } = CellState;

  const [y, x] = coords;
  const gameCell = gameField[y][x];

  if (gameCell === bomb) {
    throw new Error('Game Over');
  }

  if (gameCell === empty) {
    playerField[y][x] = gameCell;

    const items = getNeigboursItems(coords);

    for (const [y, x] of Object.values(items)) {
      if (checkItemInField([y, x], gameField)) {
        const playerCell = playerField[y][x];
        const gameCell = gameField[y][x];

        if (playerCell === hidden && gameCell !== bomb) {
          playerField = openCell([y, x], playerField, gameField);
        }

        // if (gameCell < bomb) {
        //   playerField[y][x] = gameCell;
        // }
      }
    }
  }

  playerField[y][x] = gameCell;

  return playerField;
};