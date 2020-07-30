import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IComment} from '../model/comment';

const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  deleteComment(id: number): Observable<IComment> {
    return this.http.delete<IComment>(`${apiUrl}/api/comments/${id}`);
  }

  updateComment(postId: number, comment: IComment): Observable<IComment> {
    return this.http.put<IComment>(`${apiUrl}/api/posts/${postId}/comments`, comment);
  }
}
