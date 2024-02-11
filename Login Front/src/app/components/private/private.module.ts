import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { ProtectXssPipe } from '../../pipes/protect-xss.pipe';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent
  }
]

@NgModule({
  declarations: [
    PrivateComponent,
    ProtectXssPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PrivateModule { }
