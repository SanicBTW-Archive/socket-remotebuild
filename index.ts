import { WebSocketServer } from 'ws';
import { exec, ChildProcess } from 'node:child_process';
import fs from 'fs';
const port:any = 2000;
const wss = new WebSocketServer(({port: port}));
var currentDir:string = "C:\\Users\\sancock\\Desktop\\Programacio\\FNF-PE-0.3.2h";
var proc:ChildProcess;

wss.on('connection', (ws) => {
    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ' - Connection!');

    ws.on('message', (data) => 
    {
        var jsonData:{"command":string, "args":string} = JSON.parse(data.toString());
        var sendBack = 
        {
            "text": ""
        }
        console.log(jsonData);
        if (proc != undefined)
            proc.kill('SIGKILL');
        /*if (proc != undefined)
        {
            sendBack.text = "A process is already running!";
            var parsed = JSON.stringify(sendBack);
            ws.send(parsed);
            return;
        }*/
        proc = exec(`cd ${currentDir} && ${jsonData.command} ${jsonData.args.length > 1 ? jsonData.args : ""}`, ((err, stdout, stderr) => 
        {
            if (err != null)
            {
                console.log(err);
                console.log(err.cmd);
                console.log(err.code);
                console.log(err.killed);
                console.log(err.message);
                console.log(err.name);
                console.log(err.signal);
                console.log(err.stack);
                
                sendBack.text = err.message;
                var parsed = JSON.stringify(sendBack);
                ws.send(parsed);
            }
            //wtf homie
            if (stdout != "")
            {
                console.log(stdout);

                sendBack.text = stdout;
                var parsed = JSON.stringify(sendBack);
                ws.send(parsed);
            }
            if (stderr != "")
            {
                console.log(stderr);

                sendBack.text = stderr;
                var parsed = JSON.stringify(sendBack);
                ws.send(parsed);
            }
        }));
    });

    ws.on('close', () => 
    {
        if (proc != undefined)
            proc.kill('SIGKILL');

        console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " - A connection was closed, killed a process");
    });

    //ws.send('Connected');
});

console.log('Listening on port', port);