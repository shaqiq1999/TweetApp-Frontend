import { Component, OnInit,TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments, Tweets, TweetsDataService } from '../service/data/tweets-data.service';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from '../comments/comments.component';
import { UpdateComponent } from '../update/update.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Users, UserDataService } from '../service/data/users/user-data.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tweets: Tweets[] = [];



  tweet: Tweets = {
    id: '',
    uniqueId: 0,
    userName: '',
    TweetBody: '',
    TweetTime: new Date(),
    LikedUser: [],
    LikesCount: 0,
    TweetReply: []

  }

  user: Users = {
    FirstName: '',
    LastName: '',
    Email: '',
    userName: '',
    password: '',
    ContactNumber: '',
    securityKey:''
  }

  tweetreply = []

  name = ''
  tweetbody = ''
  tweetInValid = false
  messageForTweet = ''
  id = ''
  likeduser = []
  likescount = 0
  uniqueId = -1
  tweetsToShow = ''
  likeDislike = ''
  

  tags = ''


  constructor(private route: ActivatedRoute, private service: TweetsDataService, private userservice: UserDataService, private router: Router, private modalService: NgbModal,private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['userName']

    this.service.getTweetsofUser(this.name).subscribe(response => {
      this.tweets = response
      

    }, responseError => {   
      this.tweetsToShow = "You haven't tweeted recently."

    })

  }
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  postTweet() {
    if (this.tweetbody.trim() === '') {
      this.tweetInValid = true
      this.messageForTweet = "Please type something before posting the tweet."
    }
    else {
      this.tweetInValid = false
      this.service.postTweets(this.name, new Tweets(this.id, this.uniqueId, this.name, this.tweetbody + " " + this.tags, new Date(), this.likeduser, this.likescount, this.tweetreply)).subscribe(response => {
        this.tweetbody = ''
        // this.router.navigate(['tweets', this.name, 'home']).then(() => {
        //   window.location.reload();
        // });
        this.ngOnInit();

      });
    }

  }

  deleteTweet(uniqueId: number) {


    const modalRef = this.modalService.open(DeleteDialogComponent);
    modalRef.componentInstance.username = this.name;
    modalRef.componentInstance.tweetid = uniqueId;



  }

  updateTweet(uniqueId: number, TweetBody: string) {
    // this.router.navigate(['tweets', this.name, 'update', uniqueId])
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.username = this.name;
    modalRef.componentInstance.tweetid = uniqueId;
    modalRef.componentInstance.history = 'home'
    modalRef.componentInstance.currentTweet = TweetBody

  }

  

  setLikes(id: string) {
    
    
    this.service.setLikes(this.name, id).subscribe(response => {
      this.likeDislike = response.toString()
      
      // if (this.likeDislike == 'Liked') {
      //   console.log("Liked entering")
        
      // }
      // if (this.likeDislike == 'Disliked') {
        
      // }
      this.ngOnInit();
    })
  }


  

  searchInfo(content: TemplateRef<any>) {
    this.userservice.getUser(this.name).subscribe(response => {
        response.forEach(element => {
        if(element.userName==this.name)
        this.user=element
      });
      
    })
    this.offcanvasService.open(content, { scroll: true });

  }

  openComment(id: string) {
    const modalRef = this.modalService.open(CommentsComponent);
    modalRef.componentInstance.name = this.name;
    modalRef.componentInstance.currentname = this.name;
    modalRef.componentInstance.tweetid = id;
    modalRef.componentInstance.history = 'home'
    this.ngOnInit();
  }
}

