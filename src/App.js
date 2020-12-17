import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Link,
    TextField, CardActions
} from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Alert } from '@material-ui/lab'
import logo from './logo.svg'
import './scss/App.scss'

const useStyles = makeStyles((theme) => ({
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

export default function App() {
    const classes = useStyles();
    let alert = null;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('login')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (email === '' || password === '') {
            alert = <Alert severity="error">Please fill out the form!</Alert>
        } else {
            setOpen(true)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="App">
            <Modal
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
                        <p id="transition-modal-description">Successfully logged in.</p>
                    </div>
                </Fade>
            </Modal>
            <Card className="Auth">
                { content === 'login' ?
                    <CardContent className="Sign">
                        <div className="Header">
                            <img src={logo} alt="logo"/>
                            <h3>Welcome to react material-ui!</h3>
                            <span>Sign in to your account to continue</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {alert}
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        type="email"
                                        label="Email Address"
                                        className="form-control"
                                        placeholder="Email Address"
                                        required
                                        defaultValue={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        type="password"
                                        label="Password"
                                        className="form-control"
                                        placeholder="Password"
                                        required
                                        defaultValue={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </FormControl>
                            </FormGroup>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="remember-me"
                                            color="primary"
                                            checked={remember}
                                            onChange={() => setRemember(!remember)}/>
                                    }
                                    label="Remember me"
                                />
                                <Link href="#" onClick={event => {
                                    event.preventDefault()
                                    setContent('forgot')
                                }} color="inherit" className="forgot-password">Forgot password?</Link>
                            </FormGroup>
                            <Button type="submit" variant="contained" color="primary" fullWidth={true}>Sign In</Button>
                        </form>
                    </CardContent> :
                    <CardContent className="Sign">
                        <div className="Header">
                            <img src={logo} alt="logo"/>
                            <h3>Enter your email to send reset link</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {alert}
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        type="email"
                                        label="Email Address"
                                        className="form-control"
                                        placeholder="Email Address"
                                        required
                                        defaultValue={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </FormControl>
                            </FormGroup>
                            <Button type="submit" variant="contained" className="mt-2" color="primary" fullWidth={true}>
                                Reset Password
                            </Button>
                            <div className="go-back">
                                <Link href="#" onClick={event => {
                                    event.preventDefault()
                                    setContent('login')
                                }} color="inherit" className="back">Back</Link>
                            </div>
                        </form>
                    </CardContent> }
            </Card>
        </div>
    );
}
