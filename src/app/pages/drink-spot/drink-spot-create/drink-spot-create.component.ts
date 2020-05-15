import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateDrinkSpotMutationVariables, DrinkSpotWaterQuality} from '../../../graphql-types';
import {DrinkSpotService} from '../../../service/drink-spot/drink-spot.service';
import * as L from 'leaflet'

interface QualityOption {
  value: string,
  label: string,
}

@Component({
  selector: 'app-drink-spot-create',
  templateUrl: './drink-spot-create.component.html',
  styleUrls: ['./drink-spot-create.component.scss']
})
export class DrinkSpotCreateComponent implements OnInit, AfterViewInit {

  public createForm: FormGroup;
  public qualityOptions: QualityOption[] = [];
  private map: L.Map;


  private formDefaults: CreateDrinkSpotMutationVariables = {
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    quality: DrinkSpotWaterQuality.Drinkable,
  };

  constructor(private formBuilder: FormBuilder, private drinkSpotService: DrinkSpotService) {

    this.createForm = this.formBuilder.group({
      name: [this.formDefaults.name, Validators.required],
      description: [this.formDefaults.description, Validators.required],
      latitude: [this.formDefaults.latitude, Validators.required],
      longitude: [this.formDefaults.longitude, Validators.required],
      quality: [this.formDefaults.quality, Validators.required]
    });

    this.qualityOptions = this.getQualityOptions()

  }

  getQualityOptions(): {label: string, value: string}[] {
    return Object.values(DrinkSpotWaterQuality).map(value => {
      return {
        label: value.toLocaleLowerCase(),
        value
      }
    })
  }

  handleFormSubmit(data: CreateDrinkSpotMutationVariables) {

    if(!this.createForm.valid) {
      return;
    }

    this.createForm.disable();
    this.drinkSpotService.createDrinkSpot(data)
      .subscribe({
        next: data => {
          console.log(data);
          this.createForm.reset(this.formDefaults);
          this.createForm.enable();
        },
        error: data => {
          console.warn(data)
        }
      })

  }

  ngOnInit(): void {

  }

  trackLocation() {
    navigator.geolocation.getCurrentPosition(position => {

      const {latitude, longitude} = position.coords;

      this.createForm.get('latitude').setValue(latitude);
      this.createForm.get('longitude').setValue(longitude);

    });
  }

  ngAfterViewInit(): void {
  }

}
