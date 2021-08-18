import React from 'react';
import Ingredient from './Ingredient';

function IngredientList(recepie) {
  return (
    <div>
      {recepie.recepie.extendedIngredients.map((i) => (
        <Ingredient key={i.id} name={i.originalString} />
      ))}
    </div>
  );
}

export default IngredientList;
