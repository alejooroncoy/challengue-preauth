import { Result } from "./types";

/**
 * @function getFirstSubsetSumN
 * @param {number[]} setNumbers - Array de números enteros que representa el conjunto en el que se buscará el subconjunto.
 * @param {number} n - Número entero objetivo que queremos encontrar como suma de un subconjunto de 2 números.
 * @description Esta función busca el primer subconjunto de 2 números enteros dentro del array proporcionado que sumen exactamente el valor de `n`.
 * Utiliza un mapa para almacenar los números ya vistos y sus índices, lo que permite verificar si el complemento necesario para alcanzar `n` ya ha sido encontrado.
 * Si se encuentra un par que cumple la condición, devuelve el par de números. Si no se encuentra ninguno, devuelve `null`.
 * @returns {[number, number] | null} Un array con el primer par de números que suman `n`, o `null` si no se encuentra ningún subconjunto.
 * @example
 * getFirstSubsetSumN([1, 2, 3, 4, 5], 9); // [4, 5]
 * getFirstSubsetSumN([5, 8, 10, 15, 20], 2); // null
 */
const getFirstSubsetSumN = (setNumbers: number[], n: number) => {
  const seen = new Map<number, number>(); // Mapa para almacenar los números ya vistos y sus índices
  let result: Result = {
    index: -1,
    value: null,
  }; // Inicializamos el resultado con un índice inválido y valor nulo

  // Recorremos el conjunto de números en orden
  for (let i = 0; i < setNumbers.length; i++) {
    const num = setNumbers[i]; // Obtenemos el número actual
    const complement = n - num; // Calculamos el complemento que necesitamos para llegar a n

    if (seen.has(complement)) {
      // Si el complemento ya ha sido visto, encontramos un par
      const idx = seen.get(complement)!;

      if (result.index === -1 || result.index > idx) {
        result = {
          index: idx,
          value: [complement, num], // Guardamos el par encontrado
        };
      }
    }

    seen.set(num, i); // Almacenamos el número actual y su índice en el mapa
  }

  return result.value;
};

export default getFirstSubsetSumN;
