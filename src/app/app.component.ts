import { Component} from '@angular/core';
import {CrawlerService} from './crawler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-crawler';
  links: string[] = [];
  loading = false;

  constructor(private crawlerService: CrawlerService) {
  }

    async crawling($event: { url: string; depth: number }): Promise<any> {
      this.crawlerService.crawlWebsite($event.url, $event.depth).then(links => {
        this.links = links;
        this.loading = false;
      });
    }
}
