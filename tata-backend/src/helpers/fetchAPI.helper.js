const axios = require('axios');

export const fetchHelper = async (path) => {
    try {
        const result = await axios.get(process.env.SWAPI_URL_BASE + path);
        if (result.status === 200) {
            return { result: true, data: result.data };
        } else {
            return { result: false, data: result.data };
        }
    } catch (error) {
        return { result: false, data: error };
    }
};