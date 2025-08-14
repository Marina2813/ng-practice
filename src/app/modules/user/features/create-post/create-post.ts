import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from '../../../../common/services/post';
import { Router } from '@angular/router';
import { CreatePostDto } from '../../../../common/dtos/post/create-post-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.html',
  styleUrl: './create-post.css'
})
export class CreatePost {
  postForm!: FormGroup;
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

  editorModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  publishPost(): void {
    if(this.postForm.invalid){
      this.toastr.error('Please fill in all the required fields');
      return;
    }

    const postData: CreatePostDto = {
      ...this.postForm.value
    };

    this.loading = true;

    this.postService.createPost(postData).subscribe({
      next: (response) => {
        const postId = response.result.postId;
        alert('Post published successfully!');
        this.toastr.success('Post published successfully!');
        this.router.navigate(['/posts', postId]); 
      },
      error: (err) => {
        console.error('Post creation failed:', err);
        this.toastr.error('Failed to publish post. Please try again.');
      },
      complete: ()=> {
        this.loading = false;
      }
    });
  }
}