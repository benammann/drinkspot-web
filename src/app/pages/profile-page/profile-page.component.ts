import { Component, OnInit } from '@angular/core';
import {ProfilePageDataGQL, ProfilePageDataQuery} from '../../graphql-types';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public profileData: BehaviorSubject<ProfilePageDataQuery> = new BehaviorSubject<ProfilePageDataQuery>({});
  public loading: boolean = false;

  constructor(private profilePageQuery: ProfilePageDataGQL) { }

  ngOnInit(): void {
    this.fetchProfile()
  }

  private fetchProfile() {
    this.loading = true;
    this.profilePageQuery.fetch()
      .subscribe({
        next: data => {
          this.loading = false;
          this.profileData.next(data.data);
        }
      })
  }

}
