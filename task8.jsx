import React,{Component} from "react";
import TaskNav from "./taskNav";
import TaskEmp from "./taskEmp";
import { Route,Switch } from "react-router-dom";
import TaskNew from "./taskNew";
import Taskdlt from "./taskdlt";
class Task8 extends Component{
    state={
        dept:['Finance', 'HR', 'Technology', 'Marketing'],
        desig:['VP', 'Manager', 'Trainee']
    }
    render(){
        const {dept,desig}=this.state;
        return(<React.Fragment>
           <TaskNav dept={dept} desig={desig}/>
           <Switch>
            <Route path="/emp" render={(props)=><TaskEmp {...props} display='emp'/>}/>
            <Route path="/dept/:dept" render={(props)=><TaskEmp {...props} display='dept'/>}/>
            <Route path="/desig/:desig" render={(props)=><TaskEmp {...props} display='desig'/>}/>
            <Route path="/newEmp/:empCode" render={(props)=><TaskNew {...props} dept={dept} desig={desig}/>}/>
            <Route path="/newEmp" render={(props)=><TaskNew {...props} dept={dept} desig={desig}/>}/>
            <Route path="/dlt/:empCode" render={(props)=><Taskdlt {...props}/>}/>
           </Switch>
        </React.Fragment>)
    }
}
export default Task8;