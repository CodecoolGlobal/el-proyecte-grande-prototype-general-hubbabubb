import {Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import StarsIcon from '@material-ui/icons/Stars';


function MealPlan() {
    const userId = 6;

    const data = [
        {
            id: 1,
            recipe: {
                "id": 6589,
                "title": "Braised Swordfish with Black Olives, Tomatoes and Marjoram",
                "image": "https://spoonacular.com/recipeImages/6589-556x370.jpg",
                "vegetarian": false,
                "vegan": false,
                "glutenFree": true,
                "cheap": false,
                "dairyFree": true,
                "healthScore": 41,
                "instructions": "In a medium skillet, heat 2 tablespoons of the olive oil. Add the garlic and jalapeno and cook over moderate heat until the garlic is golden, about 2 minutes. Add the orange zest, vermouth and bay leaf and boil over moderately high heat until the liquid has almost evaporated, about 1 minute. Add the tomatoes and their juices and a pinch of salt and simmer over moderate heat, stirring occasionally, until the sauce is slightly thickened, about 10 minutes. Stir in the marjoram. Season with salt and sherry vinegar. In a very large skillet, heat the remaining 1 tablespoon of olive oil. Season the fish with salt and add to the skillet. Cook over high heat until browned, about 4 minutes per side. Add the sauce, shaking the skillet to distribute it evenly. Cover and simmer the swordfish over low heat, turning once, until the steaks are just cooked through, about 4 minutes. Using a spatula, transfer the swordfish to plates. Stir the olives into the sauce and season with salt and sherry vinegar. Spoon the sauce around the steaks and serve."
                , date: "2021-08-23"
            },

            liked: [
                {
                    id: 6,
                    firstName: "Joe",
                    lastName: "Doe",
                    email: "joe@email.com"
                },
                {
                    id: 7,
                    firstName: "Dave",
                    lastName: "Yo",
                    email: "dave@email.com"
                },
                {
                    id: 8,
                    firstName: "John",
                    lastName: "Smith",
                    email: "john@email.com"
                }
            ],
            disliked: [
                {
                    id: 6,
                    firstName: "Joe",
                    lastName: "Doe",
                    email: "joe@email.com"
                },
                {
                    id: 7,
                    firstName: "Dave",
                    lastName: "Yo",
                    email: "dave@email.com"
                },
                {
                    id: 8,
                    firstName: "John",
                    lastName: "Smith",
                    email: "john@email.com"
                }
            ]
        },
        {
            id: 2,
            recipe: {
                "id": 656329,
                "title": "Pizza bites with pumpkin",
                "image": "https://spoonacular.com/recipeImages/656329-556x370.jpg",
                "vegetarian": true,
                "vegan": false,
                "glutenFree": true,
                "cheap": false,
                "dairyFree": false,
                "healthScore": 17,
                "date": "2021-08-26",
                "instructions": "Chop pumpkin using a food processor until rice-like. Saut pumpkin in hot olive oil for 3 minutes. Set aside and let cool. Mix feta and mozzarella; add, one at a time, eggs. Mix and combine. Add pumpkin and spices, mix well until well blended. Evenly spoon the mixture into the greased muffin tin molds. Press pizza dough down evenly and firmly (the pressing down firmly is very important to make sure they stick together). Place in the oven and bake for 30 minutes at 200C. Remove the pizza bites from the oven and let set until cool (this is also very important let the pizza bites set in their pan for 5 10 minutes before removing if you take them out while they are too hot they will break)."
            },

            liked: [
                {
                    id: 6,
                    firstName: "Joe",
                    lastName: "Doe",
                    email: "joe@email.com"
                },
                {
                    id: 7,
                    firstName: "Dave",
                    lastName: "Yo",
                    email: "dave@email.com"
                },
                {
                    id: 8,
                    firstName: "John",
                    lastName: "Smith",
                    email: "john@email.com"
                }
            ],
            disliked: [
                {
                    id: 6,
                    firstName: "Joe",
                    lastName: "Doe",
                    email: "joe@email.com"
                },
                {
                    id: 7,
                    firstName: "Dave",
                    lastName: "Yo",
                    email: "dave@email.com"
                },
                {
                    id: 8,
                    firstName: "John",
                    lastName: "Smith",
                    email: "john@email.com"
                }
            ]
        }
    ];


    function listMealPlans() {
        return (
            <div>
                {data.map(plan => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'Amatic SC", serif'}}>
                            <Grid direction={"column"}
                                  style={{border: '1px solid grey', padding: "2%"}}>
                                <Grid direction={"column"}
                                      justifyContent={"center"}>
                                    <div style={{display: 'flex', justifyContent: 'center'}}><h1>{plan.recipe.title}</h1></div>
                                    <div style={{display: 'flex', justifyContent: 'center'}}><img
                                        src={plan.recipe.image} alt={"Missing"}/></div>
                                    <div style={{display: 'flex', justifyContent: 'center'}}><h2>Health
                                        score: {plan.recipe.healthScore}</h2><StarsIcon/></div>
                                    <h3>Let's eat this on {plan.recipe.date}</h3>
                                </Grid>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <span>
                                        <FormControlLabel
                                            control={<Checkbox icon={<FavoriteBorder/>}
                                                               checkedIcon={<Favorite/>}
                                                               onClick={sendLike(plan.id)}
                                                               name="checkedLike"/>}
                                            label=""
                                        />
                                        <FormControlLabel
                                            control={<Checkbox icon={<ThumbDownIcon/>}
                                                               checkedIcon={<DeleteIcon/>}
                                                               onClick={sendDislike(plan.id)}
                                                               name="checkedLike"/>}
                                            label=""
                                        />
                                    </span>
                                </div>
                                <div>
                                    {plan.date}
                                </div>
                            </Grid>

                        </div>
                    );
                })}
            </div>
        );
    }


    function sendLike(mealPlanId) {
        // fetch(`http://localhost:8080/api/v1/meal-plan/dislike/${mealPlanId}/${userId}`)
        //     .then(() => {console.log("LikeSent")});
    }

    function sendDislike(mealPlanId) {
        fetch(`http://localhost:8080/api/v1/meal-plan/dislike/${mealPlanId}/${userId}`)
            .then(() => {
                console.log("DislikeSent")
            });
    }

    return (
        <div>
            {listMealPlans()}
        </div>
    );

}

export default MealPlan;
