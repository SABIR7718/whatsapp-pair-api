/*
 * © 2026 SeXyxeon (VOIDSEC)
 *
 * ⚠️ COPYRIGHT NOTICE
 * This source code is protected under copyright law.
 * Any form of re-uploading, recoding, modification,
 * selling, or redistribution WITHOUT explicit permission
 * from the original author is strictly prohibited.
 *
 * ❌ NO CREDIT = NO PERMISSION
 * ❌ DO NOT CLAIM THIS CODE AS YOUR OWN
 *
 * ✔️ Usage or modification is allowed ONLY
 * with prior permission and proper credit.
 *
 * OFFICIAL LINKS (ONLY):
 * YouTube   : https://youtube.com/@voidsec7718
 * Instagram : sabir._7718
 * Telegram  : https://t.me/SABIR7718
 * GitHub    : https://github.com/SABIR7718
 * WhatsApp  : +91 73650 85213
 *
 * Violations may result in DMCA takedown
 * or termination of the Telegram bot.
 */


require('dotenv').config();
const SABIR7718_Aokl = require('express');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

const fs = require('fs');
const pino = require('pino');
const crypto = require('crypto');
const path = require('path');
const axios = require('axios');

const {
    log
} = require('@sabir7718/log');

const SABIR7718 = SABIR7718_Aokl();
const PORT = process.env.PORT || 3000;

const S7HaTeSY = (SABIR7718) => crypto.randomBytes(SABIR7718).toString('hex');

SABIR7718.get('/', async (req, res) => {
    res.json({
        creator: 'SABIR7718',
        status: true,
        message: 'Pair API Running'
    });
});

SABIR7718.get('/pair', async (req, res) => {

    let S7 = req.query.number;

    if (!S7) {
        return res.status(400).json({
            status: false,
            message: 'Example: /pair?number=91xxxxxxxxxx'
        });
    }

    S7 = S7.replace(/[^0-9]/g, '');

    const SYHaTe = S7HaTeSY(16);
    const SABIR7718 = `sayan_x_milky_${SYHaTe}`;
    const S7HaTe = path.join(__dirname, 'temp_sessions', SYHaTe);

    if (!fs.existsSync(S7HaTe)) {
        fs.mkdirSync(S7HaTe, {
            recursive: true
        });
    }

    try {

        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(S7HaTe);

        const SY = makeWASocket({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(
                    state.keys,
                    pino({
                        level: 'fatal'
                    })
                )
            },
            printQRInTerminal: false,
            logger: pino({
                level: 'fatal'
            }),
            browser: Browsers.ubuntu('Chrome')
        });

        SY.ev.on('creds.update', saveCreds);

        if (!SY.authState.creds.registered) {

            await delay(3000);

            try {

                let HaTe = await SY.requestPairingCode(S7);

                HaTe = HaTe?.match(/.{1,4}/g)?.join('-') || HaTe;

                log('info', 'SYSTEM', `PAIR GENERATED FOR ${S7}`);

                return res.json({
                    status: true,
                    creator: 'SABIR7718',
                    number: S7,
                    code: HaTe,
                    session_id: SABIR7718
                });

            } catch (err) {

                log('error', 'SYSTEM', err.message);

                return res.status(500).json({
                    status: false,
                    message: 'Failed To Generate Pair Code'
                });

            }

        }

        SY.ev.on('connection.update', async (update) => {
            const {
                connection,
                lastDisconnect
            } = update;

            if (connection === 'connecting') {
                log('info', 'SYSTEM', `Connecting for ${S7}...`);
            }

            if (connection === 'open') {
                try {
                    log('info', 'SYSTEM', `${S7} connected! Finalizing session...`);
                    await delay(4000);

                    const SYHaTeS7 = path.join(S7HaTe, 'creds.json');

                    if (fs.existsSync(SYHaTeS7)) {
                        const HaTeSY = fs.readFileSync(SYHaTeS7, 'utf-8');
                        const SABIR = Buffer.from(HaTeSY).toString('base64');

                        const S7SY = `${process.env.FIREBASE_URL}${SABIR7718}.json`;

                        await axios.put(S7SY, JSON.stringify(SABIR), {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        log('success', 'SYSTEM', `UPLOADED ${SABIR7718}`);
                        
                        const rawJid = SYxS7.user?.id;
                        
                        const S7_myJid = rawJid.includes(':') ? rawJid.split(':')[0] + '@s.whatsapp.net' : rawJid;

                        await SY.sendMessage(S7_myJid, {
                            text: `*SESSION CONNECTED*\n\nID: \`${SABIR7718}\`\n\nDon't share this ID with anyone.`
                        });

                        await delay(2000);
                        await SY.end();
                    }

                } catch (err) {
                    log('error', 'UPLOAD-ERROR', err.message);
                } finally {
                    setTimeout(() => {
                        if (fs.existsSync(S7HaTe)) {
                            fs.rmSync(S7HaTe, {
                                recursive: true,
                                force: true
                            });
                        }
                    }, 5000);
                }
            }

            if (connection === 'close') {
                const reason = lastDisconnect?.error?.output?.statusCode;
                log('warn', 'SYSTEM', `Connection closed. Reason: ${reason}`);

                if (reason !== 401) {
                    if (fs.existsSync(S7HaTe)) {
                        fs.rmSync(S7HaTe, {
                            recursive: true,
                            force: true
                        });
                    }
                }
            }
        });


    } catch (err) {

        log('error', 'SYSTEM', err.message);

        if (!res.headersSent) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            });
        }

    }

});

SABIR7718.listen(PORT, () => {
    log('info', 'SYSTEM', `SERVER RUNNING ON PORT ${PORT}`);
});

if (process.env.URL) {

    (async () => {
        try {
            const res = await fetch(process.env.URL);
            log('info', 'PING', `Pinged: ${process.env.URL} | Status: ${res.status}`);
        } catch (err) {
            log('error', 'PING', err.message);
        }
    })();

    setInterval(async () => {
        try {
            const res = await fetch(process.env.URL);
            log('info', 'PING', `Pinged: ${process.env.URL} | Status: ${res.status}`);
        } catch (err) {
            log('error', 'PING', err.message);
        }
    }, 5 * 60 * 1000);
}