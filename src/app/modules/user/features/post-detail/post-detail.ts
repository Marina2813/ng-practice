import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../common/services/post';
import { CommentService } from '../../../../common/services/comment';
import { LikeService } from '../../../../common/services/like';

import { PostDto } from '../../../../common/dtos/post/post-dto';
import { CommentDto } from '../../../../common/dtos/comment/comment-dto';
import { CreateCommentDto } from '../../../../common/dtos/comment/create-comment-dto';
import { LikeDto } from '../../../../common/dtos/like/like-dto';

import { getTagline } from '../../../../common/utils/text-utils';

@Component({
  selector: 'app-post-detail',
  standalone: false,
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css']
})
export class PostDetail implements OnInit {
  loading = false; 
  error: string | null = null;

  post!: PostDto;
  comments: CommentDto[] = [];

  likeCount = 0;
  userLiked = false;

  commentForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(1000)])
  });

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('postId');

    if (!postId) {
      this.error = 'Post ID is missing.';
      return;
    }

    this.loading = true;

    this.postService.getPostById(postId).subscribe({
      next: post => {
        this.post = post;
        this.fetchLikeData(postId);
        this.loadComments(postId);
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load post', err);
        this.error = 'Failed to load post.';
        this.loading = false;
      }
    });
  }

  private fetchLikeData(postId: string): void {
    this.likeService.getLikeCount(postId).subscribe({
      next: response => {
        this.likeCount = response.result; 
      },
      error: err => console.error('Failed to fetch like count', err)
    });

    this.likeService.hasUserLiked(postId).subscribe({
      next: response => this.userLiked = response.result,
      error: err => console.error('Failed to check user like status', err)
    });
  }

  toggleLike() {
    this.likeService.toggleLike(this.post.postId).subscribe({
      next: (response) => {
        this.userLiked = !this.userLiked;
        this.likeCount += this.userLiked ? 1 : -1;
      },
      error: (err: any) => {
        console.error('Failed to toggle like', err);
      }
    });
}

  addComment(): void {
    if (this.commentForm.invalid || !this.post?.postId) return;

    const dto: CreateCommentDto = {
      content: this.commentForm.value.content.trim()
    };

    this.commentService.addComment(this.post.postId, dto).subscribe({
      next: response => {
        const newComment = response.result;
        this.comments.unshift(newComment);
        this.commentForm.reset();
      },
      error: err => {
        console.error('Failed to add comment', err);
      }
    });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.commentId !== commentId);
      },
      error: err => {
        console.error('Failed to delete comment', err);
      }
    });
  }

  loadComments(postId: string): void {
    this.commentService.getComments(postId).subscribe({
      next: response => {
        this.comments = response.result;
      },
      error: err => {
        console.error('Failed to load comments', err);
      }
    });
  }

  getTagline(content: string): string {
    return getTagline(content);
  }

  getFormattedContent(content: string): string {
    return content;
  }

  expandTextarea(event: FocusEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.rows = 4;
  }

  shrinkTextarea(event: FocusEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    if (!textarea.value.trim()) textarea.rows = 1;
  }
}
