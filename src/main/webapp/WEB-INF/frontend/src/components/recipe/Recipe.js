import Card from "@material-ui/core/Card";
import CardHeader from "react-bootstrap/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, Chip, Collapse, IconButton} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {cyan, green, lightBlue, red, teal, yellow} from "@material-ui/core/colors";

import parse from 'html-react-parser';

const useTransitions = makeStyles((theme) => ({
    root: {
        width: 360,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    typography: {
        fontFamily: "Oswald",
        fontWeight: "bold",
        fontSize: 18,
    },
    smallTypo: {
        margin: 5,
        fontFamily: "Oswald",
        fontWeight: "lighter",
        fontSize: 14,
    },
    chipContainer: {
        fontFamily: "Oswald",
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    cheap: {
        color: 'white',
        backgroundColor: red[500],
    },
    dairyFree: {
        color: 'white',
        backgroundColor: lightBlue[500],
    },
    glutenFree: {
        color: 'white',
        backgroundColor: cyan[500],
    },
    vegan: {
        color: 'white',
        backgroundColor: green[500],
    },
    vegetarian: {
        color: 'white',
        backgroundColor: teal[500],
    },
    healthScore: {
        backgroundColor: yellow[500],
    },
}));

export default function Recipe(props) {
    const transitionClasses = useTransitions();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    console.log(props.recipe);

    return <Card className={transitionClasses.root}>
            <CardHeader>
                <Typography className={transitionClasses.typography} gutterBottom variant="h5" component="h2">
                    {props.recipe.title}
                </Typography>
            </CardHeader>
            <CardMedia
                className={transitionClasses.media}
                image={props.recipe.image}
            />
            <CardContent>
                <div className={transitionClasses.chipContainer}>
                    { props.recipe.cheap &&
                        <Chip  className={transitionClasses.cheap} label={'Cheap'} />
                    }
                    { props.recipe.dairyFree &&
                        <Chip className={transitionClasses.dairyFree} label={'Dairy Free'} />
                    }
                    { props.recipe.glutenFree &&
                        <Chip className={transitionClasses.glutenFree} label={'Gluten Free'} />
                    }
                    { props.recipe.vegan &&
                        <Chip className={transitionClasses.vegan} label={'Vegan'} />
                    }
                    { props.recipe.vegetarian &&
                        <Chip className={transitionClasses.vegetarian} label={'Vegetarian'} />
                    }
                    { props.recipe.healthScore > 0 &&
                        <Chip className={transitionClasses.healthScore} label={`Health Score: ${props.recipe.healthScore}`} />
                    }
                </div>
                <Typography paragraph className={transitionClasses.smallTypo}>
                    {parse(props.recipe.summary)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(transitionClasses.expand, {
                        [transitionClasses.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph className={transitionClasses.typography}>Ingredients:</Typography>

                        {props.recipe.extendedIngredients.map((ingredient) => {
                            return <Typography paragraph className={transitionClasses.smallTypo}>
                                {ingredient.amount > 0 && ingredient.amount + ' ' + ingredient.unit}
                                {' ' + ingredient.name}
                            </Typography>
                        })}

                    <Typography paragraph className={transitionClasses.typography}>Preparation:</Typography>
                    <Typography paragraph className={transitionClasses.smallTypo}>
                        {parse(props.recipe.instructions)}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
}