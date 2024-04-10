import axios from "axios";
import { API_BASE_URL } from "../../config";

const BillSerivce = {
	getAll: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/checkout/get/un-check`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getActive: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/checkout/get/active`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getCancel: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/checkout/get/cancel`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getStatistic: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/checkout/get/statistic`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	activeBill: async (id) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/checkout/active/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	cancelBill: async (id) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/checkout/cancel/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
};

export default BillSerivce;
