import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {IPost} from '../model/Post';
import {environment} from '../../environments/environment';

// const API_URL = 'http://localhost:8080/api/posts';

const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  shouldRefresh = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${apiUrl}/api/posts`);
  }

  getPostsOtherUser(id: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${apiUrl}/api/posts/${id}`);
  }

  getById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${apiUrl}/api/posts/${id}`);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(`${apiUrl}/api/posts`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}/api/posts/${id}`);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${apiUrl}/api/post/${post.id}`, post);
  }
}
