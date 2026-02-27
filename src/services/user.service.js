import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

class UserService {
    async refresh(refresh) {
        console.log("Refresh получил refresh: " + JSON.stringify(refresh))
        try {
            console.log("Refresh запрос начался")
            const { data } = await api.post('/auth/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${refresh}`
                }
            });
            console.log("Refresh-запрос завершился: ", data)
            return data;
        } catch (error) {
            throw error;
        }
    }

    async patchUser(
        access_token,
        refresh_token,
        changeAccessToken,
        dto
    ) {
        console.log('Сохранение... patchUser')
        try {
            const { data } = await api.patch('/user/patch', dto, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            console.log("Повторный запрос успешен: ", data)
            changeAccessToken(data.access_token)
            return data;
        } catch (error) {
            console.log("Error.status: " + error.response?.status)
            if (+error.response?.status === 401) {
                console.log("Обновление токена...")

                try {
                    const newToken = await this.refresh(refresh_token);

                    changeAccessToken(newToken.access_token);
                    console.log("Новый access токен: " + newToken.access_token)

                    const { data } = await api.patch('/user/patch', dto, {
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
            console.log('patch: other error...')
            throw error;
        }
    }

    async deleteUser(
        access_token,
        refresh_token,
        changeAccessToken
    ) {
        try {
            const { data } = await api.patch('/user/delete', {}, {
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

                    const { data } = await api.patch('/user/delete', {}, {
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
}

export const userService = new UserService();