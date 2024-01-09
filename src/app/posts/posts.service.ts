import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getUpdatedPostListener(){
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, description: string, content: string){
    const post: Post = {title, description, content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}