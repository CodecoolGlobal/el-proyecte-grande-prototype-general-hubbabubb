import React from 'react';
import Ingredient from './Ingredient';

function IngredientList(recipe) {
  return (
    <div>
      {recipe.recipe.extendedIngredients.map((i) => (
        <Ingredient key={i.id} name={i.originalString} />
      ))}
    </div>
  );
}

export default IngredientList;
