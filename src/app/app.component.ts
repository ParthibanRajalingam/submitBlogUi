import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Validations } from './validations';
import { HttpCallsService } from './http-calls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blogSubmitV2';
  name = new FormControl('');
  val = new Validations();
  presentContent: any ;
  newContent: any;
  afuConfig = {
    uploadAPI: {
      url: 'http://localhost:3000/upload'
    }
};
contentId = 0;
category1: String;
  category2: String;
  category3: String;
  subCategory3str: String;
  subCategory2str: String;
  subCategory1str: String;
  categories: any;
  subCategory1: any;
  subCategory2: any;
  subCategory3: any;

  blogForm = this.fb.group({
    authorName: ['', Validators.required],
    email: ['', this.val.ValidateEmail],
    title : ['', Validators.required],
    imageSrc : [''],
    intro : ['', Validators.required],
    authorImage : [''],
    aboutAuthor : ['', Validators.required],
    categories : [[]],
    tags : [[], Validators.required],
    postType : ['text'],
    likes : [0],
    comments : [[]],
    mostFeaturedPost : ['no'],
    featuredPost : ['no'],
    published : [false],
    contents: [[]]
  });

  constructor(private fb: FormBuilder, private httpRequests: HttpCallsService) { }

  ngOnInit() {

  this.blogForm.patchValue({'authorName': 'Parth'} );
      this.httpRequests.getCategories().subscribe(
      data => {
        console.log(data);
        this.categories = data;
      }
    );

}

onAddContent(type, content) {

 this.presentContent  = this.blogForm.get('contents').value;
 this.newContent = this.presentContent.push({'contentId': this.contentId++, 'type': type, 'content': content});
}

onAddImage(type, content) {

 this.presentContent  = this.blogForm.get('contents').value;
 this.newContent = this.presentContent.push({'contentId': this.contentId++, 'type': type, 'content': content});
}

onDeleteContent() {
  if (this.blogForm.get('contents').value) {
this.blogForm.get('contents').value.pop();
  } else {
    alert('nothing to delete');
  }
}

onSubmit() {
  // TODO: Use EventEmitter with form value
  this.blogForm.patchValue({'tags': (this.blogForm.get('tags').value).split(',')}),
  this.blogForm.patchValue({'categories': [this.category1, this.category2, this.category3, this.subCategory1str, this.subCategory2str,
  this.subCategory3str]} );
  console.warn(this.blogForm.value);
  this.httpRequests.postBlog(this.blogForm.value).subscribe(
      data => {
        console.log(data);
        alert('Successs.. Check console.');
      },
      error => {
        alert(JSON.stringify(error));
}
    );
    console.log(this.blogForm.value);
}

authorImageUpload(response) {
this.blogForm.patchValue({'authorImage': JSON.parse(response.response).url} );
// console.log(response);
}

blogImageUpload(response) {
this.blogForm.patchValue({'imageSrc': JSON.parse(response.response).url} );
// console.log(response);
}

contentDocUpload(response) {
  this.blogForm.get('contents').value.pop();
  this.newContent = this.presentContent.push({'type': 'descImage', 'content': JSON.parse(response.response).url});
console.log(response);
}

  public onSubChange(event, categoryType): void {  // event will give you full breif of action

 if (categoryType === 'Scategory3') {
      this.subCategory3str = event.target.value;
 } else if (categoryType === 'Scategory2') {
      this.subCategory2str = event.target.value;
 } else if (categoryType === 'Scategory1') {
      this.subCategory1str = event.target.value;
 }
  }

  public onChange(event, categoryType): void {  // event will give you full breif of action

 if (categoryType === 'category3') {
      this.category3 = event.target.value;
      this.subCategory3 = this.getSubCategory(event.target.value);
      console.log(categoryType, event.target.value);
      console.log( this.subCategory3);
 } else if (categoryType === 'category2') {
      this.category2 = event.target.value;
      this.subCategory2 = this.getSubCategory(event.target.value);
      console.log(categoryType, event.target.value);
      console.log( this.subCategory2);
 } else if (categoryType === 'category1') {
      this.category1 = event.target.value;
      this.subCategory1 = this.getSubCategory(event.target.value);
      console.log(categoryType, event.target.value);
      console.log( this.subCategory1);
 }
  }

    public getSubCategory(categoryName): void {  // event will give you full breif of action
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].mainCategory === categoryName) {
        return this.categories[i].subCategories;
      }
    }
  }
}

