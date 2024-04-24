import React, { useState } from "react";

const DiscountInput = ({
	discount,
	discountType,
	ind,
	id,
	handleDiscountChange,
	handleDiscountTypeChange,
}) => {
	const [Discount, setDiscount] = useState(discount);
	const [showDiscount, setShowDiscount] = useState(false);

	const [DiscountType, setDiscountType] = useState(discountType);

	const handleVariantDiscountChange = (value, ind) => {
		setDiscount(value);
		handleDiscountChange(value, id, ind);
	};

	const handleVariantDiscountTypeChange = (value, ind) => {
		setDiscountType(value);
		handleDiscountTypeChange(value, id, ind);
	};

	const handleClick = () => {
		setShowDiscount(!showDiscount);
	};

	return (
		<>
			{showDiscount ? (
				<div className="  flex items-center gap-2 relative col-span-1 space-y-4">
					<input
						type="text"
						className="border border-gray-300 focus:outline-none focus:ring-0 rounded-md py-2 px-2"
						placeholder="Discount"
						value={Discount}
						onChange={(e) => handleVariantDiscountChange(e.target.value, ind)}
					/>
					<select
						value={DiscountType}
						onChange={(e) =>
							handleVariantDiscountTypeChange(e.target.value, ind)
						}
						className="border border-gray-300 focus:outline-none focus:ring-0 rounded-md py-2 pl-2 pr-2"
					>
						<option value="% off">% off</option>
						<option value="flat off">flat off</option>
					</select>
				</div>
			) : (
				<button
					onClick={handleClick}
					className=" bg-[#008060] text-white px-4 py-2 rounded col-span-1"
				>
					Add Discount
				</button>
			)}
		</>
	);
};

export default DiscountInput;
