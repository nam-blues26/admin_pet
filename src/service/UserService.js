import axios from "axios";
import { API_BASE_URL } from "../../config";

const UserService = {
	login: async (username, password) => {
		try {
			const response = await axios.post(
				`${API_BASE_URL}/user/login`,
				{
					username: username,
                    password: password
				},
				
			);
			return response;
		} catch (error) {
			return error;
		}
	},
};

export default UserService;
