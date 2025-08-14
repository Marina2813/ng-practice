import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../../../common/dtos/post/post-dto';
import { PostService } from '../../../../common/services/post';
import { getTagline } from '../../../../common/utils/text-utils';
import { LikeService } from '../../../../common/services/like';
import { CommentService } from '../../../../common/services/comment';

@Component({
  selector: 'app-all-post',
  standalone: false,
  templateUrl: './all-post.html',
  styleUrl: './all-post.css'
})

export class AllPost implements OnInit {
  allPosts: PostDto[] = [];
  pagedPosts: PostDto[] = [];

  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  loading = false;
  error = '';

  constructor(
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService
  ) {}


  ngOnInit(): void {
    this.loading = true;

    this.postService.getAllPosts().subscribe( {
      next: (posts: PostDto[]) => {
        this.allPosts = posts;

        this.allPosts.forEach(post => {
            this.likeService.getLikeCount(post.postId).subscribe({
              next: res => post.likeCount = res.result,
              error: err => console.error(`Error getting likes for ${post.postId}`, err)
            });

            this.commentService.getCommentCount(post.postId).subscribe({
              next: res => post.commentCount = res.result,
              error: err => console.error(`Error getting comments for ${post.postId}`, err)
            });
          });
          
          this.totalPages = Math.ceil(this.allPosts.length / this.pageSize); 
          this.setPage(1);
          this.loading = false;
      },

      error: (err) => {
        console.error('Failed to load posts', err);
        this.error = 'Unable to load posts.';
        this.loading = false;
      }
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.pagedPosts = this.allPosts.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x,i) => i + 1);
  }


  getTagline(content: string): string {
    return getTagline(content);
  }
  
}
