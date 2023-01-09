import http from "../http-common";

    const getAllByVille = id => {
        return http.get(`/market/zones/${id}`);
    }
    
    const ZoneService = {
        getAllByVille,
    }
    

export default ZoneService;