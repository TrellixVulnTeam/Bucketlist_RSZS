import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post";
import { bucketArrays } from "../bucketArrays";
import { LottiePlayer } from "@lottiefiles/lottie-player";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"],
})
export class ViewComponent implements OnInit {
  BucketArrays: bucketArrays[] = [];
  currDiv: string = "";
  email: string | undefined;
  Displaybucketlist: any = [];
  disableTextbox = false;

  form: any = {
    email: "asreena.zailan@celcom.com.my",
  };

  reloadCurrentPage() {
    window.location.reload();
  }

  ShowDiv(divVal: string): void {
    this.currDiv = divVal;
  }

  toggleDisable() {
    this.disableTextbox = !this.disableTextbox;
  }

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getMyBucketlist().subscribe((data: bucketArrays[]) => {
      this.BucketArrays = data;
      console.log(this.BucketArrays);
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

  delete(email: any) {
    this.postService.delete(email).subscribe((res) => {
      console.log("Post deleted successfully!");
    });
  }
}
