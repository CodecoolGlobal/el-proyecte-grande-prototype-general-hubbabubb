import React, {useEffect, useState} from 'react';
import './Card.css'
import IngredientList from './IngredientList';
import {useParams} from 'react-router-dom';

function Card() {
  let {id} = useParams();
  const information = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: true,
    cheap: false,
    healthScore: 28.0,
    extendedIngredients: [
      {
        id: 23572,
        aisle: 'Frozen;Meat',
        image: 'beef-cubes-raw.png',
        consistency: 'solid',
        name: 'beef',
        nameClean: 'beef',
        original: '1 cup of chopped Beef',
        originalString: '1 cup of chopped Beef',
        originalName: 'chopped Beef',
        amount: 1.0,
        unit: 'cup',
        meta: ['chopped'],
        metaInformation: ['chopped'],
        measures: {
          us: { amount: 1.0, unitShort: 'cup', unitLong: 'cup' },
          metric: { amount: 236.588, unitShort: 'ml', unitLong: 'milliliters' },
        },
      },
      {
        id: 10211821,
        aisle: 'Produce',
        image: 'yellow-bell-pepper.jpg',
        consistency: 'solid',
        name: 'bell pepper',
        nameClean: 'bell pepper',
        original: '1 Bell pepper (Blended)',
        originalString: '1 Bell pepper (Blended)',
        originalName: 'Bell pepper (Blended)',
        amount: 1.0,
        unit: '',
        meta: ['(Blended)'],
        metaInformation: ['(Blended)'],
        measures: {
          us: { amount: 1.0, unitShort: '', unitLong: '' },
          metric: { amount: 1.0, unitShort: '', unitLong: '' },
        },
      },
      {
        id: 10211821,
        aisle: 'Produce',
        image: 'yellow-bell-pepper.jpg',
        consistency: 'solid',
        name: 'bell peppers',
        nameClean: 'bell pepper',
        original: '1 handful of chopped bell peppers',
        originalString: '1 handful of chopped bell peppers',
        originalName: 'chopped bell peppers',
        amount: 1.0,
        unit: 'handful',
        meta: ['chopped'],
        metaInformation: ['chopped'],
        measures: {
          us: { amount: 1.0, unitShort: 'handful', unitLong: 'handful' },
          metric: { amount: 1.0, unitShort: 'handful', unitLong: 'handful' },
        },
      },

      {
        id: 10120129,
        aisle: 'Baking',
        image: 'flour.png',
        consistency: 'solid',
        name: 'bread flour',
        nameClean: 'bread flour',
        original: '2 cups of Bread flour',
        originalString: '2 cups of Bread flour',
        originalName: 'Bread flour',
        amount: 2.0,
        unit: 'cups',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 2.0, unitShort: 'cups', unitLong: 'cups' },
          metric: { amount: 473.176, unitShort: 'ml', unitLong: 'milliliters' },
        },
      },
      {
        id: 10014412,
        aisle: 'Frozen',
        image: 'ice-cubes.png',
        consistency: 'solid',
        name: 'ice cube',
        nameClean: 'ice',
        original: 'Seasoning cube',
        originalString: 'Seasoning cube',
        originalName: 'Seasoning',
        amount: 1.0,
        unit: 'cube',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 1.0, unitShort: 'cube', unitLong: 'cube' },
          metric: { amount: 1.0, unitShort: 'cube', unitLong: 'cube' },
        },
      },
      {
        id: 4582,
        aisle: 'Oil, Vinegar, Salad Dressing',
        image: 'vegetable-oil.jpg',
        consistency: 'liquid',
        name: 'oil',
        nameClean: 'cooking oil',
        original: '1 tablespoon of oil',
        originalString: '1 tablespoon of oil',
        originalName: 'oil',
        amount: 1.0,
        unit: 'tablespoon',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 1.0, unitShort: 'Tbsp', unitLong: 'Tbsp' },
          metric: { amount: 1.0, unitShort: 'Tbsp', unitLong: 'Tbsp' },
        },
      },
      {
        id: 4582,
        aisle: 'Oil, Vinegar, Salad Dressing',
        image: 'vegetable-oil.jpg',
        consistency: 'liquid',
        name: 'oil',
        nameClean: 'cooking oil',
        original: '1 teaspoon oil',
        originalString: '1 teaspoon oil',
        originalName: 'oil',
        amount: 1.0,
        unit: 'teaspoon',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 1.0, unitShort: 'tsp', unitLong: 'teaspoon' },
          metric: { amount: 1.0, unitShort: 'tsp', unitLong: 'teaspoon' },
        },
      },
      {
        id: 11282,
        aisle: 'Produce',
        image: 'brown-onion.png',
        consistency: 'solid',
        name: 'onions',
        nameClean: 'onion',
        original: 'A handful of chopped onions',
        originalString: 'A handful of chopped onions',
        originalName: 'A of chopped onions',
        amount: 1.0,
        unit: 'handful',
        meta: ['chopped'],
        metaInformation: ['chopped'],
        measures: {
          us: { amount: 1.0, unitShort: 'handful', unitLong: 'handful' },
          metric: { amount: 1.0, unitShort: 'handful', unitLong: 'handful' },
        },
      },
      {
        id: 9277,
        aisle: 'Produce',
        image: 'plantains.jpg',
        consistency: 'solid',
        name: 'plantain',
        nameClean: 'plantain',
        original: '1 over-ripe plantain (Mashed)',
        originalString: '1 over-ripe plantain (Mashed)',
        originalName: 'over-ripe plantain (Mashed)',
        amount: 1.0,
        unit: '',
        meta: ['mashed', '()'],
        metaInformation: ['mashed', '()'],
        measures: {
          us: { amount: 1.0, unitShort: '', unitLong: '' },
          metric: { amount: 1.0, unitShort: '', unitLong: '' },
        },
      },
      {
        id: 2047,
        aisle: 'Spices and Seasonings',
        image: 'salt.jpg',
        consistency: 'solid',
        name: 'salt',
        nameClean: 'salt',
        original: '1 teaspoon salt',
        originalString: '1 teaspoon salt',
        originalName: 'salt',
        amount: 1.0,
        unit: 'teaspoon',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 1.0, unitShort: 'tsp', unitLong: 'teaspoon' },
          metric: { amount: 1.0, unitShort: 'tsp', unitLong: 'teaspoon' },
        },
      },
      {
        id: 19335,
        aisle: 'Baking',
        image: 'sugar-in-bowl.png',
        consistency: 'solid',
        name: 'sugar',
        nameClean: 'sugar',
        original: '1/2 teaspoon of sugar',
        originalString: '1/2 teaspoon of sugar',
        originalName: 'sugar',
        amount: 0.5,
        unit: 'teaspoon',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 0.5, unitShort: 'tsps', unitLong: 'teaspoons' },
          metric: { amount: 0.5, unitShort: 'tsps', unitLong: 'teaspoons' },
        },
      },
      {
        id: 11529,
        aisle: 'Produce',
        image: 'tomato.png',
        consistency: 'solid',
        name: 'tomato',
        nameClean: 'tomato',
        original: '1 tomato(Blended)',
        originalString: '1 tomato(Blended)',
        originalName: 'tomato(Blended)',
        amount: 1.0,
        unit: '',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 1.0, unitShort: '', unitLong: '' },
          metric: { amount: 1.0, unitShort: '', unitLong: '' },
        },
      },
      {
        id: 14412,
        aisle: 'Beverages',
        image: 'water.png',
        consistency: 'liquid',
        name: 'water',
        nameClean: 'water',
        original: '3/4 cup of water',
        originalString: '3/4 cup of water',
        originalName: 'water',
        amount: 0.75,
        unit: 'cup',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 0.75, unitShort: 'cups', unitLong: 'cups' },
          metric: { amount: 177.441, unitShort: 'ml', unitLong: 'milliliters' },
        },
      },
      {
        id: 18375,
        aisle: 'Baking',
        image: 'yeast-granules.jpg',
        consistency: 'solid',
        name: 'yeast',
        nameClean: 'dry yeast',
        original: '1.5 teaspoons of yeast',
        originalString: '1.5 teaspoons of yeast',
        originalName: 'yeast',
        amount: 1.5,
        unit: 'teaspoons',
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 1.5, unitShort: 'tsps', unitLong: 'teaspoons' },
          metric: { amount: 1.5, unitShort: 'tsps', unitLong: 'teaspoons' },
        },
      },
    ],
    id: 716300,
    title: 'Plantain Pizza',
    image: 'https://spoonacular.com/recipeImages/716300-556x370.jpg',
    instructions:
        '<p>Dissolve the yeast in warm water and leave to stand for about 5 minutes.Mix the oil, flour, salt, sugar and mashed plantain and pour in the dissolved yeast.Knead the dough till its elastic which may take aBout 15-20 minutes By hand or 10 minutes in a mixer.Coat a Bowl lightly with oil and place the dough in it. Cover with a plastic wrap and leave to rise between 1.5 – 2 hours.While the dough is rising, heat up the oil for the sauce, fry the Blended tomato and pepper, season and stir fry the Beef in the tomato sauce. Set aside.When the dough rises, divide into two. Sprinkle some flour on a flat surface and with a rolling pin, flatten out the dough but not excessively. Cut the dough into your desired shape, rub some oil on it and spread your sauce and toppings on it and set aside.Heat up your oven to 350 F and place your pizza dough on a lightly oiled foil pan and Bake for 12-15 mins. Serve warm</p>',
  };
  const [recipe, setRecipe] = useState({id : 5, title: "alma", image: ""})

  const recipeUrl = `http://localhost:8080/api/v1/recipe/${id}`

  const getRecipe = () => {
  fetch(
        recipeUrl).then(res=> res.json()).then(json => setRecipe(json));
  }

  useEffect(() => getRecipe(), [recipe])

  return (

    <div className='card_container'>
      <div className='card'>
        <div className='card'>
          <img className='card_img' src={recipe.image} alt='recepie-pic' />
          <h2 className='card_title'>{recipe.title}</h2>
          <table>
            <tr>Vegetarian : {recipe.vegetarian}</tr>
            <tr>Vegan : {recipe.vegan}</tr>
            <tr>GlutenFree : {recipe.glutenFree}</tr>
          </table>
        </div>
        <div>
          <IngredientList recepie={recipe} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
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
