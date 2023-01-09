import http from "../http-common";

    const getAll = () => {
        return http.get(`/market/all`);
    }

    const getAllByRestaurant = id => {
        return http.get(`/market/images/${id}`);
    }

    const getAllBySerie = id => {
        return http.get(`/market/restosBySerie/${id}`);
    }

    const getAllBySpecialite = id => {
        return http.get(`/market/restosBySpec/${id}`);
    }

    const getAllByVille = id => {
        return http.get(`/market/byVille/${id}`);
    }

    const getAllByZone = id => {
        return http.get(`/market/restosByZone/${id}`);
    }

    const RestaurantService = {
        getAll,
        getAllByRestaurant,
        getAllBySpecialite,
        getAllByVille,
        getAllByZone,
        getAllBySerie
    }
    

export default RestaurantService;