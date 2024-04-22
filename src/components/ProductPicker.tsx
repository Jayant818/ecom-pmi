"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Product, Variant } from "@/types";

interface ProductPickerProps {
	onAddProducts: (products: (Product & { variants: Variant[] })[]) => void;
	onClose: () => void;
	id: number;
}

const ProductPicker: React.FC<ProductPickerProps> = ({
	onAddProducts,
	onClose,
	id,
}) => {
	const [products, setProducts] = useState<
		(Product & { variants: Variant[] })[]
	>([]);
	const [selectedProducts, setSelectedProducts] = useState<
		(Product & { variants: Variant[] })[]
	>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				if (searchQuery) {
					const response = await axios.get(
						`https://stageapibc.monkcommerce.app/admin/shop/product?search=${searchQuery}`
					);
					setProducts(response.data);
				} else {
					const response = await axios.get(
						`https://stageapibc.monkcommerce.app/admin/shop/product?page=${page}`
					);
					if (page === 1) {
						setProducts(response.data);
					} else {
						setProducts((prevProducts) => [...prevProducts, ...response.data]);
					}
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			}
			setLoading(false);
		};

		fetchProducts();
	}, [searchQuery, page]);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const element = e.currentTarget;

		// Tolerance factor to account for fractional differences in scroll position
		const tolerance = 1; // You can adjust this value as needed

		console.log("Scrolled");

		// Check if the scroll position is within the tolerance range of the bottom
		if (
			element.scrollHeight - element.scrollTop <=
			element.clientHeight + tolerance
		) {
			setPage((prevPage) => prevPage + 1);
			console.log("bottom");
		}
	};

	const handleProductSelect = (product: Product & { variants: Variant[] }) => {
		setSelectedProducts((prevSelectedProducts) => [
			...prevSelectedProducts,
			product,
		]);
	};

	const handleProductDeselect = (
		product: Product & { variants: Variant[] }
	) => {
		setSelectedProducts((prevSelectedProducts) =>
			prevSelectedProducts.filter((p) => p.id !== product.id)
		);
	};

	const handleAddProducts = () => {
		const data = selectedProducts.map((product) => ({
			...product,
			id: id,
			discount: 0,
			discountType: "% off",
			variants: product.variants.map((variant) => ({
				...variant,
				discount: 0,
				discountType: "% off",
			})),
		}));

		onAddProducts(data);
	};
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleVariantSelect = (variant: Variant) => {
		const isVariantSelected = selectedProducts.some((product) =>
			product.variants.some((v) => v.id === variant.id)
		);

		if (!isVariantSelected) {
			const matchingProduct = products.find((product) =>
				product.variants.some((v) => v.id === variant.id)
			);

			setSelectedProducts((prevSelectedProducts) => {
				const updatedSelectedProducts = [...prevSelectedProducts];
				const productIndex = updatedSelectedProducts.findIndex(
					(p) => p.id === (matchingProduct?.id || null)
				);

				if (productIndex !== -1) {
					updatedSelectedProducts[productIndex] = {
						...updatedSelectedProducts[productIndex],
						variants: [
							...updatedSelectedProducts[productIndex].variants,
							variant,
						],
					};
				} else if (matchingProduct) {
					updatedSelectedProducts.push({
						...matchingProduct,
						variants: [variant],
					});
				}

				return updatedSelectedProducts;
			});
		}
	};

	const handleVariantDeselect = (variant: Variant) => {
		setSelectedProducts((prevSelectedProducts) =>
			prevSelectedProducts.map((product) => ({
				...product,
				variants: product.variants.filter((v) => v.id !== variant.id),
			}))
		);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
			<div className="bg-white p-8 rounded-lg w-[40%]">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Select Products</h2>
					<svg
						onClick={onClose}
						width="17"
						height="17"
						viewBox="0 0 17 17"
						fill="none"
						className="cursor-pointer"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.85859 8.85355L16.2929 15.2879L15.2879 16.2929L8.85355 9.85859L8.5 9.50504L8.14645 9.85859L1.71214 16.2929L0.707107 15.2879L7.14141 8.85355L7.49496 8.5L7.14141 8.14645L0.707107 1.71214L1.71214 0.707107L8.14645 7.14141L8.5 7.49496L8.85355 7.14141L15.2879 0.707107L16.2929 1.71214L9.85859 8.14645L9.50504 8.5L9.85859 8.85355Z"
							fill="black"
							fill-opacity="0.8"
							stroke="black"
						/>
					</svg>
				</div>
				<div className="relative">
					<svg
						className="absolute top-3 left-4"
						width="17"
						height="17"
						viewBox="0 0 17 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16.7927 15.9665L11.4582 10.6212C12.7324 9.11518 13.266 7.13661 12.8511 5.09882C12.7029 4.39001 12.4362 3.71083 12.0508 3.09077C9.73922 -0.571206 4.8196 -0.98465 1.91525 1.87992C-0.633468 4.39022 -0.633468 8.49502 1.88569 11.0347C3.10083 12.2751 4.73088 12.9542 6.47936 12.9542H6.50892C8.05006 12.9542 9.47255 12.4227 10.6579 11.4776L15.9924 16.8228C16.1109 16.9409 16.2591 17 16.4073 17C16.5555 17 16.7038 16.9409 16.8222 16.8228C16.9407 16.7048 17 16.5571 17 16.4094C16.9409 16.232 16.8815 16.0845 16.7927 15.9663L16.7927 15.9665ZM2.71548 10.2078C0.640997 8.14064 0.670528 4.77397 2.74504 2.70676C3.78242 1.67304 5.14553 1.17106 6.47916 1.17106C7.84253 1.17106 9.2057 1.70252 10.243 2.73623C11.2506 3.74026 11.7842 5.06913 11.7842 6.48681C11.7842 7.90428 11.221 9.23315 10.2134 10.2374C8.13895 12.3043 4.76036 12.2749 2.71546 10.2077L2.71548 10.2078Z"
							fill="black"
							fill-opacity="0.4"
						/>
					</svg>

					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Search product"
						className="border border-gray-300 pl-10 pr-4 py-2 mb-4 w-full"
					/>
				</div>
				<div className="max-h-96 overflow-y-auto" onScroll={handleScroll}>
					{products.map((product, index) => (
						<div key={product.id} className="mb-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={selectedProducts.some((p) => p.id === product.id)}
									onChange={(e) =>
										e.target.checked
											? handleProductSelect(product)
											: handleProductDeselect(product)
									}
									className="mr-2"
								/>
								{product.image?.src && (
									<img
										src={product.image?.src}
										alt={product.title}
										className="w-20 h-40"
									/>
								)}
								<span className="font-bold">{product.title}</span>
							</label>
							{product.variants.map((variant) => (
								<div key={variant.id} className="grid grid-cols-12 gap-4">
									<input
										type="checkbox"
										checked={selectedProducts.some((p) =>
											p.variants.some((v) => v.id === variant.id)
										)}
										onChange={() => {
											const isVariantSelected = selectedProducts.some((p) =>
												p.variants.some((v) => v.id === variant.id)
											);
											if (isVariantSelected) {
												handleVariantDeselect(variant);
											} else {
												handleVariantSelect(variant);
											}
										}}
										className="mr-2 col-start-2 col-span-1"
									/>
									<span className="col-span-3">{variant.title}</span>
									<span className="col-span-4">
										{variant.inventory_quantity
											? variant.inventory_quantity
											: "0"}{" "}
										available
									</span>
									<span className="col-span-3">${variant.price}</span>
								</div>
							))}
						</div>
					))}
				</div>

				{loading && <p className="text-center">Loading...</p>}
				<div className=" flex justify-between items-center">
					<p className="text-base">
						{selectedProducts.length} products selected
					</p>
					<div className="flex justify-end mt-4">
						<button
							className=" border-2 border-[#008060] bg-white text-[#008060] px-4 py-2 rounded "
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							className=" bg-[#008060] text-white px-4 py-2 rounded ml-4"
							onClick={handleAddProducts}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPicker;
