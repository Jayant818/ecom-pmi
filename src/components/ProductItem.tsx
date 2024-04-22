"use client";

import React, { useState, useRef } from "react";
import ProductPicker from "./ProductPicker";

import { Product, Variant } from "@/types";
import { SortableElement, SortableHandle } from "react-sortable-hoc";
import VarientItems from "./VarientItems";
import { arrayMoveImmutable } from "array-move";

const DragHandle = SortableHandle(() => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 7 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="1" cy="7" r="1" fill="black" fill-opacity="0.5" />
		<circle cx="6" cy="7" r="1" fill="black" fill-opacity="0.5" />
		<circle cx="1" cy="1" r="1" fill="black" fill-opacity="0.5" />
		<circle cx="6" cy="1" r="1" fill="black" fill-opacity="0.5" />
		<circle cx="1" cy="13" r="1" fill="black" fill-opacity="0.5" />
		<circle cx="6" cy="13" r="1" fill="black" fill-opacity="0.5" />
	</svg>
));

interface ProductListItemProps {
	index: number;
	product: Product & { variants: Variant[] };
	canRemove: boolean;
	onRemove: () => void;
	onAddProduct: (product: Product & { variants: Variant[] }) => void;
}

const ProductItem = SortableElement(
	({
		index,
		product,
		canRemove,
		onRemove,
		onAddProduct,
		onDiscountChange,
		onDiscountTypeChange,
		value,
		onSortEndForVariants,
	}) => {
		const [showVariants, setShowVariants] = useState(false);
		const [showDiscount, setShowDiscount] = useState(false);
		const [showPicker, setShowPicker] = useState(false);
		const toggleShowVariants = () => {
			setShowVariants(!showVariants);
		};

		const handleClick = () => {
			setShowDiscount(!showDiscount);
		};

		const showDialog = () => {
			setShowPicker(true);
		};

		const handleAddProduct = (product) => {
			setShowPicker(false);
			onAddProduct(product);
			console.log(product);
		};

		const handleDiscountChange = (newValue, variantIndex = null) => {
			onDiscountChange(newValue, product.id, variantIndex);
		};

		const handleDiscountTypeChange = (newValue, variantIndex = null) => {
			onDiscountTypeChange(newValue, product.id, variantIndex);
		};

		const handleRemove = () => {
			onRemove(value);
		};

		const itemRef = useRef(null);

		return (
			<div className="flex flex-col">
				<div ref={itemRef} className="flex gap-2 items-center">
					<div className="flex items-center">
						<DragHandle />
					</div>
					<div className=" ">{value + 1}</div>

					<div
						onClick={showDialog}
						className=" bg-white flex items-center gap-2 relative cursor-pointer"
					>
						<input
							type="text"
							className="border border-gray-300 focus:outline-none focus:ring-0 rounded-md py-2 pl-8 pr-8 w-full"
							placeholder="Search product"
							value={product.title}
						/>
						<svg
							className="absolute  top-3 right-2  text-black"
							width="17"
							height="16"
							viewBox="0 0 17 16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.509 0.643184L12.4018 0.750381L15.4569 3.80551L15.5641 3.69831C16.4217 2.84073 16.4217 1.50076 15.5641 0.643184C14.7066 -0.214395 13.3666 -0.214395 12.509 0.643184Z"
								fill="black"
								fill-opacity="0.2"
							/>
							<path
								d="M1.62312 11.5273L0.229555 15.4936C0.175956 15.8152 0.443949 16.0832 0.711943 15.976L4.62464 14.5824L14.4332 4.77387L11.3781 1.71875L1.62312 11.5273Z"
								fill="black"
								fill-opacity="0.2"
							/>
						</svg>
					</div>

					{showDiscount ? (
						<div className="  flex items-center gap-2 relative">
							<input
								type="text"
								className="border border-gray-300 focus:outline-none focus:ring-0 rounded-md py-2 px-2"
								placeholder="Discount"
								value={product.discount}
								onChange={(e) => {
									const newValue = e.target.value;
									handleDiscountChange(newValue);
								}}
							/>
							<select
								value={product.discountType}
								onChange={(e) => {
									const newValue = e.target.value;
									handleDiscountTypeChange(newValue);
								}}
								className="border border-gray-300 focus:outline-none focus:ring-0 rounded-md py-2 pl-2 pr-2"
							>
								<option value="% off">%</option>
								<option value="flat off">Flat</option>
							</select>
						</div>
					) : (
						<button
							onClick={handleClick}
							className=" bg-[#008060] text-white px-4 py-2 rounded "
						>
							Add Discount
						</button>
					)}
					{canRemove && (
						<button
							className="bg-red-500  text-white px-2 py-1 rounded "
							onClick={handleRemove}
						>
							X
						</button>
					)}
				</div>
				<div className=" flex justify-end mr-4">
					{product.variants.length > 1 && (
						<button
							className=" text-blue-500 border-none "
							onClick={toggleShowVariants}
						>
							{showVariants ? "Hide variants" : "Show variants"}
						</button>
					)}
				</div>
				<div className="flex flex-col ml-10">
					<br />
					{showVariants && (
						<VarientItems
							product={product}
							showDiscount={showDiscount}
							handleClick={handleClick}
							onRemove={onRemove}
							handleDiscountChange={handleDiscountChange}
							handleDiscountTypeChange={handleDiscountTypeChange}
							onSortEnd={onSortEndForVariants}
							useDragHandle
							val={value}
							onRemoveVariant={onRemove}
						/>
					)}
				</div>

				{showPicker && (
					<ProductPicker
						id={product.id}
						onAddProducts={handleAddProduct}
						onClose={() => setShowPicker(false)}
					/>
				)}
			</div>
		);
	}
);

export default ProductItem;
