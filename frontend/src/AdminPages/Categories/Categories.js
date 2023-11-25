import React, { useEffect, useState } from "react";

const Categories = () => {
  const [record, setRecord] = useState([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check More Records of Employees
          </h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
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
                  <tr key={output.id}>
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
    </>
  );
};

export default Categories;