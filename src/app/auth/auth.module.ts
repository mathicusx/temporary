import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';
import { AuthPage } from './auth.page';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AuthPage],
  imports: [CommonModule, RouterModule, IonicModule],
})
export class AuthModule {}
