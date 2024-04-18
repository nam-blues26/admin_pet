import axios from "axios";
import { API_BASE_URL } from "../../config";
const apiClientWithToken = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${getJwtToken()}`, // Thêm token vào header Authorization
    },
  });
const ProductService = {
	getProductByCategory: async (slug) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/product/category/${slug}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getProductBySlug: async (slug) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/product/get/${slug}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	deleteProductById: async (id) => {
		try {
			const response = await apiClientWithToken.get(`${API_BASE_URL}/product/delete/${id}`);
			console.log(response);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
    getAllProduct: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/product/get-all`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	getBestSeller: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/product/best-seller`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
    addProduct: async (productName,productDescription, price, quantity, sale, category, files, attribute) => {
		try {
			const response = await apiClientWithToken.postForm(
				`${API_BASE_URL}/product`,
				{
					productName: productName,
					productDescription:productDescription,
					price: price,
					quantity: quantity,
                    sale:sale,
                    category: category,
					files: files,
					attributeName:attribute
				},
				
			);
			return response;
		} catch (error) {
			return error;
		}
	},
	updateProduct: async (slug,productName,productDescription, price, quantity, sale, category, files, attribute) => {
		try {
			const response = await apiClientWithToken.postForm(
				`${API_BASE_URL}/product/update/${slug}`,
				{
					productName: productName,
					productDescription:productDescription,
					price: price,
					quantity: quantity,
                    sale:sale,
                    category: category,
					files: files,
					attributeName:attribute
				},
				
			);
			return response;
		} catch (error) {
			return error;
		}
	},
	updateProductNotFile: async (slug,productName,productDescription, price, quantity, sale, category,attribute) => {
		try {
			const response = await apiClientWithToken.postForm(
				`${API_BASE_URL}/product/update/${slug}`,
				{
					productName: productName,
					productDescription:productDescription,
					price: price,
					quantity: quantity,
                    sale:sale,
                    category: category,
					attributeName:attribute
				},
				
			);
			return response;
		} catch (error) {
			return error;
		}
	},
	searchProduct: async (keyword, category_id) => {
		try {
			const response = await axios.post(
				`${API_BASE_URL}/product/search`,
				{
					keyword: keyword,
					category_id:category_id,
				},
				
			);
			return response.data;
		} catch (error) {
			return error;
		}
	},
};

export default ProductService;
