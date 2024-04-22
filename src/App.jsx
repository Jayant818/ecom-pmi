import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import "./index.css";

function App() {
	return (
		<div className="w-full min-h-screen bg-white">
			<Navbar />
			<ProductList />
		</div>
	);
}

export default App;
