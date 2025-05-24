import React, { useState } from 'react';
import './App.css';

function App() {
  const [food, setFood] = useState('');
  const [nutrition, setNutrition] = useState(null);
  const [error, setError] = useState(null);

  // const getNutrition = async () => {
  //   try {
  //     setError(null);
  //     const response = await fetch('http://localhost:3000/nutrition', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ dish: food })
  //     });

  //     if (!response.ok) throw new Error('Network response failed');
      
  //     const data = await response.json();
  //     setNutrition(data.nutrition);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const getNutrition = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:3000/nutrition', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Explicitly accept JSON
        },
        body: JSON.stringify({ dish: food })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setNutrition(data.nutrition);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err); // Check browser console
    }
  };

  return (
    <div className="App">
      <h1>Nutrition Finder</h1>
      
      <input
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder="Enter food (e.g. banana)"
      />
      
      <button onClick={getNutrition}>Get Nutrition</button>

      {error && <p className="error">Error: {error}</p>}

      {nutrition && (
        <div className="results">
          <h2>{food}</h2>
          <p>Calories: {nutrition.calories}</p>
          <p>Protein: {nutrition.protein_g}g</p>
          <p>Fat: {nutrition.fat_g}g</p>
          <p>Carbs: {nutrition.carbs_g}g</p>
        </div>
      )}
    </div>
  );
}

export default App;