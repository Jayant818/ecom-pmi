export interface Variant {
	id: number;
	product_id: number;
	title: string;
	price: string;
}

export interface Product {
	id: number;
	title: string;
	variants?: Variant[];
	image?: {
		id: number;
		product_id: number;
		src: string;
	};
}
