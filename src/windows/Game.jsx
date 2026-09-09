import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { ArrowLeft, Gamepad2, Sparkles } from "lucide-react/dist/esm/icons";
import useWindowStore from "#store/window";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const customGames = [
  {
    id: "snake-custom",
    name: "Snake",
    description: "Classic snake — eat and grow, don't hit the walls",
    category: "arcade",
    type: "custom",
    icon: "🐍",
  },
  {
    id: "tetris-custom",
    name: "Tetris",
    description: "Stack falling blocks, clear lines to score",
    category: "arcade",
    type: "custom",
    icon: "🟦",
  },
  {
    id: "flappy-custom",
    name: "Flappy Bird",
    description: "Tap to fly, dodge the pipes",
    category: "arcade",
    type: "custom",
    icon: "🐦",
  },
  {
    id: "breakout-custom",
    name: "Breakout",
    description: "Break all the bricks with your paddle",
    category: "arcade",
    type: "custom",
    icon: "🧱",
  },
  {
    id: "pong-custom",
    name: "Pong",
    description: "Classic paddle game vs AI",
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
    id: "memory-custom",
    name: "Memory Match",
    description: "Flip and match pairs of cards",
    category: "puzzle",
    type: "custom",
    icon: "🎴",
  },
  {
    id: "simon-custom",
    name: "Simon Says",
    description: "Remember and repeat the colour sequence",
    category: "puzzle",
    type: "custom",
    icon: "🎨",
  },
];

const games = customGames;

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
];

