const pathToFfmpeg = require('ffmpeg-static');
const child_process = require('node:child_process');



let sp = child_process.spawn(pathToFfmpeg,
    [
        `-re`,
        "-stream_loop",
        "-1",
        "-i",
        "https://hack1exe.ds1nc.ru/video.mp4",
        "-f",
        "flv",
        process.env.youtube
    ])

sp.on("spawn", async () => {
    console.log("Dudos v1.0")
    console.log("spawned")
})

// sp.stderr.on('data', async function (data) {
//     console.log("process data " + data)
// });

sp.on('exit', async (code) => {
    console.log("process exited with code " + code)
});