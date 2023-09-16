import React,{Component} from "react";
import { Link } from "react-router-dom";
class TaskNav extends Component{
    render(){
        const {dept,desig}=this.props;
        return (
            <React.Fragment>
               
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            
            <li className="nav-item">
              <Link className="nav-link" to="/emp">
                Employee
              </Link>
            </li>
            <li className="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Department
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {dept.map((pr)=>{
            return (<Link className="dropdown-item" to={`/dept/${pr}`}>{pr}</Link>)
          })}
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Designation
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {desig.map((pr)=>{
            return (<Link className="dropdown-item" to={`/desig/${pr}`}>{pr}</Link>)
          })}
        </div>
      </li>
      <li className="nav-item">
              <Link className="nav-link" to="/newEmp">
                New Employee
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    
            </React.Fragment>
        )}
}
export default TaskNav;