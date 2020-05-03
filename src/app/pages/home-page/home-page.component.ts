import { Component, OnInit } from '@angular/core';
import {HomePageDataGQL, HomePageDataQuery} from '../../graphql-types';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // stores the page data
  protected pageData: BehaviorSubject<HomePageDataQuery|null> = new BehaviorSubject<HomePageDataQuery>({});

  constructor(private homePageQuery: HomePageDataGQL) { }

  ngOnInit(): void {
    this.homePageQuery.fetch()
      .subscribe({
        next: data => {
          this.pageData.next(data.data)
        }
      })
  }

}
