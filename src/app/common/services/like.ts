import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../types/base-response';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = `${environment.apiUrl}/v1/like`;

  constructor(private http: HttpClient) {}

  toggleLike(postId: string): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.baseUrl}/toggle`, { postId });
  }

  getLikeCount(postId: string): Observable<BaseResponse<number>> {
    return this.http.get<BaseResponse<number>>(`${this.baseUrl}/count/${postId}`);
  }

  hasUserLiked(postId: string): Observable<BaseResponse<boolean>> {
    return this.http.get<BaseResponse<boolean>>(`${this.baseUrl}/userliked/${postId}`);
  }
  
}
