import { useState } from "react";
import ProductItems from "./ProductItems";
import { arrayMoveImmutable } from "array-move";

const ProductList = () => {
	const [id, setId] = useState(2);
	const [products, setProducts] = useState([
		{
			id: 1,
			title: "",
			variants: [],
		},
	]);

	const handleAddProduct = (newProducts) => {
		if (!Array.isArray(newProducts)) {
			console.error("New products is not an array");
			return;
		}

		console.log("New Product", newProducts);

		newProducts.forEach((newProduct, index) => {
			if (index === 0) {
				const existingIndex = products.findIndex(
					(product) => product.id === newProduct.id
				);
				if (existingIndex !== -1) {
					const updatedProducts = [...products];
					updatedProducts[existingIndex] = newProduct;
					setProducts(updatedProducts);
				} else {
					setProducts((prevProducts) => [...prevProducts, newProduct]);
				}
			} else {
				const data = {
					...newProduct,
					id:
						products.length > 0
							? products[products.length - 1].id + 1
							: newProduct.id + 1,
				};
				setProducts((prevProducts) => [...prevProducts, data]);
				if (id < data.id) setId(data.id);
			}
		});
		console.log("Products", products);
	};

	const handleRemoveProduct = (index, variantIndex) => {
		console.log("index", index, "variantIndex", variantIndex);
		setProducts((prevProducts) => {
			const newProducts = [...prevProducts];
			if (typeof variantIndex === "number") {
				const productVariants = newProducts[index]?.variants;
				if (productVariants) {
					const newVariants = [
						...productVariants.slice(0, variantIndex),
						...productVariants.slice(variantIndex + 1),
					];
					newProducts[index] = { ...newProducts[index], variants: newVariants };
				}
			} else {
				newProducts.splice(index, 1);
			}
			return newProducts;
		});
	};

	const handleDiscountChange = (newValue, productId, variantIndex) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) => {
				if (product.id === productId) {
					if (variantIndex !== null) {
						product.variants[variantIndex].discount = newValue;
					} else {
						product.discount = newValue;
					}
				}
				return product;
			})
		);
	};

	const handleDiscountTypeChange = (newValue, productId, variantIndex) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) => {
				if (product.id === productId) {
					if (variantIndex !== null) {
						product.variants[variantIndex].discountType = newValue;
					} else {
						product.discountType = newValue;
					}
				}
				return product;
			})
		);
	};

	const handleClick = () => {
		setProducts([...products, { id: id, title: "", variants: [] }]);
		setId(id + 1);
	};

	const onSortEndForVariants = ({ oldIndex, newIndex }) => {
		const productId = parseInt(oldIndex.toString().charAt(0));
		const oldVarIndex = parseInt(oldIndex.toString().slice(1));
		const newVarIndex = parseInt(newIndex.toString().slice(1));

		setProducts((prevProducts) =>
			prevProducts.map((product) => {
				if (product.id === productId) {
					const newVariants = arrayMoveImmutable(
						product.variants,
						oldVarIndex,
						newVarIndex
					);
					return { ...product, variants: newVariants };
				}
				return product;
			})
		);
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setProducts(arrayMoveImmutable(products, oldIndex, newIndex));
	};

	return (
		<div className="w-full min-h-[80vh] flex flex-col justify-center items-center ">
			<div className="w-60% flex flex-col justify-center items-center h-full ">
				<h2 className="text-xl font-bold mb-4 self-start">Product</h2>
				<div className="space-y-4 items-center ">
					<div className="flex justify-between pl-20">
						<div>Product</div>
						<div>Discount</div>
					</div>

					<ProductItems
						products={products}
						canRemove={products.length > 1}
						onRemove={handleRemoveProduct}
						onAddProduct={handleAddProduct}
						onSortEnd={onSortEnd}
						onDiscountChange={handleDiscountChange}
						onDiscountTypeChange={handleDiscountTypeChange}
						useDragHandle
						onSortEndForVariants={onSortEndForVariants}
					/>

					<div className="flex justify-end pr-20">
						<button
							onClick={handleClick}
							className="border-2 border-[#008060] bg-white text-[#008060] px-4 py-2 rounded "
						>
							Add Product
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
