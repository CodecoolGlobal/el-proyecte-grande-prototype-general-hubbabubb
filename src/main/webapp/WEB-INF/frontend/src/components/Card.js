import React from 'react';
import '../App.css';
import IngredientList from './IngredientList';

function Card({ recepie }) {
  return (
    <div className='card_container'>
      <div className='card'>
        <div className='card'>
          <img className='card_img' src={recepie.image} alt='recepie-pic' />
          <h2 className='card_title'>{recepie.title}</h2>
          <table>
            <tr>Vegetarian : {recepie.vegetarian}</tr>
            <tr>Vegan : {recepie.vegan}</tr>
            <tr>GlutenFree : {recepie.glutenFree}</tr>
          </table>
        </div>
        <div>
          <IngredientList recepie={recepie} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: recepie.instructions }}
          className='creation_paragraph'
        />
        <div className='btn_container'>
          <button className='card_btn'>Add To Meal Plan</button>
          <button className='card_btn'>Add To Grocery List</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
