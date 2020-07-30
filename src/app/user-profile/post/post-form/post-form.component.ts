import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../../model/User';
import {PostService} from '../../../service/user/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUpload} from '../../../model/upload-file';
import {HttpClient} from '@angular/common/http';
import {UploadFileService} from '../../../service/public/upload-file.service';
import {IPost} from '../../../model/Post';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})


export class PostFormComponent implements OnInit {

  constructor(private postService: PostService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private http: HttpClient,
              private uploadFileService: UploadFileService) {
  }

  postForm: FormGroup;
  status: FormControl;

  @Input() currentUser: IUser;

  @Output() whenClickPostButton = new EventEmitter<IPost>();

  file: any;
  imageFile: any;
  selectedImage: FileList;
  currentImageUpload: FileUpload;
  percentage: number;
  url: string | ArrayBuffer = '';
  isShowProgressBar = false;

  ngOnInit(): void {
    this.status = new FormControl();
    this.postForm = new FormGroup({
      status: this.status,
      content: new FormControl('', Validators.required),
      image: new FormControl('')
    });
    this.postForm.get('status').setValue('1');
  }

  onSubmit(): void {
    this.postForm.markAllAsTouched();

    this.uploadFileService.uploadSubject.subscribe(downloadUrl => {
      this.postForm.value.image = downloadUrl;
      this.postService.createPost(this.postForm.value).subscribe(result => {
        this.snackBar.open('Post bài thành công', '', {
          duration: 2500
        });
        this.whenClickPostButton.emit(result);
        this.url = '';
        this.postForm.reset();
        this.postForm.get('status').setValue('1');
      }, () => {
        this.snackBar.open('Post bài không thành công', '', {
          duration: 2500
        });
      });
    });

    if (this.postForm.valid) {
      if (this.selectedImage === undefined) {
        this.uploadFileService.uploadSubject.next('');
        this.uploadFileService.uploadSubject = new Subject();
      } else {
        this.isShowProgressBar = true;
        this.upload().subscribe(next => {
          this.percentage = Math.round(next * 100) / 100;
        }, () => {
          this.snackBar.open('Có lỗi xảy ra', '', {
            duration: 2500
          });
        }, () => {
          this.isShowProgressBar = false;
        });
      }

    } else {
      this.snackBar.open('Nội dung không được để trống!', '', {
        duration: 1000
      });
    }
  }

  displayImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (fileEvent: ProgressEvent<FileReader>) => { // called once readAsDataURL is completed
        this.url = fileEvent.target.result;
      };
    }
    this.selectedImage = event.target.files;
  }

  upload(): Observable<any> {
    this.imageFile = this.selectedImage.item(0);
    this.selectedImage = undefined;
    this.currentImageUpload = new FileUpload(this.imageFile);
    return this.uploadFileService.pushFileToStorage(this.currentImageUpload);
  }
}
