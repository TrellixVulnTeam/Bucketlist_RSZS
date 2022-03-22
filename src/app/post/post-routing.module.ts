import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'post/index', pathMatch: 'full' },
  { path: 'post/index', component: IndexComponent },
  { path: 'post/view', component: ViewComponent },
  { path: 'post/create', component: CreateComponent },
  { path: 'post/edit', component: EditComponent },
  { path: 'post/search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
