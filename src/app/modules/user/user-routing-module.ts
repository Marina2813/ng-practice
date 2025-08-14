import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { UserLayout } from './shared/components/user-layout/user-layout';
import { Home } from './features/home/home';
import { AllPost } from './features/all-post/all-post';
import { PostDetail } from './features/post-detail/post-detail';
import { UserDashboard } from './features/user-dashboard/user-dashboard';
import { CreatePost } from './features/create-post/create-post';
import { AuthGuard } from '../../common/guards/auth-guard';
import { Edit } from './features/edit/edit';
import { SearchComponent } from './features/search/search';

const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      { path: 'home', component: Home},
      { path: 'allpost', component: AllPost},
      { path: 'posts/:postId', component: PostDetail},
      { path: 'dashboard', component: UserDashboard, canActivate: [AuthGuard]},
      { path: 'createpost', component: CreatePost, canActivate: [AuthGuard]},
      { path: 'editpost/:postId', component: Edit},
      { path: 'search', component: SearchComponent },
      { path: '', component: Landing},
    ]
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
