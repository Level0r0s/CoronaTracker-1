import { Component, OnInit } from '@angular/core';

import { ApiKliciService } from '../../services/APIklici/api-klici.service';
import { TransformToCountriesService } from '../../services/countries/transform-to-countries.service';
import { Country } from '../../classes/Country';
import { SortService } from '../../services/sort/sort.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  private allCases: any;
  public casesByCountry: Country[] = [];

  public spinner: boolean = true;

  constructor(
    private apiCalls: ApiKliciService,
    private transformToCountries: TransformToCountriesService,
    private sort: SortService
  ) {
  }

  public sortByCountries(): void {
    this.apiCalls.getAll().then(
      (data) => {

        this.allCases = data;
        this.transformToCountries.sortAll(this.allCases, this.casesByCountry);
        
        this.transformToCountries.calculatePercents(this.casesByCountry);

        this.spinner = false;
      }
    );
  }

  ngOnInit(): void {
    this.sortByCountries();
    
  }

}
