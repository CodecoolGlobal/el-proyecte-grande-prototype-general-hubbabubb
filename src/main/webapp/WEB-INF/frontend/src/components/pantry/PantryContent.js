import React, {useState} from "react";
import {
    Button,
    Card,
    Checkbox, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {faArchive, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './PantryContent.css'
import IngredientSelector from "../recipe/IngredientSelector";
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },

        marginBottom: 15,
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
    },
    typography: {
        fontFamily: "Amatic SC",
        fontWeight: "bold",
        fontSize: 24,
    },
    typographySmall: {
        fontFamily: "Oswald",
        fontSize: 14,
    },
}));

export default function PantryContent(props) {
    const [idCounter, setIdCounter] = useState(5);
    const [inputValue, setInputValue] = useState('');
    const classes = useStyles();
    const [items, setItems] = useState(props.content)
    const [selectedIngredient, setSelected] = useState('');

    // TODO: collect list methods and remove duplications
    const removeItem = (id) => {
        let newList = items.filter(item => item.id !== id)
        setItems(newList)
    }

    const toggleComplete = (id) => {
        const newItems = [...items];
        newItems.forEach(item => {
            if (item.id === id) {
                item.checked = !item.checked;
            }
        })
        setItems(newItems);
    };

    function removeAllChecked() {
        let newList = items.filter(item => !item.checked)
        setItems(newList)
    }

    const handleAddButtonClick = () => {
        const newItem = {
            ingredientName: selectedIngredient,
            id: idCounter,
            checked: false,
        };
        setIdCounter(idCounter + 1)
        const newItems = [...items, newItem];

        setItems(newItems)
        setSelected("");
    };

    const values = {setSelected, handleAddButtonClick}

    return (
        <Card className={classes.root}>
            <Typography paragraph className={classes.typography}><FontAwesomeIcon icon={faArchive}/>
                Pantry Content:
            </Typography>
            <IngredientSelector setSelect={values} />
            <List>
                {items && items.map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                        <ListItem className={"grocery-item"} key={value.id} role={undefined} dense button
                                  onClick={() => toggleComplete(value.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={value.checked}
                                    color={"default"}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={!value.checked ? value.ingredientName :
                                <strike>{value.ingredientName}</strike>}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => removeItem(value.id)} aria-label="delete">
                                    <AddShoppingCartSharpIcon color={"default"}/>
                                    {/*<RemoveShoppingCartIcon color={"default"}/>*/}
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    );
                })}
            </List>
            <Button variant="outlined" color="secondary" className={classes.typographySmall} onClick={removeAllChecked}>
                <FontAwesomeIcon icon={faPlusSquare}/> Remove from pantry
            </Button>
        </Card>
    );
}