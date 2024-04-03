import axios from "axios";
import { API_BASE_URL } from "../../config";
const apiClientWithToken = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${getJwtToken()}`, // Thêm token vào header Authorization
    },
  });

const PostSerivce = {
	getAll: async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/post/get-all`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostBySlug: async (slug) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/post/get/${slug}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
    addPost: async (postTitle,postDescription, files) => {
		try {
			const response = await apiClientWithToken.postForm(
				`${API_BASE_URL}/post`,
				{
					postTitle: postTitle,
					postDescription:postDescription,
					files: files,
				},
				
			);
			return response;
		} catch (error) {
			return error;
		}
	},
	deletePostById: async (id) => {
		try {
			const response = await apiClientWithToken.get(`${API_BASE_URL}/post/delete/${id}`);
			console.log(response);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	updatePost: async (slug,postTitle,postDescription, files) => {
		try {
			const response = await apiClientWithToken.postForm(
				`${API_BASE_URL}/post/update/${slug}`,
				{
					postTitle: postTitle,
					postDescription:postDescription,
					files: files,
				},
				
			);
			return response;
		} catch (error) {
			return error;
		}
	},
	updatePostNotFile: async (slug,postTitle,postDescription) => {
		try {
			const response = await apiClientWithToken.postForm(
				`${API_BASE_URL}/post/update/${slug}`,
				{
					postTitle: postTitle,
					postDescription:postDescription,
				},
				
			);
			return response;
		} catch (error) {
			return error;
		}
	},
};

export default PostSerivce;
