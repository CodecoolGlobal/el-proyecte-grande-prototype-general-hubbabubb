import React from "react";
import {Card, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components'
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        marginBottom: 15,
        width: 'auto',
        maxWidth: 600,
    },
    typography: {
        fontFamily: "Amatic SC",
        fontWeight: "bold",
        fontSize: 24,
    },
}));

const Avatar = styled.div`
    display: inline-block;
    width: 50px;
    height: 50px;
    font-family: 'Oswald';
    font-size: 24px;
    font-weight: 200;
    text-align: center;
    color: white;
    background-color: #70d9e7;
    border-radius: 50px;
    margin: 3px;
    text-decoration: none;
    cursor: pointer;
    flex-basis: 100px;
    padding-top: 7px;
`;

const PlusUser = styled.div`
    display: inline-block;
    width: 50px;
    height: 50px;
    font-family: 'Oswald';
    font-size: 30px;
    font-weight: 200;
    text-align: center;
    color: black;
    background-color: #dce775;
    border-radius: 50px;
    
    text-decoration: none;
    cursor: pointer;
    flex-basis: 100px;
    padding-top: 2px;
`;

export default function PantryUsers(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Typography paragraph className={classes.typography}><FontAwesomeIcon icon={faUserCircle}/> Pantry Users:</Typography>
            {props.users.map((user) => {
                return <Avatar>
                    {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                </Avatar>
            })}
            <PlusUser>+</PlusUser>
        </Card>
    );
}