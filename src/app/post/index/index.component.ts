import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  currDiv: string = '';
  email: string | undefined;
  Displaybucketlist: any = [];

  form: any = {
    email: null,
  };
  router: any;

  ShowDiv(divVal: string): void {
    this.currDiv = divVal;
  }

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  findSearch(): void {
    const { email } = this.form;
    this.postService.find(email).subscribe((data) => {
      console.log(data);
      this.Displaybucketlist = data;
      console.log(data);
    });
  }
}
