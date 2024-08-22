import { useContext } from "react"
import { ProductContext } from "../Context/ProductContext"
import { useParams } from "react-router-dom"
import { Breadcrums } from "../Components/Breadcrums/Breadcrums"
import { ProductDisplay } from "../Components/ProductDisplay/ProductDisplay"
import { RelatableProduct } from "../Components/RelatableProducts/RelatableProduct"

export const Shop = () => {
  const {all_product} = useContext(ProductContext)
  const {ProductId} = useParams();
  const product = all_product.find((e) => e.id === Number(ProductId))
    return (
        <div>
          <Breadcrums product={product} />
          <ProductDisplay product={product} />
          <RelatableProduct  />
        </div>
    )
}