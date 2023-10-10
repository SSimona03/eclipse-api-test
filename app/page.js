"use client";
// Server Component is a component that is fetched and rendered ON THE SERVER, while Client Component is the one that is fetched and rendered ON THE CLIENT(browser)

import Card from "../components/Card";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, getData] = useState({});
  const [products, getProducts] = useState([]);
  const [tenProd, setTenProd] = useState([]);

  //to prevent re-rendering
  useEffect(() => {
    //get the data from api
    const fetchData = async () => {
      const data = await fetch(`/api/data`, {
        cache: "force-cache",
      });
      if (data.status === 200) {
        const results = await data.json();
        getData(results);
      } else {
        getData("error");
      }
    };
    // call the function
    const result = fetchData().catch(console.error);
  }, []);

  // to get array of data
  useEffect(() => {
    const dataArray = Object.values(data);
    getProducts(dataArray[0]); // Update the 'products' state with 'dataArray'
  }, [data]);
  //console.log(products);

  // move the code to set 'displayProducts' inside this useEffect
  useEffect(() => {
    if (products && products.length > 0) {
      //remove apple products
      const withoutApple = products.filter((prod) => prod.brand !== "Apple");

      //get 10 random products and uniques
      const randomTenProducts = [];

      while (randomTenProducts.length < 10) {
        const number = Math.floor(Math.random() * withoutApple.length);

        if (!randomTenProducts.includes(withoutApple[number])) {
          randomTenProducts.push(withoutApple[number]);
        }
      }
      let arraySortbyRating = randomTenProducts.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
      setTenProd(arraySortbyRating);
    }
  }, [products]);

  return (
    <div className=" home-container flex gap-5 flex-col p-5">
      {tenProd && tenProd.length > 0 ? (
        // tenProd.map((prod) => <Card key={prod.id} arrayData={prod} />)
        <Card arrayData={tenProd} />
      ) : (
        // You can add a loading indicator or handle the case where displayProducts is falsy
        <p>Loading...</p>
      )}
    </div>
  );
}
