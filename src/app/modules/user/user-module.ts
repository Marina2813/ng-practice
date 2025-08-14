import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing-module';
import { Landing } from './features/landing/landing';
import { Navbar } from "../../common/components/navbar/navbar";
import { Home } from './features/home/home';
import { UserLayout } from './shared/components/user-layout/user-layout';
import { AllPost } from './features/all-post/all-post';
import { PostDetail } from './features/post-detail/post-detail';
import { UserDashboard } from './features/user-dashboard/user-dashboard';
import { NgxEditorModule } from 'ngx-editor';
import { CreatePost } from './features/create-post/create-post';
import { QuillModule } from 'ngx-quill';
import { Edit } from './features/edit/edit';
import { SearchComponent } from './features/search/search';


@NgModule({
  declarations: [
    Landing,
    Home,
    UserLayout,
    AllPost,
    PostDetail,
    UserDashboard,
    CreatePost,
    Edit,
    SearchComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Navbar,
    QuillModule
]
})
export class UserModule { }