// ─── Canvas game implementations ──────────────────────────────────────────────
const CustomGame = ({ gameId, isFocused }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !isFocused) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    canvas.width = canvas.offsetWidth || 600;
    canvas.height = canvas.offsetHeight || 400;

    // ── Snake ──────────────────────────────────────────────────────────────────
    if (gameId === "snake-custom") {
      const gridSize = 20;
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      let snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
      let food = { x: 5, y: 5 };
      let dx = 0;
      let dy = 0;
      let score = 0;

      const placeFood = () => {
        food = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
      };

      const reset = () => {
        snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
        dx = 0; dy = 0; score = 0;
        placeFood();
      };

      const draw = () => {
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (dx !== 0 || dy !== 0) {
          const head = { x: snake[0].x + dx, y: snake[0].y + dy };
          if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            reset(); return;
          }
          if (snake.some((s) => s.x === head.x && s.y === head.y)) {
            reset(); return;
          }
          snake.unshift(head);
          if (head.x === food.x && head.y === food.y) {
            score += 10;
            placeFood();
          } else {
            snake.pop();
          }
        }

        // food
        ctx.fillStyle = "#ff4757";
        ctx.beginPath();
        ctx.arc(
          food.x * gridSize + gridSize / 2,
          food.y * gridSize + gridSize / 2,
          gridSize / 2 - 2,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // snake
        snake.forEach((seg, i) => {
          ctx.fillStyle = i === 0 ? "#2ed573" : "#7bed9f";
          ctx.fillRect(
            seg.x * gridSize + 1,
            seg.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2,
          );
        });

        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, 24);
        ctx.textAlign = "right";
        ctx.font = "12px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText("Arrow keys to move", canvas.width - 10, 24);

        animationId = setTimeout(() => requestAnimationFrame(draw), 100);
      };

      const onKey = (e) => {
        if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
        else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
        else if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
        else if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
      };

      placeFood();
      window.addEventListener("keydown", onKey);
      draw();

      return () => {
        window.removeEventListener("keydown", onKey);
        clearTimeout(animationId);
      };

    // ── Tetris ─────────────────────────────────────────────────────────────────
    } else if (gameId === "tetris-custom") {
      const COLS = 10;
      const ROWS = 20;
      const BLOCK = Math.min(
        Math.floor(canvas.height / ROWS),
        Math.floor((canvas.width * 0.65) / COLS),
      );
      const BOARD_W = BLOCK * COLS;
      const BOARD_X = Math.floor((canvas.width - BOARD_W - 80) / 2);
      const SIDEBAR_X = BOARD_X + BOARD_W + 16;

      const COLORS = [
        "#00f0f0", "#f0f000", "#a000f0",
        "#00f000", "#f00000", "#0000f0", "#f0a000",
      ];
      const SHAPES = [
        [[1, 1, 1, 1]],
        [[1, 1], [1, 1]],
        [[0, 1, 0], [1, 1, 1]],
        [[0, 1, 1], [1, 1, 0]],
        [[1, 1, 0], [0, 1, 1]],
        [[1, 0, 0], [1, 1, 1]],
        [[0, 0, 1], [1, 1, 1]],
      ];

      let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
      let cur = null;
      let score = 0;
      let level = 1;
      let lines = 0;
      let over = false;
      let dropMs = 800;
      let lastDrop = 0;

      const spawn = () => {
        const i = Math.floor(Math.random() * SHAPES.length);
        return {
          shape: SHAPES[i].map((r) => [...r]),
          color: COLORS[i],
          x: Math.floor(COLS / 2) - Math.floor(SHAPES[i][0].length / 2),
          y: 0,
        };
      };

      const valid = (p, ox = 0, oy = 0, sh = p.shape) => {
        for (let r = 0; r < sh.length; r++)
          for (let c = 0; c < sh[r].length; c++) {
            if (!sh[r][c]) continue;
            const nx = p.x + c + ox;
            const ny = p.y + r + oy;
            if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
            if (ny >= 0 && board[ny][nx]) return false;
          }
        return true;
      };

      const lock = () => {
        cur.shape.forEach((row, r) =>
          row.forEach((cell, c) => {
            if (cell) board[cur.y + r][cur.x + c] = cur.color;
          }),
        );
        let cleared = 0;
        board = board.filter((row) => {
          if (row.every((c) => c)) { cleared++; return false; }
          return true;
        });
        while (board.length < ROWS) board.unshift(Array(COLS).fill(0));
        lines += cleared;
        score += [0, 100, 300, 500, 800][cleared] * level;
        level = Math.floor(lines / 10) + 1;
        dropMs = Math.max(80, 800 - (level - 1) * 70);
        cur = spawn();
        if (!valid(cur)) over = true;
      };

      const rotate = () => {
        const rot = cur.shape[0].map((_, i) =>
          cur.shape.map((row) => row[i]).reverse(),
        );
        if (valid(cur, 0, 0, rot)) cur.shape = rot;
      };

      const draw = (now) => {
        if (!over && cur) {
          if (now - lastDrop > dropMs) {
            if (valid(cur, 0, 1)) cur.y++;
            else lock();
            lastDrop = now;
          }
        }

        ctx.fillStyle = "#0d0d1a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // board background
        ctx.fillStyle = "#12122a";
        ctx.fillRect(BOARD_X, 0, BOARD_W, canvas.height);

        // grid lines
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.lineWidth = 0.5;
        for (let r = 0; r <= ROWS; r++) {
          ctx.beginPath();
          ctx.moveTo(BOARD_X, r * BLOCK);
          ctx.lineTo(BOARD_X + BOARD_W, r * BLOCK);
          ctx.stroke();
        }
        for (let c = 0; c <= COLS; c++) {
          ctx.beginPath();
          ctx.moveTo(BOARD_X + c * BLOCK, 0);
          ctx.lineTo(BOARD_X + c * BLOCK, canvas.height);
          ctx.stroke();
        }

        // locked cells
        board.forEach((row, r) =>
          row.forEach((cell, c) => {
            if (cell) {
              ctx.fillStyle = cell;
              ctx.fillRect(BOARD_X + c * BLOCK + 1, r * BLOCK + 1, BLOCK - 2, BLOCK - 2);
              ctx.fillStyle = "rgba(255,255,255,0.12)";
              ctx.fillRect(BOARD_X + c * BLOCK + 1, r * BLOCK + 1, BLOCK - 2, 4);
            }
          }),
        );

        if (cur) {
          // ghost
          let gy = cur.y;
          while (valid(cur, 0, gy - cur.y + 1)) gy++;
          if (gy !== cur.y) {
            cur.shape.forEach((row, r) =>
              row.forEach((cell, c) => {
                if (cell)
                  ctx.fillRect(
                    BOARD_X + (cur.x + c) * BLOCK + 1,
                    (gy + r) * BLOCK + 1,
                    BLOCK - 2,
                    BLOCK - 2,
                  );
              }),
            );
          }
          // live piece
          ctx.fillStyle = cur.color;
          cur.shape.forEach((row, r) =>
            row.forEach((cell, c) => {
              if (cell) {
                ctx.fillRect(
                  BOARD_X + (cur.x + c) * BLOCK + 1,
                  (cur.y + r) * BLOCK + 1,
                  BLOCK - 2,
                  BLOCK - 2,
                );
                ctx.fillStyle = "rgba(255,255,255,0.18)";
                ctx.fillRect(
                  BOARD_X + (cur.x + c) * BLOCK + 1,
                  (cur.y + r) * BLOCK + 1,
                  BLOCK - 2,
                  4,
                );
                ctx.fillStyle = cur.color;
              }
            }),
          );
        }

        // sidebar
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        const line = (label, val, y) => {
          ctx.font = "11px Arial";
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.fillText(label, SIDEBAR_X, y);
          ctx.font = "bold 18px Arial";
          ctx.fillStyle = "#fff";
          ctx.fillText(val, SIDEBAR_X, y + 18);
        };
        line("SCORE", score, 30);
        line("LEVEL", level, 90);
        line("LINES", lines, 150);

        ctx.font = "10px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillText("←→ move", SIDEBAR_X, canvas.height - 70);
        ctx.fillText("↑ rotate", SIDEBAR_X, canvas.height - 55);
        ctx.fillText("↓ soft drop", SIDEBAR_X, canvas.height - 40);
        ctx.fillText("Space hard drop", SIDEBAR_X, canvas.height - 25);

        if (over) {
          ctx.fillStyle = "rgba(0,0,0,0.75)";
          ctx.fillRect(BOARD_X, 0, BOARD_W, canvas.height);
          ctx.fillStyle = "#ff4757";
          ctx.font = "bold 22px Arial";
          ctx.textAlign = "center";
          ctx.fillText("GAME OVER", BOARD_X + BOARD_W / 2, canvas.height / 2 - 18);
          ctx.fillStyle = "#fff";
          ctx.font = "13px Arial";
          ctx.fillText("Space to restart", BOARD_X + BOARD_W / 2, canvas.height / 2 + 10);
        }

        animationId = requestAnimationFrame(draw);
      };

      cur = spawn();

      const onKey = (e) => {
        if (over) {
          if (e.key === " ") {
            board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
            score = 0; level = 1; lines = 0; over = false; dropMs = 800;
            cur = spawn();
          }
          return;
        }
        switch (e.key) {
          case "ArrowLeft":  if (valid(cur, -1)) cur.x--; break;
          case "ArrowRight": if (valid(cur,  1)) cur.x++; break;
          case "ArrowDown":  if (valid(cur, 0, 1)) cur.y++; else lock(); break;
          case "ArrowUp":    rotate(); break;
          case " ":
            while (valid(cur, 0, 1)) cur.y++;
            lock();
            break;
        }
        e.preventDefault();
      };

      window.addEventListener("keydown", onKey);
      animationId = requestAnimationFrame(draw);

      return () => {
        window.removeEventListener("keydown", onKey);
        cancelAnimationFrame(animationId);
      };

    // ── Flappy Bird ────────────────────────────────────────────────────────────
    } else if (gameId === "flappy-custom") {
      const GRAVITY = 0.45;
      const JUMP_VEL = -8;
      const PIPE_GAP = 150;
      const PIPE_W = 52;
      const BIRD_R = 14;
      const PIPE_SPEED = 3;

      let bird = { x: 90, y: canvas.height / 2, vy: 0 };
      let pipes = [];
      let score = 0;
      let started = false;
      let over = false;
      let frame = 0;
      let birdAngle = 0;

      const addPipe = () => {
        const gapY = 90 + Math.random() * (canvas.height - 200);
        pipes.push({ x: canvas.width + 10, gapY, scored: false });
      };

      const reset = () => {
        bird = { x: 90, y: canvas.height / 2, vy: 0 };
        pipes = []; score = 0; frame = 0; over = false; started = true;
        birdAngle = 0;
      };

      const jump = () => {
        if (over) { reset(); return; }
        if (!started) started = true;
        bird.vy = JUMP_VEL;
      };

      const draw = () => {
        // sky gradient
        const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
        sky.addColorStop(0, "#87ceeb");
        sky.addColorStop(1, "#d4f1f9");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (started && !over) {
          frame++;
          bird.vy += GRAVITY;
          bird.y += bird.vy;
          birdAngle = Math.min(Math.PI / 3, Math.max(-Math.PI / 6, bird.vy * 0.06));

          if (frame % 75 === 0) addPipe();
          pipes.forEach((p) => (p.x -= PIPE_SPEED));
          pipes = pipes.filter((p) => p.x > -PIPE_W - 10);

          // score
          pipes.forEach((p) => {
            if (!p.scored && p.x + PIPE_W < bird.x) { p.scored = true; score++; }
          });

          // collision
          if (bird.y - BIRD_R < 0 || bird.y + BIRD_R > canvas.height - 28) over = true;
          pipes.forEach((p) => {
            if (bird.x + BIRD_R > p.x && bird.x - BIRD_R < p.x + PIPE_W) {
              if (bird.y - BIRD_R < p.gapY || bird.y + BIRD_R > p.gapY + PIPE_GAP) over = true;
            }
          });
        }

        // pipes
        pipes.forEach((p) => {
          const grad = ctx.createLinearGradient(p.x, 0, p.x + PIPE_W, 0);
          grad.addColorStop(0, "#5cb85c");
          grad.addColorStop(0.5, "#73d073");
          grad.addColorStop(1, "#3d9142");
          ctx.fillStyle = grad;
          ctx.fillRect(p.x, 0, PIPE_W, p.gapY);
          ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_W, canvas.height);
          // caps
          ctx.fillStyle = "#4cae4c";
          ctx.fillRect(p.x - 4, p.gapY - 18, PIPE_W + 8, 18);
          ctx.fillRect(p.x - 4, p.gapY + PIPE_GAP, PIPE_W + 8, 18);
        });

        // ground
        ctx.fillStyle = "#c8a050";
        ctx.fillRect(0, canvas.height - 28, canvas.width, 28);
        ctx.fillStyle = "#8fbc3a";
        ctx.fillRect(0, canvas.height - 28, canvas.width, 8);

        // bird
        ctx.save();
        ctx.translate(bird.x, bird.y);
        ctx.rotate(birdAngle);
        // body
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        ctx.ellipse(0, 0, BIRD_R, BIRD_R - 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#e6a800";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // wing
        ctx.fillStyle = "#ffb700";
        ctx.beginPath();
        ctx.ellipse(-4, 2, 7, 4, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        // eye
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(6, -4, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(7, -4, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // beak
        ctx.fillStyle = "#ff8c00";
        ctx.beginPath();
        ctx.moveTo(12, -1);
        ctx.lineTo(19, 1);
        ctx.lineTo(12, 3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // score
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 3;
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.strokeText(score, canvas.width / 2, 52);
        ctx.fillText(score, canvas.width / 2, 52);

        if (!started) {
          ctx.fillStyle = "rgba(0,0,0,0.35)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#fff";
          ctx.font = "bold 26px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Flappy Bird", canvas.width / 2, canvas.height / 2 - 28);
          ctx.font = "15px Arial";
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.fillText("Click or Space to fly", canvas.width / 2, canvas.height / 2 + 12);
        }

        if (over) {
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ff4757";
          ctx.font = "bold 28px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 32);
          ctx.fillStyle = "#fff";
          ctx.font = "20px Arial";
          ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 4);
          ctx.font = "14px Arial";
          ctx.fillStyle = "rgba(255,255,255,0.75)";
          ctx.fillText("Click or Space to restart", canvas.width / 2, canvas.height / 2 + 36);
        }

        animationId = requestAnimationFrame(draw);
      };

      const onKey = (e) => {
        if (e.key === " " || e.key === "ArrowUp") { e.preventDefault(); jump(); }
      };

      canvas.addEventListener("click", jump);
      window.addEventListener("keydown", onKey);
      animationId = requestAnimationFrame(draw);

      return () => {
        canvas.removeEventListener("click", jump);
        window.removeEventListener("keydown", onKey);
        cancelAnimationFrame(animationId);
      };

    // ── Pong ───────────────────────────────────────────────────────────────────
    } else if (gameId === "pong-custom") {
      const PH = 90;
      const PW = 10;
      let ly = canvas.height / 2 - PH / 2;
      let ry = canvas.height / 2 - PH / 2;
      let bx = canvas.width / 2;
      let by = canvas.height / 2;
      let bsx = 5;
      let bsy = 3;
      let ls = 0;
      let rs = 0;

      const draw = () => {
        ctx.fillStyle = "#0a0e27";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.setLineDash([6, 14]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        bx += bsx; by += bsy;
        if (by <= 0 || by >= canvas.height) bsy = -bsy;

        if (bx <= PW && by >= ly && by <= ly + PH) { bsx = Math.abs(bsx) * 1.04; }
        if (bx >= canvas.width - PW && by >= ry && by <= ry + PH) { bsx = -Math.abs(bsx) * 1.04; }

        if (bx < 0) { rs++; bx = canvas.width / 2; by = canvas.height / 2; bsx = 5; bsy = 3; }
        if (bx > canvas.width) { ls++; bx = canvas.width / 2; by = canvas.height / 2; bsx = -5; bsy = 3; }

        ry += ry + PH / 2 < by ? 4 : -4;
        ry = Math.max(0, Math.min(canvas.height - PH, ry));

        ctx.fillStyle = "#00ff88";
        ctx.fillRect(0, ly, PW, PH);
        ctx.fillStyle = "#ff0088";
        ctx.fillRect(canvas.width - PW, ry, PW, PH);

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(bx, by, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        ctx.fillText(ls, canvas.width / 4, 50);
        ctx.fillText(rs, (canvas.width * 3) / 4, 50);
        ctx.font = "11px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fillText("You", canvas.width / 4, 70);
        ctx.fillText("AI", (canvas.width * 3) / 4, 70);
        ctx.fillStyle = "#fff";

        ctx.font = "11px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.textAlign = "left";
        ctx.fillText("Move mouse to control paddle", 10, canvas.height - 10);

        animationId = requestAnimationFrame(draw);
      };

      const onMouse = (e) => {
        const rect = canvas.getBoundingClientRect();
        ly = Math.max(0, Math.min(canvas.height - PH, e.clientY - rect.top - PH / 2));
      };

      canvas.addEventListener("mousemove", onMouse);
      draw();

      return () => {
        canvas.removeEventListener("mousemove", onMouse);
        cancelAnimationFrame(animationId);
      };

    // ── Tic Tac Toe ────────────────────────────────────────────────────────────
    } else if (gameId === "tic-tac-toe-custom") {
      let board = Array(9).fill(null);
      let player = "X";
      let over = false;
      let winner = null;

      const check = () => {
        const lines = [
          [0,1,2],[3,4,5],[6,7,8],
          [0,3,6],[1,4,7],[2,5,8],
          [0,4,8],[2,4,6],
        ];
        for (const [a,b,c] of lines) {
          if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
        }
        return board.every(Boolean) ? "tie" : null;
      };

      const draw = () => {
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cell = Math.min(canvas.width, canvas.height) / 3;
        const ox = (canvas.width - cell * 3) / 2;
        const oy = (canvas.height - cell * 3) / 2;

        ctx.strokeStyle = "#2e2e5e";
        ctx.lineWidth = 4;
        for (let i = 1; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(ox + i * cell, oy);
          ctx.lineTo(ox + i * cell, oy + cell * 3);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ox, oy + i * cell);
          ctx.lineTo(ox + cell * 3, oy + i * cell);
          ctx.stroke();
        }

        ctx.lineWidth = 6;
        board.forEach((v, idx) => {
          const r = Math.floor(idx / 3);
          const c = idx % 3;
          const cx = ox + c * cell + cell / 2;
          const cy = oy + r * cell + cell / 2;
          const off = cell / 3.5;

          if (v === "X") {
            ctx.strokeStyle = "#2ed573";
            ctx.beginPath();
            ctx.moveTo(cx - off, cy - off); ctx.lineTo(cx + off, cy + off);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx + off, cy - off); ctx.lineTo(cx - off, cy + off);
            ctx.stroke();
          } else if (v === "O") {
            ctx.strokeStyle = "#ff4757";
            ctx.beginPath();
            ctx.arc(cx, cy, off, 0, Math.PI * 2);
            ctx.stroke();
          }
        });

        ctx.fillStyle = "#fff";
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        if (winner === "tie") ctx.fillText("It's a Tie! Click to restart", canvas.width / 2, canvas.height - 16);
        else if (winner) ctx.fillText(`${winner} Wins! Click to restart`, canvas.width / 2, canvas.height - 16);
        else ctx.fillText(`Player ${player}'s turn`, canvas.width / 2, canvas.height - 16);
      };

      const onClick = (e) => {
        if (over) {
          board = Array(9).fill(null); player = "X"; over = false; winner = null;
          draw(); return;
        }
        const rect = canvas.getBoundingClientRect();
        const cell = Math.min(canvas.width, canvas.height) / 3;
        const ox = (canvas.width - cell * 3) / 2;
        const oy = (canvas.height - cell * 3) / 2;
        const c = Math.floor((e.clientX - rect.left - ox) / cell);
        const r = Math.floor((e.clientY - rect.top - oy) / cell);
        if (c < 0 || c > 2 || r < 0 || r > 2) return;
        const idx = r * 3 + c;
        if (board[idx]) return;
        board[idx] = player;
        winner = check();
        if (winner) over = true;
        else player = player === "X" ? "O" : "X";
        draw();
      };

      canvas.addEventListener("click", onClick);
      draw();

      return () => canvas.removeEventListener("click", onClick);

    // ── Breakout ───────────────────────────────────────────────────────────────
    } else if (gameId === "breakout-custom") {
      const PW = 100;
      const PH = 10;
      let px = canvas.width / 2 - PW / 2;
      let bx = canvas.width / 2;
      let by = canvas.height - 50;
      let vx = 4;
      let vy = -4;
      const BR = 8;
      const cols = 8;
      const rows = 5;
      const bw = (canvas.width - 20) / cols - 6;
      const bh = 20;
      const COLORS = ["#ff4757","#ff6b81","#ffa502","#eccc68","#2ed573"];
      let bricks = [];
      let score = 0;
      let lives = 3;

      const initBricks = () => {
        bricks = [];
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++)
            bricks.push({ x: 10 + c * (bw + 6), y: 40 + r * (bh + 6), alive: true, row: r });
      };

      initBricks();

      const draw = () => {
        ctx.fillStyle = "#0a0e27";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        bx += vx; by += vy;
        if (bx <= BR || bx >= canvas.width - BR) vx = -vx;
        if (by <= BR) vy = -vy;

        if (by >= canvas.height - PH - BR && bx >= px && bx <= px + PW) {
          vy = -Math.abs(vy);
          vx += (bx - (px + PW / 2)) * 0.06;
        }

        if (by > canvas.height) {
          lives--;
          if (lives <= 0) { lives = 0; }
          bx = canvas.width / 2; by = canvas.height - 50;
          vx = 4; vy = -4;
        }

        bricks.forEach((b) => {
          if (!b.alive) return;
          if (bx > b.x && bx < b.x + bw && by > b.y && by < b.y + bh) {
            vy = -vy; b.alive = false; score += 10;
            if (bricks.every((bb) => !bb.alive)) initBricks();
          }
          ctx.fillStyle = COLORS[b.row];
          ctx.fillRect(b.x, b.y, bw, bh);
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.fillRect(b.x, b.y, bw, 4);
        });

        // paddle
        const pg = ctx.createLinearGradient(px, 0, px + PW, 0);
        pg.addColorStop(0, "#a29bfe");
        pg.addColorStop(1, "#6c5ce7");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.roundRect(px, canvas.height - PH - 10, PW, PH, 4);
        ctx.fill();

        // ball
        const bg = ctx.createRadialGradient(bx - 2, by - 2, 1, bx, by, BR);
        bg.addColorStop(0, "#fff");
        bg.addColorStop(1, "#a29bfe");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(bx, by, BR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, 22);
        ctx.textAlign = "right";
        ctx.fillText(`Lives: ${"❤️".repeat(Math.max(0, lives))}`, canvas.width - 10, 22);

        if (lives <= 0) {
          ctx.fillStyle = "rgba(0,0,0,0.65)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ff4757";
          ctx.font = "bold 24px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20);
          ctx.fillStyle = "#fff";
          ctx.font = "14px Arial";
          ctx.fillText(`Score: ${score}  — Move mouse to restart`, canvas.width / 2, canvas.height / 2 + 16);
        }

        animationId = requestAnimationFrame(draw);
      };

      const onMouse = (e) => {
        const rect = canvas.getBoundingClientRect();
        px = Math.max(0, Math.min(canvas.width - PW, e.clientX - rect.left - PW / 2));
        if (lives <= 0) { lives = 3; score = 0; initBricks(); bx = canvas.width / 2; by = canvas.height - 50; vx = 4; vy = -4; }
      };

      canvas.addEventListener("mousemove", onMouse);
      draw();

      return () => {
        canvas.removeEventListener("mousemove", onMouse);
        cancelAnimationFrame(animationId);
      };

    // ── Memory Match ───────────────────────────────────────────────────────────
    } else if (gameId === "memory-custom") {
      const emojis = ["🎮", "🎯", "🎲", "🎪", "🎨", "🎭", "🎬", "🎤"];
      let cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
      let flipped = [];
      let matched = [];
      let moves = 0;
      let locked = false;

      const COLS = 4;
      const PAD = 10;
      const cw = (canvas.width - PAD * (COLS + 1)) / COLS;
      const ch = (canvas.height - PAD * 5 - 30) / 4;

      const draw = () => {
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cards.forEach((emoji, i) => {
          const c = i % COLS;
          const r = Math.floor(i / COLS);
          const x = PAD + c * (cw + PAD);
          const y = 30 + PAD + r * (ch + PAD);
          const isFlipped = flipped.includes(i) || matched.includes(i);

          if (matched.includes(i)) {
            ctx.fillStyle = "#2ed57322";
            ctx.strokeStyle = "#2ed573";
          } else if (flipped.includes(i)) {
            ctx.fillStyle = "#1e3a5f";
            ctx.strokeStyle = "#74b9ff";
          } else {
            ctx.fillStyle = "#16213e";
            ctx.strokeStyle = "#2e2e5e";
          }
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x, y, cw, ch, 8);
          ctx.fill();
          ctx.stroke();

          if (isFlipped) {
            ctx.font = `${Math.min(cw, ch) * 0.5}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(emoji, x + cw / 2, y + ch / 2);
            ctx.textBaseline = "alphabetic";
          }
        });

        ctx.fillStyle = "#fff";
        ctx.font = "13px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Moves: ${moves}`, 10, 22);
        if (matched.length === 16) {
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#2ed573";
          ctx.font = "bold 28px Arial";
          ctx.textAlign = "center";
          ctx.fillText("You Win! 🎉", canvas.width / 2, canvas.height / 2 - 20);
          ctx.fillStyle = "#fff";
          ctx.font = "14px Arial";
          ctx.fillText(`${moves} moves — click to play again`, canvas.width / 2, canvas.height / 2 + 16);
        }
      };

      const onClick = (e) => {
        if (matched.length === 16) {
          cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
          flipped = []; matched = []; moves = 0; locked = false;
          draw(); return;
        }
        if (locked || flipped.length >= 2) return;
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        for (let i = 0; i < cards.length; i++) {
          const c = i % COLS;
          const r = Math.floor(i / COLS);
          const x = PAD + c * (cw + PAD);
          const y = 30 + PAD + r * (ch + PAD);
          if (mx >= x && mx <= x + cw && my >= y && my <= y + ch) {
            if (flipped.includes(i) || matched.includes(i)) return;
            flipped.push(i);
            draw();
            if (flipped.length === 2) {
              moves++;
              locked = true;
              setTimeout(() => {
                if (cards[flipped[0]] === cards[flipped[1]]) matched.push(...flipped);
                flipped = []; locked = false;
                draw();
              }, 600);
            }
            break;
          }
        }
      };

      canvas.addEventListener("click", onClick);
      draw();
      return () => canvas.removeEventListener("click", onClick);

    // ── Simon Says ─────────────────────────────────────────────────────────────
    } else if (gameId === "simon-custom") {
      const BTN_COLORS = [
        { base: "#cc0000", lit: "#ff5555", label: "red" },
        { base: "#007700", lit: "#55ff55", label: "green" },
        { base: "#000099", lit: "#5555ff", label: "blue" },
        { base: "#ccaa00", lit: "#ffee55", label: "yellow" },
      ];
      let sequence = [];
      let playerSeq = [];
      let level = 0;
      let active = -1;
      let canClick = false;
      let playing = false;

      const btnRect = (i) => {
        const size = Math.min(canvas.width, canvas.height - 40) / 2 - 12;
        const x = (i % 2) * (size + 10) + (canvas.width - 2 * size - 10) / 2;
        const y = Math.floor(i / 2) * (size + 10) + 40;
        return { x, y, size };
      };

      const draw = () => {
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        BTN_COLORS.forEach((col, i) => {
          const { x, y, size } = btnRect(i);
          ctx.fillStyle = active === i ? col.lit : col.base;
          ctx.beginPath();
          ctx.roundRect(x, y, size, size, 12);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.08)";
          ctx.beginPath();
          ctx.roundRect(x + 4, y + 4, size - 8, size / 3, 8);
          ctx.fill();
        });

        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(level === 0 ? "Simon Says" : `Level ${level}`, canvas.width / 2, 26);
        if (!playing && level === 0) {
          ctx.font = "13px Arial";
          ctx.fillStyle = "rgba(255,255,255,0.6)";
          ctx.fillText("Click any button to start", canvas.width / 2, canvas.height - 10);
        }
      };

      const flash = (i, ms = 350) =>
        new Promise((res) => {
          active = i; draw();
          setTimeout(() => { active = -1; draw(); setTimeout(res, 100); }, ms);
        });

      const playSeq = async () => {
        canClick = false;
        for (const i of sequence) {
          await new Promise((r) => setTimeout(r, 250));
          await flash(i);
        }
        canClick = true;
      };

      const next = () => {
        level++;
        playerSeq = [];
        sequence.push(Math.floor(Math.random() * 4));
        playSeq();
      };

      const onClick = async (e) => {
        if (!playing) { playing = true; next(); return; }
        if (!canClick) return;
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        for (let i = 0; i < 4; i++) {
          const { x, y, size } = btnRect(i);
          if (mx >= x && mx <= x + size && my >= y && my <= y + size) {
            await flash(i, 200);
            playerSeq.push(i);
            const pos = playerSeq.length - 1;
            if (playerSeq[pos] !== sequence[pos]) {
              setTimeout(() => {
                alert(`Wrong! You reached level ${level}. Click OK to restart.`);
                sequence = []; playerSeq = []; level = 0; playing = false;
                draw();
              }, 300);
              return;
            }
            if (playerSeq.length === sequence.length) setTimeout(next, 800);
            break;
          }
        }
      };

      canvas.addEventListener("click", onClick);
      draw();
      return () => canvas.removeEventListener("click", onClick);
    }
  }, [gameId, isFocused]);

  return (
    <div className="relative flex-1 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ pointerEvents: isFocused ? "auto" : "none" }}
      />
    </div>
  );
};

