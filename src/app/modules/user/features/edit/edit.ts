import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { CreatePostDto } from '../../../../common/dtos/post/create-post-dto';
import { PostDto } from '../../../../common/dtos/post/post-dto';
import { PostService } from '../../../../common/services/post';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit implements OnInit {
  postForm!: FormGroup;
  postId!: string;
  loading = false;

  quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  categories = ['Tech', 'Lifestyle', 'Business', 'Other'];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('postId') || '';
    console.log('postId:', this.postId); 

    this.postForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', Validators.required],
    });

    if (this.postId) {
      this.loading = true;
      this.postService.getPostById(this.postId).subscribe({
        next: (post: PostDto) => {
          console.log('Fetched post:', post);
          setTimeout(() => {
          this.postForm.patchValue({
            title: post.title,
            category: post.category,
            content: post.content
          });
          }, 0);
          console.log('Form value after patch:', this.postForm.value);
          this.loading = false;
        },
        error: err => {
          this.toastr.error('Failed to load post');
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  updatePost(): void {
    if (this.postForm.invalid) {
      this.toastr.error('Please fill in all the required fields');
      return;
    }

    const updatedPost: CreatePostDto = { ...this.postForm.value };
    this.loading = true;

    this.postService.updatePost(this.postId, updatedPost).subscribe({
      next: () => {
        this.toastr.success('Post updated successfully!');
        this.router.navigate(['/posts', this.postId]);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.toastr.error('Failed to update post');
        this.loading = false;
      }
    });
  }
}
