import { generateFieldWithDefaultState, fieldGenerator, CellState, Cell } from "./Field";

const { empty, bomb, hidden} = CellState;

const cellWithBombFilter = (cell: Cell) => cell === bomb;

describe('Field Generator', () => {
    describe('generateFieldWithDefaultState tests', () => {
        it('2x2', () => {
            expect(generateFieldWithDefaultState(2)).toStrictEqual(
                [
                    [empty, empty],
                    [empty, empty]
                ]
            )
        });
        it('3x3', () => {
            expect(generateFieldWithDefaultState(3)).toStrictEqual(
                [
                    [empty, empty, empty],
                    [empty, empty, empty],
                    [empty, empty, empty],
                ]
            )
        });
        it('3x3 with hidden state', () => {
            expect(generateFieldWithDefaultState(3, hidden)).toStrictEqual(
                [
                    [hidden, hidden, hidden],
                    [hidden, hidden, hidden],
                    [hidden, hidden, hidden],
                ]
            )
        });
    });

    describe('Simple field test cases', () => {
        it('Wrong density', () => {
            const errorText = 'Probability must be between 0 and 1';
            expect(() => fieldGenerator(1, -1)).toThrow(errorText);
            expect(() => fieldGenerator(1, 2)).toThrow(errorText);
        });
        it('smallest possible field without mine', () => {
            expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
        });
        it('big field without mine', () => {
            expect(fieldGenerator(10, 0)).toStrictEqual(
                [
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                    [empty,empty,empty,empty,empty,empty,empty,empty,empty,empty],
                ]
            );
        });
        it('smallest possible field with mine', () => {
            expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
        });
        it('2x2 field with mine', () => {
            expect(fieldGenerator(2, 1)).toStrictEqual(
                [
                    [bomb, bomb],
                    [bomb, bomb],
                ]
            );
        });
        it('2x2 field with 50% probability', () => {
            const field = fieldGenerator(2, .5);
            const flatField = field.flat();

            console.table(field);
            console.table(flatField);

            const cellswithBombs = flatField.filter(cell => cell === bomb)
            const cellswithoutBombs = flatField.filter(cell => cell === 2)

            expect(cellswithBombs).toHaveLength(2);
            expect(cellswithoutBombs).toHaveLength(2);
        });
        it('Real game field size = 10x10 with 1/4 mined cells (25 mines)', () => {
            const size = 10;
            const mines = 25;

            const probability = mines / (size * size);
            const field = fieldGenerator(size, probability);

            const flatField = field.flat();

            expect(flatField.filter(cellWithBombFilter)).toHaveLength(25);
          });
    })
})