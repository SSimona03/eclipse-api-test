import React, { useEffect, useState } from "react";
import "../app/globals.css";
import Image from "next/image";
import Countdown from 'react-countdown';


const REFRESH_TIME = 3 * 60 * 1000; // 3 minutes in miliseconds ----  minutes * seconds *  miliseconds
const FULL_STOCK = 200;


const Card = ({ arrayData, time }) => {
    if (!arrayData) {
        // in case where arrayData is not available
        return <div>"Data Error"</div>; // You can return null or a placeholder component here
    }

    //geting the first card for the recommended product
    const firstCardRating = arrayData[0].rating;

    //***** Timer *****
    //END Timer

    function doubleZero(value) {
        return String(value).padStart(2, '0');
    }
    const Completionist = () => { return <span>00:00:00</span> }
    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        const formattedHours = doubleZero(hours);
        const formattedMinutes = doubleZero(minutes);
        const formattedSeconds = doubleZero(seconds);
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <span>
                    {formattedHours}:{formattedMinutes}:{formattedSeconds}
                </span>
            );
        }
    };


    return (
        <div className="">
            {arrayData.map(eachProduct => {
                const priceDiscounted = eachProduct.price - eachProduct.price * (eachProduct.discountPercentage / 100);
                const newPrice = parseFloat(priceDiscounted).toFixed(2);
                const discount = parseFloat(eachProduct.price - newPrice).toFixed(2);
                const image = eachProduct.thumbnail;
                return (
                    <div key={'product-' + eachProduct.id} className={((eachProduct.rating == firstCardRating) ? " border-black box-recommended " : " ") + "relative box border rounded-2xl p-4 hover: cursor-pointer  md:max-w-[700px] lg:max-w-[1200px] overflow-hidden"}>
                        {(eachProduct.rating == firstCardRating) ?
                            <div className="absolute recommended px-2 py-0.5 ml-10 bg-zinc-700 text-white">
                                Eclipse recommended
                            </div> : ""}

                        {/***** box-one image ******/}
                        <div className="image-box flex md:flex-col lg:mr-10 my-5 md:p-0 m-auto relative h-[200px] w-[180px] inset-0">
                            <Image
                                className="box-img rounded-xl  overflow-hidden object-cover w-full h-full"
                                src={image}
                                // width={180}
                                // height={180}
                                sizes="100"
                                quality={100}
                                fill={true}
                                alt="product image"
                            />
                        </div>
                        {/***** box-two title ******/}
                        <div className="title-box pt-4 md:ml-3">
                            <h1 className="font-semibold text-lg">{eachProduct.title}</h1>
                            <div className="stars flex items-center">
                                {
                                    new Array(5).fill(0).map((val, indexNumer) => {
                                        if (eachProduct.rating > indexNumer + 1) {
                                            return <i key={'product-' + eachProduct.id + '-star' + indexNumer} className="fa-solid fa-star text-yellow-500 fa-xs"></i>
                                        } else if ((eachProduct.rating + 0.5) >= indexNumer + 1) {
                                            return <i key={'product-' + eachProduct.id + '-star' + indexNumer} className="fa-solid fa-star-half-stroke text-yellow-500 fa-xs" ></i>
                                        } else {
                                            return <i key={'product-' + eachProduct.id + '-star' + indexNumer} className="fa-regular fa-star fa-xs text-yellow-500"></i>
                                        }

                                    })
                                }


                                <p className="text-xs text-slate-700 pl-2 pt-1">{eachProduct.rating} - {eachProduct.stock} Reviews</p>
                            </div>
                        </div>
                        {/***** box-three info ******/}
                        <div className="info-box mt-2 xl:w-[500px] lg:w-[400px] md:w-[300px] flex flex-col place-content-between ">
                            <div className="info-box-ul md:text-sm leading-relaxed text-xs md:ml-3">
                                <div>
                                    <i className=" pr-2 fa-solid fa-check font-semibold"></i>
                                    {eachProduct.description}
                                </div>

                                <div>
                                    <i className="pr-2 fa-solid fa-check  font-semibold"></i>2 year
                                    warranty
                                </div>
                            </div>

                            <div className="info-box-icons flex gap-2 mb-5">
                                <div className=" border w-6  text-center text-zinc-400 hover:text-fuchsia-600 hover:cursor-pointer">
                                    <i className="fa-solid fa-heart fa-sm "></i>
                                </div>
                                <div className="border hover:text-fuchsia-600  w-6 text-center text-zinc-400 hover:cursor-pointer">
                                    <i className="fa-solid fa-chart-simple fa-sm"></i>
                                </div>
                            </div>
                        </div>
                        {/***** box-four price ******/}
                        <div className="price-box lg:max-w-[300px] md:ml-4">
                            {/***** price ******/}
                            <div className="price flex mt-5 ">
                                <div>
                                    <div className="price-cut text-xs text-gray-400 font-semibold" >
                                        RRP £{eachProduct.price}
                                    </div>
                                    <div className={((eachProduct.rating == firstCardRating) ? "main-price" : "x") + " font-bold pr-2 text-2xl md:text-3xl"}>
                                        {" "}
                                        £{newPrice}
                                    </div>

                                    {
                                        (eachProduct.rating == firstCardRating) ? < div className="text-red-600 border w-24 text-center h-5 mt-2  bg-rose-200 rounded text-xs mb-4">
                                            Save £{discount}  </div> : ""

                                    }
                                </div>
                            </div>
                            {/***** stock ******/}
                            <div className="line-stock mb-5 pt-2">
                                <div className="stock-bar mr-8 ">
                                    <div className={(eachProduct.stock <= FULL_STOCK / 3) ? "inStock-low" :
                                        (eachProduct.stock < FULL_STOCK / 2) ? "inStock-half" :
                                            (eachProduct.stock >= FULL_STOCK) ? "inStock-full" : "inStock-full"} > </div>
                                </div>
                                {
                                    (eachProduct.stock <= FULL_STOCK / 3) ? <p className="text-[#ff3434] text-xs pt-1 " >Almost gone</p> :
                                        (eachProduct.stock < FULL_STOCK / 2) ? <p className="text-[#e61577] text-xs pt-1">Last few left</p> :
                                            (eachProduct.stock >= FULL_STOCK) ? <p className="text-rose-500 text-xs pt-1">In stock</p> : <p className="text-green-700 text-xs pt-1">In stock</p>



                                }

                            </div>
                            {/***** delivery ******/}
                            <div className="delivery text-xs mb-5 leading-relaxed">
                                <div>
                                    {" "}
                                    <i className="fa-solid fa-truck pr-2 "></i>Order in the next{" "}
                                    {/* time - setCountdownTIme - (time - timeCurrently) */}
                                    <b><Countdown date={Date.now() + REFRESH_TIME - (Date.now() - time)} renderer={renderer} /></b> for delivery on <b>3rd March</b>
                                </div>
                                <div className="delivery-info">
                                    <div>
                                        <i className=" pr-2 fa-solid fa-check  "></i>FREE UK delivery
                                    </div>
                                    <div>
                                        <i className="pr-2 fa-solid fa-check  "></i>PayPal credit
                                        available
                                    </div>
                                </div>
                            </div>
                            {/***** button ******/}
                            <button
                                className="flex buy-button hover:brightness-110 w-full mb-4"
                                onClick={() =>
                                    console.log(
                                        `product ID:  ${eachProduct.id}, Original price: ${eachProduct.price}`
                                    )
                                }
                            >
                                <div className="mx-auto flex">
                                    <i className=" fa-solid fa-sm fa-cart-shopping text-gray-100 pr-2 pt-3"></i>{" "}
                                    <p className=" font-semibold text-white">ADD TO BASKET</p>
                                </div>
                            </button>
                        </div>
                    </div>
                )

            })}
        </div >
    );


};

export default Card;
