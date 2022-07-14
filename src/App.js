import React, { useEffect, useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(
        "https://expenses-tracker-17e92-default-rtdb.firebaseio.com/requests.json"
      );
      const data = await response.json();
      const FBexpenses = [];
      for (const key in data) {
        const FBexpense = {
          id: key,
          title: data[key].title,
          amount: data[key].amount,
          date: data[key].date,
        };
        FBexpenses.push(FBexpense);
      }

      setExpenses(FBexpenses);
      setNewExpense(false);
    };
    fetchExpenses();
  }, [newExpense]);

  const newExpenseHandler = () => {
    setNewExpense(true);
  };
  return (
    <div>
      <NewExpense onNewExpense={newExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
