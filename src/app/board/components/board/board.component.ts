import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../../shared/services/boards.service';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { filter, Observable } from 'rxjs';
import { BoardInterface } from '../../../shared/types/board.interface';
import { SocketService } from '../../../shared/services/socket.service';
import { SocketEventsEnum } from '../../../shared/types/socketEvents.enum';

@Component({
  selector: 'board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  boardId: string;
  board$: Observable<BoardInterface>;

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private socketService: SocketService
  ) {
    const boardId = this.route.snapshot.paramMap.get('boardId');

    if (!boardId) {
      throw new Error('Can`t get boardId from url');
    }

    this.boardId = boardId;
    this.board$ = this.boardService.board$.pipe(filter(Boolean));
  }

  ngOnInit(): void {
    this.socketService.emit(SocketEventsEnum.boardsJoin, {boardId: this.boardId})
    this.fetchData();
  }

  fetchData(): void {
    this.boardsService.getBoardId(this.boardId).subscribe(board => {
      this.boardService.setBoard(board);
    });
  }
}
