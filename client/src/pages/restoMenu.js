import React from "react";
import { Card } from "react-bootstrap";
import "./restoMenu.css";

import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import toRupiah from "@develoka/angka-rupiah-js";

const RestoMenu = () => {
  const params = useParams().id;
  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    console.log(response.data.data);
    return response.data.data;
  });

  const [cart, setCart] = useState({
    product_id: 0,
    status: "",
    qty: 0,
  });

  console.log(cart);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/transaction", cart);

      console.log("ini response input transaction", response);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="bg-menu">
      <div className="w-75 mx-auto">
        <div className="d-flex justify-content-start title">
          <h2 className="mt-5">Geprek Bensu, Menus</h2>
        </div>
        <div className="row ">
          {products?.map((item) => {
            return (
              item.user_id == params && (
                <div className="col-3 col-lg-3 col-md-6 col-12 mb-lg-0 mb-3 pt-3">
                  <Card>
                    <Card.Img variant="top" src={item?.image} />
                    <Card.Body>
                      <Card.Title>{item?.title}</Card.Title>
                      <Card.Text className="text-red">
                        {toRupiah(item?.price, { dot: ".", floatingPoint: 0 })}
                      </Card.Text>
                      <button
                        className="w-100 bg-order rounded border-0"
                        onClick={(e) => {
                          setCart({
                            product_id: item.id,
                            status: "pending",
                            qty: +1,
                          });
                          handleSubmit.mutate(e);
                        }}
                      >
                        Order
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestoMenu;
