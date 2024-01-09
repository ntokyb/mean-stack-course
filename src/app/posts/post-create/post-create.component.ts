import { Component} from "@angular/core";

import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{
  newPost = "";
  // enteredTitle = "";
  // enteredDescription = "";
  // enteredContent = "";
  // @Output() postCreated = new EventEmitter<Post>();
  // enteredValue = '';

  constructor(public postService: PostsService){}

  onAddPost(postCreateform: NgForm){
    if(postCreateform.invalid) return;
    // const post: Post = {
    //   title: postCreateform.value.title,
    //   description: postCreateform.value.description,
    //   content: postCreateform.value.content
    // };
    this.postService.addPosts(postCreateform.value.title, postCreateform.value.description, postCreateform.value.content);
    postCreateform.resetForm();
    // console.log(post);
  }
}