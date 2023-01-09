import http from "../http-common";


    
    const getAll = () => {
        return http.get("/market/series");
    }

    const SerieService = {
        getAll
    }
    

export default SerieService;