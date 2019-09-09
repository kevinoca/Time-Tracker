import React from "react"
import Navbar from "../navbar"

const Dashboard = () => {

    const calculate = input => {

        const result = input.replace(":","")

        return Number(result) + 800

    }

    return (

        <>
            <Navbar />
            <h1>Dashboard View</h1>
        </>
        
    )

}

export default Dashboard