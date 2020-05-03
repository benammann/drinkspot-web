import { Injectable } from '@angular/core';
import {CreateDrinkSpotGQL, CreateDrinkSpotMutationVariables} from '../../graphql-types';

@Injectable({
  providedIn: 'root'
})
export class DrinkSpotService {

  constructor(private createMutation: CreateDrinkSpotGQL) { }

  /**
   * Creates a new DrinkSpot
   * @param variables
   */
  public createDrinkSpot(variables: CreateDrinkSpotMutationVariables) {
    return this.createMutation.mutate(variables)
  }

}
