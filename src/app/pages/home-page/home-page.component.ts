import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DrinkSpotService} from '../../service/drink-spot/drink-spot.service';
import {DrinkSpot, DrinkSpotWaterQuality} from '../../graphql-types';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as L from 'leaflet';
import {BehaviorSubject, Subject} from 'rxjs';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  // holds the current geo location
  private geolocation: BehaviorSubject<Position> = new BehaviorSubject<Position>(null);

  // holds the current map
  public map: L.Map;

  // holds the markers
  public markers: L.Marker[] = [];

  // checks if the position is resolving
  public resolvingPosition: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   *
   * @param drinkSpot
   * @param formBuilder
   * @param router
   */
  constructor(private drinkSpot: DrinkSpotService, private formBuilder: FormBuilder, private router: Router) {

    // subscribe to a geolocation change
    this.geolocation.subscribe({
      next: position => this.handlePositionChange(position)
    });

    // subscribe to a search results change
    this.drinkSpot.searchResults.subscribe({
      next: results => this.handleSearchResultsChange(results)
    });

  }

  /**
   * Requests the current position
   */
  private requestPosition() {
    this.resolvingPosition.next(true);
    navigator.geolocation.getCurrentPosition(position => {
      this.resolvingPosition.next(false);
      this.geolocation.next(position)
    }, err => {
      this.resolvingPosition.next(false);
      console.warn(err)
    });
  }

  /**
   * Fetches markers based on the current position
   * @param position
   */
  private fetchMarkers(position: Position) {
    this.drinkSpot.searchDrinkSpot({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      radius: 20,
    })
  }

  public reloadResults() {
    debugger;
    this.fetchMarkers(this.geolocation.getValue())
  }

  private handlePositionChange(position: Position) {

    if(!position) {
      return;
    }

    this.map = L.map('map', {
      center: [ position.coords.latitude, position.coords.longitude ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.fetchMarkers(position);

  }

  private handleSearchResultsChange(spots: DrinkSpot[]) {

    // remove existing markers
    for(const marker of this.markers) {
      marker.remove()
    }

    this.markers = [];

    // create new markers
    for(const spot of spots) {

      const marker = new L.Marker([spot.latitude, spot.longitude]).addTo(this.map)
      this.markers.push(marker)

    }

  }

  ngOnInit(): void {
    this.requestPosition()
  }

  ngAfterViewInit(): void {
  }

}
