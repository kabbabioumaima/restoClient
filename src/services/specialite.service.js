import http from "../http-common";


    
    const getAll = () => {
        return http.get("/market/specs");
    }

    const SpecialiteService = {
        getAll
    }
    

export default SpecialiteService;