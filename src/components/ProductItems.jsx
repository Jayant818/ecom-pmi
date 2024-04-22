import { SortableContainer } from "react-sortable-hoc";
import ProductItem from "./ProductItem";

const ProductItems = SortableContainer(
	({
		products,
		onRemove,
		onAddProduct,
		onDiscountChange,
		onDiscountTypeChange,
		onSortEndForVariants,
	}) => {
		return (
			<div className="space-y-3">
				{products.map((product, index) => {
					return (
						<ProductItem
							key={product.id}
							index={index}
							value={index}
							product={product}
							canRemove={products.length > 1}
							onRemove={onRemove}
							onAddProduct={onAddProduct}
							onDiscountChange={onDiscountChange}
							onDiscountTypeChange={onDiscountTypeChange}
							onSortEndForVariants={onSortEndForVariants}
						/>
					);
				})}
			</div>
		);
	}
);

export default ProductItems;
