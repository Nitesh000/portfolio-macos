import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  ExternalLink,
  ArrowLeft,
  Gamepad2,
  Sparkles,
} from "lucide-react/dist/esm/icons";
import useWindowStore from "#store/window";
import useAudioStore from "#store/audio";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Custom built games (guaranteed to work)
const customGames = [
  {
    id: "snake-custom",
    name: "Snake",
    description: "Classic snake game",
    category: "arcade",
    type: "custom",
    icon: "🐍",
  },
  {
    id: "memory-custom",
    name: "Memory Match",
    description: "Match pairs of cards",
    category: "puzzle",
    type: "custom",
    icon: "🎴",
  },
  {
    id: "pong-custom",
    name: "Pong",
    description: "Classic paddle game",
    category: "arcade",
    type: "custom",
    icon: "🏓",
  },
  {
    id: "tic-tac-toe-custom",
    name: "Tic Tac Toe",
    description: "Classic X's and O's",
    category: "strategy",
    type: "custom",
    icon: "⭕",
  },
  {
    id: "breakout-custom",
    name: "Breakout",
    description: "Break all the bricks",
    category: "arcade",
    type: "custom",
    icon: "🧱",
  },
  {
    id: "simon-custom",
    name: "Simon Says",
    description: "Memory sequence game",
    category: "puzzle",
    type: "custom",
    icon: "🎨",
  },
];

// Reliable embeddable games (tested and working)
const embedGames = [
  {
    id: "2048",
    name: "2048",
    url: "https://play2048.co/",
    description: "Combine numbers to reach 2048",
    category: "puzzle",
    type: "embed",
    icon: "🔢",
  },
  {
    id: "cookie-clicker",
    name: "Cookie Clicker",
    url: "https://orteil.dashnet.org/cookieclicker/",
    description: "Click cookies to build empire",
    category: "idle",
    type: "embed",
    icon: "🍪",
  },
  {
    id: "dino",
    name: "Chrome Dino",
    url: "https://chromedino.com/",
    description: "Jump over cacti",
    category: "arcade",
    type: "embed",
    icon: "🦕",
  },
];

const games = [...customGames, ...embedGames];

const categories = [
  { id: "all", name: "All Games", count: games.length },
  {
    id: "arcade",
    name: "Arcade",
    count: games.filter((g) => g.category === "arcade").length,
  },
  {
    id: "strategy",
    name: "Strategy",
    count: games.filter((g) => g.category === "strategy").length,
  },
  {
    id: "puzzle",
    name: "Puzzle",
    count: games.filter((g) => g.category === "puzzle").length,
  },
  {
    id: "idle",
    name: "Idle",
    count: games.filter((g) => g.category === "idle").length,
  },
];

