import React, {useEffect, useState} from "react";
import {
    Backdrop,
    Button,
    Card,
    Checkbox,
    Fade,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Modal
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import KitchenSharpIcon from '@material-ui/icons/KitchenSharp';
import './PantryContent.css'
import IngredientSelector from "../recipe/IngredientSelector";
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import {deleteFetch, getFetchWithAuth, putFetch, putFetchWithCallback} from '../../util/fetchData';
import AuthenticationService from "../../util/AuthenticationService";
import {ErrorText} from "../Common";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        padding: 15,
        marginBottom: 15,
        width: 'auto',
        maxWidth: 600,
        transition: "transform 0.15s ease-in-out"
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)"
    },
    typography: {
        fontFamily: "Amatic SC",
        fontWeight: "bold",
        fontSize: 24
    },
    typographySmall: {
        fontFamily: "Oswald",
        fontSize: 14
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function PantryContent() {
    const classes = useStyles();
    const [state, setState] = useState({raised: false, shadow: 1,})
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = useState([])
    const [selectedIngredient, setSelected] = useState("")

    useEffect(() => {
        const pantryContentLink = `/api/v1/pantry/pantry-content/${AuthenticationService.getLoggedInUserName()}` // flexible ID here TODO

        getFetchWithAuth(pantryContentLink, (data) => {
            setItems(data)
            setSelected("");
        }, (error) => {
            console.error(error)
        })
    }, [setItems])

    const addToPantry = () => {
        if (selectedIngredient === "") {
            return;
        }
        let groceryLink = `/api/v1/pantry/pantry-list/add/${AuthenticationService.getLoggedInUserName()}/${selectedIngredient}` // pantry ID should be dynamic
        putFetchWithCallback(groceryLink, (jsonData) => {
            setItems(jsonData);
        }, (err) => {
            console.error(err);
        })
    };

    const handleToggle = (value) => () => {
        value.checked = !value.checked;
        putFetch(`api/v1/pantry/toggle-item-status/${value.id}`)
    };

    const removeItems = () => {
        deleteFetch(`/api/v1/pantry/pantry-item/delete-selected/${AuthenticationService.getLoggedInUserName()}`,
            (err) => {console.error(err)})
        let newItems = items.filter(item => !item.checked);
        setItems(newItems);
        closeDeleteWindow();
    }

    const changeAllToGroceryList = () => {
        putFetch(`/api/v1/pantry/list-item/change-selected-to-grocery-item/${AuthenticationService.getLoggedInUserName()}`,
            (err) => {console.error(err)})
        let newItems = items.filter(item => !item.checked);
        setItems(newItems);
        closeDeleteWindow();
    }

    const addToGroceryList = (id) => {
        putFetch(`/api/v1/pantry/list-item/add-to-grocery-item/${id}/${AuthenticationService.getLoggedInUserName()}`,
            (err) => {console.error(err)})
    }

    const deleteSelected = () => {
        setOpen(true);
    };

    const closeDeleteWindow = () => {
        setOpen(false);
    };


    return (
        <Card className={classes.root}
              classes={{root: state.raised ? classes.cardHovered : ""}}
              onMouseOver={() => setState({raised: true, shadow: 3})}
              onMouseOut={() => setState({raised: false, shadow: 1})}
              raised={state.raised} zdepth={state.shadow}>
            <Typography paragraph className={classes.typography}><KitchenSharpIcon/>
                Pantry Content:
            </Typography>
            <IngredientSelector setSelector={setSelected} handler={addToPantry}/>
            <List>
                {items != null && items.length > 0 && items.map((value, index) => {
                    let capitalInitialName = value.ingredientName.charAt(0).toUpperCase() + value.ingredientName.slice(1)
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                        <ListItem key={index} role={undefined} dense button onClick={handleToggle(value, index)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={value.checked}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${capitalInitialName}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments" onClick={() => addToGroceryList(value.id)}>
                                    <AddShoppingCartSharpIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <Button variant="outlined" color="secondary" className={classes.typographySmall} onClick={deleteSelected}>
                <FontAwesomeIcon icon={faMinusCircle}/> Remove all selected
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={closeDeleteWindow}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ErrorText>Do you want to move items to grocery list?</ErrorText>
                        <Button variant="outlined" color="secondary" onClick={changeAllToGroceryList}>
                            Yes
                        </Button>
                        <Button variant="outlined" color="primary" onClick={removeItems}>
                            No
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </Card>
    );
}