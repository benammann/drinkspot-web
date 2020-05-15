import { Injectable } from '@angular/core';
import {
  CreateDrinkSpotGQL,
  CreateDrinkSpotMutationVariables,
  DrinkSpot,
  SearchDrinkSpotGQL,
  SearchDrinkSpotQueryVariables
} from '../../graphql-types';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkSpotService {

  public searchResults: BehaviorSubject<DrinkSpot[]> = new BehaviorSubject<DrinkSpot[]>([]);

  constructor(
    private createMutation: CreateDrinkSpotGQL,
    private searchQuery: SearchDrinkSpotGQL,
  ) { }

  /**
   * Creates a new DrinkSpot
   * @param variables
   */
  public createDrinkSpot(variables: CreateDrinkSpotMutationVariables) {
    return this.createMutation.mutate(variables)
  }

  /**
   * Searches drink spots
   * @param variables
   */
  public searchDrinkSpot(variables: SearchDrinkSpotQueryVariables) {
    this.searchQuery.watch(variables).valueChanges.subscribe({
      next: response => {
        if(!response.errors) {
          this.searchResults.next(response.data.search_results)
        } else {
          window.alert('errors')
        }
      }
    })
  }

}
