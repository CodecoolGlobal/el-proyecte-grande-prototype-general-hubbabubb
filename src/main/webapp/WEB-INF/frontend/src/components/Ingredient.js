import React from 'react';

function Ingredient(props) {
  return (
    <div className='ingredient'>
      <span>{props.name}</span>
    </div>
  );
}

export default Ingredient;
