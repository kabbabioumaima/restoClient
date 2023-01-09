import React, { Component, useRef } from "react";
import "bootstrap"
import RestaurantService from "../services/restaurant.service";
import { Popup,Marker, MapContainer, TileLayer } from 'react-leaflet';
import osm from "../map/osm-providers";
import "leaflet/dist/leaflet.css";
import image1 from "../assets/images/pic1.JPG"
import LocationMarker from "../map/LocationMarker";
import Photo from "./Photo";
import icon from "../map/constants";
import { Carousel } from 'react-responsive-carousel';

class Acceuil extends Component {
  constructor(props) {
    super(props);
    this.setActiveRestaurant = this.setActiveRestaurant.bind(this);

    this.state = {
      restaurants: [],
      images: [],
      currentRestau: 1,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveRestaurants();
    this.retrieveImages(this.currentRestau);
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

retrieveImages(id) {
    RestaurantService.getAllByRestaurant(id)
      .then(response => {
        this.setState({
          images: response.data
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
          { 
            this.state.restaurants.map((restaurant) => (
              this.retrieveImages(restaurant.id),
              <div className="col">
                <div className="card"
                  onClick={() => this.setActiveRestaurant(restaurant, restaurant.id)}
                  key={restaurant.id}>
                  <Carousel>
                      {this.state.images.map((image) => (
                          <div key={image.id} className="">
                            <img src={`data:image/jpeg;base64,${image.image}`} className=" d-block" />
                          </div>
                        ))
                      }
                  </Carousel>
                  <div className="card-body col">
                    <h5 className="card-title">{restaurant.nom}</h5>
                    <p className="col-form-label">
                      Ouvre: {restaurant.heure_op}
                    </p>
                    <p className="col-form-label">
                      Ferme: {restaurant.heure_cl}
                    </p>
                    <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Détails</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div className="row">
                              <p className="col">
                                Ouvre: {restaurant.heure_op}
                              </p>
                              <p className="col">
                                Ferme: {restaurant.heure_cl}
                              </p>
                              <p className="col">
                                Weekend :
                                {(restaurant.week ? (<span>Ouvre</span>) : (<span>N'ouvre pas</span>))}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))
          }
          <div>
            <MapContainer
              center={[49.1951, 16.6068]}
              zoom={13}
              scrollWheelZoom
              style={{ height: "100vh" }}
            >
              <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
              {
                this.state.restaurants.map((restaurant) => (
                  <Marker key={restaurant.id}
                  eventHandlers={{ mouseover: (event) => event.target.openPopup(), }}
                    position={[parseFloat(restaurant.lat), parseFloat(restaurant.longs)]} icon={icon} riseOnHover>
                    
                    <Popup>
                      {restaurant.nom}<br />
                      <b>Latitude</b>: {restaurant.lat} <br />
                      <b>Longitude</b>: {restaurant.longs} <br />
                    </Popup>
                  </Marker>

                ))
              }
              <LocationMarker />
            </MapContainer>
          </div>
        </div>
      </div>
    );
  }


};

export default Acceuil;
