import React, { Component } from 'react';
import '../sass/pages/Page404.scss'

class NotFound extends Component {
    render() {
        return (
            <div className="NotFound">
                <p className="label">404</p>
                <p className="content">PAGE NOT FOUND</p>
            </div>
        )
    }
}

export default NotFound