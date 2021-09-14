import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import KitchenSharpIcon from '@material-ui/icons/KitchenSharp';
import './PantryContent.css'
import IngredientSelector from "../recipe/IngredientSelector";
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import {fetchNoResponse, getFetchWithAuth} from '../../util/fetchData';
import {hostName} from '../../util/constants';
import AuthenticationService from "../../util/AuthenticationService";

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
    }
}));

export default function PantryContent() {
    const classes = useStyles();
    const [items, setItems] = useState('')
    const [selectedIngredient, setSelected] = useState('');
    const [itemAdded, setItemAdded] = useState(false)

    useEffect(() => {
        const pantryContentLink = `${hostName}/api/v1/pantry-content/${AuthenticationService.getLoggedInUserName()}` // flexible ID here TODO

        getFetchWithAuth(pantryContentLink, (data) => {
            setItems(data)
        }, (error) => {
            console.error(error)
        })
    }, [itemAdded])

    // TODO: collect list methods and remove duplications
    const removeItem = (id) => {
        let newList = items.filter(item => item.id !== id)
        setItems(newList)
        fetchNoResponse(`http://localhost:8081/api/v1/list-item/delete/${id}`, "GET")

    }

    const toggleComplete = (id) => {
        const newItems = [...items];
        newItems.forEach(item => {
            if (item.id === id) {
                fetchNoResponse(`http://localhost:8081/api/v1/item-status/${item.id}`, "GET")
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
        if (selectedIngredient === "") {
            return;
        }
        let groceryLink = `${hostName}/api/v1/pantry-list/add/1/${selectedIngredient}` // pantry ID should be dynamic
        fetchNoResponse(groceryLink, "POST")
        setSelected("");
        setItemAdded(!itemAdded)
    };

    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    })

    return (
        <Card className={classes.root}
              classes={{root: state.raised ? classes.cardHovered : ""}}
              onMouseOver={() => setState({raised: true, shadow: 3})}
              onMouseOut={() => setState({raised: false, shadow: 1})}
              raised={state.raised} zdepth={state.shadow}>
            <Typography paragraph className={classes.typography}><KitchenSharpIcon/>
                Pantry Content:
            </Typography>
            <IngredientSelector setSelector={setSelected} handler={handleAddButtonClick}/>
            <List>
                {items !== "" && items.map((value) => {
                    let bigStartingLetter = value.ingredientName.charAt(0).toUpperCase() + value.ingredientName.slice(1)
                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                        <ListItem className={"grocery-item"} key={value.id} role={undefined} dense button
                                  onClick={() => toggleComplete(value.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={value.checked}
                                    color={"primary"}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={!value.checked ? bigStartingLetter :
                                <strike>{bigStartingLetter}</strike>}/>
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
                <FontAwesomeIcon icon={faMinusCircle}/> Remove from pantry
            </Button>
        </Card>
    );
}