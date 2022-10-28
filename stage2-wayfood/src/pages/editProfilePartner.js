import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./editProfilePartner.css";
import { useState, useEffect } from "react";
import MapIcon from "../images/profilepartner/mapicon.png";
import map3 from "../images/profilepartner/mapspopup3.png";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

const EditProfilePartner = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    fullname: "",
    image: "",
    email: "",
    phone: "",
    location: "",
  }); //Store product data

  // Fetching detail product data by id from database
  let { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      setForm({
        ...form,
        fullname: products.fullname,
        image: products.image,
        email: products.email,
        phone: products.phone,
        location: products.location,
      });
      setProduct(products);
    }
  }, [products]);

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", form.location);

      // Insert product data
      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);

      navigate("/product-admin");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="mx-auto mt-5 w-75 row">
      <h2 className="title col-12">Edit Profile Partner</h2>

      <Form className="mt-5 row" onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className="col-lg-9 order-lg-1 order-1 pb-3">
          <Form.Control
            type="text"
            placeholder="Name Partner"
            name="fullname"
            value={form?.fullname}
            onChange={handleChange}
          />
        </div>
        <div class="col-lg-3 order-lg-1 order-2 pb-3">
          {/* <label
            class="input-group-text w-100 rounded-end"
            for="inputGroupFile01"
          >
            Attach File
          </label> */}
          <input
            type="file"
            name="image"
            class="form-control "
            id="inputGroupFile01"
            // hidden
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-12 order-lg-2 order-3 pb-3">
          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Email"
            name="email"
            value={form?.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-12 order-lg-3 order-4 pb-3">
          <Form.Control
            className="mb-3"
            type="number"
            placeholder="Phone"
            name="phone"
            value={form?.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-9 order-lg-4 order-5">
          <Form.Control
            type="text"
            placeholder="Location"
            name="location"
            value={form?.location}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-3 order-lg-4 order-6 rounded pb-3">
          <>
            <Button
              style={{ width: "100%" }}
              onClick={handleShow}
              className="button"
            >
              select on map <img src={MapIcon} alt="maps" />
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              size="xl"
            >
              <Modal.Body>
                <img className="w-100" src={map3} alt="" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Confirm Location
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
        <div>
          {/* <Link
          to="/profile-partner"
          className="col-lg-3 offset-lg-9 order-lg-5 order-8 pt-5 text-decoration-none"
        > */}
          <Button
            style={{ width: "100%" }}
            type="submit"
            className="button col-lg-3 order-lg-3 order-4 mb-5 text-decoration-none"
          >
            Save
          </Button>
        </div>
        {/* </Link> */}
      </Form>
    </div>
  );
};

export default EditProfilePartner;
