import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as cheerio from 'cheerio';

@Injectable({
  providedIn: 'root',
})
export class CrawlerService {
  constructor(private http: HttpClient) {}

  async crawlWebsite(url: string, depth: number): Promise<string[]> {
    if (depth === 0 || url == null) {
      return [];
    }

    try {
      const response: any = await this.http.get(`https://api.allorigins.win/get?url=${url}`).toPromise();
      const links: string[] = [];
      const $ = cheerio.load(response.contents);
      $('a').each((index, element) => {
        const link = $(element).attr('href');
        if (link && link.startsWith('http')) {
          links.push(link);
        }
      });

      const nextLinks: string[] = [];
      for (const link of links) {
        const subLinks = await this.crawlWebsite(link, depth - 1);
        nextLinks.push(...subLinks);
      }
      return [...new Set([...links, ...nextLinks])];
    } catch (error) {
      console.error('Error crawling website:', error);
      return [];
    }
  }
}
