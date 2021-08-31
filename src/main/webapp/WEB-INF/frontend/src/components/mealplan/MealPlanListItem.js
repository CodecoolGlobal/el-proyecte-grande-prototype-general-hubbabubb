import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Avatar, Checkbox, FormControlLabel} from "@material-ui/core";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CardHeader from "react-bootstrap/CardHeader";
import {red} from "@material-ui/core/colors";
import {hostName} from "../../util/constants";

const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        zIndex: 0,
        margin: 20,
        width: 345,
    },
    media: {
        height: 200,
    },
    typography: {
        fontFamily: "Oswald",
    },
    avatar: {
        backgroundColor: red[500],
    }
});

export default function MealPlanListItem(props) {
    const userId = 6;
    const classes = useStyles();

    function sendLike(mealPlanId) {
        fetch(`${hostName}/api/v1/meal-plan/dislike/${mealPlanId}/${userId}`)
            .then(() => {
                console.log("LikeSent")
            });
    }

    function sendDislike(mealPlanId) {
        fetch(`${hostName}/api/v1/meal-plan/dislike/${mealPlanId}/${userId}`)
            .then(() => {
                console.log("DislikeSent")
            });

    }

    return (
        <Card className={classes.root}>
            <CardHeader>
                <span>
                <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                    {props.date}
                </Typography>
                </span>
            </CardHeader>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title={props.title}
                />
                <CardContent>
                    <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <span>
                            <FormControlLabel
                                control={<Checkbox icon={<FavoriteBorder/>}
                                                   checkedIcon={<Favorite/>}
                                                   onClick={sendLike(props.id)}
                                                   name="checkedLike"/>}
                                label={props.liked}
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<ThumbDownIcon/>}
                                                   checkedIcon={<ThumbDownIcon/>}
                                                   onClick={sendDislike(props.id)}
                                                   name="checkedLike"/>}
                                label={props.disliked}
                            />
                        </span>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}