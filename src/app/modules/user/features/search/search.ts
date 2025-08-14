import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostDto } from '../../../../common/dtos/post/post-dto';
import { PostService } from '../../../../common/services/post';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrls: ['./search.css'], 
})
export class SearchComponent implements OnInit {
  results: PostDto[] = [];
  loading = true;
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      if (this.query) {
        this.loading = true;
        this.postService.searchPosts(this.query).subscribe({
          next: (res) => {
            this.results = res;
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });
      } else {
        this.results = [];
        this.loading = false;
      }
    });
  }

  getExcerpt(html: string, maxLength: number = 200): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}
