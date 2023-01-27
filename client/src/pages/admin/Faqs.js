import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "../../config/axios";

import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Table from "react-bootstrap/Table";
// import Pagination from "react-bootstrap/Pagination";

const Faqs = () => {
  const [refresh, setRefresh] = useState(true);

  return (
    <div>
      <AddFaq setRefresh={setRefresh} refresh={refresh} />
      <ListFaqs refresh={refresh} />
    </div>
  );
};

const ListFaqs = ({ refresh }) => {
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    fetchFaq();
  }, [refresh]);
  const fetchFaq = async () => {
    const { data } = await axios.get("faq/getfaq");
    setFaq(data);
  };
  const handleDelete = async (id) => {
    const resp = await axios.delete(`faq/deletefaq/${id}`);
    if (resp.status === 200) {
      toast.success("Deleted");
      fetchFaq()
    } else {
      toast.warning("Error Occured");
    }
  };
  return (
    <div>
      <div className="text-center d-flex justify-content-center mx-5">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>SN</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {faq.length > 0 ? (
              faq.map((value, index) => {
                return (
                  <tr key={value._id}>
                    <td>{index + 1}</td>
                    <td>{value.question}</td>
                    <td>{value.answer}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(value._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Faqs</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const AddFaq = ({ setRefresh, refresh }) => {
  const initialValues = {
    question: "",
    answer: "",
  };

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: FaqSchema,
    onSubmit: async (values, action) => {
      const response = await axios.post("/faq/createfaq", values);
      if (response.status === 200) {
        toast.success("Product Saved");
        setRefresh(!refresh);
      } else {
        toast.warning("Some Error Occured");
      }
      action.resetForm();
    },
  });
  return (
    <>
      <div>
        <div className="text-center d-flex justify-content-center">
          <Form encType="multipart/form-data">
            <h3>Add Faqs</h3>
            <Form.Control
              type="text"
              value={values.question}
              name="question"
              onBlur={handleBlur}
              placeholder="Question"
              onChange={handleChange}
            />
            <span className="text-danger">{errors.question}</span>

            <br />
            <Form.Control
              type="text"
              value={values.answer}
              name="answer"
              placeholder="Answer"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <span className="text-danger">{errors.answer}</span>
            <br />
            <Button type="submit" className="btn-md" onClick={handleSubmit}>
              Add FAQ's
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

const FaqSchema = () =>
  object({
    question: string().required("Question is Required"),
    answer: string().required("Answer is Required"),
  })

export default Faqs;
