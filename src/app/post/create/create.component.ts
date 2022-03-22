import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  currAdd: string = '';
  ShowAdd(addVal: string) {
    this.currAdd = addVal;
  }

  click: boolean = true;
  onButtonClick() {
    this.click = !this.click;
  }
  onKey(event: KeyboardEvent) {
    // if value is not empty the set click to false otherwise true
    this.click = (event.target as HTMLInputElement).value === '' ? true : false;
  }

  currDiv: string = '';
  ShowDiv(divVal: string): void {
    this.currDiv = divVal;
  }

  Displaybucketlist: any = [];

  constructor(
    public postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  bucketArrays = {
    email: 'asreena.zailan@celcom.com.my',
    bucketItems: [{ items: '' }],
  };

  form: FormGroup = this.formBuilder.group({
    email: this.bucketArrays.email,
    bucketItems: this.buildItems(this.bucketArrays.bucketItems),
  });

  get bucketItems(): FormArray {
    return this.form.get('bucketItems') as FormArray;
  }

  buildItems(bucketItems: { items: string }[] = []) {
    return this.formBuilder.array(
      bucketItems.map((bucketArrays) => this.formBuilder.group(bucketArrays))
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

  findSearch(): void {
    const { email } = this.bucketArrays;
    this.postService.find(email).subscribe((data) => {
      console.log(data);
      this.Displaybucketlist = data;
      console.log(data);
    });
  }

  addsubmit(value: any): void {
    console.log(value);
  }

  submit(...args: [value: any]) {
    const { email, bucketItems } = this.form.value;
    console.log(JSON.stringify(this.bucketArrays));
    this.postService.create(email, bucketItems).subscribe((res: any) => {
      console.log('Bucketlist publish successfully!');
      this.router.navigateByUrl('post/view');
    });
  }
}
