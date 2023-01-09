import http from "../http-common";

    const getAll = () => {
        return http.get("/market/villes");
    }

    const VilleService = {
        getAll
    }


    

export default VilleService;