import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {Avatar, Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CardHeader from "react-bootstrap/CardHeader";
import {red} from "@material-ui/core/colors";
import {hostName} from "../../util/constants";
import {getFetchWithAuth} from "../../util/fetchData";

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
    const userId = 1;
    const classes = useStyles();
    // let [liked, setLiked] = useState(false);
    // let [disliked, setDisliked] = useState(false);
    // let [likeClick, setLikeClick] = useState(false);
    // let [dislikeClick, setDislikeClick] = useState(false);




    // useEffect(() => {
    //     getFetchWithAuth(`${hostName}/api/v1/meal-plan/dislike/${props.id}/${userId}`, (data) => {
    //         console.log(data);
    //     }, (error) => {console.log(error)})
    //     setLiked(!liked)
    // }, [likeClick])
    //
    // useEffect(() => {
    //     getFetchWithAuth(`${hostName}/api/v1/meal-plan/dislike/${props.id}/${userId}`, (data) => {
    //         console.log(data);
    //     }, (error) => {console.log(error)})
    //     setDisliked(!disliked)
    // }, [dislikeClick])
    //
    // useEffect(() => {
    //     getFetchWithAuth(`${hostName}/api/v1/meal-plan/like-checked/${props.id}/${userId}`, (data) => {
    //         setLiked(data)
    //     }, (error) => {console.log(error)})
    // }, [liked])
    //
    // useEffect(() => {
    //     getFetchWithAuth(`${hostName}/api/v1/meal-plan/dislike-checked/${props.id}/${userId}`, (data) => {
    //         setDisliked(data)
    //     }, (error) => {console.log(error)})
    // }, [disliked])

    // function isLikeChecked(mealPlanId) {
    //     fetch(`${hostName}/api/v1/meal-plan/dislikeChecked/${mealPlanId}/${userId}`)
    //         .then(isChecked => setLiked(isChecked))
    //         .catch(error => console.log(error));
    //     return false;
    // }
    //
    // function isDislikeChecked(mealPlanId) {
    //     fetch(`${hostName}/api/v1/meal-plan/checked/${mealPlanId}/${userId}`)
    //         .then(isChecked => {return isChecked})
    //         .catch(error => console.log(error));
    //     return false;
    // }

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
                    <div style={{display: 'flex', justifyContent: 'center', }}>
                        <span>
                            <FormControlLabel
                                control={<Checkbox checked={}
                                                   icon={<FavoriteBorder/>}
                                                   checkedIcon={<Favorite/>}
                                                   onClick={}
                                                   name="checkedLike"/>}
                                label={props.liked}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                                   icon={<ThumbDownIcon/>}
                                                   checkedIcon={<ThumbDownIcon/>}
                                                   name="checkedDislike"/>}
                                label={props.disliked}
                            />
                        </span>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}