import React, { useEffect, useRef, useState } from "react";
import "./homeStyle.css";
import axios from "axios";
const Home = () => {
  // ====================================================================================
  const dbURL = "http://localhost:8080/customers";
  // =========================================================================
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({});

  // all
  const [allCustomers, setAllCustomers] = useState([]);

  // id
  const [customerId, setCustomerId] = useState(null);

  // edit
  const [editCustomerInfo, setEditCustomerInfo] = useState({});

  const psswordRef = useRef();
  const closePassBtn = useRef();
  const showPassBtn = useRef();
  const editModal = useRef();

  useEffect(() => {
    closePassBtn.current.style.display = "none";
    getCustomers();
    addDefaultImage();
    // eslint-disable-next-line
  }, [customers]);

  // Added default & random image ====================================================================
  function addDefaultImage() {
    setNewCustomer({
      ...newCustomer,
      avatar: `/images/user${Math.floor(Math.random() * 7) + 1}.png`,
    });
  }

  // Create New customer ===========================================================================
  const addCustomer = () => {
    setCustomers([...customers, newCustomer]);
    setNewCustomer({});
    axios
      .post(`${dbURL}`, newCustomer)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  // Get ALL customers ================================================================

  function getCustomers() {
    axios
      .get(`${dbURL}`)
      .then((response) => setAllCustomers(response.data))
      .catch((error) => console.log(error));
  }

  // Update Customers ===================================================================
  function openEditModal(id) {
    setCustomerId(id);
    axios
      .get(`${dbURL}/${id}`)
      .then((response) => setEditCustomerInfo(response.data))
      .catch((error) => console.log(error));
    editModal.current.style.left = "0";
  }

  function editCustomerFunc(id, updatedEl) {
    const updatedCustomers = [...customers];
    updatedCustomers[id] = updatedEl;
    setCustomers(updatedCustomers);
    // JSON faylda mijozni yangilash
    axios
      .put(`${dbURL}/${id}`, updatedEl)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    editModal.current.style.left = "-600";
  }

  // Delete customers ================================================================
  const deleteCustomer = (id) => {
    const filteredCustomers = customers.filter((_, i) => i !== id);
    setCustomers(filteredCustomers);
    axios
      .delete(`${dbURL}/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  // console.log(newCustomer);
  // console.log(allCustomers);
  console.log(editCustomerInfo);

  return (
    <>
      <div className="container-fluid px-0">
        {/* ==================================================== UPDATE MODAL ======================================== */}
        <div className="editModal " ref={editModal}>
          <div className="postition-relative">
     
          </div>
          <h3 className="sidebarTitle">Edit Customer</h3>
          <form>
            <div className="row mb-4">
              <div className="col">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  defaultValue={editCustomerInfo?.firstName}
                  onChange={(e) => {
                    editCustomerFunc(customerId, {
                      ...editCustomerInfo,
                      firstName: e.target.value,
                    });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  defaultValue={editCustomerInfo?.lastName}
                  onChange={(e) => {
                    editCustomerFunc(customerId, {
                      ...editCustomerInfo,
                      lastName: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div className="companyForm mb-4">
              <label htmlFor="company" className="form-label">
                Company
              </label>
              <input
                type="text"
                className="form-control"
                id="company"
                defaultValue={editCustomerInfo?.company}
                onChange={(e) => {
                  editCustomerFunc(customerId, {
                    ...editCustomerInfo,
                    company: e.target.value,
                  });
                }}
                required
              />
            </div>

            {/* theme status */}
            <div className="theme mb-4">
              <label htmlFor="checkbox2" className=" form-label label2">
                Status
              </label>
              <input
                type="checkbox2"
                className="checkbox"
                id="checkbox2"
                onChange={(e) => {
                  if (e.target.checked) {
                    editCustomerFunc(customerId, {
                      ...editCustomerInfo,
                      status: "admin",
                    });
                    // setStatus("admin")
                  } else {
                    editCustomerFunc(customerId, {
                      ...editCustomerInfo,
                      status: "user",
                    });
                    // setStatus("user")
                  }
                }}
              />
              <label htmlFor="checkbox2" className="label ">
                <span className="statusUser">User</span>
                <span className="statusAdmin">Administrator</span>
                <div className="ball"></div>
              </label>
            </div>

            <div className="emailForm mb-4">
              <label htmlFor="email" className="form-label">
                Eamil
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                defaultValue={editCustomerInfo?.email}
                onChange={(e) => {
                  editCustomerFunc(customerId, {
                    ...editCustomerInfo,
                    email: e.target.value,
                  });
                }}
              />
            </div>

            <button
              onClick={() => {
                editCustomerFunc();
              }}
              className="btn btn-primary w-100"
            >
              Save
            </button>
          </form>
        </div>
        {/* ==================================================================================================== */}
        <div className="wrappAllInfo">
          <div className="sidebarMenu ">
            <h3 className="sidebarTitle">Add Customer</h3>

            <form className="needs-validation">
              <div className="row mb-4">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={newCustomer.firstName || ""}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={newCustomer.lastName || ""}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="companyForm mb-4">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  value={newCustomer.company || ""}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, company: e.target.value })
                  }
                  required
                />
              </div>

              {/* theme status */}
              <div className="theme mb-4">
                <label htmlFor="checkbox" className=" form-label label2">
                  Status
                </label>
                <input
                  type="checkbox"
                  className="checkbox"
                  id="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewCustomer({ ...newCustomer, status: "admin" });
                      // setStatus("admin")
                    } else {
                      setNewCustomer({ ...newCustomer, status: "user" });
                      // setStatus("user")
                    }
                  }}
                />
                <label htmlFor="checkbox" className="label ">
                  <span className="statusUser">User</span>
                  <span className="statusAdmin">Administrator</span>
                  <div className="ball"></div>
                </label>
              </div>

              <div className="emailForm mb-4">
                <label htmlFor="email" className="form-label">
                  Eamil
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  value={newCustomer.email || ""}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                />
              </div>

              <div className="passwordForm mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <span className="w-100 d-flex align-items-center  p-0 ">
                  <input
                    type="password"
                    className=" form-control w-100"
                    id="password"
                    minLength={8}
                    required
                    value={newCustomer.password || ""}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        password: e.target.value,
                      })
                    }
                    ref={psswordRef}
                  />
                  <button
                    type="button"
                    className="btn btn-light fs-5 px-2  py-1 border border-start-0"
                    onClick={() => {
                      psswordRef.current.classList.toggle("visiblePass");
                      if (
                        psswordRef.current.classList.contains("visiblePass")
                      ) {
                        psswordRef.current.type = "text";
                        showPassBtn.current.style.display = "none";
                        closePassBtn.current.style.display = "block";
                      } else {
                        psswordRef.current.type = "password";
                        closePassBtn.current.style.display = "none";
                        showPassBtn.current.style.display = "block";
                      }
                    }}
                  >
                    <i className="bi bi-eye" ref={showPassBtn}></i>
                    <i className="bi bi-eye-slash" ref={closePassBtn}></i>
                  </button>
                </span>
              </div>
              <button
                onClick={() => {
                  addCustomer();
                }}
                className="btn btn-primary w-100"
              >
                Save
              </button>
            </form>
          </div>

          <div className="userTable">
            <h3 className="titleTableInfo mb-4">Customers</h3>
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr className="text-secondary">
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCustomers.length ? (
                  allCustomers.map((el, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={el.avatar}
                                alt="customer-image"
                                style={{ width: 35, height: 35 }}
                                className="rounded-circle"
                              />
                              <div className="ms-3">
                                <p className="fw-bold m-0">{el.name}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="fw-normal fw-bold m-0">
                              {el.company}
                            </p>
                          </td>
                          <td>
                            <p className="fw-normal fw-bold m-0">{el.email}</p>
                          </td>
                          <td>
                            {!el.status || el.status != "admin" ? (
                              <button className="btn btn-secondary noCursor shadow-0"></button>
                            ) : (
                              <button className="btn btn-info noCursor shadow-0"></button>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-light px-2 me-1 fs-6"
                              onClick={() => {
                                openEditModal(el.id, el);
                              }}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-light px-2 fs-6"
                              onClick={() => {
                                deleteCustomer(el.id);
                              }}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <h2 className="text-secondary text-center mt-5">Not Found</h2>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
