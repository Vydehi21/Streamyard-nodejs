import http from 'http'
import express from 'express'
import path from 'path'
import {Server as SocketIO} from 'socket.io'
import { spawn } from 'child_process'

const app=express();
const server=http.createServer(app);
const io=new SocketIO(server)

const options=[
    '-i',
    '-',
    '-c:v','libx264',
    'preset','ultrafast',
    '-tune','zerolatency',
    '-r',`${25}`,
    '-g',`${25*2}`,
    '-keyint_main',25,
    '-crf','25',
    '-pix_fmt','yuv420p',
    '-sc_threshold','0',
    '-profile:v','main',
    '-level','3.1',
    '-c:a','aac',
    '-b:a','128k',
    '-ar',128000/4,
    '-f','flv',
    `rtmp://a.rtmp.youtube.com/live2/`,
];

const ffmpegProcess=spawn('ffmpeg',options);

app.use(express.static(path.resolve('./public')))

io.on('connection',socket =>{
    console.log('Socket Connected ',socket.id)
    socket.on('binarystream', stream =>{
        console.log('Binary Stream Incomming..')
    })

})

server.listen(3000,()=> console.log(`HTTP server running on PORT 3000`))