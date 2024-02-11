import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/auth/token/token.service';
import { Observable, first } from 'rxjs';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrl: './private.component.css'
})
export class PrivateComponent{
  public $userID: Observable<number | null>;
  public $userName: Observable<string>;
  public $userEmail: Observable<string>;

  constructor(private tokenService: TokenService) {
    this.$userID = tokenService.getUserID;
    this.$userName = tokenService.getUserName;
    this.$userEmail = tokenService.getUserEmail;
  }
}
