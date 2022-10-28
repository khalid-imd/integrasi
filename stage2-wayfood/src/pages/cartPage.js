import React from "react";
import "./cartPage.css";
import Form from "react-bootstrap/Form";
import MapIcon from "../images/cartpage/mapicon.png";
import paketgeprek from "../images/cartpage/reviewpaketgeprek.png";
import paketgeprekkeju from "../images/cartpage/reviewpaketgeprekkeju.png";
import bin from "../images/cartpage/bin.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import map4 from "../images/cartpage/mapspopup4.png";
import map1 from "../images/cartpage/mapspopup1.png";

const CartPage = () => {
  const [showLocation, setShowLocation] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const handleCloseLocation = () => setShowLocation(false);
  const handleShowLocation = () => setShowLocation(true);
  const handleCloseOrder = () => setShowOrder(false);
  const handleShowOrder = () => setShowOrder(true);

  return (
    <div className="w-75 mx-auto mt-5 row">
      <p className="mb-5 title col-12">Geprek Bensu</p>

      <div className="col-12">
        <label htmlFor="" className="sub col-lg-12 order-lg-1 order-1">
          Delivery Location
        </label>
        <div className="row mt-2">
          <div className="col-lg-9 order-lg-1 order-1">
            <Form.Control
              className="mb-3 me-3 col-9"
              type="text"
              placeholder="Location"
            />
          </div>
          <div className="col-lg-3 order-lg-1 order-2">
            <>
              <Button
                style={{ width: "100%" }}
                className="mb-3 button rounded"
                onClick={handleShowLocation}
              >
                Select On Map <img src={MapIcon} alt="maps" />
              </Button>
              <Modal
                show={showLocation}
                onHide={handleCloseLocation}
                backdrop="static"
                keyboard={false}
                size="xl"
              >
                <Modal.Body>
                  <img className="w-100" src={map1} alt="" />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseLocation}>
                    Confirm Location
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>
        </div>
      </div>
      <div className="col-12">
        <label htmlFor="" className="sub pb-3">
          Review Your Order
        </label>
        <div className="row">
          <div className="col-lg-8 order-lg-1 order-1 ">
            <div className="row mb-3 border-bottom border-top border-dark me-4 pt-3">
              <div className="col-lg-2 col-sm-12 order-lg-1 order-1">
                <img src={paketgeprek} style={{ weigh: "100%" }} alt="" />
              </div>
              <div className="col-lg-10 col-sm-12 order-lg-1 order-2">
                <div className="d-flex justify-content-between">
                  <p className="menu-name">Paket Geprek</p>
                  <p className="price">Rp. 15.000</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <button className="btn btn-light">-</button> 1{" "}
                    <button className="btn btn-light">+</button>
                  </p>
                  <div>
                    <img src={bin} alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3 me-4 pt-3">
              <div className="col-lg-2 col-10 order-lg-1 order-1">
                <img src={paketgeprekkeju} style={{ weigh: "100%" }} alt="" />
              </div>
              <div className="col-lg-10 col-sm-12 order-lg-1 order-2">
                <div className="d-flex justify-content-between">
                  <p className="menu-name">Paket Geprek Keju</p>
                  <p className="price">Rp. 20.000</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    <button className="btn btn-light">-</button> 1{" "}
                    <button className="btn btn-light">+</button>
                  </p>
                  <div>
                    <img src={bin} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 order-lg-1 order-2">
            <div className="row mb-3 border-bottom border-top border-dark">
              <div className="d-flex justify-content-between"></div>
              <div className="d-flex justify-content-between">
                <p>Sub Total</p>
                <p className="price ">Rp. 35.000</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Qty</p>
                <p className="">2</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>ongkir</p>
                <p className="price ">Rp. 10.000</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p>Total</p>
              <p className="price ">Rp. 45.000</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-3 offset-9 mb-5">
        <>
          <Button
            style={{ width: "100%" }}
            className="mb-3 button rounded mt-5 p-1"
            onClick={handleShowOrder}
          >
            Order
          </Button>
          <Modal
            show={showOrder}
            onHide={handleCloseOrder}
            keyboard={false}
            size="xl"
          >
            <Modal.Body>
              <img className="w-100" src={map4} alt="" />
            </Modal.Body>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default CartPage;
