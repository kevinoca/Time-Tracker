import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import swal from 'sweetalert'

import Keys from "./keys"//this file is untracked as it's used to keep the credentials secret

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends Component {

    constructor(props) {

        super(props)

        this.state = {}

    }

    onSubmitFormData = event => {

        event.preventDefault()

        const formData = {}
        new FormData(event.target).forEach((value, key) => formData[key] = value)
        if (formData["remember"] === undefined) {
            formData["remember"] = false
        } else {
            formData["remember"] = Boolean(formData["remember"])
        }

        this.validateCredentials(formData)

        //todo is remember is true, it should remember users data when they come back to the aplication in a stablished period of time

    }

    validateCredentials = credentials => {

        const { email, password, remember } = credentials

        if (remember) {
            //then attach the user session to the navigator to avoid login when user leaves the app and comes back.
        }

        const navigateToLogin = () => {

            swal({
                title: "Nagivating to Home",
                text: `User logged in successfully!`,
                icon: "success",
                button: "OK!",
            }).then(() => this.props.performSignIn(credentials))

        }

        const showErrorDialog = () => swal("Oops", "Something went wrong!", "error");

        (email === Keys.email && password == Keys.password)
            ? navigateToLogin()
            : showErrorDialog()

    }

    render() {

        const { classes } = this.props;

        return (

            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5"> Sign in</Typography>
                    <form className={classes.form} onSubmit={e => this.onSubmitFormData(e)}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" type="email" defaultValue="" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" defaultValue="" />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={false} value="true" name="remember" color="primary" id="remember" />}
                            label="Remember me"
                            id="remember"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                    </Button>
                    </form>
                </Paper>
            </main>
        )

    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);