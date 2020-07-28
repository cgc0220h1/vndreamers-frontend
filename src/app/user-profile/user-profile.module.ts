import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserProfileRoutingModule} from './user-profile-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LayoutsComponent} from './layouts/layouts.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {ShowProfileComponent} from './show-profile/show-profile.component';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {DeleteDialogComponent} from './dialog/delete-dialog/delete-dialog.component';
import {CommentSingleComponent} from './comment/comment-single/comment-single.component';
import {CommentFormComponent} from './comment/comment-form/comment-form.component';
import {PostSingleComponent} from './post/post-single/post-single.component';
import {PostListComponent} from './post/post-list/post-list.component';
import {EditProfileDialogComponent} from './dialog/edit-profile-dialog/edit-profile-dialog.component';
import {PostFormComponent} from './post/post-form/post-form.component';
import {CommentListComponent} from './comment/comment-list/comment-list.component';
import {FriendListComponent} from './friend/friend-list/friend-list.component';


@NgModule({
  declarations: [
    LayoutsComponent,
    ShowProfileComponent,
    DeleteDialogComponent,
    CommentSingleComponent,
    CommentFormComponent,
    PostSingleComponent,
    PostListComponent,
    EditProfileDialogComponent,
    PostFormComponent,
    CommentListComponent,
    FriendListComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    FormsModule,
    NgbModule,
    SharedModule,
    FlexModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class UserProfileModule {
}
