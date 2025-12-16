class UseApi {
    async getAPI(url) {
        try {

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }

            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
}

export default new UseApi();
