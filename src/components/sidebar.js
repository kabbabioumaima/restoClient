import React from "react";
import { Link } from "react-router-dom";
import { GrRestaurant,GrHomeRounded, GrLocation} from "react-icons/gr"

const Navbar = () => {
  return (
    <nav>
      <div className="fs-1 fw-bold">
        <Link to={"/market/"} className="d-flex justify-content-center align-items-center m-1 navbar-brand">
          < GrLocation className="m-2" />
          Market
        </Link>
      </div>
      <div class="row justify-content-center ">
        <div class="col-4  nav-btn shadow-sm">
          <Link to={"/market/"} className="m-1 text-center nav-link">
            <GrHomeRounded className="m-2"/>
            Acceuil
          </Link>
        </div>
        <div class="col-4  nav-btn shadow-sm">
          <Link to={"/market/list"} className="m-1 text-center nav-link">
            <GrRestaurant className="m-2"/>
            Restaurants
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
