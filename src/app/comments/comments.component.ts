import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments, Tweets, TweetsDataService } from '../service/data/tweets-data.service';
//import {Component, Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() name = ''
  @Input() currentname = ''
  @Input() tweetid = ''
  @Input() history = ''

  comments: Comments[] = []



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


  tweetreply: Comments = {
    userName: '',
    Reply: '',
    ReplyTime: new Date()
  }

  noComments = ''
  comment = ''
  messageInComment = ''

  tags = ''

  constructor(private route: ActivatedRoute, private service: TweetsDataService, private router: Router, public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {

    // this.tweetid = this.route.snapshot.params['tweetId']
    // this.name = this.route.snapshot.params['userName']
    console.log(this.name, this.tweetid)
    this.service.getTweetsofUser(this.currentname).subscribe(response => {
      response.forEach(reply => {
        if (reply.id === this.tweetid) {
          this.tweet = reply
          console.log(reply)
          console.log(reply.TweetReply)
          console.log(Object.assign(reply.TweetReply))
          this.comments = reply.TweetReply

          if (this.comments.length == 0) {
            this.noComments = 'no comment to show'
          }
        }
      });

    })

  }

  // postComment() {
  //   if (this.comment === '') {
  //     this.messageInComment = "Please type something before replying to tweet"
  //   }
  //   else {
  //     this.messageInComment = ''
  //     this.tweetreply.Reply=this.comment
  //     this.service.postComment(this.name,this.tweetid,this.tweetreply).subscribe(response => {
  //       // this.router.navigate(['tweets', this.name, 'comments', this.tweetid]).then(() => {
  //       //   window.location.reload();
  //       // });
  //       this.ngOnInit();
  //     })
  //   }
  // }
  openComment() {
    if (this.comment.trim() === '') {
      this.messageInComment = "Please type something before replying to tweet"
    }
    else {
      this.messageInComment = ''
      this.tweetreply.Reply = this.comment
      this.service.postComment(this.name, this.tweetid, this.tweetreply).subscribe(response => {
        // const modalRef = this.modalService.open(CommentsComponent);
        // modalRef.componentInstance.name = this.name;
        // modalRef.componentInstance.tweetid = this.tweetid;
        // modalRef.componentInstance.history = this.history;
        console.log(this.history)
        if (this.history === 'home')
          this.router.navigate(['tweets', this.name, 'home']).then(() => {
          window.location.reload();
          });
          //this.ngOnInit();
        else if (this.history === 'tweets') {
          this.router.navigate(['tweets', this.name, 'all']).then(() => {
            window.location.reload();
          }); 
          //this.ngOnInit();
        }
        else if (this.history === 'usertweets')
          this.router.navigate(['tweets', this.name, 'user',this.currentname]).then(() => {
            window.location.reload();

          });
          // this.ngOnInit();
      })
    }
  }

}
