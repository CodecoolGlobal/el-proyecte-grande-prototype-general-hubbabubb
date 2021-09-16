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
import AuthenticationService from "../../util/AuthenticationService";

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
    const userEmail = AuthenticationService.getLoggedInUserName();
    const classes = useStyles();


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
                                control={<Checkbox
                                                   // checked={liked}
                                                   icon={<FavoriteBorder/>}
                                                   checkedIcon={<Favorite/>}
                                                   // onClick={setLikeClick(!likeClick)}
                                                   name="checkedLike"/>}
                                // label={likeCount}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                                   // checked={disliked}
                                                   icon={<ThumbDownIcon/>}
                                                   checkedIcon={<ThumbDownIcon/>}
                                                   // onClick={setDislikeClick(!dislikeClick)}
                                                   name="checkedDislike"/>}
                                // label={dislikeCount}
                            />
                        </span>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}