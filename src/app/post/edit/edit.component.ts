import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "../post";
import { bucketArrays } from "../bucketArrays";
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { ConnectableObservable } from "rxjs";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  BucketArrays: bucketArrays | any;
  email: string | undefined;
  currAdd: string = "";
  Displaybucketlist: any = [];
  isDisabled: boolean = true;
  isLoading: boolean = true;

  enable() {
    this.isDisabled = false;
  }

  disable() {
    this.isDisabled = true;
  }

  click: boolean = true;
  onButtonClick() {
    this.click = !this.click;
  }
  onKey(event: KeyboardEvent) {
    // if value is not empty the set click to false otherwise true
    this.click = (event.target as HTMLInputElement).value === "" ? true : false;
  }

  ShowAdd(addVal: string) {
    this.currAdd = addVal;
  }

  currDiv: string = "";
  ShowDiv(divVal: string): void {
    this.currDiv = divVal;
  }

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  bucketArrays = {
    bucketItems: new Array({ items: "" }),
  };

  ngAfterViewInit() {}

  ngOnInit(): void {
    console.log("0", this.isLoading);
    this.postService.getMyBucketlist().subscribe((data: bucketArrays[]) => {
      this.BucketArrays = data[0].bucketItems;
      console.log(this.BucketArrays);
      // for (var i = 0; i < this.BucketArrays.length; i++) {
      //   this.bucketArrays.bucketItems[i] = this.BucketArrays[i];
      // }
      console.log("1", this.bucketArrays);
      this.isLoading = false;
    });
  }

  form: FormGroup = this.formBuilder.group({
    bucketItems: this.buildItems(this.bucketArrays.bucketItems),
  });

  get bucketItems(): FormArray {
    return this.form.get("bucketItems") as FormArray;
  }

  buildItems(bucketItems: { items: string }[] = []) {
    return this.formBuilder.array(
      bucketItems.map((BucketArrays) => this.formBuilder.group(BucketArrays))
    );
  }

  addItemsField() {
    this.bucketItems.push(this.formBuilder.group({ items: null }));
  }

  removeItemsField(index: number): void {
    if (this.bucketItems.length > 1) this.bucketItems.removeAt(index);
    else this.bucketItems.patchValue([{ items: null }]);
  }

  reset(): void {
    this.form.reset();
    this.bucketItems.clear();
    this.addItemsField();
  }

  submit(...args: [value: any]) {
    const { bucketItems } = this.form.value;
    this.BucketArrays = bucketItems;
    console.log(this.BucketArrays);
    this.postService.update(bucketItems).subscribe((res: any) => {
      console.log("Bucketlist updated successfully!");
      this.router.navigateByUrl("post/view");
    });
  }
  // submit(){
  //     const{
  //       email,
  //       bucketItems
  //     }=this.form;
  //     console.log(email);
  //     console.log(bucketItems)
  //     this.bucketArray = [ { "items": bucketItems } ]
  //     console.log(JSON.stringify(this.bucketArray))
  //     this.postService.update(this.bucketArray).subscribe((res:any) => {
  //          console.log('Post created successfully!');
  //          this.router.navigateByUrl('post/view');
  //     })
  //   }}
}
