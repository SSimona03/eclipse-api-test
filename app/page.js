"use client";
// Server Component is a component that is fetched and rendered ON THE SERVER, while Client Component is the one that is fetched and rendered ON THE CLIENT(browser)

import Card from "../components/Card";
import React, { useEffect, useState } from "react";

const REFRESH_TIME = 3 * 60 * 1000;

export default function Home() {
  const [data, setData] = useState({});
  const [products, setProducts] = useState([]);
  const [tenProd, setTenProd] = useState([]);
  const [storedTime, setStoredTime] = useState(0);

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
      console.log("Time has exceeded the future time.", now - localStorageTime);
    }
  }, []);

  //to prevent re-rendering
  //get data from API
  useEffect(() => {
    //get the data from api
    const fetchData = async () => {
      const data = await fetch(`/api/data`, {
        //save data cache for 3 minutes
        //next: { revalidate: false | 0 | 180 },
      });
      if (data.status === 200) {
        const results = await data.json();
        setData(results);
      } else {
        setData("error");
      }
    };
    // call the function
    const result = fetchData().catch(console.error);
  }, []);

  //  get an array of data and only update when timer is done
  useEffect(() => {
    const dataArray = Object.values(data);
    setProducts(dataArray[0]); // Update the 'products' state with 'dataArray'
  }, [data]);

  // move the code to set 'displayProducts' inside this useEffect
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tenProd"));
    const now = new Date().getTime();

    if (storedData) {
      setTenProd(storedData);
      return;
    }

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
