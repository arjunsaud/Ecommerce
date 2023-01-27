import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "../../config/axios";

import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Table from "react-bootstrap/Table";
// import Pagination from "react-bootstrap/Pagination";

const Offer = () => {
  const [refresh, setRefresh] = useState(true);

  return (
    <div>
      <AddOffer setRefresh={setRefresh} refresh={refresh} />
      <ListOffer setRefresh={setRefresh} />
    </div>
  );
};

const ListOffer = ({ refresh }) => {
  const [offer, setOffer] = useState([]);
  useEffect(() => {
    fetchOffer();
  }, [refresh]);
  const fetchOffer = async () => {
    const { data } = await axios.get("offer/getoffer");
    setOffer(data);
  };
  const handleDelete = async (id) => {
    const resp = await axios.delete(`offer/deleteoffer/${id}`);
    if (resp.status === 200) {
      toast.success("Deleted");
      fetchOffer()
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
            {offer.length > 0 ? (
              offer.map((value, index) => {
                return (
                  <tr key={value._id}>
                    <td>{index + 1}</td>
                    <td>{value.title}</td>
                    <td>{value.desc}</td>
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

const AddOffer = ({ setRefresh, refresh }) => {
  const initialValues = {
    title: "",
    desc: "",
  };

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: offerSchema,
    onSubmit: async (values, action) => {
      const response = await axios.post("offer/createoffer", values);
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
              value={values.title}
              name="title"
              onBlur={handleBlur}
              placeholder="Title"
              onChange={handleChange}
            />
            <span className="text-danger">{errors.title}</span>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                value={values.desc}
                name="desc"
                placeholder="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <span className="text-danger">{errors.desc}</span>
            <br />
            <Button type="submit" className="btn-md" onClick={handleSubmit}>
              Add Offer
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

const offerSchema = () =>
  object({
    title: string().required("Title is Required"),
    desc: string().required("Description is Required"),
  });

export default Offer;
