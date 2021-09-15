import React from 'react';

import {Card, Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardContent from "@material-ui/core/CardContent";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {faClipboardList, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IngredientSelector from "../recipe/IngredientSelector";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper
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
        fontFamily: "Amatic SC",
        fontWeight: "bold",
        fontSize: 24
    },
    typographySmall: {
        fontFamily: "Oswald",
        fontSize: 14
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    listItem: {
        width: 200,
    },
 delete: {
    color: red[500],
 }
}));


export default function ContentSelector(props) {
    const {setContent} = props.methods;
    const {content} = props.methods;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [selected, setSelected] = React.useState('');

    function handleAddIngredient() {
        setContent((curr) => curr.concat({ingredientName: selected}));
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function deleteItem(ingredient) {
        let newList = content.filter(item => item !== ingredient)
        setContent(newList)
    }

    return (
        <Card className={classes.root}>
            <Typography paragraph className={classes.typography}>
                <FontAwesomeIcon icon={faClipboardList}/> Customise ingredient list:
            </Typography>
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon/>
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <IngredientSelector setSelector={setSelected} handler={handleAddIngredient} />
                    <List className={classes.list}>
                        {content.map((item, index) => {
                            return <ListItem key={index} onClick={() => deleteItem(item)} className={classes.listItem} button>
                                <ListItemIcon>
                                    <FontAwesomeIcon className={classes.delete} icon={faMinusCircle}/>
                                </ListItemIcon>
                                <ListItemText primary={item.ingredientName}/>
                            </ListItem>
                        })}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
}