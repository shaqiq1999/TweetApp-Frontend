import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments, Tweets, TweetsDataService } from '../service/data/tweets-data.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from '../comments/comments.component';


@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {
  
  tweet: Tweets = {
    id:'',
    uniqueId: 0,
    userName: '',
    TweetBody: '',
    TweetTime: new Date(),
    LikedUser: [],
    LikesCount:0,
    TweetReply: []

  }

 
  likesCount=0
  

  tweets: Tweets[] = [];
  tweetsToShow = ''
  userName = ''
  likeDislike=''
  
  

  constructor(private service: TweetsDataService, private router: Router, private route: ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.userName = this.route.snapshot.params['userName']
      this.service.getAllTweets().subscribe(response => {
        this.tweets = response
        
      },responseError=>{    
        
        this.tweetsToShow = "No Tweets to show"
        
      })
    

  }

  setLikes(id:string){
    this.service.setLikes(this.userName,id).subscribe(response =>{ 
      this.likeDislike=response.toString()
      
      this.ngOnInit();
  })
  }

  
  openComment(id: string,currentname:string) {
    const modalRef = this.modalService.open(CommentsComponent);
    modalRef.componentInstance.name = this.userName;
    modalRef.componentInstance.currentname = currentname;
    modalRef.componentInstance.tweetid = id;
    modalRef.componentInstance.history='tweets'
  }

  checkComments(tweetId: number) {
    this.router.navigate(['tweets', this.userName, 'comments', tweetId])
  }

}
