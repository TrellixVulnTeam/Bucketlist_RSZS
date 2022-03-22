import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  posts: Post[] = [];
  currDiv: string = '';
  email: string | undefined;
  Displaybucketlist: any = [];

  form: any = {
    email: null,
  };

  ShowDiv(divVal: string): void {
    this.currDiv = divVal;
  }

  constructor(public postService: PostService) {}

  ngOnInit(): void {}

  findSearch(): void {
    const { email } = this.form;
    this.postService.find(email).subscribe((data) => {
      console.log(data);
      this.Displaybucketlist = data;
      console.log(data);
    });
  }
}
