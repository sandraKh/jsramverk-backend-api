const app = require("./app");
const Document = require("./models/data.js");
const mongoose = require("mongoose");
const config = require("./config.json")



mongoose.connect(`mongodb+srv://${config.username}:${config.password}@cluster0.xfvcp.mongodb.net/dev?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const server = require("http").createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: ["http://www.student.bth.se", "http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  })
  
  const defaultValue = ""
  
  io.on("connection", socket => {

    socket.on("get-document", async documentId => {
      const document = await findOrCreateDocument(documentId)
      socket.join(documentId)
      socket.emit("load-document", document.data)
  
      socket.on("send-changes", delta => {
        socket.broadcast.to(documentId).emit("receive-changes", delta)
      })
  
      socket.on("save-document", async data => {
        await Document.findByIdAndUpdate(documentId, { data: data, title: data.ops[0].insert.split('\n')[0] })
      })
    })
  })
  
  async function findOrCreateDocument(id) {
    if (id == null) return
  
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id,  title: defaultValue, data: defaultValue })
  }


const port = process.env.PORT || 1337;

server.listen(port, () => console.log(`Listening on ${port}`));

