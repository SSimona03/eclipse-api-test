import React, { useEffect, useState } from "react";
import "../app/globals.css";
import Image from "next/image";

const Card = ({ arrayData }) => {
    if (!arrayData) {
        // in case where arrayData is not available
        return <div>"Data Error"</div>; // You can return null or a placeholder component here
    }
    const firstCardRating = arrayData[0].rating;

    return (
        <div>
            {arrayData.map(each => {
                const priceDiscounted = each.price - each.price * (each.discountPercentage / 100);
                const newPrice = parseFloat(priceDiscounted).toFixed(2);
                const discount = parseFloat(each.price - newPrice).toFixed(2);
                const image = each.thumbnail;
                return (
                    <div key={each.id} className={((each.rating == firstCardRating) ? " border-black box-recommended " : " ") + "relative box border rounded-2xl p-4 hover: cursor-pointer  md:max-w-[700px] lg:max-w-[1200px]"}>
                        {(each.rating == firstCardRating) ? <div className="absolute recommended px-2 py-0.5 ml-10 bg-zinc-700 text-white">
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
                            <h1 className="font-semibold text-lg">{each.title}</h1>
                            <div className="stars flex items-center">
                                {
                                    new Array(5).fill(0).map((val, index) => {
                                        if (each.rating > index + 1) {
                                            return <i className="fa-solid fa-star text-yellow-500 fa-xs"></i>
                                        } else if ((each.rating + 0.5) >= index + 1) {
                                            return <i className="fa-solid fa-star-half-stroke text-yellow-500 fa-xs" ></i>
                                        } else {
                                            return <i class="fa-regular fa-star fa-xs text-yellow-500"></i>
                                        }


                                    })
                                }


                                <p className="text-xs text-slate-700 pl-2 pt-1">{each.rating} - XX Reviews</p>
                            </div>
                        </div>
                        {/***** box-three info ******/}
                        <div className="info-box mt-2 xl:w-[500px] lg:w-[400px] md:w-[300px] flex flex-col place-content-between ">
                            <div className="info-box-ul md:text-sm leading-relaxed text-xs md:ml-3">
                                <div>
                                    <i className=" pr-2 fa-solid fa-check font-semibold"></i>
                                    {each.description}
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
                                        RRP £{each.price}
                                    </div>
                                    <div className={((each.rating == firstCardRating) ? "main-price" : "x") + " font-bold pr-2 text-2xl md:text-3xl"}>
                                        {" "}
                                        £{newPrice}
                                    </div>
                                </div>
                                {
                                    (each.rating == firstCardRating) ? < div className="text-red-600 border w-24 text-center h-5 mt-5 md:mt-6 bg-rose-200 rounded text-xs mb-4">
                                        Save £{discount}  </div> : ""

                                }

                            </div>
                            {/***** stock ******/}
                            <div className="line-stock mb-5 pt-2">
                                <div className="stock-bar mr-8 ">
                                    <div className="inStock "></div>
                                </div>
                                <p className="text-xs stock-text pt-1">Last few left</p>
                            </div>
                            {/***** delivery ******/}
                            <div className="delivery text-xs mb-5 leading-relaxed">
                                <div>
                                    {" "}
                                    <i className="fa-solid fa-truck pr-2 "></i>Order in the next{" "}
                                    <b>3:04:27</b> for delivery on <b>3rd March</b>
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
                            {/***** but button ******/}
                            <button
                                className="flex buy-button hover:brightness-110 w-full mb-4"
                                onClick={() =>
                                    console.log(
                                        `product ID:  ${each.id}, Original price: ${each.price}`
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
