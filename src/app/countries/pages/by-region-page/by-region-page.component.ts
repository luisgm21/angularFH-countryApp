import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public countries : Country[] = [];
  public isLoading: boolean = false;
  public selectedRegion?: Region;
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  constructor(private countriesService:CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ){

    this.selectedRegion = region;

    this.isLoading = true;

    this.countriesService.searchRegion( region )
    .subscribe(countries => {
      this.countries = countries
      this.isLoading = false;
    })
  }
}
