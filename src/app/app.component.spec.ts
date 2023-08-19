import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CrawlerService } from './crawler.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {InputFormComponent} from './input-form/input-form.component';
import {VisualizationComponent} from './visualization/visualization.component';
import {FormsModule} from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let crawlerService: CrawlerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, InputFormComponent, VisualizationComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [CrawlerService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    crawlerService = TestBed.inject(CrawlerService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should crawl website and update links', fakeAsync(() => {
    const mockLinks = ['https://example.com'];

    spyOn(crawlerService, 'crawlWebsite').and.returnValue(Promise.resolve(mockLinks));

    component.crawling({ url: 'https://test-url.com', depth: 1 });

    tick();

    expect(component.links).toEqual(mockLinks);
    expect(component.loading).toBeFalse();
  }));

  it('should handle error during crawling', fakeAsync(() => {

    component.crawling({ url: 'https://invalid-url.com', depth: 1 });

    tick();
    expect(component.links).toEqual([]);
    expect(component.loading).toBeFalse();
  }));
});
