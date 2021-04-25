import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {
  constructor(private service: AppServiceService, private route: Router) {}

  ngOnInit() {}
  checkEnteredCode = (verifyCodeEntered: string) => {
    interface ResponseMessage {
      message: string;
    }

    this.service.checkVerifyCode(verifyCodeEntered, (data: ResponseMessage) => {
      if (data.message === 'code-correct') {
        this.route.navigate(['/']);
      }
      if (data.message === 'code-not-correct') {
        alert('Der Code, den Sie eingegeben haben ist nicht richtig!');
      }
      if (data.message === 'timed-out-verify') {
        alert('Leider waren Sie nicht schnell genug!');
        this.route.navigate(['/']);
      }
    });
  };
}
