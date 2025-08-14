import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDto } from '../dtos/comment/comment-dto';
import { CreateCommentDto } from '../dtos/comment/create-comment-dto';
import { BaseResponse } from '../types/base-response';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  private baseUrl = `${environment.apiUrl}/v1/comment`;

  constructor(private http: HttpClient) {}

  getComments(postId: string): Observable<BaseResponse<CommentDto[]>> {
    return this.http.get<BaseResponse<CommentDto[]>>(`${this.baseUrl}/${postId}`);
  }

  addComment(postId: string, dto: CreateCommentDto): Observable<BaseResponse<CommentDto>> {
    return this.http.post<BaseResponse<CommentDto>>(`${this.baseUrl}/${postId}`, dto);
  }

  deleteComment(commentId: number): Observable<BaseResponse<null>> {
    return this.http.delete<BaseResponse<null>>(`${this.baseUrl}/${commentId}`);
  }

  getCommentCount(postId: string): Observable<BaseResponse<number>> {
    return this.http.get<BaseResponse<number>>(`${this.baseUrl}/count/${postId}`);
  }

  
}
