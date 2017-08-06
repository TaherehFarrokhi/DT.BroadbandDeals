import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

import { By } from '@angular/platform-browser';

import { MockBackend } from '@angular/http/testing';
import { AppComponent } from './app.component';
import { DealsComponent } from './deals/deals.component';
import { DealsService } from './deals/deals.service';

declare var viewport: any;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        DealsComponent
      ],
      providers: [DealsService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'start'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('start');
  }));

  it('should show filter menu in smartphone when click on burger menu', async(() => {
    viewport.set(320);
    fixture.whenStable()
      .then(m => {
        fixture.detectChanges();

        const hambergerMenuDebugElement = fixture.debugElement.query(By.css('#hambergerMenu'));
        const hambergerMenuElement = hambergerMenuDebugElement.nativeElement as HTMLAnchorElement;

        hambergerMenuElement.click();
        fixture.detectChanges();

        const filterDebugElement = fixture.debugElement.query(By.css('.filter'));
        const filterElement = filterDebugElement.nativeElement as HTMLDivElement;

        expect(filterElement).not.toBe(null);
        const filterElementClass = filterElement.getAttribute('class');
        expect(filterElementClass).toContain('filter-overlay');
        expect(filterElementClass).toContain('filter');
    });
  }));

  it('should hide filter menu in smartphone and filter menu is visible when click on burger menu', async(() => {
    viewport.set(320);
    fixture.whenStable()
      .then(m => {
        fixture.detectChanges();

        const hambergerMenuDebugElement = fixture.debugElement.query(By.css('#hambergerMenu'));
        const hambergerMenuElement = hambergerMenuDebugElement.nativeElement as HTMLAnchorElement;

        hambergerMenuElement.click();
        fixture.detectChanges();

        const filterDebugElement = fixture.debugElement.query(By.css('.filter'));
        const filterElement = filterDebugElement.nativeElement as HTMLDivElement;

        expect(filterElement).not.toBe(null);
        let filterElementClass = filterElement.getAttribute('class');
        expect(filterElementClass).toContain('filter-overlay');
        expect(filterElementClass).toContain('filter');

        hambergerMenuElement.click();
        fixture.detectChanges();

        filterElementClass = filterElement.getAttribute('class');
        expect(filterElementClass).not.toContain('filter-overlay');
        expect(filterElementClass).toContain('filter');
    });
  }));
});
