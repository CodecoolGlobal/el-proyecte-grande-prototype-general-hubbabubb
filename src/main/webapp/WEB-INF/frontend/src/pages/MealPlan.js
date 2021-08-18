import {ListItem} from "@material-ui/core";

function MealPlan() {
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
                healthScore: 5,
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

    function recipeInfo(recipe) {
        return (
            <div>
                {recipe.title}  |
                {recipe.image}  |
                {recipe.healthScore}  |
                {}
            </div>
        );
    }

    function listMealPlans() {
        return (
            <div>
                {data.map(plan => {
                    return (
                        <div>
                            {plan.id}  |
                            {plan.date}  |
                            <div>
                                {recipeInfo(plan.recipe)}
                            </div>

                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div>
            {listMealPlans()}
        </div>
    );

}

export default MealPlan;