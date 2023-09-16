import React,{Component} from 'react';
class TaskLeft extends Component{
    state={
        dept:['Finance', 'HR', 'Technology', 'Marketing'],
        desig:['VP', 'Manager', 'Trainee'],
        genderAr:["Female","Male"]
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let options={...this.props.options}
       options[input.name]=input.value
        this.props.onOptionChange(options);
    }
    makeRadio=(arr,label,value,name)=>{
        return(<div className='container border'><label className="form-check-label text-dark ">{label}</label>
         {arr.map((pr)=>{
             return( <div className="form-check form-check ">
             <input className="form-check-input"
             type="radio" name={name} value={pr}
             checked={value===pr}
             onChange={this.handleChange}/>
             <label className="form-check-label">{pr}</label><br/>
         </div>)
         })}</div>)
     }
    render(){
        const {dept,desig,genderAr}=this.state;
        let {department='',designation='',gender=''}=this.props.options;
        return(
            <React.Fragment>
             {this.makeRadio(dept,'Department',department,'department')}
             {this.makeRadio(desig,'designation',designation,'designation')}
             {this.makeRadio(genderAr,'Gender',gender,'gender')}
            </React.Fragment>
        )
    }
}
export default TaskLeft;