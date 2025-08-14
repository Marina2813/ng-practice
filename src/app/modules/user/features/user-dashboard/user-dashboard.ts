import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../../../common/dtos/post/post-dto';
import { PostService } from '../../../../common/services/post';
import { AuthService } from '../../../../common/services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getTagline } from '../../../../common/utils/text-utils';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit{
  username = 'Alice';
  posts: PostDto[] = [];
  loading = true;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    const user = this.authService.getCurrentUser();

    if(!user){
      this.toastr.error('You must be logged in to view your profile');
      this.router.navigate(['/auth/login']);
      return;
    }
    
    this.username = user.username;

    this.postService.getPostsByCurrentUser().subscribe({
      next: posts => {
        this.posts = posts;
        this.loading = false;
      },
      error: err => {
        this.toastr.error('Failed to load your posts');
        console.error(err);
        this.loading = false;
      }
    });
  }

  getTagline(content: string): string {
    return getTagline(content);
  }

  goToPost(postId: string) {
    this.router.navigate(['/post', postId]);
  }

   editPost(postId: string) {
    this.router.navigate(['/editpost', postId]);
  }

 deletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.postId !== postId);
          this.toastr.success('Post deleted successfully');
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.toastr.error('Failed to delete the post');
        }
      });
    }
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

}
