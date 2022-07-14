import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";

type CommentType = {
  id: number;
  author: string,
  text: string,
  image: string,
  upvotes: number,
  timestamp: number,
  children?: CommentType[]
}

const COMMENTS: (CommentType & { id: number, timestamp: number })[] = []
let nextId = 0;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*"
  }
});

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  // send all comments to the new user
  console.log("Emitting all comments")
  socket.emit('comments', COMMENTS);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('comment', (msg: Omit<CommentType, "upvotes">) => {
    console.log(msg);
    COMMENTS.push({
      ...msg,
      id: nextId++,
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
  socket.on("reply", ({ comment, parentId }: { comment: Omit<CommentType, "upvotes" | "id" | "timestamp">, parentId: number }) => {
    console.log(`reply ${parentId}`);
    console.log(comment);
    const parent = COMMENTS.find(c => c.id === parentId);
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push({
        ...comment,
        id: nextId++,
        timestamp: Date.now(),
        upvotes: 0,
      })
      io.emit("reply", { comment: parent.children[parent.children.length - 1], parentId });
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
    id: nextId++,
    timestamp: Date.now(),
    upvotes: 0,
  });
  io.emit("comment", COMMENTS[COMMENTS.length - 1]);
  res.send(COMMENTS[COMMENTS.length - 1]);
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
