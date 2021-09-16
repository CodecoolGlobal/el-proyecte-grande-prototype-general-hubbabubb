import React, {useEffect, useState} from "react";
import {Backdrop, Card, Fade, makeStyles, Modal} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components'
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import AuthenticationService from "../../util/AuthenticationService";
import {getFetch, putFetch} from "../../util/fetchData";

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
const UsersContainer = styled.div`
    display: flex;
    alignItems: center;
    justifyContent: center;
`;

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
    margin-left: 20px;
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
    padding-top: 2px;
`;

export const Text = styled.p`
    padding: 5px;
    color: black;
    text-align:left;
    font-size: 14px;
    font-weight: 50;
`;

export default function PantryUsers(props) {
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        getFetch(`api/v1/pantry/users/${AuthenticationService.getLoggedInUserName()}`, (json) => {
            setUsers(json);
            console.log(users);

        }, (err) => {
            console.error(err);
        })
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleInvite() {
        let url = `api/v1/pantry/${AuthenticationService.getLoggedInUserName()}/invite-to-pantry/${email
        }`;

        putFetch(url, (err) => console.log(err));

        setOpen(false);
    }

    const [state, setState] = useState({
        raised:false,
        shadow:1,
    })

    return (
        <Card className={classes.root}
              classes={{root: state.raised ? classes.cardHovered : ""}}
              onMouseOver={()=>setState({ raised: true, shadow:3})}
              onMouseOut={()=>setState({ raised:false, shadow:1 })}
              raised={state.raised} zdepth={state.shadow}>
            <Typography paragraph className={classes.typography}><FontAwesomeIcon icon={faUserCircle}/> Pantry
                Users:</Typography>
            <UsersContainer>
                {users !== undefined && users.map((user) => {
                    return <div>
                        <Avatar>
                            {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                        </Avatar>
                        <Text>{user.firstName + ' ' + user.lastName}</Text>
                    </div>
                })}
                <PlusUser onClick={handleOpen}>+</PlusUser>
            </UsersContainer>
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
                        <h1>Invite user to Your pantry:</h1>
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