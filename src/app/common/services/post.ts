import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PagedResultDto } from '../dtos/post/paged-result-dto';
import { PaginationParamsDto } from '../dtos/post/pagination-params-dto';
import { PostDto } from '../dtos/post/post-dto';
import { CreatePostDto } from '../dtos/post/create-post-dto';
import { BaseResponse } from '../types/base-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = `${environment.apiUrl}/v1/post`

  constructor(private http: HttpClient) {}

  getPosts(pagination: PaginationParamsDto): Observable<PagedResultDto<PostDto>> {
    const params = `?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;
    return this.http
      .get<BaseResponse<PagedResultDto<PostDto>>>(`${this.apiUrl}${params}`)
      .pipe(map(response => response.result));
  }

  getAllPosts(): Observable<PostDto[]> {

    const token = localStorage.getItem('accessToken');
    const headers = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    return this.http
      .get<BaseResponse<PagedResultDto<PostDto>>>(`${this.apiUrl}`, headers)
      .pipe(map(response => response.result.items) );
  }

  getPostById(postId: string): Observable<PostDto> {
    return this.http
      .get<BaseResponse<PostDto>>(`${this.apiUrl}/${postId}`)
      .pipe(map(response => response.result));
  }

  getPostsByCurrentUser(): Observable<PostDto[]> {
    return this.http
      .get<BaseResponse<PostDto[]>>(`${this.apiUrl}/myposts`)
      .pipe(map(response => response.result));
  }

  getFeaturedPosts(): Observable<PostDto[]> {
    return this.getPosts({ pageNumber: 1, pageSize: 6 })
      .pipe(map(result => result.items));
  }

  createPost(createPostDto: CreatePostDto): Observable<BaseResponse<PostDto>> {
    return this.http.post<BaseResponse<PostDto>>(this.apiUrl, createPostDto);
  }

  deletePost(postId: string): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(`${this.apiUrl}/${postId}`);
  }

  updatePost(postId: string, updatedDto: CreatePostDto): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.apiUrl}/${postId}`, updatedDto);
  }

  searchPosts(query: string): Observable<PostDto[]> {
    return this.http
      .get<BaseResponse<PostDto[]>>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`)
      .pipe(map(response => response.result));
  }


}
