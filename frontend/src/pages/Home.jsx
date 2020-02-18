import React, { Component } from 'react';
import { Table, TableBody, TableContainer, TableRow, TableCell } from '@material-ui/core'
import { getRanking } from '../utils/RankingApis'
import { Avatar } from '@material-ui/core';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranking: [],
            idx: 0,
            limit: 5
        }
    }
    infinity_scroll = async () => {
        console.log('scrolling')
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight === scrollHeight) {
            this.getRanking()
        }
    }

    getRanking = async () => {
        const res = await axios.get('http://dummy.restapiexample.com/api/v1/employees');
        const new_data = res.data.data.slice(this.state.idx, this.state.idx + 5)
        this.setState({
            ranking: [...this.state.ranking, ...new_data],
            idx: this.state.idx + this.state.limit
        })
    }

    componentDidMount() {
        this.getRanking()
        window.addEventListener('scroll', this.infinity_scroll, true)
    }

    render() {
        return (
            <div className="home">
                <TableContainer>
                    <Table>
                        <TableBody>
                            {this.state.ranking.map(user => (
                                <TableRow key={user.id} height="200">
                                    <TableCell>
                                        <Avatar alt="Remy Sharp" src={user.profile_image} />
                                    </TableCell>
                                    <TableCell>
                                        {user.employee_name}
                                    </TableCell>
                                    <TableCell>
                                        {user.employee_salary}
                                    </TableCell>
                                    <TableCell>
                                        {user.employee_age}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <button onClick={this.getRanking} >click</button>
            </div>
        )
    }
}

export default Home;