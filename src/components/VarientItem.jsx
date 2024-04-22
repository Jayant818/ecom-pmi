import { useState } from "react";
import { SortableElement } from "react-sortable-hoc";
import DragHandle from "./DragHandle";

const VarientItem = SortableElement(
	({
		variant,
		showDiscount,
		handleClick,
		onRemove,
		ind,
		handleDiscountTypeChange,
		handleDiscountChange,
		val,
	}) => {
		const [discount, setDiscount] = useState(variant.discount);
		const [discountType, setDiscountType] = useState(variant.discountType);

		const handleVariantDiscountChange = (value, ind) => {
			setDiscount(value);
			handleDiscountChange(value, variant.id, ind);
		};

		const handleVariantDiscountTypeChange = (value, ind) => {
			setDiscountType(value);
			handleDiscountTypeChange(value, variant.id, ind);
		};

		const handleRemove = () => {
			onRemove(val, ind);
		};

		return (
			<div className="grid grid-cols-[20px,2fr,2fr,30px] items-center gap-4 ">
				<div className="  col-span-1 items-center w-10">
					<DragHandle />
				</div>
				<div className=" border-2 rounded bg-white py-2 px-2 col-span-1">
					<span className="text-black">{variant.title}</span>
				</div>
				{showDiscount ? (
					<div className="  flex items-center gap-2 relative col-span-1 space-y-4">
						<input
							type="text"
							className="border border-gray-300 focus:outline-none focus:ring-0 rounded-md py-2 px-2"
							placeholder="Discount"
							value={discount}
							onChange={(e) => handleVariantDiscountChange(e.target.value, ind)}
						/>
						<select
							value={discountType}
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
				<button
					className="bg-red-500  text-white px-2 py-1 rounded col-span-1"
					onClick={handleRemove}
				>
					X
				</button>
			</div>
		);
	}
);

export default VarientItem;
