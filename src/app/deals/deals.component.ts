import { Component, OnInit, Input } from '@angular/core';
import { DealsService } from './deals.service';
import { Deal } from './deal';

class ProductTypeFilter {
  constructor(public value: string, public isSelected: boolean) {}
}

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  filterProductTypes: ProductTypeFilter[];
  filterSpeeds: string[];
  speeds: string[] = ['Any'];
  excludedProductTypes: string[] = ['Phone'];
  selectedSpeed = this.speeds[0];
  selectedMobileData: string;
  deals: Deal[];
  public filteredDeals: Deal[];

  showFilter: Boolean;

  @Input()
  set filter(value: Boolean) {
    this.showFilter = value;
  }

  constructor(private dealsService: DealsService) { }

  ngOnInit() {
    // TODO: Catch Error & Null condition
    this.dealsService.getAll().then(deals => {
      this.deals = deals;
      this.filteredDeals = deals.map(x => Object.assign({}, x));
      this.filterProductTypes = this.getProductTypeFilters(deals);
      this.filterSpeeds = this.getSpeedFilters(deals);
    });
  }

  search() {
    const selectedProductTypes = this.filterProductTypes
                  .filter(p => p.isSelected === true)
                  .map(p => p.value);

    if (selectedProductTypes.length === 0) {
      this.filteredDeals = this.deals;
    } else {
      this.filteredDeals = this.deals
                  .filter(d => {
                      const types = d.productTypes
                                .filter(pt => !this.excludedProductTypes.includes(pt));
                      return types.length === selectedProductTypes.length &&
                             types.every(pt => selectedProductTypes.includes(pt));
                  });
    }
    if (this.selectedSpeed !== 'Any') {
      this.filteredDeals = this.filteredDeals.filter(fd => fd.speed.label === this.selectedSpeed);
    }
    if (this.selectedMobileData) {
        this.filteredDeals = this.filteredDeals.filter(fd => fd.mobile.data.label === this.selectedMobileData);
    }
  }

  private getProductTypeFilters(deals): ProductTypeFilter[] {
      return deals.map(d => d.productTypes)
                  .reduce((target, next) => target.concat(next))
                  .filter((x, i, a) => x && a.indexOf(x) === i)
                  .filter(pt => !this.excludedProductTypes.includes(pt))
                  .sort()
                  .map(m => new ProductTypeFilter(m, false));
  }

  private getSpeedFilters(deals): string[] {
      const relatedSpeeds =  deals.map(d => d.speed.label)
                                  .filter((x, i, a) => x && a.indexOf(x) === i)
                                  .sort();
      return this.speeds.concat(relatedSpeeds);
  }
}
