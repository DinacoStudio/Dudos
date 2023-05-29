const pathToFfmpeg = require('ffmpeg-static');
const child_process = require('node:child_process');
const cluster = require('node:cluster');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const dotenv = require('dotenv');
dotenv.config();
const hook = new Webhook("https://discord.com/api/webhooks/1112705438807502959/_FManNU0HXwNLpNPo2DIY6_d1Fp9hkDC2DUD4LuQkxn3XJ9wc6cajtFDkE2m33tHCKG7");


if (cluster.isPrimary) {
    console.log("[*] Spawn process");
    console.log(process.env.youtube)
    console.log(process.env.video)
    cluster.fork();
    cluster.on('exit', (worker, code, signal) => {
        console.clear();
        console.log(`[*] Process died ${worker.process.pid} died.${code} Restarting...`);
        cluster.fork();
    });
} else {
    let sp = child_process.spawn(pathToFfmpeg,
        [
            "-threads",
            "2",
            `-re`,
            "-stream_loop",
            "-1",
            "-i",
            process.env.video,
            "-f",
            "flv",
            process.env.youtube,
            "-f",
            "flv",
            process.env.youtube2
        ])

    sp.on("spawn", async () => {
        console.log("[*] spawned process")
    })

    sp.stderr.on('data', async function (data) {
        console.log("process data " + data)
    });

    sp.on('exit', async (code) => {
        console.log("process exited with code " + code)
        const ok_embed = new MessageBuilder()
            .setTitle('Стрим начался')
            .setColor('#2dcf0c')
        ok_embed.setTimestamp();
        await hook.send(ok_embed);
        process.exit(0);
    });
}