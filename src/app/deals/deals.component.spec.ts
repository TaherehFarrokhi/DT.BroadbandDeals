import {
  async,
  ComponentFixture,
  inject,
  TestBed} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { DealsComponent } from './deals.component';
import { DealsService } from './deals.service';
import { Deal } from './deal';

class MockDealsService extends DealsService {
}

describe('DealsComponent', () => {
  let component: DealsComponent;
  let fixture: ComponentFixture<DealsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ DealsComponent ],
      imports: [
        HttpModule,
        FormsModule,
      ],
      providers: [
        { provide: DealsService, useClass: MockDealsService}
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(DealsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the 3 broadband only deals when filtering by Broadband', async(() => {
    fixture.whenStable()
      .then(m => {
        fixture.detectChanges();

        const debugElement = fixture.debugElement.query(By.css('#Broadband'));
        const element = debugElement.nativeElement as HTMLInputElement;

        element.click();
        fixture.detectChanges();

        expect(element.checked).toBe(true);
        expect(component.filteredDeals.length).toBe(3);

        const rows = fixture.debugElement.queryAll(By.css('#deals > .row'));
        expect(rows.length).toBe(3);
    });
  }));

  it('should show the 2 deals for broadband and TV only when filtering by Broadband and TV', async(() => {
    fixture.whenStable()
      .then(m => {
        fixture.detectChanges();

        const broadbandDebugElement = fixture.debugElement.query(By.css('#Broadband'));
        const broadbandElement = broadbandDebugElement.nativeElement as HTMLInputElement;

        const tvDebugElement = fixture.debugElement.query(By.css('#TV'));
        const tvElement = tvDebugElement.nativeElement as HTMLInputElement;

        broadbandElement.click();
        tvElement.click();

        fixture.detectChanges();

        expect(broadbandElement.checked).toBe(true);
        expect(tvElement.checked).toBe(true);
        expect(component.filteredDeals.length).toBe(2);

        const rows = fixture.debugElement.queryAll(By.css('#deals > .row'));
        expect(rows.length).toBe(2);
    });
  }));

  it('should show the single deal for broadband and Mobile only when filtering by Broadband and Mobile', async(() => {
    fixture.whenStable()
      .then(m => {
        fixture.detectChanges();

        const broadbandDebugElement = fixture.debugElement.query(By.css('#Broadband'));
        const broadbandElement = broadbandDebugElement.nativeElement as HTMLInputElement;

        const mobileDebugElement = fixture.debugElement.query(By.css('#Mobile'));
        const mobileElement = mobileDebugElement.nativeElement as HTMLInputElement;

        broadbandElement.click();
        mobileElement.click();

        fixture.detectChanges();

        expect(broadbandElement.checked).toBe(true);
        expect(mobileElement.checked).toBe(true);
        expect(component.filteredDeals.length).toBe(1);

        const rows = fixture.debugElement.queryAll(By.css('#deals > .row'));
        expect(rows.length).toBe(1);
    });
  }));

  it('should show zero deal when filtering by Mobile, Broadband, TV and Mobile Data 5GB', async(() => {
    fixture.whenStable()
      .then(m => {
        fixture.detectChanges();

        const broadbandDebugElement = fixture.debugElement.query(By.css('#Broadband'));
        const broadbandElement = broadbandDebugElement.nativeElement as HTMLInputElement;

        const tvDebugElement = fixture.debugElement.query(By.css('#TV'));
        const tvElement = tvDebugElement.nativeElement as HTMLInputElement;

        const mobileDebugElement = fixture.debugElement.query(By.css('#Mobile'));
        const mobileElement = mobileDebugElement.nativeElement as HTMLInputElement;

        component.selectedMobileData = '5'; // TODO: No UI to reflect this
        broadbandElement.click();
        tvElement.click();
        mobileElement.click();
        fixture.detectChanges();

        expect(broadbandElement.checked).toBe(true);
        expect(tvElement.checked).toBe(true);
        expect(mobileElement.checked).toBe(true);
        expect(component.filteredDeals.length).toBe(0);

        const rows = fixture.debugElement.queryAll(By.css('#deals > .row'));
        expect(rows.length).toBe(0);
    });
  }));

  it('should show one deal when filtering by Broadband and speed 52MB', async(() => {
    fixture.whenStable()
      .then(m => {
        fixture.detectChanges();

        const broadbandDebugElement = fixture.debugElement.query(By.css('#Broadband'));
        const broadbandElement = broadbandDebugElement.nativeElement as HTMLInputElement;

        const speedDebugElement = fixture.debugElement.query(By.css('#speedSelector'));
        const speedElement = speedDebugElement.nativeElement as HTMLSelectElement;

        broadbandElement.click();

        speedElement.value = '52';
        speedElement.dispatchEvent(new Event('change')); // Note: Need explicit raise of even as it can't detect that automatically

        fixture.detectChanges();

        expect(broadbandElement.checked).toBe(true);
        expect(component.filteredDeals.length).toBe(1);

        const rows = fixture.debugElement.queryAll(By.css('#deals > .row'));
        expect(rows.length).toBe(1);
    });
  }));
});
