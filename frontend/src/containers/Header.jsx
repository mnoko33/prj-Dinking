import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../modules/auth';
import '../sass/Header.scss'
import { Link } from "react-router-dom";

class Header extends Component {
    toggleAuth = () => {
        if (this.props.user) {
            this.props.logout();
            localStorage.removeItem('userInfo')
        }
    }

    render() {
        return (
            <div className="header">
                <div className="profile">
                    {this.props.user && 
                        <div className="userInfo">
                            <img className="Img" src={this.props.user.profile} alt="profile Img"/>
                            <div className="Info">
                                <div className="nickName">
                                    {this.props.user.nickName}
                                </div>
                                <div className="rank">
                                    {this.props.user.rank}
                                </div>
                            </div>
                        </div>
                    }
                    <div className="authBtn" onClick={this.toggleAuth}>
                        {this.props.user ? "로그아웃" : <Link className="link" to='/login'>로그인</Link>}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.auth.user }),
    { logout }
)(Header);