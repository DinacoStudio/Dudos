const pathToFfmpeg = require('ffmpeg-static');
const child_process = require('node:child_process');



let sp = child_process.spawn(pathToFfmpeg,
    [
        `-re`,
        "-stream_loop",
        "-1",
        "-i",
        process.env.video,
        "-f",
        "-threads",
        "2",
        "flv",
        process.env.youtube
    ])

sp.on("spawn", async () => {
    console.log("spawned process")
})

sp.stderr.on('data', async function (data) {
    console.log("process data " + data)
});

sp.on('exit', async (code) => {
    console.log("process exited with code " + code)
});