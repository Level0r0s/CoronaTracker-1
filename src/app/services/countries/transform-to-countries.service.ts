import { Injectable } from '@angular/core';
import { ApiKliciService } from '../APIklici/api-klici.service';
import { Tracker } from '../../classes/Tracker';
import { Country } from '../../classes/Country';
import { Location } from '../../classes/Location';
import { Province } from '../../classes/Province';

@Injectable({
  providedIn: 'root'
})
export class TransformToCountriesService {

  constructor(
  ) { }

  public sortAll (allCases: any, casesByCountry: Country[]): void {
    allCases.forEach(element => {
      let country: Country;
      
      casesByCountry.forEach(e => {
        if(e.countryName == element.countryRegion) {
          country = e;
        }
      });

      if(country == null) {
        country = new Country();
        country.countryName = element.countryRegion;
        casesByCountry.push(country);
      }

      switch(country.countryName) {
        case "Korea, South":
          country.countryName = "South Korea";
          break;
      }

      country.sumOfConfirms += element.confirmed;
      country.sumOfDeaths += element.deaths;
      country.sumOfRecovers += element.recovered;

      if (element.provinceState != null) {
        let province: Province = new Province();
        province.provinceName = element.provinceState;
        province.cLat = element.lat;
        province.cLong = element.long;

        province.confirmed = element.confirmed;
        province.deaths = element.deaths;
        province.recovered = element.recovered;

        country.provinces.push(province);
      } else {
        country.cLat = element.lat;
        country.cLong = element.long;

        country.iso2Code = element.iso2;
      }


    });
  }

  public calculatePercents(casesByCountry: Country[]): void {
    casesByCountry.forEach(element => {
      element.pOfDeaths = ((element.sumOfDeaths / element.sumOfConfirms) * 100).toFixed(2);
      //element.pOfDeaths += "%";
      element.pOfRecovers = ((element.sumOfRecovers / element.sumOfConfirms) * 100).toFixed(2);
      element.pInProgress = (100 - ((element.sumOfDeaths / element.sumOfConfirms) * 100) - ((element.sumOfRecovers / element.sumOfConfirms) * 100)).toFixed(2);
    })
  }

}
