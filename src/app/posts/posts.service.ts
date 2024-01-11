import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts() {
    this.http.get<{message: string, posts:any }>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          description: post.description,
          content: post.content
        };
      });
    }))
    .subscribe((mappedPosts) => {
      this.posts = mappedPosts;
      this.postsUpdated.next([...this.posts]);

    });
  }

  getUpdatedPostListener(){
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, description: string, content: string){
    const post: Post = {id: null, title: title, description: description, content: content};
    this.http.post<{message: string, postId: string }>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      //GETTING THE POST ID and NOT AS A NULL
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
    
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      console.log('The post deleted has an Id of ' + postId);
      
      //WHEN POST ARE DELETED IT SHOULD AUTOMATICALLY REFRESH
      const deletedPostUpdate = this.posts.filter( post => post.id !== postId);
      this.posts = deletedPostUpdate;
      this.postsUpdated.next([...this.posts]);
    });
  }
}