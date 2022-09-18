import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Likes, Tweets, TweetsDataService } from '../service/data/tweets-data.service';
import { UserDataService, Users } from '../service/data/users/user-data.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from '../comments/comments.component';


@Component({
  selector: 'app-user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.css']
})
export class UserTweetsComponent implements OnInit {

  loggedinname = ''
  currentname = ''
  tweetsToShow = ''

  tweets: Tweets[] = [];

  user: Users = {
    FirstName: '',
    LastName: '',
    Email: '',
    userName: '',
    password: '',
    ContactNumber: '',
    securityKey:''
  }

  likeDislike=''
  
  

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
  

  constructor(private route: ActivatedRoute, private service: TweetsDataService, private router: Router, private serv: UserDataService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loggedinname = this.route.snapshot.params['userName']
    this.currentname = this.route.snapshot.params['UserName1']

    // this.serv.getUser(this.loggedinname).subscribe(data => {
    //   this.user = data
    // })

    this.service.getTweetsofUser(this.currentname).subscribe(response => {
      this.tweets = response
     
    },responseError=>{
      
      
      this.tweetsToShow = "No tweet of this user"
      
    })



   
  }

  setLikes(id:string){
    
    this.service.setLikes(this.loggedinname,id).subscribe(response =>{ 
      this.likeDislike=response.toString()
      this.ngOnInit();
  })
  }
 

  openComment(id: string) {
    const modalRef = this.modalService.open(CommentsComponent);
    modalRef.componentInstance.name = this.loggedinname;
    modalRef.componentInstance.currentname = this.currentname;
    modalRef.componentInstance.tweetid = id;
    modalRef.componentInstance.history='usertweets'
  }

  checkComments(tweetId: number) {
    this.router.navigate(['tweets', this.currentname, 'comments', tweetId])
  }


}
