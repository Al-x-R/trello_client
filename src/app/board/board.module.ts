import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BoardComponent } from './components/board/board.component';
import { AuthGuardService } from '../auth/services/authGuard.service';
import { TopbarModule } from '../shared/modules/topbar/topbar.module';
import { BoardService } from './services/board.service';

const routes: Routes = [
  {
    path: 'boards/:boardId',
    component: BoardComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), TopbarModule],
  declarations: [BoardComponent],
  providers: [BoardService]
})
export class BoardModule {}
