
import { Hero } from "../Components/Hero/Hero";
import { NewCollection } from "../Components/NewCollection/NewCollection";
import { NewsLetter } from "../Components/NewsLetter/NewsLetter";
import { Popular } from "../Components/Popular/Popular";
import './Product.css'


const Product = () => {

    
    return (
        <div className="product-container">
            <div className="hero">
                <Hero />
            </div>
            <div className="popular">
                <Popular />
            </div>
            <div className="new-collection">
                <NewCollection />
            </div>
            <div className="newsletter">
                <NewsLetter />
            </div>
        </div>
    );
}

export default Product;
