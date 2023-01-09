import React, { Component } from "react";
import "bootstrap"
import RestaurantService from "../services/restaurant.service";
import SpecialiteService from "../services/specialite.service";
import VilleService from "../services/ville.service";
import SerieService from "../services/serie.service";
import ZoneService from "../services/zone.service";

class RestaurantsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchZone = this.onChangeSearchZone.bind(this);
    this.onChangeSearchVille = this.onChangeSearchVille.bind(this);
    this.onChangeSearchSerie = this.onChangeSearchSerie.bind(this);
    this.onChangeSearchSpecialite = this.onChangeSearchSpecialite.bind(this);
    this.retrieveSeries = this.retrieveSeries.bind(this);
    this.retrieveRestaurants = this.retrieveRestaurants.bind(this);
    this.retrieveVilles = this.retrieveVilles.bind(this);
    this.retrieveZones = this.retrieveZones.bind(this);
    this.retrieveSpecialities = this.retrieveSpecialities.bind(this);
    this.setActiveRestaurant = this.setActiveRestaurant.bind(this);

    this.state = {
      restaurants: [],
      specialities: [],
      series: [],
      zonesByVille: [],
      villes: [],
      currentRestau: null,
      currentIndex: -1,
      isDisabled: true,
      searchVille:'',
      searchZone:'',
      searchSerie:'',
      searchSpecialite:''
    };
  }

  componentDidMount() {
    this.retrieveRestaurants();
    this.retrieveVilles();
    this.retrieveSpecialities();
    this.retrieveSeries();
  }


  onChangeSearchSpecialite(e) {
    const searchSpecialite = e.target.value;
    this.setState({
      searchSpecialite: searchSpecialite
    });
  }

  onChangeSearchVille(e) {
    const searchVille = e.target.value;
    console.log(searchVille);
    this.setState({
      searchVille: searchVille,
      isDisabled: false
    });

    this.retrieveZones(e);
    this.searchVille();

  }

  onChangeSearchZone(e) {
    const searchZone = e.target.value;
    console.log(searchZone);
    this.setState({
      searchZone: searchZone,
    });

    this.searchZone();

  }

  onChangeSearchSerie(e) {
    const searchSerie = e.target.value;
    this.setState({
      searchSerie: searchSerie
    });
    RestaurantService.getAllBySerie(this.searchSerie)
      .then(response => {
        this.setState({
          restaurants: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveRestaurants() {
    RestaurantService.getAll()
      .then(response => {
        this.setState({
          restaurants: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveSpecialities() {
    SpecialiteService.getAll()
      .then(response => {
        this.setState({
          specialities: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveSeries() {
    SerieService.getAll()
      .then(response => {
        this.setState({
          series: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveVilles() {
    VilleService.getAll()
      .then(response => {
        this.setState({
          villes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  retrieveZones(e) {
    const searchVille = e.target.value
    console.log(searchVille);
    ZoneService.getAllByVille(parseInt(searchVille))
      .then(response => {
        this.setState({
          zonesByVille: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveRestaurant(restaurant, index) {
    this.setState({
      currentRestau: restaurant,
      currentIndex: index
    });
  }

  render() {
    return (

      <div>
        <div className="row">
          <div className="card">
            <form class="row  gy-2 gx-3">
              {/* filter by villes */}
              <div className="col">
                <label for="lat" className="col col-form-label">Villes</label>
                <div className="col">
                    <select className="form-select" value={this.state.searchVille}
                      onChange={this.onChangeSearchVille}>
                      <option selected>Choisir ville</option>
                      {this.state.villes.map((ville) => (
                        <option value={ville.id}>{ville.nom}</option>
                      ))}
                    </select>
                </div>
              </div>

              {/* filter by villes */}

              {/* filter by zones */}
              <div className="col">
                <label for="lat" className="col col-form-label">Zones</label>
                <div className="col ">
                  <select className="form-select" value={this.state.searchZone} onChange={this.onChangeSearchZone}
                    disabled={this.state.isDisabled}>
                    <option selected>Choisir zone</option>
                    {this.state.zonesByVille.map((zone) => (
                      <option value={zone.id}>{zone.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* filter by villes */}

              {/* filter by series */}
              <div className="col">
                <label for="lat" className="col col-form-label">Series:</label>
                <div className="col ">
                  <select className="form-select" value={this.state.searchSerie} onChange={this.onChangeSearchSerie}>
                    <option selected>Choisir série</option>
                    {this.state.series.map((serie) => (
                      <option value={serie.id}>{serie.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* filter by series */}

              {/* filter by specialities */}
              <div className="col">
                <label for="lat" className="col col-form-label">Specialities:</label>
                <div className="col ">
                  <select className="form-select" value={this.state.searchSpecialite} onChange={this.onChangeSearchSpecialite}>
                    <option selected>Choisir speialite</option>
                    {this.state.specialities.map((spec) => (
                      <option value={spec.id}>{spec.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* filter by specialities */}

              <div className="d-grid gap-2 d-md-block">
                <button
                  className="btn btn-warning"
                  type="submit"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
          <table className="table">
            <thead className="thead-warning">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Adresse</th>
                <th scope="col">Rank</th>
                <th scope="col">Ouvre</th>
                <th scope="col">Ferme</th>
                <th scope="col">Weekend</th>

              </tr>
            </thead>
            <tbody>
              {this.state.restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td>{restaurant.id}</td>
                  <td>{restaurant.adresse}</td>
                  <td>{restaurant.nom}</td>
                  <td>{restaurant.rank}</td>
                  <td>{restaurant.heure_op}</td>
                  <td>{restaurant.heure_cl}</td>
                  {(restaurant.adresse ? (<td>Oui</td>) : (<td>Non</td>))}

                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }


};

export default RestaurantsList;
