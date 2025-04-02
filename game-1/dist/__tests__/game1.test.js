import { expect, test, describe } from "vitest";
import getFirstSubsetSumN from "../game1";
describe("Test función getFirstSubsetSumN", function () {
    var testCases = [
        {
            input: [1, 2, 3, 4, 5],
            target: 6,
            expected: [1, 5],
            description: "Números enteros positivos, n es positivo (suma existe)"
        },
        {
            input: [-1, -2, -3, -4, -5],
            target: -6,
            expected: [-1, -5],
            description: "Números enteros negativos, n es negativo (suma existe)"
        },
        {
            input: [-1, 2, -3, 4, -5],
            target: 1,
            expected: [-1, 2],
            description: "Números enteros mixtos, n es positivo (suma existe)"
        },
        {
            input: [-1, 2, -3, 4, -5],
            target: -8,
            expected: [-3, -5],
            description: "Números enteros mixtos, n es negativo (suma existe)"
        },
        {
            input: [1, 2, 3, 4, 5],
            target: 10,
            expected: null,
            description: "Números enteros positivos, n es positivo (suma no existe)"
        },
        {
            input: [-1, -2, -3, -4, -5],
            target: -10,
            expected: null,
            description: "Números enteros negativos, n es negativo (suma no existe)"
        },
        {
            input: [-1, 2, -3, 4, -5],
            target: 10,
            expected: null,
            description: "Números enteros mixtos, n es positivo (suma no existe)"
        },
        {
            input: [-1, 2, -3, 4, -5],
            target: -10,
            expected: null,
            description: "Números enteros mixtos, n es negativo (suma no existe)"
        }
    ];
    testCases.forEach(function (_a) {
        var input = _a.input, target = _a.target, expected = _a.expected, description = _a.description;
        test(description, function () {
            expect(getFirstSubsetSumN(input, target)).toEqual(expected);
        });
    });
});
