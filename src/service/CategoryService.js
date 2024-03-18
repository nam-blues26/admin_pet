import axios from "axios";
import { API_BASE_URL } from "../../config";

const CategoryService = {
	getCategoriesStore: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/category/get-category-store`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
};

export default CategoryService;
