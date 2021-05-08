import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";

import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTransitions = (title) => {
  resetCategories();
  const { transitions } = useContext(ExpenseTrackerContext);
  console.log(transitions)
  const transitionsPerType = transitions.filter((t) => t.type === title);
  const total = transitionsPerType.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  console.log({ transitionsPerType, total, categories });

  transitionsPerType.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);
    console.log(category)

    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((c) => c.amount > 0);
  console.log(filteredCategories)

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };
  return { filteredCategories, total, chartData };
};

export default useTransitions;
