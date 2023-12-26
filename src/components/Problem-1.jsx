import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [tasks, setTasks] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const handleClick = (val) => {
    setShow(val);
  };

  // handle Form
  const onSubmit = (data) => {
    console.log(data);

    const taskDetails = {
      name: data.name,
      status: data.status.toLowerCase(),
    };
    setTasks([...tasks, taskDetails]);

    reset();
  };

  console.log(tasks);

  const sortedTasks = tasks.sort((a, b) => {
    
    const statusOrder = {
      active: 1,
      completed: 2,
      archive: 3,
      pending: 4,
    };

    return statusOrder[a.status] - statusOrder[b.status];
  });

  const filteredTasks = () => {
    switch (show) {
      case "all":
        return sortedTasks;
      case "active":
        return tasks.filter((task) => task.status === "active");
      case "completed":
        return tasks.filter((task) => task.status === "completed");
      default:
        return tasks;
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
        
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                {...register("status", {
                  required: true,
                })}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;