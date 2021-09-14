import React, {useState} from "react";
import {Backdrop, Card, Fade, makeStyles, Modal} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components'
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FormControl, InputGroup, Button} from "react-bootstrap";
import AuthenticationService from "../../util/AuthenticationService";
import {putFetch} from "../../util/fetchData";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        marginBottom: 15,
        width: 'auto',
        maxWidth: 600,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    typography: {
        fontFamily: "Amatic SC",
        fontWeight: "bold",
        fontSize: 24,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
    const [email, setEmail] = useState();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleInvite() {
        let url = `api/v1/${AuthenticationService.getLoggedInUserName()}/invite-to-pantry/${email
        }`;

        putFetch(url, (err) => console.log(err));

        setOpen(false);
    }

    return (
        <Card className={classes.root}>
            <Typography paragraph className={classes.typography}><FontAwesomeIcon icon={faUserCircle}/> Pantry Users:</Typography>
            {props.users.map((user) => {
                return <Avatar>
                    {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                </Avatar>
            })}
            <PlusUser onClick={handleOpen} >+</PlusUser>
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
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h1>Add user to Pantry:</h1>
                        <InputGroup className="mb-3">
                            <FormControl
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Recipient's email"
                                aria-label="Recipient's email"
                                aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2" onClick={handleInvite}>
                                Invite
                            </Button>
                        </InputGroup>
                    </div>
                </Fade>
            </Modal>
        </Card>
    );
}