// Custom Game Component
const CustomGame = ({ gameId, isFocused }) => {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({});

  useEffect(() => {
    if (!canvasRef.current || !isFocused) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Game implementations
    if (gameId === "snake-custom") {
      // Snake Game
      const gridSize = 20;
      const tileCount = canvas.width / gridSize;
      let snake = [{ x: 10, y: 10 }];
      let food = { x: 15, y: 15 };
      let dx = 0;
      let dy = 0;
      let score = 0;

      const drawGame = () => {
        // Clear canvas
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Move snake
        if (dx !== 0 || dy !== 0) {
          const head = { x: snake[0].x + dx, y: snake[0].y + dy };

          // Check wall collision
          if (
            head.x < 0 ||
            head.x >= tileCount ||
            head.y < 0 ||
            head.y >= canvas.height / gridSize
          ) {
            resetGame();
            return;
          }

          // Check self collision
          if (
            snake.some(
              (segment) => segment.x === head.x && segment.y === head.y,
            )
          ) {
            resetGame();
            return;
          }

          snake.unshift(head);

          // Check food collision
          if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = {
              x: Math.floor(Math.random() * tileCount),
              y: Math.floor(Math.random() * (canvas.height / gridSize)),
            };
          } else {
            snake.pop();
          }
        }

        // Draw snake
        ctx.fillStyle = "#00ff41";
        snake.forEach((segment, index) => {
          ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize - 2,
            gridSize - 2,
          );
          if (index === 0) {
            ctx.fillStyle = "#00cc33";
            ctx.fillRect(
              segment.x * gridSize,
              segment.y * gridSize,
              gridSize - 2,
              gridSize - 2,
            );
            ctx.fillStyle = "#00ff41";
          }
        });

        // Draw food
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(
          food.x * gridSize,
          food.y * gridSize,
          gridSize - 2,
          gridSize - 2,
        );

        // Draw score
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 10, 30);
        ctx.fillText("Use Arrow Keys", canvas.width - 150, 30);
      };

      const resetGame = () => {
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
        score = 0;
      };

      const handleKeyPress = (e) => {
        if (e.key === "ArrowUp" && dy === 0) {
          dx = 0;
          dy = -1;
        } else if (e.key === "ArrowDown" && dy === 0) {
          dx = 0;
          dy = 1;
        } else if (e.key === "ArrowLeft" && dx === 0) {
          dx = -1;
          dy = 0;
        } else if (e.key === "ArrowRight" && dx === 0) {
          dx = 1;
          dy = 0;
        }
      };

      window.addEventListener("keydown", handleKeyPress);

      const gameLoop = () => {
        drawGame();
        animationId = setTimeout(() => requestAnimationFrame(gameLoop), 100);
      };

      gameLoop();

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
        clearTimeout(animationId);
        cancelAnimationFrame(animationId);
      };
    } else if (gameId === "pong-custom") {
      // Pong Game
      const paddleHeight = 100;
      const paddleWidth = 10;
      let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
      let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
      let ballX = canvas.width / 2;
      let ballY = canvas.height / 2;
      let ballSpeedX = 5;
      let ballSpeedY = 3;
      const ballSize = 10;
      let leftScore = 0;
      let rightScore = 0;

      const drawGame = () => {
        // Clear canvas
        ctx.fillStyle = "#0a0e27";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw center line
        ctx.strokeStyle = "#ffffff33";
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Move ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with top/bottom
        if (ballY <= 0 || ballY >= canvas.height) {
          ballSpeedY = -ballSpeedY;
        }

        // Ball collision with paddles
        if (
          ballX <= paddleWidth &&
          ballY >= leftPaddleY &&
          ballY <= leftPaddleY + paddleHeight
        ) {
          ballSpeedX = -ballSpeedX;
          ballSpeedX *= 1.05;
        }
        if (
          ballX >= canvas.width - paddleWidth &&
          ballY >= rightPaddleY &&
          ballY <= rightPaddleY + paddleHeight
        ) {
          ballSpeedX = -ballSpeedX;
          ballSpeedX *= 1.05;
        }

        // Score
        if (ballX < 0) {
          rightScore++;
          ballX = canvas.width / 2;
          ballY = canvas.height / 2;
          ballSpeedX = 5;
          ballSpeedY = 3;
        }
        if (ballX > canvas.width) {
          leftScore++;
          ballX = canvas.width / 2;
          ballY = canvas.height / 2;
          ballSpeedX = -5;
          ballSpeedY = 3;
        }

        // AI for right paddle
        if (rightPaddleY + paddleHeight / 2 < ballY) {
          rightPaddleY += 4;
        } else {
          rightPaddleY -= 4;
        }

        // Draw paddles
        ctx.fillStyle = "#00ff88";
        ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#ff0088";
        ctx.fillRect(
          canvas.width - paddleWidth,
          rightPaddleY,
          paddleWidth,
          paddleHeight,
        );

        // Draw ball
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(ballX, ballY, ballSize, ballSize);

        // Draw scores
        ctx.font = "32px Arial";
        ctx.fillText(leftScore, canvas.width / 4, 50);
        ctx.fillText(rightScore, (canvas.width * 3) / 4, 50);

        animationId = requestAnimationFrame(drawGame);
      };

      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        leftPaddleY = e.clientY - rect.top - paddleHeight / 2;
        leftPaddleY = Math.max(
          0,
          Math.min(canvas.height - paddleHeight, leftPaddleY),
        );
      };

      canvas.addEventListener("mousemove", handleMouseMove);
      drawGame();

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationId);
      };
    } else if (gameId === "tic-tac-toe-custom") {
      // Tic Tac Toe
      let board = Array(9).fill(null);
      let currentPlayer = "X";
      let gameOver = false;
      let winner = null;

      const checkWinner = () => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], // rows
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8], // columns
          [0, 4, 8],
          [2, 4, 6], // diagonals
        ];

        for (let line of lines) {
          const [a, b, c] = line;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
          }
        }

        if (board.every((cell) => cell !== null)) {
          return "tie";
        }

        return null;
      };

      const drawGame = () => {
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cellSize = Math.min(canvas.width, canvas.height) / 3;

        // Draw grid
        ctx.strokeStyle = "#16213e";
        ctx.lineWidth = 4;
        for (let i = 1; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(i * cellSize, 0);
          ctx.lineTo(i * cellSize, canvas.height);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, i * cellSize);
          ctx.lineTo(canvas.width, i * cellSize);
          ctx.stroke();
        }

        // Draw X's and O's
        ctx.lineWidth = 8;
        board.forEach((cell, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const x = col * cellSize + cellSize / 2;
          const y = row * cellSize + cellSize / 2;

          if (cell === "X") {
            ctx.strokeStyle = "#00ff88";
            const offset = cellSize / 4;
            ctx.beginPath();
            ctx.moveTo(x - offset, y - offset);
            ctx.lineTo(x + offset, y + offset);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + offset, y - offset);
            ctx.lineTo(x - offset, y + offset);
            ctx.stroke();
          } else if (cell === "O") {
            ctx.strokeStyle = "#ff0088";
            ctx.beginPath();
            ctx.arc(x, y, cellSize / 4, 0, Math.PI * 2);
            ctx.stroke();
          }
        });

        // Draw status
        ctx.fillStyle = "#ffffff";
        ctx.font = "24px Arial";
        if (winner) {
          if (winner === "tie") {
            ctx.fillText(
              "It's a Tie! Click to restart",
              10,
              canvas.height - 20,
            );
          } else {
            ctx.fillText(
              `${winner} Wins! Click to restart`,
              10,
              canvas.height - 20,
            );
          }
        } else {
          ctx.fillText(
            `Current Player: ${currentPlayer}`,
            10,
            canvas.height - 20,
          );
        }
      };

      const handleClick = (e) => {
        if (gameOver) {
          board = Array(9).fill(null);
          currentPlayer = "X";
          gameOver = false;
          winner = null;
          drawGame();
          return;
        }

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cellSize = Math.min(canvas.width, canvas.height) / 3;
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);
        const index = row * 3 + col;

        if (board[index] === null) {
          board[index] = currentPlayer;
          winner = checkWinner();
          if (winner) {
            gameOver = true;
          } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
          }
          drawGame();
        }
      };

      canvas.addEventListener("click", handleClick);
      drawGame();

      return () => {
        canvas.removeEventListener("click", handleClick);
      };
    } else if (gameId === "breakout-custom") {
      // Breakout Game
      const paddleWidth = 100;
      const paddleHeight = 10;
      let paddleX = canvas.width / 2 - paddleWidth / 2;
      let ballX = canvas.width / 2;
      let ballY = canvas.height - 30;
      let ballSpeedX = 4;
      let ballSpeedY = -4;
      const ballSize = 8;
      const brickRowCount = 5;
      const brickColumnCount = 8;
      const brickWidth = canvas.width / brickColumnCount - 10;
      const brickHeight = 20;
      let bricks = [];
      let score = 0;

      // Initialize bricks
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
      }

      const drawGame = () => {
        ctx.fillStyle = "#0a0e27";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Move ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with walls
        if (ballX <= 0 || ballX >= canvas.width) ballSpeedX = -ballSpeedX;
        if (ballY <= 0) ballSpeedY = -ballSpeedY;

        // Ball collision with paddle
        if (
          ballY >= canvas.height - paddleHeight - ballSize &&
          ballX >= paddleX &&
          ballX <= paddleX + paddleWidth
        ) {
          ballSpeedY = -ballSpeedY;
        }

        // Game over
        if (ballY > canvas.height) {
          ballX = canvas.width / 2;
          ballY = canvas.height - 30;
          ballSpeedX = 4;
          ballSpeedY = -4;
          score = 0;
          // Reset bricks
          for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
              bricks[c][r].status = 1;
            }
          }
        }

        // Brick collision
        for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
              if (
                ballX > b.x &&
                ballX < b.x + brickWidth &&
                ballY > b.y &&
                ballY < b.y + brickHeight
              ) {
                ballSpeedY = -ballSpeedY;
                b.status = 0;
                score += 10;
              }
            }
          }
        }

        // Draw bricks
        const colors = ["#ff0088", "#00ff88", "#0088ff", "#ffff00", "#ff8800"];
        for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
              const brickX = c * (brickWidth + 10) + 5;
              const brickY = r * (brickHeight + 5) + 30;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.fillStyle = colors[r % colors.length];
              ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            }
          }
        }

        // Draw paddle
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          paddleX,
          canvas.height - paddleHeight,
          paddleWidth,
          paddleHeight,
        );

        // Draw ball
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw score
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 10, 20);

        animationId = requestAnimationFrame(drawGame);
      };

      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        paddleX = e.clientX - rect.left - paddleWidth / 2;
        paddleX = Math.max(0, Math.min(canvas.width - paddleWidth, paddleX));
      };

      canvas.addEventListener("mousemove", handleMouseMove);
      drawGame();

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationId);
      };
    } else if (gameId === "memory-custom") {
      // Memory Match Game
      const emojis = ["🎮", "🎯", "🎲", "🎪", "🎨", "🎭", "🎬", "🎤"];
      let cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
      let flipped = [];
      let matched = [];
      let moves = 0;

      const drawGame = () => {
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cols = 4;
        const rows = 4;
        const cardWidth = canvas.width / cols - 10;
        const cardHeight = canvas.height / rows - 10;

        cards.forEach((emoji, index) => {
          const col = index % cols;
          const row = Math.floor(index / cols);
          const x = col * (cardWidth + 10) + 5;
          const y = row * (cardHeight + 10) + 5;

          if (matched.includes(index)) {
            ctx.fillStyle = "#00ff8844";
          } else if (flipped.includes(index)) {
            ctx.fillStyle = "#0088ff";
          } else {
            ctx.fillStyle = "#16213e";
          }

          ctx.fillRect(x, y, cardWidth, cardHeight);

          if (flipped.includes(index) || matched.includes(index)) {
            ctx.font = `${cardWidth / 2}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(emoji, x + cardWidth / 2, y + cardHeight / 2);
          }
        });

        // Draw moves
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Moves: ${moves}`, 10, canvas.height - 10);

        if (matched.length === cards.length) {
          ctx.font = "32px Arial";
          ctx.textAlign = "center";
          ctx.fillText("You Win!", canvas.width / 2, canvas.height / 2);
        }
      };

      const handleClick = (e) => {
        if (flipped.length >= 2) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cols = 4;
        const cardWidth = canvas.width / cols - 10;
        const cardHeight = canvas.height / 4 - 10;
        const col = Math.floor(x / (cardWidth + 10));
        const row = Math.floor(y / (cardHeight + 10));
        const index = row * cols + col;

        if (!flipped.includes(index) && !matched.includes(index)) {
          flipped.push(index);
          drawGame();

          if (flipped.length === 2) {
            moves++;
            setTimeout(() => {
              if (cards[flipped[0]] === cards[flipped[1]]) {
                matched.push(...flipped);
              }
              flipped = [];
              drawGame();
            }, 500);
          }
        }
      };

      canvas.addEventListener("click", handleClick);
      drawGame();

      return () => {
        canvas.removeEventListener("click", handleClick);
      };
    } else if (gameId === "simon-custom") {
      // Simon Says Game
      const colors = [
        { name: "red", x: 0, y: 0, color: "#ff0000", light: "#ff6666" },
        { name: "blue", x: 1, y: 0, color: "#0000ff", light: "#6666ff" },
        { name: "green", x: 0, y: 1, color: "#00ff00", light: "#66ff66" },
        { name: "yellow", x: 1, y: 1, color: "#ffff00", light: "#ffff66" },
      ];
      let sequence = [];
      let playerSequence = [];
      let level = 0;
      let isPlaying = false;
      let canClick = false;

      const drawGame = () => {
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const size = Math.min(canvas.width, canvas.height) / 2 - 10;

        colors.forEach((colorObj, index) => {
          const x = colorObj.x * (size + 10) + 5;
          const y = colorObj.y * (size + 10) + 50;

          ctx.fillStyle = colorObj.color;
          ctx.fillRect(x, y, size, size);
        });

        // Draw level
        ctx.fillStyle = "#ffffff";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`Level: ${level}`, canvas.width / 2, 30);

        if (!isPlaying && level === 0) {
          ctx.fillText("Click to Start", canvas.width / 2, canvas.height - 10);
        }
      };

      const flashColor = (index, duration = 300) => {
        return new Promise((resolve) => {
          const colorObj = colors[index];
          const x =
            colorObj.x * (Math.min(canvas.width, canvas.height) / 2 - 10 + 10) +
            5;
          const y =
            colorObj.y * (Math.min(canvas.width, canvas.height) / 2 - 10 + 10) +
            50;
          const size = Math.min(canvas.width, canvas.height) / 2 - 10;

          ctx.fillStyle = colorObj.light;
          ctx.fillRect(x, y, size, size);

          setTimeout(() => {
            drawGame();
            resolve();
          }, duration);
        });
      };

      const playSequence = async () => {
        canClick = false;
        for (let i = 0; i < sequence.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 400));
          await flashColor(sequence[i]);
        }
        canClick = true;
      };

      const nextLevel = () => {
        level++;
        playerSequence = [];
        sequence.push(Math.floor(Math.random() * 4));
        playSequence();
      };

      const handleClick = (e) => {
        if (!canClick && isPlaying) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const size = Math.min(canvas.width, canvas.height) / 2 - 10;

        if (!isPlaying) {
          isPlaying = true;
          nextLevel();
          return;
        }

        // Determine which color was clicked
        const col = Math.floor(x / (size + 10));
        const row = Math.floor((y - 50) / (size + 10));

        if (row < 0 || row > 1 || col < 0 || col > 1) return;

        const clickedIndex = row * 2 + col;
        playerSequence.push(clickedIndex);
        flashColor(clickedIndex, 200);

        if (
          playerSequence[playerSequence.length - 1] !==
          sequence[playerSequence.length - 1]
        ) {
          // Wrong answer
          setTimeout(() => {
            alert(`Game Over! You reached level ${level}`);
            sequence = [];
            playerSequence = [];
            level = 0;
            isPlaying = false;
            drawGame();
          }, 500);
        } else if (playerSequence.length === sequence.length) {
          // Correct sequence
          setTimeout(() => {
            nextLevel();
          }, 1000);
        }
      };

      canvas.addEventListener("click", handleClick);
      drawGame();

      return () => {
        canvas.removeEventListener("click", handleClick);
      };
    }
  }, [gameId, isFocused]);

  return (
    <div className="overflow-hidden relative flex-1 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ pointerEvents: isFocused ? "auto" : "none" }}
      />
    </div>
  );
};

