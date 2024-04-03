import axios from "axios";
import { API_BASE_URL } from "../../config";

const BillSerivce = {
	getAll: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/checkout/get-all`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getAll: async (id) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/checkout/get-all`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
};

export default BillSerivce;
