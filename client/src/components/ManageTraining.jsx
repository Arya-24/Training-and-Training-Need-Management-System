import { useEffect, useState } from "react";
import api from "../services/api";

export default function ManageTraining({ training, onClose }) {

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [assignedEmployees, setAssignedEmployees] = useState([]);


  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };


  const fetchAssigned = async () => {
    const res = await api.get(
      `/employee-training/${training.title}`
    );

    setAssignedEmployees(res.data);
  };


  useEffect(() => {

    fetchEmployees();
    fetchAssigned();

  }, []);



  const assignEmployee = async () => {

    await api.post(
      "/employee-training",
      {
        employee_name:selectedEmployee,
        training_title:training.title,
        progress:0,
        proficiency:0
      }
    );


    fetchAssigned();
  };



return (

<div className="modal-overlay">

<div className="modal">


<div className="modal-header">

<h2>
{training.title}
</h2>

<button onClick={onClose}>
✕
</button>

</div>


<p>
Assign employees, track progress, and record proficiency ratings.
</p>



<div className="assign-box">

<select
value={selectedEmployee}
onChange={(e)=>setSelectedEmployee(e.target.value)}
>

<option>
Select employee...
</option>


{
employees.map(emp=>(

<option key={emp.id}>
{emp.name}
</option>

))
}


</select>


<button
onClick={assignEmployee}
>
Assign
</button>


</div>




<table>

<thead>

<tr>

<th>
Employee
</th>

<th>
Progress
</th>

<th>
Proficiency
</th>

</tr>

</thead>


<tbody>


{
assignedEmployees.map(emp=>(

<tr key={emp.id}>

<td>
{emp.employee_name}
</td>


<td>
{emp.progress}%
</td>


<td>
{emp.proficiency}
</td>


</tr>


))
}


</tbody>


</table>



</div>

</div>

)


}