/**
 * @param set - Set de numeros enteros
 * @param n - Numero entero que queremos encontrar como suma de un subconjunto de 2 numeros
 * @description - Esta funcion busca un subconjunto de 2 numeros enteros en el set que sumen n.
 * Si encuentra un subconjunto, lo devuelve como un array de 2 numeros. Si no encuentra ningun subconjunto, devuelve null.
 * @returns - Un subconjunto de 2 numeros enteros que suman n, o null si no se encuentra ningun subconjunto.
 * @example
 * getFirstSubsetSumN([1, 2, 3, 4, 5], 9) // [4, 5]
 * getFirstSubsetSumN([5, 8, 10, 15, 20], 2) // null
 */
const getFirstSubsetSumN = (setNumbers: number[], n: number) => {
  for (let i = 0; i < setNumbers.length; i++) {
    for (let j = i + 1; j < setNumbers.length; j++) {
      if (setNumbers[i] + setNumbers[j] === n) {
        return [setNumbers[i], setNumbers[j]];
      }
    }
  }

  return null;
};

export default getFirstSubsetSumN;
