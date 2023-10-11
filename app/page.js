"use client";
// Server Component is a component that is fetched and rendered ON THE SERVER, while Client Component is the one that is fetched and rendered ON THE CLIENT(browser)

import Card from "../components/Card";
import React, { useEffect, useState } from "react";

const REFRESH_TIME = 3 * 60 * 1000;

export default function Home() {
  const [data, setData] = useState({}); //stores row data from api
  const [products, setProducts] = useState([]); //storesthe data that is under products
  const [tenProd, setTenProd] = useState([]); //stores 10 unique products each time re-renderd and without Apple brand
  const [storedTime, setStoredTime] = useState(0); //stores the local storage time and I wanted to pass as props to Card comp

  //***** Time  Remove data from localStorage *****
  const resetLocalStorage = () => {
    localStorage.removeItem("tenProd");
    localStorage.removeItem("time");
    console.log("deleted");
  };

  useEffect(() => {
    const now = new Date().getTime();
    const localStorageTime = JSON.parse(localStorage.getItem("time"));
    if (localStorageTime) setStoredTime(localStorageTime);
    if (now - localStorageTime > REFRESH_TIME) {
      resetLocalStorage();
      //console.log("Time has exceeded the future time.", now - localStorageTime);
    }
  }, []);

  //to control re-rendering
  //get data from API
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/data`, {});
      if (data.status === 200) {
        const results = await data.json();
        setData(results);
      } else {
        setData("error");
      }
    };
    // call the fetch function
    fetchData().catch(console.error);
  }, []);

  //  get an array of data and it updates only if data is changed
  useEffect(() => {
    const dataArray = Object.values(data); //gives an array containing the object properties
    setProducts(dataArray[0]); // Update the 'products' state with 'dataArray'
  }, [data]);

  // it updates only if products is changed
  // stored in localStorage : products and time
  //
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tenProd"));
    const now = new Date().getTime(); //time and date

    //if the storedData is present then setTenProd will get the products
    if (storedData) {
      setTenProd(storedData);
      return;
    }
    //if products aren't present we cannot process the data further
    if (products && products.length > 0) {
      //remove apple products
      const withoutApple = products.filter(
        (product) => product.brand !== "Apple"
      );

      //get 10 random products and uniques
      const randomTenProducts = [];

      while (randomTenProducts.length < 10) {
        const numberIndex = Math.floor(Math.random() * withoutApple.length); //rounds down

        if (!randomTenProducts.includes(withoutApple[numberIndex])) {
          randomTenProducts.push(withoutApple[numberIndex]);
        }
      }
      let arraySortbyRating = randomTenProducts.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
      //storing in localStorage the data and current time
      localStorage.setItem("tenProd", JSON.stringify(arraySortbyRating));
      localStorage.setItem("time", now);
      setStoredTime(now);
      setTenProd(arraySortbyRating);
    }
  }, [products]);

  return (
    <div className=" home-container flex gap-5 flex-col p-5">
      {tenProd && tenProd.length > 0 ? (
        // tenProd.map((prod) => <Card key={prod.id} arrayData={prod} />)
        <Card arrayData={tenProd} time={storedTime} />
      ) : (
        // You can add a loading indicator or handle the case where displayProducts is falsy
        <p>Loading...</p>
      )}
    </div>
  );
}
