import React from 'react'
import { Link } from 'react-router-dom'
const NoMatch = () =>
    <div>
        <center style={{
            height: '50%',
            overflow: 'auto',
            margin: 'auto',
            position: 'absolute',
            top: 0, left: 0, bottom: 0, right: 0
        }}>
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>
            <Link to="/">Return to Home Page</Link>
        </center>
    </div>

export default NoMatch