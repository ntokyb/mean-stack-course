import { Component, OnInit} from "@angular/core";

import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  newPost = "";
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  // enteredTitle = "";
  // enteredDescription = "";
  // enteredContent = "";
  // @Output() postCreated = new EventEmitter<Post>();
  // enteredValue = '';

  constructor(public postService: PostsService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        //this.post = this.postService.getPost(this.postId);
        //START A SPINNER HERE
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          //END THE SPINNER HERE
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, description: postData.description, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    }); 
  }

  onAddPost(postCreateform: NgForm){
    if(postCreateform.invalid) return;
    // const post: Post = {
    //   title: postCreateform.value.title,
    //   description: postCreateform.value.description,
    //   content: postCreateform.value.content
    // };
    //SET THE SPINNER HERE AS WELL
    this.isLoading = true;
    //CHECK IF IT IS A CREATE OR UPDATE
    if(this.mode === "create"){
      this.postService.addPosts(postCreateform.value.title, postCreateform.value.description, postCreateform.value.content);
    }else {
      this.postService.updatePost(
        this.postId,
        postCreateform.value.title, 
        postCreateform.value.description, 
        postCreateform.value.content)
    }
    
    postCreateform.resetForm();
    // console.log(post);
  }
}