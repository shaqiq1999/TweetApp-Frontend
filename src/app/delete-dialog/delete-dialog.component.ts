import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments, Tweets, TweetsDataService } from '../service/data/tweets-data.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  @Input() username =''
  @Input() tweetid=0
  

  constructor(private route: ActivatedRoute, private service: TweetsDataService, private router: Router) { }

  ngOnInit(): void {
   
  }

  deleteTweet(){
    this.service.deleteTweet(this.username,this.tweetid).subscribe(response => {
      this.router.navigate(['tweets', this.username, 'home']).then(() => {
        window.location.reload();
      });
    })
  }

}