// ─── Main Game window ──────────────────────────────────────────────────────────
const Game = () => {
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const windows = useWindowStore((state) => state.windows);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const isOpen = windows["game"]?.isOpen;

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

  // Reset selected game when window closes
  useEffect(() => {
    if (!isOpen) setSelectedGame(null);
  }, [isOpen]);

  return (
    <>
      <div id="window-header" className="window-drag-handle">
        <WindowControls target="game" />
        <h2>{selectedGame ? selectedGame.name : "Games"}</h2>
        <div className="flex gap-2 items-center">
          {selectedGame && (
            <button
              onClick={() => setSelectedGame(null)}
              className="p-1 rounded transition-colors hover:bg-gray-200 hover:cursor-default icon"
              title="Back to Games"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {!selectedGame ? (
        <div className="flex overflow-hidden h-full bg-white">
          {!isFocused && (
            <button
              type="button"
              aria-label="Activate Games"
              onClick={(e) => { e.stopPropagation(); focusWindow("game"); }}
              className="absolute inset-0 z-10 bg-transparent cursor-pointer"
            />
          )}
          {/* Sidebar */}
          <div className="flex flex-col p-4 space-y-3 w-44 bg-gray-50 border-r border-gray-200 shrink-0 overflow-y-auto">
            <h3 className="flex gap-1.5 items-center text-xs font-medium tracking-wide text-gray-400 uppercase">
              <Gamepad2 className="w-3 h-3" /> Categories
            </h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat.id); if (!isFocused) focusWindow("game"); }}
                  className={clsx(
                    "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors text-sm",
                    selectedCategory === cat.id
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-200",
                  )}
                >
                  <span>{cat.name}</span>
                  <span className={clsx(
                    "text-xs px-1.5 py-0.5 rounded-full",
                    selectedCategory === cat.id ? "bg-blue-200 text-blue-700" : "bg-gray-200 text-gray-600",
                  )}>
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Game grid */}
          <div className="overflow-y-auto flex-1">
            <div className="p-5">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {categories.find((c) => c.id === selectedCategory)?.name || "All Games"}
                </h2>
                <p className="text-xs text-gray-500">
                  {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} • all built-in, no internet needed
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => { if (isFocused) setSelectedGame(game); }}
                    className="flex flex-col gap-3 p-4 text-left bg-white rounded-xl border border-gray-200 transition-all duration-200 cursor-pointer hover:border-blue-300 hover:shadow-md active:scale-95 group hover:scale-[1.02]"
                  >
                    <div className="flex justify-center items-center h-20 text-5xl bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                      {game.icon}
                    </div>
                    <div>
                      <div className="flex gap-1.5 items-center">
                        <h3 className="text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                          {game.name}
                        </h3>
                        <Sparkles className="w-3 h-3 text-yellow-500 shrink-0" />
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                        {game.description}
                      </p>
                      <span className="inline-block mt-2 py-0.5 px-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full capitalize">
                        {game.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CustomGame gameId={selectedGame.id} isFocused={isFocused} />
      )}
    </>
  );
};

export default WindowWrapper(Game, "game", "Games");
