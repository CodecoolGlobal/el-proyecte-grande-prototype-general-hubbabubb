import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Backdrop, Grow, Modal} from "@material-ui/core";

import Recipe from "./Recipe";
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        top:'10%',
        left:'10%',
        overflow:'scroll',
        maxHeight: '100vh',
    },
});

export default function RecipeListItem(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [recipe, setRecipe] = useState({});

    const handleOpen = () => {
        getFetchWithAuth(`/api/v1/recipe/${props.id}`, (data) => {
            setRecipe(data)
            setOpen(true);
        }, (error) => {
            console.log(error)
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleOpen}>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title={props.title}
                />
                <CardContent>
                    <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            ><Grow in={open}>
                <Recipe recipe={recipe} />
            </Grow>
            </Modal>
        </Card>
    );
}