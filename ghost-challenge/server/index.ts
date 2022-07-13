import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";

type CommentType = {
  author: string,
  text: string,
  image: string,
  upvotes: number,
}

const COMMENTS: (CommentType & { id: number, timestamp: number })[] = []

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  // send all comments to the new user
  socket.emit('comments', COMMENTS);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('comment', (msg: Omit<CommentType, "upvotes">) => {
    COMMENTS.push({
      ...msg,
      id: COMMENTS.length,
      timestamp: Date.now(),
      upvotes: 0,
    });
    io.emit("comment", COMMENTS[COMMENTS.length - 1]);
  });
  socket.on('upvote', (id: number) => {
    console.log(`upvote ${id}`);
    const comment = COMMENTS.find(c => c.id === id)
    if (comment) {
      comment.upvotes += 1;
      io.emit("upvote", comment);
    }
  });
});

app.get("/comments", (req, res) => {
  res.send(COMMENTS);
})

app.post("/comments", (req, res) => {
  const { author, text, image } = req.body;
  COMMENTS.push({
    author,
    text,
    image,
    id: COMMENTS.length,
    timestamp: Date.now(),
    upvotes: 0,
  });
  io.emit("comment", COMMENTS[COMMENTS.length - 1]);
  res.send(COMMENTS[COMMENTS.length - 1]);
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
