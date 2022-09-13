import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweets, TweetsDataService } from '../service/data/tweets-data.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

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


  @Input() tweetid: number = 0
  @Input() username: string= ''
  @Input() history: string=''
  @Input() currentTweet: string=''

  tweetInValid = ''

  constructor(private route: ActivatedRoute, private service: TweetsDataService, private router: Router,public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    
    console.log(this.currentTweet)
    
    this.tweet.TweetBody=this.currentTweet.trim()
  }

  updateTweet() {

    if (!this.tweet.TweetBody.trim().length) {
      this.tweetInValid = "Do not leave the space blank."
    }
    else if(this.tweet.TweetBody.trim()===this.currentTweet){
      this.tweetInValid= "The tweet is not changed"

    }
    else {
      this.tweet.userName=this.username
      this.tweet.TweetBody=this.tweet.TweetBody.trim()
      this.service.updateTweet(this.username,this.tweetid, this.tweet).subscribe(response => {
        this.router.navigate(['tweets', this.tweet.userName, 'home']).then(() => {
          window.location.reload();
        })
        
      })
    }

  }

}
