import React, {Component} from 'react';
import { Table, TableBody, TableContainer, TableRow, TableCell }  from '@material-ui/core'
import { getRanking } from '../utils/RankingApis'
import { Avatar } from '@material-ui/core';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranking: [],
            idx: 0,
            limit: 5
        }
    }

    getRanking = async () => {
        const res = await getRanking(this.state.idx, this.state.limit);
        this.setState({ 
            ranking: [...this.state.ranking, ...res],
            idx: this.state.idx + this.state.limit
        })
        console.log('check :', this.state.ranking)
    }

    render() {
        return (
            <div className="home">
                <TableContainer>
                    <Table>
                        <TableBody>
                            {this.state.ranking.map(user => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <Avatar alt="Remy Sharp" src={user.profile} />
                                    </TableCell>
                                    <TableCell>
                                        {user.rank}
                                    </TableCell>
                                    <TableCell>
                                        {user.nickName}
                                    </TableCell>
                                    <TableCell>
                                        {user.score}
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