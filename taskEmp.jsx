import React,{Component} from "react";
import http from "./tashServer";
import queryString from 'query-string';
import { Link } from "react-router-dom";
import TaskLeft from "./taskLeft";
class TaskEmp extends Component{
    state={
        emp:[],
    }
    async fetchData(){
        let queryParams=queryString.parse(this.props.location.search)
        let searchStr=this.makeStr(queryParams)
        let {dept,desig}=this.props.match.params;
        let display=this.props.display;
        
        if(display==='emp'){
        let response=await http.get(`/emp?${searchStr}`)
        let {data}=response;
        this.setState({emp:data})
        console.log(data)}
        else if(display==='dept'){
            let response=await http.get(`/emp/${dept}?${searchStr}`)
        let {data}=response;
        this.setState({emp:data})
        console.log(data)
        }
        else if(display==='desig'){
            let response=await http.get(`/emp/desig/${desig}?${searchStr}`)
        let {data}=response;
        this.setState({emp:data})
        console.log(data)
        }

    }
    async componentDidMount(){
      this.fetchData()
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps!=this.props)
        this.fetchData()
    }
    callURL=(url,options)=>{
        console.log(url,options)
        let searchStr=this.makeStr(options);
        this.props.history.push({
            pathname: url,
            search:searchStr
        })
    }
    handleOptionChange=(options)=>{
        let {dept,desig}=this.props.match.params;
        let display=this.props.display;
        if(display==='emp')
       this.callURL("/emp",options)
       else if(display==='dept') this.callURL(`/dept/${dept}`,options)
       else if(display==='desig')  this.callURL(`/desig/${desig}`,options)
       
    }
    makeStr=(options)=>{
        let {department,designation,gender}=options;
        let searchStr='';
        searchStr=this.addToQueryStr(searchStr,'department',department)
        searchStr=this.addToQueryStr(searchStr,'designation',designation)
        searchStr=this.addToQueryStr(searchStr,'gender',gender)
      
       console.log(searchStr)
        return searchStr;
    }
    addToQueryStr=(str,paramName,value)=> (value)? str?`${str}&${paramName}=${value}`:
        `${paramName}=${value}`:str;
    render(){
        const {emp}=this.state;
        let queryParams=queryString.parse(this.props.location.search)
        console.log(emp)
        return(<React.Fragment>
          <div className="container">
            <div className="row">
                <div className="col-2">
                <TaskLeft options={queryParams} onOptionChange={this.handleOptionChange}/>
                </div>
                <div className="col-10">
            <div className="row bg-dark text-white">
                <div className="col-1 border">EmpCode</div>
                <div className="col-2 border">Name</div>
                <div className="col-2 border">Department</div>
                <div className="col-2 border">Designation</div>
                <div className="col-1 border">Salary</div>
                <div className="col-1 border">Gender</div>
                <div className="col-3 border"></div>
            </div>
            {emp.map((pr)=>{
                return(
                    <div className="row">
                    <div className="col-1 border">{pr.empcode}</div>
                    <div className="col-2 border">{pr.name}</div>
                    <div className="col-2 border">{pr.department}</div>
                    <div className="col-2 border">{pr.designation}</div>
                    <div className="col-1 border">{pr.salary}</div>
                    <div className="col-1 border">{pr.gender}</div>
                    <div className="col-3 border"><button className="m-2 bg-warning"><Link to={`/newEmp/${pr.empcode}`}>Edit</Link></button>
                    <button className="m-2 bg-danger"><Link to={`/dlt/${pr.empcode}`}>delete</Link></button></div>
                </div>
                )
            })}
</div>
            </div>
          </div>
        </React.Fragment>)
    }
}
export default TaskEmp;