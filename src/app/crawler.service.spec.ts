import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrawlerService } from './crawler.service';

describe('CrawlerService', () => {
  let injector: TestBed;
  let service: CrawlerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrawlerService]
    });
    injector = getTestBed();
    service = injector.inject(CrawlerService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should crawl website and return links', async () => {
    const mockResponse = { contents: '<a href="https://example.com">Example</a>' };
    const mockLinks = ['https://example.com'];

    service.crawlWebsite('https://test-url.com', 1).then(links => {
      expect(links).toEqual(mockLinks);
    });

    const req = httpMock.expectOne('https://api.allorigins.win/get?url=https://test-url.com');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error during crawling', async () => {
    service.crawlWebsite('https://invalid-url.com', 1).catch(error => {
      expect(error).toBeDefined();
    });

    const req = httpMock.expectOne('https://api.allorigins.win/get?url=https://invalid-url.com');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('404 Not Found'));
  });
});
