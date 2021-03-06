import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NurseApi from "../../../api/nurseApi";

const Employees = (props) => {
  const [listNurse, setListNurse] = useState([]);

  useEffect(() => {
    const getListNurse = async () => {
      const { data } = await NurseApi.getAll();
      setListNurse(data);
    };
    getListNurse();
  }, []);

  return (
    <div>
      <div className="page">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Employee</h4>
            </div>
            <div className="col-sm-8 col-9 text-right m-b-20">
              <a
                href="/addDoctor"
                className="btn btn-primary float-right btn-rounded"
              >
                <i className="fa fa-plus" /> Add Employee
              </a>
            </div>
          </div>
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <label className="focus-label">Employee ID</label>
                <input type="text" className="form-control floating" />
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <label className="focus-label">Employee Name</label>
                <input type="text" className="form-control floating" />
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <a href="#" className="btn btn-success btn-block">
                {" "}
                Search{" "}
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {/* table */}
              <div className="table-responsive">
                <table className="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "200px" }}>Name</th>
                      <th>Employee ID</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th style={{ minWidth: "110px" }}>Join Date</th>
                      <th>Role</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listNurse.map((employessNurse, index) => (
                      <tr key={index}>
                        <td>
                          <h2>{employessNurse.first_name}</h2>
                        </td>
                        <td>DR-{employessNurse.id}</td>
                        <td>{employessNurse.email}</td>
                        <td>{employessNurse.phone}</td>
                        <td>{employessNurse.birthday}</td>
                        <td>
                          <span className="custom-badge status-green">
                            Nurse
                          </span>
                        </td>
                        <td
                          className="text-right"
                          style={{ position: "absolute", paddingLeft: "35px" }}
                        >
                          <div className="edit-delete-employess">
                            <div className="dropdown profile-action">
                              <button className="dropbtn border-0 bg-0">
                                {" "}
                                <i className="fa fa-ellipsis-v"></i>
                              </button>
                              <div className="dropdown-content">
                                <Link to="/">
                                  <i className="fa fa-pencil m-r-5 mt-1"></i>{" "}
                                  Edit
                                </Link>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#delete_doctor"
                                >
                                  <i className="fa fa-trash-o m-r-5 mt-1"></i>{" "}
                                  Delete
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Employees.propTypes = {};

export default Employees;
