import {Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";


function MealPlan() {
    const userId = 6;

    const data = [
        {
            id: 1,
            recipe: {
                id: 33,
                title: "pite",
                image: "image.jpg",
                vegetarian: true,
                vegan: false,
                glutenFree: false,
                cheap: true,
                dairyFree: false,
                healthScore: 5,
                instructions: "bla-bla"
            },
            date: "2020-01-01",
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
                id: 55,
                title: "pizza",
                image: "imagepizza.jpg",
                vegetarian: false,
                vegan: false,
                glutenFree: false,
                cheap: true,
                dairyFree: false,
                healthScore: 4,
                instructions: "pizza bla-bla"
            },
            date: "2021-11-11",
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
                        <div style={{display: 'flex',  justifyContent:'center', height:'15vh'}}>
                            <Grid direction={"column"}
                            style={{border: '1px solid grey', width: '400px'}}>
                                <Grid direction={"column"}
                                      justifyContent={"center"}>
                                    <div style={{display: 'flex',  justifyContent:'center'}}>{plan.recipe.title}</div>
                                    <div style={{display: 'flex',  justifyContent:'center'}}>{plan.recipe.image}</div>
                                    <div style={{display: 'flex',  justifyContent:'center'}}>Health score: {plan.recipe.healthScore}</div>
                                </Grid>
                                <div style={{display: 'flex',  justifyContent:'center'}}>
                                    <span>
                                        <FormControlLabel
                                            control={<Checkbox icon={<FavoriteBorder />}
                                                               checkedIcon={<Favorite />}
                                                               onClick={sendLike(plan.id)}
                                                               name="checkedLike" />}
                                            label=""
                                        />
                                        <FormControlLabel
                                            control={<Checkbox icon={<DeleteIcon />}
                                                               checkedIcon={<DeleteIcon />}
                                                               onClick={sendDislike(plan.id)}
                                                               name="checkedLike" />}
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
        fetch(`http://localhost:8080/api/v1/meal-plan/dislike/${mealPlanId}/${userId}`)
            .then(() => {console.log("LikeSent")});
    }

    function sendDislike(mealPlanId) {
        fetch(`http://localhost:8080/api/v1/meal-plan/dislike/${mealPlanId}/${userId}`)
            .then(() => {console.log("DislikeSent")});
    }

    return (
        <div>
            {listMealPlans()}
        </div>
    );

}

export default MealPlan;