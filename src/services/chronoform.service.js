import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

class CFService {
    async refresh(refresh) {
        console.log("Refresh получил refresh: " + JSON.stringify(refresh))
        try {
            console.log("Refresh запрос начался")
            const {data} = await api.post('/auth/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${refresh}`
                }
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getCF(
        access_token,
        refresh_token,
        changeAccessToken
    ) {
        console.log("getCF начался");
        try {
            const { data } = await api.get(`/chronoform/chronoform`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            return data;
        } catch (error) {
            console.log("Error.status: " + error.response?.status)
            if (+error.response?.status === 401) {
                console.log("Обновление токена...")

                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.access_token);
                    console.log("Новый access токен: " + newToken.access_token)

                    const {data} = await api.get('/auth/profile', {
                        headers: {
                            'Authorization': `Bearer ${newToken.access_token}`
                        }
                    });
                    console.log("Повторный запрос успешен: ", data)
                    return data;
                } catch (refreshError) {
                    console.error("Не удалось обновить токен: ", refreshError)
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }

    async updateCF(
        access_token,
        refresh_token,
        changeAccessToken,
        dto
    ) {
        console.log("updateCF начался");
        try {
            const { data } = await api.post(`/chronoform/update`, dto, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            return data;
        } catch (error) {
            console.log("Error.status: " + error.response?.status)
            if (+error.response?.status === 401) {
                console.log("Обновление токена...")

                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.access_token);
                    console.log("Новый access токен: " + newToken.access_token)

                    const { data } = await api.post(`/chronoform/update`, dto, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    });

                    console.log("Повторный запрос успешен: ", data)
                    return data;
                } catch (refreshError) {
                    console.error("Не удалось обновить токен: ", refreshError)
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            if (+error.response?.status === 400) {
                throw new Error("Не удалось обновить запись")
            }
            throw error;
        }
    }

    async deleteCF(
        access_token,
        refresh_token,
        changeAccessToken
    ) {
        console.log("deleteCF начался");
        try {
            const request = await api.delete(`/chronoform/delete`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            return request;
        } catch (error) {
            console.log("Error.status: " + error.response?.status)
            console.log(error)
            if (+error.response?.status === 401) {
                console.log("Обновление токена...")

                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.access_token);
                    console.log("Новый access токен: " + newToken.access_token)

                    const request = await api.delete(`/chronoform/delete`, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    });

                    console.log("Повторный запрос успешен: ", request)
                    return request;
                } catch (refreshError) {
                    console.error("Не удалось обновить токен: ", refreshError)
                    throw new Error("Сессия истекла. Пожалуйста войдите снова.");
                }
            }
            throw error;
        }
    }
}

export const cfService = new CFService();