import { Component, Input, OnDestroy, OnInit } from "@angular/core";

import { Post } from '../posts/post.model'
import { PostsService } from "../posts/posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy{

  // posts = [
  //   {title: "Diddy", description: "The short and long of it", content:"everything is weird now, everything makes no sense now, everything is boring now"},
  //   {title: "Beckham", description: "The tall and and weird", content:"how did we just find out what is happening right now, but we did"},
  //   {title: "flawless", description: "Zoro revealed", content:"what is happening to the happenings"},
  // ]
  posts: Post[] = [];
  private postSubscription: Subscription

  constructor(public postsService: PostsService) {}


  ngOnInit(): void {
      this.postsService.getPosts();
      this.postSubscription = this.postsService.getUpdatedPostListener()
      .subscribe((posts: Post[]) =>{
        this.posts = posts;
      })
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.postSubscription.unsubscribe();
  }
}