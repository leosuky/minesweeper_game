import { incrementNeigbors } from "./CellManipulator";

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Field = Cell[][];
export type Coords = [number, number];

export const CellState: Record<string, Cell> = {
    empty: 0,
    bomb: 9,
    hidden: 10,
    flag: 11,
    weakFlag: 12
}

export const generateFieldWithDefaultState = (
    size: number,
    state: Cell = CellState.empty
): Field => new Array(size).fill(null).map( () => new Array(size).fill(state));


export const fieldGenerator = (size: number, probability: number): Field => {
    if (probability > 1 || probability < 0) {
        throw new Error('Probability must be between 0 and 1')
    }

    let unprocessedCells = size * size;
    let cellsWIthBombs = unprocessedCells * probability;

    const result: Field = generateFieldWithDefaultState(size);

    for (let i=0; i < size; i++) {
        for (let j=0; j < size; j++) {

            if (cellsWIthBombs / unprocessedCells > Math.random()) {
                result[i][j] = CellState.bomb;
                incrementNeigbors([i, j], result)
                cellsWIthBombs--;
            }

            unprocessedCells--;
        }
    }

    return result;
};
