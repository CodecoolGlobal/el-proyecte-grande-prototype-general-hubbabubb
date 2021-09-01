import {Grid} from "@material-ui/core";
import React from "react";
import {CardList} from "../recipe/RecipeList";
import MealPlanListItem from "./MealPlanListItem";

function MealPlanList(props) {

    return (
    <CardList>
        {props.plans.map((plan) => {
            return <Grid>
                <MealPlanListItem
                    id={plan.id}
                    date={plan.date}
                    title={plan.recipe.title}
                    recipeId={plan.recipe.id}
                    image={plan.recipe.image}
                    liked={plan.liked.length}
                    disliked={plan.disliked.length}
                />
            </Grid>
        })}
    </CardList>
    );

}

export default MealPlanList;