import {useState, useEffect} from 'react';
import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import LaunchIcon from '@material-ui/icons/Launch';
import {
    Divider, Fab,
    Grid, Paper
} from "@material-ui/core";

import {Modal} from "react-bootstrap"
import Recipe from "../components/Recipe";
import {hostName} from "../util/constants";


const RecipeList = () => {
    const [recipes, setRecipes] = useState()
    const [searchWord, setSearchWord] = useState("")
    const spacing = 2

    const getRecipes = () => {

        const myHeaders = new Headers();

        // myHeaders.append('Content-Type', 'application-json');
        myHeaders.append('Authorization', localStorage.jwtToken);
        // myHeaders.append("Access-Control-Allow-Origin", "*")
        // myHeaders.append('Authorization', "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHVzZXIuY29tIiwiaWF0IjoxNjMwMTU1NTA0LCJleHAiOjE2MzAxNTY0MDR9.33OwS-X1OK4LucALwQ1CJxvOCvzbsDZC5OShXJ7nYrY");
        console.log(myHeaders.get('Authorization'))
        const searchURL = `${hostName}/api/v1/recipe/search/${searchWord}`
        fetch(
            searchURL, {method: 'GET', headers: myHeaders}).then(response =>
            response.json()).then(json =>
            setRecipes(json.results)).catch(err => console.log(err.message))
    };


    useEffect(() => getRecipes(), )

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className={"inputFields"} style={{textAlign: "center"}}>
                <h1>Search recipe by name</h1>

                <label className="custom-field">

                    <input maxLength={55}
                           value={searchWord}
                           type="text"
                           name="s"
                           onChange={e => setSearchWord(e.target.value)}
                           id={"recipe-search"}
                           placeholder="&nbsp;"
                    />

                    <Fab size="medium" color="primary" aria-label="add" onClick={getRecipes}>
                        <SearchIcon/>
                    </Fab>
                    {/*<span className="error-message" aria-live="polite">Hiányzó adat</span>*/}
                </label>

            </div>

            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid wrap={"wrap"} container direction={"row"} justifyContent={"space-evenly"}
                              alignItems={"flex-start"} spacing={spacing}>
                            {recipes && recipes.map(recipe =>


                                <Grid onClick={handleShow} alignContent={"center"} key={recipe.id}
                                      style={{textAlign: "center"}} item>
                                    <h2>{recipe.title}</h2>
                                    <img className="recipeImageBox"
                                         src={recipe.image}
                                         alt="Kép, valami nem jó"/>
                                    <Divider variant="middle"/>
                                    {/*<p><QueryBuilderRoundedIcon/> 45 minutes </p>*/}
                                    {/*<p><FontAwesomeIcon icon={faTemperatureHigh}/> 180 °C</p>*/}

                                    <Fab variant="extended"
                                         color={"default"}
                                         size={"large"}

                                    >Recipe<LaunchIcon/></Fab>
                                    <Paper/>
                                    <>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>{recipe.title}</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body><Recipe id={recipe.id} /></Modal.Body>
                                            <Modal.Footer>
                                                <button onClick={handleClose}>
                                                    Close
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
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