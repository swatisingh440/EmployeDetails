import React,{Component} from "react";
import http from './tashServer';
import { Link } from "react-router-dom";
class TaskNew extends Component{
    state={
        newEmp:{empcode:'',name:'',department:'',designation:'',salary:'',gender:''},
        edit:false
    }
    async fetchData(){
        const {empCode}=this.props.match.params;
        console.log(empCode)
        if(empCode){
            let response1=await http.get(`/emp/empCode/${empCode}`);
            let {data}=response1;
            console.log(data)
            this.setState({newEmp:data[0],edit:true})
            
        }
        else{
           let  newEmp={empcode:'',name:'',department:'',designation:'',salary:'',gender:''} ;
           this.setState({newEmp:newEmp,edit:false})
        }
    }
    async componentDidMount(){
        this.fetchData()
    }
    async componentDidUpdate(prevProps,prevState){
        if(prevProps!=this.props)
        this.fetchData()
    }
    async putData(url,obj){
        let response=await http.put(url,obj)
        console.log(response)
        this.props.history.push("/emp");
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let s1={...this.state};
        s1.newEmp[input.name]=input.value;
        this.setState(s1);
    }
    async postData(url,obj){
        let response=await http.post(url,obj)
        console.log(response)
        this.props.history.push("/emp");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let {newEmp,edit}=this.state;
        edit?this.putData(`/emp/${newEmp.empcode}`,newEmp):
        this.postData("/emp",newEmp)
    }
    makeDropDown=(arr=[],value,name,label)=>{
        return(
            <div className='form-group'>
                <label>{label}</label>
                <select className='form-control'
                name={name}
                value={value} onChange={this.handleChange}>
                    <option value="">{label}</option>
                    {arr.map((opt)=><option>{opt}</option>)}
                </select>
            </div>
        )
    }
    render(){
        const {dept,desig}=this.props;
        let {empcode,name,department,designation,salary,gender}=this.state.newEmp;
        console.log(this.state.newEmp)
        return(
            <div className="container">
                <div className='form-group'>
                    <label>Employee Code</label>
                    <input type="text" className='form-control'
                    id="empCode" name="empCode" placeholder='Enter empCode'
                    value={empcode} onChange={this.handleChange}/>
                </div>
                <div className='form-group'>
                    <label>Name</label>
                    <input type="text" className='form-control'
                    id="name" name="name" placeholder='Enter Name'
                    value={name} onChange={this.handleChange}/>
                </div>

                <div className='form-group'>
                    <label>Salary</label>
                    <input type="text" className='form-control'
                    id="salary" name="salary" placeholder='Enter salary'
                    value={salary} onChange={this.handleChange}/>
                </div>
                {this.makeDropDown(dept,department,'department','Department')}
                {this.makeDropDown(desig,designation,'designation','Designation')}
                <div className="form-check form-check">
            <input className="form-check-input"
            type="radio" name='gender' value='male'
            checked={gender?true:false}
            onChange={this.handleChange}/>
            <label className="form-check-label">Male</label>
        </div>
        <div className="form-check form-check">
            <input className="form-check-input"
            type="radio" name='gender' value='female'
            checked={gender?true:false}
            onChange={this.handleChange}/>
            <label className="form-check-label">Female</label>
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}
export default TaskNew;