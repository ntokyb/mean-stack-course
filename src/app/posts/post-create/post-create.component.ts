import { Component, OnInit} from "@angular/core";

import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  newPost = "";
  private mode = 'create';
  private postId: string;
  // enteredTitle = "";
  // enteredDescription = "";
  // enteredContent = "";
  // @Output() postCreated = new EventEmitter<Post>();
  // enteredValue = '';

  constructor(public postService: PostsService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if (paraMap.has('postId')){
        this.mode = 'edit';
        this.postId = paraMap.get('postId');
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
    this.postService.addPosts(postCreateform.value.title, postCreateform.value.description, postCreateform.value.content);
    postCreateform.resetForm();
    // console.log(post);
  }
}