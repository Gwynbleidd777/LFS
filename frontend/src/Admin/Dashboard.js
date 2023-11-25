import { useEffect, useState } from "react";

const Dashboard = () => {
  const [record, setRecord] = useState([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resposne) => resposne.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setRecord(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div class="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Home</a>
          </li>
        </ol>
      </nav>
      <p class="lead d-none d-sm-block">Dashboard</p>
      <div class="row mb-3">
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card bg-success text-white h-100">
            <div
              class="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <div class="rotate">
                <i class="fa-solid fa-box-open fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Catagories </h6>
              <p class="text-uppercase">Active </p>
              <h1 class="display-4">134</h1>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-danger h-100">
            <div class="card-body bg-danger">
              <div class="rotate">
                <i class="fa-solid fa-box-open fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Catagories </h6>
              <p class="text-uppercase">inActive </p>
              <h1 class="display-4">134</h1>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-info h-100">
            <div class="card-body bg-info">
              <div class="rotate">
                <i class="fa-solid fa-spinner fa-4x"></i>
              </div>
              <h6 class="text-uppercase">item entry</h6>
              <p class="text-uppercase">pending </p>
              <h1 class="display-4">125</h1>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-warning h-100">
            <div class="card-body">
              <div class="rotate">
                <i class="fa-solid fa-check fa-4x"></i>
              </div>
              <h6 class="text-uppercase">item entry</h6>
              <p class="text-uppercase">published </p>
              <h1 class="display-4">125</h1>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div class="row ">
        <div class=" col-sm-12">
          <h5 class="mt-3 mb-3 text-secondary">
            Check More Records of Employees
          </h5>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead class="thead-light">
                <tr>
                  <th>No</th>
                  <th>Label</th>
                  <th>Header</th>
                  <th>Column</th>
                  <th>Record Data</th>
                </tr>
              </thead>
              <tbody>
                {record.slice(0, 5).map((output) => (
                  <tr>
                    <td>{output.id}</td>
                    <td>{output.name}</td>
                    <td>{output.email}</td>
                    <td>{output.username}</td>
                    <td>{output.website}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
