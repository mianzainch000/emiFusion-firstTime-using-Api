import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Style.css";
const Api_data_axios = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((respone) => {
        setData(respone.data);
        console.log("GetApi", respone);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // Formik
  const formik = useFormik({
    initialValues: {
      id: "",
      userId: "",
      title: "",
      body: "",
    },
    onSubmit: (values) => {
      // postData(values);
      // update(values);
      id ? update(values) : postData(values);
      formik.handleReset();
    },
    validationSchema: Yup.object({
      userId: Yup.string().required("Enter userId"),
      title: Yup.string().required("Enter Title"),
      body: Yup.string().min(3).max(2500).required("Enter body"),
    }),
  });
  //Post Data
  const postData = (values) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        userId: values.userId,
        title: values.title,
        body: values.body,
      })
      .then((response) => {
        console.log("POST", response);
        setData([...data, response.data]);
        setmodalOpen(false);
      });
  };
  //Edit
  const editFunc = (id, userId, title, body) => {
    console.log(id);
    formik.setValues({ id: id, userId: userId, title: title, body: body });
    setId(id);
    setmodalOpen(true);
  };
  // update
  const update = (values) => {
    axios
      .patch("https://jsonplaceholder.typicode.com/posts/" + id, {
        userId: values.userId,
        title: values.title,
        body: values.body,
      })
      .then((response) => {
        console.log("POST", response);
        setData([...data, response.data]);
        setmodalOpen(false);
      });
  };
  // del
  const del = (id) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((response) => {
        console.log("delte", response);

        // setData([...data, response.data]);
        const delteData = data.filter((deleteId) => deleteId.id !== id);
        setData(delteData);
      });
  };
  return (
    <>
      <button className="button" onClick={() => setmodalOpen(true)}>
        Open Modal
      </button>
      {/* ................................Open-Model................ */}
      {/* Open Model */}

      {modalOpen ? (
        <div className="box">
          <form id="myForm" onSubmit={formik.handleSubmit}>
            <div className="wrapper">
              <h1>Form</h1>
              <label>userId</label>
              <input type="hidden" name="id" onChange={formik.handleChange} />
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
      {/* ................................................................. */}
      <table border="1">
        <thead>
          <tr>
            <th>userId</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
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
                <td>
                  {" "}
                  <button onClick={() => del(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Api_data_axios;
