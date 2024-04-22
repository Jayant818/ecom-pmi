import React from "react";
import VarientItem from "./VarientItem";
import { SortableContainer } from "react-sortable-hoc";

const VarientItems = SortableContainer(
	({
		product,
		showDiscount,
		handleClick,
		onRemove,
		handleDiscountChange,
		handleDiscountTypeChange,
		onSortEnd,
		val,
	}) => {
		return (
			<div>
				{product.variants.map((variant, index) => {
					return (
						<VarientItem
							key={index}
							variant={variant}
							showDiscount={showDiscount}
							handleClick={handleClick}
							onRemove={onRemove}
							index={parseInt(`${product.id}${index}`, 10)}
							ind={index}
							handleDiscountChange={handleDiscountChange}
							handleDiscountTypeChange={handleDiscountTypeChange}
							val={val}
						/>
					);
				})}
			</div>
		);
	}
);

export default VarientItems;
