import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../../../common/dtos/post/post-dto';
import { PostService } from '../../../../common/services/post';
import { getTagline } from '../../../../common/utils/text-utils';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  featuredPosts: PostDto[] = [];

  constructor(private postService : PostService) {}

  ngOnInit(): void {
    this.postService.getFeaturedPosts().subscribe({
      next: posts => this.featuredPosts = posts,
      error: err => console.error("Failed to fetch the posts", err)
    });
  }

  getTagline(content: string): string {
    return getTagline(content);
  }
}
