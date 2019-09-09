import React, { Component } from "react"
import Button from '@material-ui/core/Button'
import swal from 'sweetalert'
import Navbar from "../navbar"


export default class Home extends Component {

    constructor(props) {

        super(props)
        this.state = {
            checkInDisabled: false,
            checkOutDisabled: false,
        }


        this.times = new Map()

    }

    saveTime = type => {

        const coockieData = {}

        const time = new Date().getTime()

        const t = (type == "in") ? "entrada" : "salida"

        this.times.set(type, time)

        swal("¿Está seguro de guardar esta hora?")
            .then((value) => {

                if (value) {

                    swal({
                        title: "Hora Guardada",
                        text: `Se ha guardado la hora de ${t} exitosamente`,
                        icon: "success",
                        button: "OK!",
                    });

                    (type == "in") ? this.setState({ checkInDisabled: true }) : this.setState({ checkOutDisabled: true })
                    coockieData.cookieName = type
                    coockieData.cookieContent = new Date().toDateString()

                    this.createCookie(coockieData, type)

                }

                else {
                    swal(`No se ha guardado nada.`)
                }

            })
    }

    cookieExists = name => {
        const COOKIES = document.cookie.split("; ")
        return COOKIES.some(c => (c.includes(name) == name) ? new Error() : console.info("cookie doesn't exist"))
    }

    createCookie = (data, type) => {

        let error = false
        const COOKIES = document.cookie.split("; ")
        const writeCookie = data => document.cookie = `${data.cookieName}=${data.cookieContent}`
        const reportError = message => { console.info(message); error = true }

        COOKIES.map(c => c.includes(type) == true ? reportError(`ya existe una cookie con el nombre ${type}`) : writeCookie(data))

        return (data.cookieName != "" || data.cookieName != null || data.cookieName != undefined || error) ? writeCookie(data) : reportError("cookie no valida")
    }

    render() {

        console.info(this.state)

        return (

            <>
            
                <Navbar />

                <div style={styles.top}>

                    <div className="box-top">

                        <Button variant="contained" color="primary" style={{ width: "100%" }} disabled={this.state.checkInDisabled || this.state.checkOutDisabled} onClick={() => this.saveTime("in")}>Check In</Button>

                    </div>

                </div>

                <div style={styles.bottom}>

                    <div className="box-bottom">

                        <Button variant="contained" color="secondary" style={{ width: "100%" }} disabled={this.state.checkOutDisabled} onClick={() => this.saveTime("out")}>Check Out</Button>

                    </div>

                </div>

            </>

        )

    }

}

const styles = {
    top: {
        background: "white",
        height: "46vh",
        width: "100%",
    },
    bottom: {
        background: "white",
        height: "46vh",
        width: "100%",
    }
}