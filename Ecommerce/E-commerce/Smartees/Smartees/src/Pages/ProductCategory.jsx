import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { Item } from "../Components/Item/Item";
import './CSS/ProductCategory.css';

export const ProductCategory = (props) => {
    const { all_product } = useContext(ProductContext);

    return (
        <div className="product-category">
            <img className="productcategory-banner" src={props.banner} alt="banner" />
            <div className="productcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of {all_product.length} products
                </p>
            </div>
            <div className="productcategory-products">
                {all_product.map((item) => {
                    if (props.category === item.category) {
                        return (
                            <Item
                                key={item.id} 
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                new_price={item.new_price}
                                old_price={item.old_price}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
