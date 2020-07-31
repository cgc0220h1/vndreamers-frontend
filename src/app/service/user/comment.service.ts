import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IComment} from '../../model/comment';

const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  deleteComment(postId: number, commentId: number): Observable<IComment> {
    return this.http.delete<IComment>(`${apiUrl}/api/posts/${postId}/comments/${commentId}`);
  }

  updateComment(postId: number, comment: IComment): Observable<IComment> {
    return this.http.put<IComment>(`${apiUrl}/api/posts/${postId}/comments`, comment);
  }

  getCommentOtherUser(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${apiUrl}/api/users/${id}/comments`);
  }
}
