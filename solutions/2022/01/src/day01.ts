const getTopCaloriesSum = (caloriesList: number[][], count: number): number => {
  const totalCalories = caloriesList.map((calories) => calories.reduce((acc, curr) => acc + curr, 0));
  return totalCalories
    .sort((a, b) => b - a)
    .slice(0, count)
    .reduce((acc, curr) => acc + curr, 0);
};

export const solvePart1 = (caloriesList: number[][]): number => {
  return getTopCaloriesSum(caloriesList, 1);
};

export const solvePart2 = (caloriesList: number[][]): number => {
  return getTopCaloriesSum(caloriesList, 3);
};
