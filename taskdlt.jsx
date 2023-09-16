import React,{Component} from 'react';
import http from "./tashServer"
class Taskdlt extends Component{
    async componentDidMount(){
        const {empCode}=this.props.match.params;
        console.log(empCode)
        let response=await http.deleteApi(`/srv/emp/${empCode}`);
        console.log(response)
        this.props.history.push("/emp")
       
    }
    render(){
        return ""
    }
}
export default Taskdlt;