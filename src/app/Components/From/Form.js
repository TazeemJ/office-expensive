"use client";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const success = () => {
    toast.dark(
      <span>
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="var(--toastify-icon-color-success)"
          className="inline mr-1 mt-1"
        >
          <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
        </svg>{" "}
        Successfully data is saved.
      </span>,
      {
        position: "bottom-center",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };
  const delTost = () => {
    toast.error("Warning data is delete!", {
      position: "bottom-center",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const [serArray, setserArray] = useState([]);
  const [activeBtncol, setActiveBtncol] = useState("All");
  const [display, setdisplay] = useState(false);
  const [expenseDate, setExpenseDate] = useState([]);
  const [account, setAccount] = useState("");
  const [comments, setComments] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [uniqueId, setuniqueId] = useState(
    Math.floor(Math.random() * 1000 + 1)
  );
  let [formData, setFormData] = useState([]);
  let [activeBtn, setactiveBtn] = useState(true);
  let [serVal, setserVal] = useState("");

  useEffect(() => {
    if (localStorage.getItem("formData") !== null) {
      setFormData(JSON.parse(localStorage.getItem("formData")));
    }
  }, []); // Load initial formData from localStorage on component mount
  function handleSubmit(e) {
    setuniqueId(Math.floor(Math.random() * 1000 + 1));
    e.preventDefault();
    const updatedFormData = [
      ...formData,
      {
        date: [
          `${expenseDate}`,
          `${
            new Date().getFullYear() +
            "-" +
            String(new Date().getMonth() + 1).padStart(2, "0") +
            "-" +
            String(new Date().getDate()).padStart(2, "0")
          }`,
        ],
        account: account,
        comments: comments,
        amount: amount,
        paidBy: paidBy,
        expenseType: expenseType,
        uniqueId: uniqueId,
      },
    ];
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    success();
    setdisplay(false);
  }

  function tabFun(text) {
    if (text == "All") {
      let filter = JSON.parse(localStorage.getItem("formData"));
      console.log(formData);
      setFormData(filter);
    } else if (text == "Today") {
      let filter = JSON.parse(localStorage.getItem("formData")).filter(
        (expensive) => {
          // Get the current date
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1); // Months are zero-based, so adding 1
          const day = String(currentDate.getDate()).padStart(2, "0");
          return expensive.date[1] == `${year}-${month}-${day}`;
        }
      );
      setFormData(filter);
    } else {
      let filter = JSON.parse(localStorage.getItem("formData")).filter(
        (expensive) => {
          return expensive.expenseType === text;
        }
      );
      setFormData(filter);
    }
    setActiveBtncol(text);
  }
  const ediBtn = (id) => {
    setdisplay(true);
    const updatedFormData = formData.filter(
      (data, index) => data.uniqueId == id
    );
    setExpenseDate(updatedFormData[0].date[0]);
    setAccount(updatedFormData[0].account);
    setComments(updatedFormData[0].comments);
    setAmount(updatedFormData[0].amount);
    setPaidBy(updatedFormData[0].paidBy);
    setExpenseType(updatedFormData[0].expenseType);
    setuniqueId(updatedFormData[0].uniqueId);
  };
  function upDate(elm) {
    elm.preventDefault();
    let ediData = {
      date: [
        `${expenseDate}`,
        `${
          new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0") +
          "-" +
          String(new Date().getDate()).padStart(2, "0")
        }`,
      ],
      account: account,
      comments: comments,
      amount: amount,
      paidBy: paidBy,
      expenseType: expenseType,
      uniqueId: uniqueId,
    };
    formData = JSON.parse(localStorage.getItem("formData"));
    console.log(formData);
    let spliceIndex = formData.findIndex((item, index) => {
      return item.uniqueId == ediData.uniqueId;
    });

    let ediArray = formData.splice(spliceIndex, 1, ediData);
    console.log(ediArray);
    setFormData(formData);
    localStorage.setItem("formData", JSON.stringify(formData));
    setdisplay(false);
    setactiveBtn(true);
  }
  const deleteBtn = (id) => {
    formData = JSON.parse(localStorage.getItem("formData"));

    let updatedFormData = formData.filter((data, index) => data.uniqueId != id);
    delTost();
    formData = updatedFormData;
    setFormData(formData);
    localStorage.setItem("formData", JSON.stringify(formData));
  };
  // function searchFun() {
  //   const foundItem = formData.filter((item) =>
  //     item.expenseType.includes(serVal)
  //   );
  //   setserArray(foundItem);
  //   formData = serArray;
  //   setFormData(formData);
  // }

  // console.log(formData);
  return (
    <div>
      {/* tostalert */}
      <ToastContainer />
      {/* form html */}
      <div className={display ? "displayactive" : "displaynone"}>
        <div
          className="h-screen overflow-scroll overflow-x-hidden py-10 absolute w-screen"
          style={{ backgroundColor: "#211b1b7d" }}
        >
          <div className="formshow w-100 py-8">
            <form
              className="col-4 mx-auto py-3 bg-white rounded-xl"
              id="form"
              onSubmit={activeBtn ? handleSubmit : upDate}
            >
              <div className="flex justify-between p-3 align-items-center">
                <h2
                  htmlFor="date"
                  className="form-label text-[35px] font-normal "
                >
                  Expense Date
                </h2>
                <svg
                  id="close"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setdisplay(false);
                  }}
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </div>
              {/* Rest of your form */}
              <fieldset className="px-3">
                {/* Expense Date */}
                <div className="mb-3">
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                  />
                </div>
                {/* Account */}
                <div className="mb-3">
                  <label htmlFor="Account" className="form-label">
                    Account
                  </label>
                  <select
                    id="Account"
                    className="form-select"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  >
                    <option>Electricity Bill</option>
                    <option>Petty Cash</option>
                    <option>Internet Bill</option>
                    <option>Water Filling</option>
                    <option>Guest Refreshment</option>
                    <option>Meals & Tips</option>
                    <option>Miscellaneous</option>
                  </select>
                </div>
                {/* Comments */}
                <div className="mb-3">
                  <label htmlFor="Comments" className="form-label">
                    Comments
                  </label>
                  <textarea
                    id="Comments"
                    className="form-control"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </div>
                {/* Amount */}
                <div className="mb-3">
                  <label htmlFor="Amount" className="form-label">
                    Amount
                  </label>
                  <input
                    id="Amount"
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                {/* Paid By */}
                <div className="mb-3">
                  <label htmlFor="PaidBuy" className="form-label">
                    Paid By
                  </label>
                  <select
                    id="PaidBuy"
                    className="form-select"
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                  >
                    <option>Cash in Hand</option>
                    <option>Usama Ali</option>
                    <option>Sir Mujassir</option>
                    <option>Sir Omer Aziz</option>
                  </select>
                </div>
                {/* Expense Type */}
                <div className="mb-3">
                  <label htmlFor="ExpenseBuy" className="form-label">
                    Expense Type
                  </label>
                  <select
                    id="ExpenseBuy"
                    className="form-select"
                    value={expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
                  >
                    <option>Office Expense</option>
                    <option>Common Expense</option>
                    <option>Petty Cash</option>
                  </select>
                </div>
              </fieldset>
              <hr />

              {activeBtn ? (
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-primary bg-primary ms-3 mt-3"
                >
                  Submit
                </button>
              ) : (
                <button
                  id="update"
                  type="submit"
                  className="btn btn-success bg-success ms-3 mt-3"
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* search and tab html */}

      <div className="flex justify-center p-4 align-items-center">
        <a className="navbar-brand text-[40px] font-medium" href="#">
          Office Expense Form
        </a>
        <button
          onClick={() => {
            setdisplay(true);
          }}
          id="add"
          className="py-2 px-3 rounded-xl text-white  ml-auto me-3 bg-[#bb2d3b]" // style="background-color: #bb2d3b !important;"
        >
          Add New Expenses
        </button>
      </div>

      {/* table html */}
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5 my-3 ml-7">
            <div className="search-container d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="search"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-search ms-auto"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="search"
                name="search"
                placeholder="Search item"
                className="w-25"
                value={serVal}
                onChange={(e) => {
                  const inputValue = e.target.value.trim(); // Trimmed input value
                  // serVal = inputValue;
                  // setserVal(serVal); // Set state
                  // searchFun();
                }}
              />
              <button
                onClick={(e) => {
                  tabFun("Office Expense");
                }}
                className={`px-3 py-2 rounded-md text-white ml-5 ${
                  activeBtncol === "Office Expense" ? "btnactive" : ""
                }`}
              >
                Expense
              </button>

              <button
                onClick={(e) => {
                  tabFun("Petty Cash");
                }}
                className={`px-3 py-2 rounded-md text-white ml-5 ${
                  activeBtncol === "Petty Cash" ? "btnactive" : ""
                }`}
              >
                Petty Cash
              </button>
              <button
                onClick={(e) => {
                  tabFun("Common Expense");
                }}
                className={`px-3 py-2 rounded-md text-white ml-5 ${
                  activeBtncol === "Common Expense" ? "btnactive" : ""
                }`}
              >
                Common Expense
              </button>
              <button
                onClick={(e) => {
                  tabFun("Today");
                }}
                className={`px-3 py-2 rounded-md text-white ml-5  ${
                  activeBtncol === "Today" ? "btnactive" : ""
                }`}
              >
                Today
              </button>
              <button
                onClick={(e) => {
                  tabFun("All");
                }}
                className={`px-3 py-2 rounded-md text-white ml-4 mr-3 ${
                  activeBtncol === "All" ? "btnactive" : ""
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="col-3">
            <button className="btn text-white ms-suto">
              View Summary Details
            </button>
            <div id="showD"></div>
          </div>
          <div className="col-9 px-0">
            <table className="table mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Account</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Paid By</th>
                  <th scope="col">Account</th>
                  <th scope="col">Type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <th>{data.date[0]}</th>
                      <td>{data.account}</td>
                      <td>{data.comments}</td>
                      <td>{data.amount}</td>
                      <td>{data.paidBy}</td>
                      <td>{data.expenseType}</td>
                      <td>
                        <div className="flex justify-around">
                          <svg
                            id="edi"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pen-fill mx-1"
                            viewBox="0 0 16 16"
                            onClick={() => {
                              ediBtn(data.uniqueId);
                              setactiveBtn(false);
                            }}
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                          </svg>
                          <svg
                            onClick={() => {
                              deleteBtn(data.uniqueId);
                            }}
                            id="del"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
