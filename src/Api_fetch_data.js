import React, { useEffect, useId, useState } from "react";
import "./Style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const Api_fetch_data = () => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const[id,setId]=useState("")

  //Fetch data

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts").then((result) => {
      result.json().then((response) => {
        setData(response);
      });
    });
  }, []);

  //Fetching data using id

  const selectID = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`).then(
      (result) => {
        result.json().then((response) => {
          setData(response);
          const array = [response];
          setData(array);
        });
      }
    );
  };

  // selectHandle Function

  const selectHandle = (event) => {
    setUserId(event.target.value);
  };

  // Formik

  const formik = useFormik({
    initialValues: {
      id: "",
      userId: "",
      title: "",
      body: "",
      id: "",
    },
    onSubmit: (values) => {
      postData(values);
      formik.handleReset();
    },
    validationSchema: Yup.object({
      userId: Yup.string().required("Enter userId"),
      title: Yup.string().required("Enter Title"),
      body: Yup.string().min(3).max(2500).required("Enter body"),
    }),
  });

  // Post Data

  const postData = (values) => {


    const dataToPost = {
      // id: values.id,
      userId: values.userId,
      body: values.body,
      title: values.title,
    };
    
    console.log("Values", id);
    const url = id
      ? "https://jsonplaceholder.typicode.com/posts/"+id
      : "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((response) => {
        // console.log("response", response);
        setData([...data, response]);
        setmodalOpen(false);
      });
    });
  };

  const editFunc = (id, userId, title, body) => {
    // console.log("ID",id)
    formik.setValues({ userId: userId, title: title, body: body });
    setId(id)
    console.log("ID",id)
    setmodalOpen(true);
  };

  // Delete

  const del = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "Delete",
    }).then((result) => {
      result.json().then((response) => {
        setData([...data, response]);
      });
    });
  };
  return (
    <>
      {/* Select Box + botton */}

      <div className="form">
        <select className="select" onChange={selectHandle}>
          <option value="">Select any id</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="12">12</option>
        </select>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <button className="button" onClick={() => setmodalOpen(true)}>
          Open Modal
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <button className="button" onClick={selectID}>
          Fetch Data
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      </div>
      <br />
      <br />

      {/* Open Model */}

      {modalOpen ? (
        <div className="box">
          <form id="myForm" onSubmit={formik.handleSubmit}>
            <div className="wrapper">
              <h1>Form</h1>
              <label>userId</label>
              <input type="hidden" name="id"  onChange={formik.handleChange} />
              <input
                type="number"
                placeholder="User Id"
                autoComplete="off"
                name="userId"
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.userId && formik.errors.userId ? (
                <div className="error">{formik.errors.userId}</div>
              ) : (
                ""
              )}
            </div>
            <div className="wrapper">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                autoComplete="off"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="error">{formik.errors.title}</div>
              ) : (
                ""
              )}
            </div>
            <div className="wrapper">
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                autoComplete="off"
                name="body"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.body && formik.errors.body ? (
                <div className="error">{formik.errors.body}</div>
              ) : (
                ""
              )}
            </div>
            <br />
            <button type="submit">submit</button>
            <button
              className="close_button"
              onClick={() => setmodalOpen(false)}
            >
              Close Modal
            </button>
          </form>
        </div>
      ) : (
        ""
      )}

      {/* Table */}

      <table border="1">
        <tr>
          <td>userId</td>
          <td>Id</td>
          <td>Title</td>
          <td>Body</td>
          <td>Delete</td>
          <td>Edit</td>
        </tr>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                  {" "}
                  <button onClick={() => del(item.id)}>Delete</button>
                </td>
                <td>
                  {}
                  <button
                    onClick={() =>
                      editFunc(item.id, item.userId, item.title, item.body)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Api_fetch_data;
