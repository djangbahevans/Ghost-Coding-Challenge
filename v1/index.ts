import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";

type CommentType = {
  author: string,
  text: string,
  image: string,
}

const COMMENTS: (CommentType & { id: number, timestamp: number })[] = []

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('comment', (msg: CommentType) => {
    COMMENTS.push({
      ...msg,
      id: COMMENTS.length,
      timestamp: Date.now(),
    });
    io.emit('comment', msg);
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
  });
  io.emit('comment', {
    author,
    text,
    image,
    id: COMMENTS.length,
    timestamp: Date.now(),
  });
  res.send(COMMENTS);
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
