import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Comments {
  constructor(public userName: string, public Reply: string, public ReplyTime: Date) { }
}

export class Tweets {
  constructor(public id:string, public uniqueId: number, public userName: string, public TweetBody: string, public TweetTime: Date,public LikedUser:string[],public LikesCount:number,public TweetReply:Comments[]) { }
}

export class Likes {
  constructor(public uniqueId: number, public likes: number) { }
}



@Injectable({
  providedIn: 'root'
})
export class TweetsDataService {

  constructor(private http: HttpClient) { }

  getAllTweets() {

    return this.http.get<Tweets[]>("http://localhost:33892/api/v1/tweets/all");

  }

  getTweet(uniqueId: number) {
    return this.http.get<Tweets>(`http://localhost:33892/api/v1/tweet/${uniqueId}`)
  }

  postTweets(userName: String, tweets: Tweets) {
    return this.http.post(`http://localhost:33892/api/v1/tweets/${userName}/add`, tweets,{
      observe:'body',responseType:'text'as 'json'
  });
  }

  getTweetsofUser(userName: string) {

    return this.http.get<Tweets[]>(`http://localhost:33892/api/v1/tweets/${userName}`)
  }

  deleteTweet(userName:string,uniqueId: number) {
    return this.http.delete(`http://localhost:33892/api/v1/tweets/${userName}/delete/${uniqueId}`,{
      observe:'body',responseType:'text'as 'json'
    })
  }

  updateTweet(userName:string,uniqueId: number, tweet: Tweets) {
    return this.http.put(`http://localhost:33892/api/v1/tweets/${userName}/update/${uniqueId}`, tweet,{
      observe:'body',responseType:'text'as 'json'
    })
  }
  setLikes(userName:string,id:string) :Observable<Object>{
    
    
    return this.http.put<Object>(`http://localhost:33892/api/v1/tweets/${userName}/like/${id}`,"",{
      observe:'body',responseType:'text'as 'json'
    });
  }

 

  getComments(tweetId: number) {
    return this.http.get<Comments[]>(`http://localhost:33892/api/v1/comments/${tweetId}`)
  }

  postComment(userName:string,id:string, tweetreply: Comments) {
    return this.http.post(`http://localhost:33892/api/v1/tweets/${userName}/reply/${id}`, tweetreply,{
      observe:'body',responseType:'text'as 'json'
    })
  }

}
