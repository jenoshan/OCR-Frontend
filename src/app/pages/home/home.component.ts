import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, public router: ActivatedRoute, private routerTwo : Router) { 
    
  }

  selectedFile: File

  imageText = '';
  isUploading = false;
  isInvalid = false;
  isFinished = false;
  isButtonDisabled = true;
  userId = '';

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('userId')){
        this.userId = paramMap.get('userId');
        // console.log(this.userId);
        // this.http.get('http://localhost:3000/api/user_id?user_id=' + this.userId).subscribe(res=>{
        // }, err=>{
        //   this.routerTwo.navigateByUrl('login-page');
        // });
        this.userService.getUserById(this.userId).subscribe(_=>{}, err=>{
          this.routerTwo.navigateByUrl('login-page');
        })
      }
    });
  }
  temp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5c-8qgZT0BceT9dz8NRrZlwe3bAOW98CK5uCDg6O2SjDUOum&s';
  imageUrl: any = this.temp;

  onFileChanged(event) {
    this.isUploading = true;
    this.isFinished = false;
    this.isInvalid = false;
    this.isButtonDisabled = true;
    this.imageText = '';
    this.imageUrl = this.temp;

    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(this.selectedFile);

    reader.onload = (() => {
      this.imageUrl = reader.result;
      let imageData = new FormData();
      imageData.append('image', this.selectedFile);
      this.userService.getResult(imageData).subscribe(res=>{
        this.imageText = res['image_text'],
        this.isUploading = false;
        this.isButtonDisabled = false;
      });
    });
  }

  onUpload() {
    if (!this.selectedFile) {
      this.isInvalid = true;
    } else {
      const uploaddata = new FormData();
      uploaddata.append('image', this.selectedFile, this.selectedFile.name);
      uploaddata.append('result', this.imageText);
      uploaddata.append('user_id', this.userId);
      this.userService.uploadResult(uploaddata).subscribe(
        (res) => {
          this.isUploading = false;
          this.isFinished = true;
        }
      );
    }

  }

}
