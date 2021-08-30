import {useContext, useEffect, useState} from "react";
import {SearchInput} from "../store/recipe-search-input";
import RecipeList from "../components/recipe/RecipeList";
import {hostName} from "../util/constants";
import {getFetch} from "../util/fetchData";

const MOCK_DATA = '{"results":[{"id":656329,"title":"Pizza bites with pumpkin","image":"https://spoonacular.com/recipeImages/656329-312x231.jpg","imageType":"jpg"},{"id":680975,"title":"BLT Pizza","image":"https://spoonacular.com/recipeImages/680975-312x231.jpg","imageType":"jpg"},{"id":663136,"title":"Thai Pizza","image":"https://spoonacular.com/recipeImages/663136-312x231.jpg","imageType":"jpg"},{"id":716300,"title":"Plantain Pizza","image":"https://spoonacular.com/recipeImages/716300-312x231.jpg","imageType":"jpg"},{"id":665769,"title":"Zucchini Pizza Boats","image":"https://spoonacular.com/recipeImages/665769-312x231.jpg","imageType":"jpg"},{"id":655698,"title":"Pepperoni Pizza Muffins","image":"https://spoonacular.com/recipeImages/655698-312x231.jpg","imageType":"jpg"},{"id":622598,"title":"Pittata - Pizza Frittata","image":"https://spoonacular.com/recipeImages/622598-312x231.jpg","imageType":"jpg"},{"id":641893,"title":"Easy Cheesy Pizza Casserole","image":"https://spoonacular.com/recipeImages/641893-312x231.jpg","imageType":"jpg"},{"id":655847,"title":"Pesto Veggie Pizza","image":"https://spoonacular.com/recipeImages/655847-312x231.jpg","imageType":"jpg"},{"id":654523,"title":"Paneer & Fig Pizza","image":"https://spoonacular.com/recipeImages/654523-312x231.jpg","imageType":"jpg"},{"id":651956,"title":"Mini eggplant pizza","image":"https://spoonacular.com/recipeImages/651956-312x231.jpg","imageType":"jpg"},{"id":662264,"title":"summer vegetable pizza","image":"https://spoonacular.com/recipeImages/662264-312x231.jpg","imageType":"jpg"},{"id":636593,"title":"Butternut Squash Pizza","image":"https://spoonacular.com/recipeImages/636593-312x231.jpg","imageType":"jpg"},{"id":661640,"title":"Stilton Balsamic Pizza","image":"https://spoonacular.com/recipeImages/661640-312x231.jpg","imageType":"jpg"},{"id":663553,"title":"Tomato and Bacon Pizza With Rice Crust","image":"https://spoonacular.com/recipeImages/663553-312x231.jpg","imageType":"jpg"},{"id":644953,"title":"Goat Cheese Pesto Pizza","image":"https://spoonacular.com/recipeImages/644953-312x231.jpg","imageType":"jpg"},{"id":642777,"title":"Fig and Goat Cheese Pizza With Pesto","image":"https://spoonacular.com/recipeImages/642777-312x231.jpg","imageType":"jpg"},{"id":647124,"title":"Homemade Thin Crust Pizza + Pesto + Potato","image":"https://spoonacular.com/recipeImages/647124-312x231.jpg","imageType":"jpg"},{"id":652592,"title":"Multigrain Tandoori Pizza With Paneer Tikka","image":"https://spoonacular.com/recipeImages/652592-312x231.jpg","imageType":"jpg"},{"id":642371,"title":"Elk Italian Sausage Pizza With Ricotta Cheese, SautÃ©d Mushrooms and Onion","image":"https://spoonacular.com/recipeImages/642371-312x231.jpg","imageType":"jpg"},{"id":715495,"title":"Turkey Tomato Cheese Pizza","image":"https://spoonacular.com/recipeImages/715495-312x231.jpg","imageType":"jpg"},{"id":651624,"title":"Mexican Fiesta Salad Pizza","image":"https://spoonacular.com/recipeImages/651624-312x231.jpg","imageType":"jpg"},{"id":658920,"title":"Rustic Grilled Peaches Pizza","image":"https://spoonacular.com/recipeImages/658920-312x231.jpg","imageType":"jpg"},{"id":663366,"title":"Thin Crust Genoa Salami Pizza","image":"https://spoonacular.com/recipeImages/663366-312x231.png","imageType":"png"},{"id":655525,"title":"Pecan Pumpkin Pie Dessert Pizza with Maple Whipped Cream","image":"https://spoonacular.com/recipeImages/655525-312x231.jpg","imageType":"jpg"}],"offset":0,"number":25,"totalResults":36}'

export default function RecipesByName(props) {
    const {searchField} = useContext(SearchInput);
    const [recipes, setRecipes] = useState("")
    const searchURL = `${hostName}/api/v1/recipe/search/${searchField}`;

    useEffect(() => {
        getFetch(searchURL, (jsonData) => {
            setRecipes(jsonData)
            console.log(recipes)
        }, (error) => {
            console.log(error.message)
        })
    }, [searchField])

    return <div>
        <h1>Search results:</h1>
        {/*<RecipeList recipes={recipes}/>*/}
    </div>
}