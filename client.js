var ws = new WebSocket("ws://192.168.0.40:2000");
var ready = false;
var processArgs = document.getElementById('args');
var buttons = 
{
    "gitFetch": document.getElementById('btnGitFetch'),
    "gitPull": document.getElementById('btnGitPull'),
    "compileWindows": document.getElementById("btnCompileWin"),
    "compileAndroid": document.getElementById("btnCompileAnd"),
    "compileWeb": document.getElementById("btnCompileWeb"),
    "testWeb": document.getElementById('btnTestWeb'),
}
var process = 
{
    "command": "",
    "args": ""
}
var logs = document.getElementById('logs');

ws.addEventListener('open', () => 
{
    console.log("Ready!");
    ready = true;
});

ws.addEventListener('message', (e) => 
{
    console.log(e.data);
    var parsedshit = JSON.parse(e.data);

    var newLog = document.createElement('div');
    newLog.classList.add(".clean");
    newLog.style.margin = "1rem";

    var infoshit = document.createElement('p');
    infoshit.innerText = parsedshit.text;
    newLog.appendChild(infoshit);

    logs.appendChild(newLog);
});

ws.addEventListener('close', () => 
{
    var newLog = document.createElement('div');
    newLog.classList.add(".clean");
    newLog.style.margin = "1rem";

    var infoshit = document.createElement('p');
    infoshit.innerText = "Socket closed";
    newLog.appendChild(infoshit);

    logs.appendChild(newLog);
});

buttons.compileAndroid.addEventListener('click', () => 
{
    if (!ready)
        return;

    clearLogs();

    ws.send(prepare("lime build android"));
});

buttons.compileWindows.addEventListener('click', () => 
{
    if (!ready)
        return;

    clearLogs();

    ws.send(prepare("lime build windows"));
});

buttons.compileWeb.addEventListener('click', () => 
{
    if (!ready)
        return;

    clearLogs();

    ws.send(prepare("lime build html5"));
});

buttons.testWeb.addEventListener('click', () => 
{
    if (!ready)
        return;

    clearLogs();

    ws.send(prepare("lime test html5"));
});

buttons.gitFetch.addEventListener('click', () => 
{
    if (!ready)
        return;

    clearLogs();

    ws.send(prepare("git fetch"));
});

buttons.gitPull.addEventListener('click', () => 
{
    if (!ready)
    return;

    clearLogs();

    ws.send(prepare("git pull"));
});

function prepare(command)
{
    process.command = command;
    if (processArgs.value.length > 1)
        process.args = processArgs.value;
    return JSON.stringify(process);
}

function clearLogs()
{
    var clear = document.querySelectorAll('.clean');
    clear.forEach((el) => 
    {
        el.remove();
    });
}