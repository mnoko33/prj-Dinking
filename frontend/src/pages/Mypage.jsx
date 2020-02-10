import React, {Component} from 'react';
import Button from '../components/Button';
import Form from '../components/Form'
// import { axiosLogin } from '../apis/AuthApis';
import axios from 'axios';
import {connect} from 'react-redux';

class Mypage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pbId: '',
            pbName: '',
        }
    }

    handleProblemChange = async (e) => {
        await this.setState({
            ...this.state,
            pbId: e.target.value
        })
        const res = await axios.get(`http://localhost:8080/api/problems/pb_id/${this.state.pbId}`)
        if (res.data.problems[0]) {
            this.setState({
                ...this.state,
                pbName: res.data.problems[0].pb_name
            })
        } else {
            this.setState({
                ...this.state,
                pbName: "일치하는 문제가 업습니다."
            })
        }
    }

    requestEnrollment = async () => {
        const resProblem = await axios.get(`http://localhost:8080/api/problems/pb_id/${this.state.pbId}`)
        const pbId = resProblem.data.problems[0]._id
        const data = {
            problemId: pbId,
            userId: "5e4144c1c8a44229e46500d9"
        }
        const res = await axios.patch('http://localhost:8080/api/users/boj_problem_set', data)
        console.log(res)
    }   

    render() {
        return (
            <div className="mypage">
                <p>아이디이이: {this.state.pbName}</p>
                <Form 
                    className="Form" 
                    type="text" 
                    placeholder="문제번호를 입력해주세요"
                    value={this.state.pbId}
                    handleChange={this.handleProblemChange}
                />
                <Button 
                    content="등록!"
                    className="Btn" f={this.requestEnrollment} 
                />
            </div>
        )
    }
}

export default connect(
    null,
    null
)(Mypage);