const Game = () => {
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const windows = useWindowStore((state) => state.windows);
  const pause = useAudioStore((state) => state.pause);
  const iframeRef = useRef(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const isOpen = windows["game"]?.isOpen;
  const isMaximized = windows["game"]?.isMaximized;

  const filteredGames =
    selectedCategory === "all"
      ? games
      : games.filter((g) => g.category === selectedCategory);

  const isFocused = (() => {
    const openWindows = Object.values(windows).filter((w) => w.isOpen);
    const maxZ = openWindows.reduce((m, w) => Math.max(m, w.zIndex), 0);
    const self = windows["game"];
    return !!self?.isOpen && self?.zIndex === maxZ;
  })();

  useEffect(() => {
    const handler = (e) => {
      if (e?.data === "focus-game" || e?.data?.type === "focus-game") {
        focusWindow("game");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [focusWindow]);

  useEffect(() => {
    if (!isOpen && iframeRef.current) {
      pause();
      const timeoutId = setTimeout(() => {
        if (iframeRef.current && !isOpen) {
          const src = iframeRef.current.src;
          iframeRef.current.src = "about:blank";
          iframeRef.current.dataset.originalSrc = src;
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    } else if (isOpen && iframeRef.current?.dataset.originalSrc) {
      const src = iframeRef.current.dataset.originalSrc;
      iframeRef.current.src = src;
      delete iframeRef.current.dataset.originalSrc;
    }
  }, [isOpen, pause]);

  const handleBackClick = () => {
    setSelectedGame(null);
  };

  return (
    <>
      <div id="window-header" className="window-drag-handle">
        <WindowControls target="game" />
        <h2>{selectedGame ? selectedGame.name : "Games"}</h2>
        <div className="flex gap-2 items-center">
          {selectedGame && (
            <button
              onClick={handleBackClick}
              className="p-1 rounded transition-colors hover:bg-gray-200 hover:cursor-default icon"
              title="Back to Games"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          {selectedGame && selectedGame.type === "embed" && (
            <a
              href={selectedGame.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Open ${selectedGame.name} in New Tab`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="mr-3 icon" />
            </a>
          )}
        </div>
      </div>
      {!selectedGame ? (
        <div className="flex overflow-hidden h-full bg-white">
          {!isFocused && (
            <button
              type="button"
              aria-label="Activate Games"
              onClick={(e) => {
                e.stopPropagation();
                focusWindow("game");
              }}
              className="absolute inset-0 z-10 bg-transparent cursor-pointer"
            />
          )}
          <div className="flex flex-col p-5 space-y-3 w-48 bg-gray-50 border-r border-gray-200 sidebar shrink-0">
            <div>
              <h3 className="flex gap-2 items-center mb-2 text-xs font-medium tracking-wide text-gray-400 uppercase">
                <Gamepad2 className="w-3 h-3" /> Categories
              </h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(category.id);
                      if (!isFocused) focusWindow("game");
                    }}
                    className={clsx(
                      "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors text-sm",
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-200",
                    )}
                  >
                    <span>{category.name}</span>
                    <span
                      className={clsx(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        selectedCategory === category.id
                          ? "bg-blue-200 text-blue-700"
                          : "bg-gray-200 text-gray-600",
                      )}
                    >
                      {category.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {categories.find((c) => c.id === selectedCategory)?.name ||
                    "All Games"}
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredGames.length} game
                  {filteredGames.length !== 1 ? "s" : ""} available
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      if (isFocused) {
                        setSelectedGame(game);
                      }
                    }}
                    className="flex flex-col gap-3 p-4 text-left bg-white rounded-lg border border-gray-200 transition-all duration-200 cursor-pointer hover:border-blue-300 hover:shadow-lg active:scale-95 group hover:scale-[1.02]"
                  >
                    <div className="flex justify-center items-center h-24 text-6xl bg-gradient-to-br from-gray-100 to-gray-200 rounded-md">
                      {game.icon}
                    </div>
                    <div>
                      <div className="flex gap-2 items-center">
                        <h3 className="text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                          {game.name}
                        </h3>
                        {game.type === "custom" && (
                          <Sparkles className="w-3 h-3 text-yellow-500" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                        {game.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="inline-block py-1 px-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                          {game.category}
                        </span>
                        {game.type === "custom" && (
                          <span className="inline-block py-1 px-2 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                            Built-in
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : selectedGame.type === "custom" ? (
        <CustomGame gameId={selectedGame.id} isFocused={isFocused} />
      ) : (
        <div
          className={`relative flex-1 w-full overflow-hidden bg-white ${isMaximized ? "h-full" : "h-152"}`}
        >
          {!isFocused && (
            <button
              type="button"
              aria-label="Activate Game"
              onClick={(e) => {
                e.stopPropagation();
                focusWindow("game");
              }}
              className="absolute inset-0 z-10 bg-transparent cursor-pointer"
            />
          )}
          <iframe
            ref={iframeRef}
            src={selectedGame.url}
            className="block w-full h-full border-none"
            style={{ pointerEvents: isFocused ? "auto" : "none" }}
            title={selectedGame.name}
            allow="accelerometer; gyroscope; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
      )}
    </>
  );
};

export default WindowWrapper(Game, "game", "Games");
