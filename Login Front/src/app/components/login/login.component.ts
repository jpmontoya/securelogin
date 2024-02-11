import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../services/auth/token/token.service';
import { LoadingService } from '../../services/loading/loading.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public form: FormGroup;
  
  constructor(private loginService: LoginService,
    private tokenService: TokenService,
    private loadingService: LoadingService,
    private router: Router){
    this.form = new FormGroup({                                           
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('', [Validators.required])
    });
  }

  async submit(){
    try {
      const token: string = await new Promise((resolve, reject) => {
        this.loginService.login(this.form.value).pipe(first()).subscribe((token: any) => {
          resolve(token.data);
        }, (error: HttpErrorResponse ) => {
          reject(error.error);
        });
      });
      if(token !== null || token !== ''){
        this.tokenService.changeToken = token;
        this.router.navigate(['/private']);
      }else{
        throw new Error('Token erroneo');
      }
    } catch (error: any) {
      console.error(error.message);
    }
    
  }

}
