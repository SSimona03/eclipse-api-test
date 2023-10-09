
import React, { useEffect, useState } from "react"
import '../app/globals.css'
import Image from "next/image"


const Card = ({ dataFetcher }) => {

    if (!dataFetcher) {
        // in case where dataFetcher is not available 
        return <div>"Data Error"</div>; // You can return null or a placeholder component here
    }

    const priceDiscounted = dataFetcher.price - (dataFetcher.price * (dataFetcher.discountPercentage / 100))
    const newPrice = parseFloat(priceDiscounted).toFixed(2)
    const discount = parseFloat(dataFetcher.price - newPrice).toFixed(2)

    return (
        <div className="relative  box box-recommended border border-black rounded-2xl shadow-red-400 p-4 hover: cursor-pointer flex place-content-center  md:max-w-[700px] lg:max-w-[1200px]">
            <div className="absolute recommended px-2 py-0.5 ml-10 bg-zinc-700 text-white">
                Eclipse recommended
            </div>
            {/***** box-one image ******/}
            <div className="image-box flex md:flex-col mx-auto lg:mr-10 md:mx-auto ">
                <Image
                    className="box-img"
                    src="/monitor.webp"
                    width={200}
                    height={200}
                    alt="product image"
                />
                <Image
                    className="box-logo mx-auto"
                    src="/logo-lg.svg"
                    width={50}
                    height={50}
                    alt="logo"
                />
            </div>
            {/***** box-two title ******/}
            <div className="title-box pt-4 ">
                <h1 className="font-semibold text-lg">
                    {dataFetcher.title}
                </h1>
                <div className="stars flex items-center">
                    <i className="fa-solid fa-star text-yellow-500 fa-xs"></i>
                    <i className="fa-solid fa-star text-yellow-500 fa-xs"></i>
                    <i className="fa-solid fa-star text-yellow-500 fa-xs"></i>
                    <i className="fa-solid fa-star text-yellow-500 fa-xs"></i>
                    <i className="fa-solid fa-star text-yellow-500 fa-xs "></i>
                    <p className="text-xs text-slate-700 pl-2 pt-1">XX Reviews</p>
                </div>
            </div>
            {/***** box-three info ******/}
            <div className="info-box mt-2 lg:w-10/12 md:w-9/12 ">
                <div className="info-box-ul md:text-sm leading-relaxed text-xs">
                    <div>
                        <i className=" pr-2 fa-solid fa-check  font-semibold"></i>{dataFetcher.description}
                    </div>

                    <div>
                        <i className="pr-2 fa-solid fa-check  font-semibold"></i>2 year
                        warranty
                    </div>
                </div>

                <div className="info-box-icons flex gap-2 mt-6">
                    <div className=" border w-6  text-center text-zinc-400 hover:text-fuchsia-600 hover:cursor-pointer">
                        <i className="fa-solid fa-heart fa-sm "></i>
                    </div>
                    <div className="border hover:text-fuchsia-600  w-6 text-center text-zinc-400 hover:cursor-pointer">
                        <i className="fa-solid fa-chart-simple fa-sm"></i>
                    </div>
                </div>
            </div>
            {/***** box-four price ******/}
            <div className="price-box lg:w-10/12 md:ml-4">
                {/***** price ******/}
                <div className="price flex mt-5 ">
                    <div>
                        <div className="price-cut text-xs text-gray-400 font-semibold">
                            RRP £{dataFetcher.price}
                        </div>
                        <div className="main-price pr-2 text-2xl md:text-3xl">
                            {" "}
                            £{newPrice}
                        </div>
                    </div>
                    <div className="text-red-600 border w-24 text-center h-5 mt-5 md:mt-6 bg-rose-200 rounded text-xs mb-4">
                        Save £{discount}
                    </div>
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
                <button className="flex buy-button hover:brightness-110 w-full mb-4">
                    <div className="mx-auto flex">
                        <i className=" fa-solid fa-sm fa-cart-shopping text-gray-100 pr-2 pt-3"></i>{" "}
                        <p className=" font-semibold text-white">ADD TO BASKET</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Card; 