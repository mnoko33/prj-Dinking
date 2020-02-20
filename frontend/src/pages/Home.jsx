import React, { Component } from 'react';
import { getRanking } from '../utils/RankingApis'


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
                <div style={{height:300}}>
                    {this.state.ranking.map(user=> {
                        return <div>{user.nickName}</div>
                    })}
                </div>
                <button onClick={this.getRanking} >click</button>
            </div>
        )
    }
}

export default Home;