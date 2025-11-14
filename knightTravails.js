function knightMoves(start, end) {
  // Directions a knight can move
  const moves = [
    [2, 1], [2, -1],
    [-2, 1], [-2, -1],
    [1, 2], [1, -2],
    [-1, 2], [-1, -2]
  ];

  // Check if a position is inside the board
  function isValid([x, y]) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  // BFS queue: each item has {pos, path}
  let queue = [{ pos: start, path: [start] }];
  let visited = new Set([start.toString()]);

  while (queue.length > 0) {
    let { pos, path } = queue.shift();
    let [x, y] = pos;

    // Goal found
    if (x === end[0] && y === end[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach(p => console.log(p));
      return path;
    }

    // Explore all knight moves
    for (let [dx, dy] of moves) {
      let next = [x + dx, y + dy];

      if (isValid(next) && !visited.has(next.toString())) {
        visited.add(next.toString());
        queue.push({ pos: next, path: [...path, next] });
      }
    }
  }
}
console.log(knightMoves([0,0], [7,7]))