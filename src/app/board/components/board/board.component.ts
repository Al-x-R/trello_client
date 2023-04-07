import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../../shared/services/boards.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit{
  boardId: string;

  constructor(private boardsService: BoardsService, private route: ActivatedRoute) {
    const boardId = this.route.snapshot.paramMap.get('boardId');

    if (!boardId) {
      throw new Error('Can`t get boardId from url');
    }

    this.boardId = boardId;
  }

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(): void {
    this.boardsService.getBoardId(this.boardId).subscribe(board => {
      console.log('board', board);
    });
  }
}
