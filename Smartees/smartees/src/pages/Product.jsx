import React from "react";
import ReactImageMagnify from "react-image-magnify";

const Product = () => {
  const product = {
    name: "Utility Jacket",
    price: "$110.00",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "\shirt (1).jpg",
      "\shirt (2).jpg",
      "\shirt (3).jpg",
    ],
    reviews: [
      "Great jacket, very comfortable!",
      "Good quality but a bit expensive.",
      "Stylish and fits well.",
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row font-sans">
        <div className="flex-none w-full md:w-1/2 relative">
          <div className="grid grid-cols-1 gap-4">
            {product.images.map((src, index) => (
              <ReactImageMagnify
                key={index}
                {...{
                  smallImage: {
                    alt: `Product Image ${index + 1}`,
                    isFluidWidth: true,
                    src,
                  },
                  largeImage: {
                    src,
                    width: 1200,
                    height: 1800,
                  },
                  className: "object-cover mb-4",
                }}
              />
            ))}
          </div>
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold text-slate-900">
              {product.name}
            </h1>
            <div className="text-lg font-semibold text-slate-500">
              {product.price}
            </div>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
              {product.inStock ? "In stock" : "Out of stock"}
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-2 flex text-sm">
              {product.sizes.map((size, index) => (
                <label key={index}>
                  <input className="sr-only peer" name="size" type="radio" value={size} />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mb-6 text-sm font-medium">
            <div className="flex-auto flex space-x-4">
              <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                Buy now
              </button>
              <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                Add to bag
              </button>
            </div>
            <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-700">
            Free shipping on all continental India
             orders.
          </p>
          <h2 className="text-lg font-semibold mt-6">Reviews</h2>
          <div className="mt-4 space-y-4">
            {product.reviews.map((review, index) => (
              <p key={index} className="text-sm text-slate-700 border-t border-slate-200 pt-4">{review}</p>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Product;
