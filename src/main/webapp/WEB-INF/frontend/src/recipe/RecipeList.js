import {useState} from 'react';
import React from "react";

// import '../component/Card.css'
import {Link, NavLink} from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';
import {Button,
    Divider, Fab,
    Grid, Paper
} from "@material-ui/core";


const RecipeList = () => {
    const [recipes, setRecipes] = useState()
    const [searchWord, setSearchWord] = useState("")
    const spacing = 2

    const getRecipes = async () => {
        const searchURL = `http://localhost:8080/api/v1/recipe/search/${searchWord}`
        const response = await fetch(
            searchURL);
        await response.json().then((json) => setRecipes(json.results));
    }

    return (
        <div>

            <div className={"inputFields"}>

                <label className="custom-field">

                    <input maxLength={55}
                           value={searchWord}
                           type="text"
                           name="s"
                           onChange={e => setSearchWord(e.target.value)}
                           id={"recipe-search"}
                           placeholder="&nbsp;"
                    />
                    <span className="placeholder">Search by recipe name...</span>
                    <Button onClick={getRecipes}>Search</Button>
                    {/*<span className="error-message" aria-live="polite">Hiányzó adat</span>*/}
                </label>

            </div>

            <div>
                <Grid container xs={12} spacing={1}>
                    <Grid item xs={12}>
                        <Grid wrap={"wrap"} container direction={"row"} justifyContent={"space-evenly"} alignItems={"flex-start"} spacing={spacing}>
                            {recipes && recipes.map(recipe =>


                                    <Grid alignContent={"center"} key={recipe.id} style={{textAlign:"center" }} item>
                                        <h2>{recipe.title}</h2>
                                        <NavLink to={`/recipe/${recipe.id}`}>
                                            <img className="recipeImageBox"
                                                 src={recipe.image}
                                                 alt="Kép, valami nem jó"/>
                                        </NavLink>
                                        <Divider variant="middle"/>
                                        {/*<p><QueryBuilderRoundedIcon/> 45 minutes </p>*/}
                                        {/*<p><FontAwesomeIcon icon={faTemperatureHigh}/> 180 °C</p>*/}

                                        <Link style={{textDecoration: 'none'}} to={`/recipe/${recipe.id}`}>
                                            <Fab variant="extended"
                                                 color={"default"}
                                                 size={"large"}

                                            >Recipe<LaunchIcon/></Fab>
                                        </Link>
                                        <Paper/>
                                    </Grid>
                            )}
                        </Grid>
                    </Grid>

                </Grid>
            </div>


        </div>
        )
        }

        export default RecipeList;