import axios from "axios";

axios.defaults.withCredentials = true;

class ChronotypeService {
    async getChronotype(userId) {
        try {
            const { data } = await axios.post(`/api/chronotype/${userId}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export const chronotypeService = new ChronotypeService();