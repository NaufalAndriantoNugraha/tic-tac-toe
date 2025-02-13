const scorePlayerX = document.querySelector('#score-player-x') as HTMLElement;
const scorePlayerO = document.querySelector('#score-player-o') as HTMLElement;
const scoreTie = document.querySelector('#score-tie') as HTMLElement;

const playersTurnAnnouncement = document.querySelector(
  '#players-turn-announcement',
) as HTMLElement;

const resetButton = document.querySelector('#button-reset') as HTMLElement;
const startButton = document.querySelector('#button-start') as HTMLElement;
const cells = document.querySelectorAll('.cell');

class Game {
  private board: Array<string> = new Array(9).fill('');

  private winningCondition: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  private playerXScore: number = 0;
  private playerOScore: number = 0;
  private tieScore: number = 0;

  private currentPlayer: string = 'X';

  private gameStart: boolean = false;

  public settingGameStart(newValue: boolean) {
    this.gameStart = newValue;
    playersTurnAnnouncement.textContent = `Player ${this.currentPlayer}'s turn`;
  }

  public settingScore(
    scoreX: number = 0,
    scoreO: number = 0,
    tieScore: number = 0,
  ) {
    scorePlayerX.textContent = `Player X: ${scoreX}`;
    scorePlayerO.textContent = `Player O: ${scoreO}`;
    scoreTie.textContent = `Tie: ${tieScore}`;
  }

  public initializeGame() {
    this.settingScore(this.playerXScore, this.playerOScore, this.tieScore);

    playersTurnAnnouncement.textContent = `Player ${this.currentPlayer}'s turn`;
  }

  public resetBoard() {
    cells.forEach((cell) => (cell.textContent = ''));
    this.board = new Array(9).fill('');
  }

  public resetGame() {
    this.board = new Array(9).fill('');
    this.playerXScore = 0;
    this.playerOScore = 0;
    this.tieScore = 0;
    this.settingScore(this.playerXScore, this.playerOScore, this.tieScore);

    this.currentPlayer = 'X';
    playersTurnAnnouncement.textContent = `Player ${this.currentPlayer}'s turn`;

    this.resetBoard();
  }

  public markCell(cell: Element) {
    if (this.gameStart === false) {
      alert('Please start the game first!');
      return;
    }

    if (cell.innerHTML === '' && this.gameStart === true) {
      cell.innerHTML = this.currentPlayer;

      const index = parseInt(cell.getAttribute('data-index')!);
      this.board[index] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

      this.checkForWinner();
    }
  }

  public checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < this.winningCondition.length; i++) {
      const winCondition = this.winningCondition[i];
      const first = this.board[winCondition[0]];
      const second = this.board[winCondition[1]];
      const third = this.board[winCondition[2]];

      if (first === '' || second === '' || third === '') {
        continue;
      }

      if (first === second && second === third) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      const winner = this.currentPlayer === 'X' ? 'O' : 'X';

      if (winner === 'X') {
        this.playerXScore++;
        scorePlayerX.textContent = `Player X: ${this.playerXScore}`;
      } else {
        this.playerOScore++;
        scorePlayerO.textContent = `Player O: ${this.playerOScore}`;
      }

      playersTurnAnnouncement.textContent = `Player ${winner}!`;
      this.resetBoard();
      return;
    }

    const roundTie = !this.board.includes('');
    if (roundTie) {
      this.tieScore++;
      scoreTie.textContent = `Tie: ${this.tieScore}`;
      playersTurnAnnouncement.textContent = `It's a draw!`;
      this.resetBoard();
      return;
    }
  }
}

function main() {
  const game = new Game();
  game.initializeGame();

  startButton.addEventListener('click', () => game.settingGameStart(true));
  resetButton.addEventListener('click', () => game.resetGame());

  cells.forEach((cell) => {
    cell.addEventListener('click', () => game.markCell(cell));
  });
}

main();
