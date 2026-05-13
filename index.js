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
const cors = require('cors');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    DisconnectReason,
    Browsers
} = require("@whiskeysockets/baileys");

const fs = require('fs');
const pino = require('pino');
const crypto = require('crypto');
const path = require('path');
const axios = require('axios');
const { log } = require('@sabir7718/log');

const SABIR7718_APP = SABIR7718_Aokl();
SABIR7718_APP.use(cors());
const PORT = process.env.PORT || 3000;

const S7HaTeSY = (size) => crypto.randomBytes(size).toString('hex');

const FIREBASE_URL = process.env.FIREBASE_URL?.trim();

if (!FIREBASE_URL) {
    throw new Error('FIREBASE_URL missing in environment variables');
}

SABIR7718_APP.get('/pair', async (req, res) => {
    let S7 = req.query.number;
    if (!S7) return res.status(400).json({ status: false, message: 'Example: /pair?number=91xxxxxxxxxx' });

    S7 = S7.replace(/[^0-9]/g, '');
    const SYHaTe = S7HaTeSY(16);
    const SABIR7718_ID = `sayan_x_milky_${SYHaTe}`;
    const S7HaTe_Path = path.join(__dirname, 'temp_sessions', SYHaTe);

    if (!fs.existsSync(S7HaTe_Path)) fs.mkdirSync(S7HaTe_Path, { recursive: true });

    async function startSY() {
        const { state, saveCreds } = await useMultiFileAuthState(S7HaTe_Path);
        const { version } = await fetchLatestBaileysVersion();

        const SY = makeWASocket({
            version,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }))
            },
            printQRInTerminal: false,
            logger: pino({ level: 'fatal' }),
            browser: ["Ubuntu", "Chrome", "20.0.04"]
        });

        if (!SY.authState.creds.registered) {
            await delay(1500);
            try {
                let HaTe = await SY.requestPairingCode(S7, "12345678");
                HaTe = HaTe?.match(/.{1,4}/g)?.join('-') || HaTe;

                log('info', 'SYSTEM', `PAIR GENERATED FOR ${S7}`);

                if (!res.headersSent) {
                    res.json({
                        status: true,
                        creator: 'SABIR7718',
                        number: S7,
                        code: HaTe,
                        session_id: SABIR7718_ID
                    });
                }
            } catch (err) {
                log('error', 'SYSTEM', "Pairing Code Error: " + err.message);
                if (!res.headersSent) res.status(500).json({ status: false, message: 'Failed to generate code' });
            }
        }

        SY.ev.on('creds.update', saveCreds);

        SY.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;

                        if (connection === 'open') {
                try {
                    log('success', 'SYSTEM', `${S7} connected!`);
                    await delay(2000);

                    const SYHaTeS7 = path.join(S7HaTe_Path, 'creds.json');
                    if (fs.existsSync(SYHaTeS7)) {
                        const HaTeSY = fs.readFileSync(SYHaTeS7, 'utf-8');
                        const SABIR = Buffer.from(HaTeSY).toString('base64');
                        const S7SY = `${process.env.FIREBASE_URL}${SABIR7718_ID}.json`;

                        await axios.put(S7SY, JSON.stringify(SABIR), {
                            headers: { 'Content-Type': 'application/json' }
                        });

                        log('success', 'SYSTEM', `UPLOADED TO FIREBASE`);
                        
                        const S7_myJid = SY.user.id.split(':')[0] + '@s.whatsapp.net';
                        await SY.sendMessage(S7_myJid, { text: `*SESSION CONNECTED*\n\nID: \`${SABIR7718_ID}\`` });

                        await delay(3000);
                        
                        SY.end(); 
                        
                        log('info', 'SYSTEM', 'Socket closed safely. Session is alive on WhatsApp.');
                    }
                } catch (e) {
                    log('error', 'SYSTEM', 'Upload Error: ' + e.message);
                } finally {
                    setTimeout(() => {
                        if (fs.existsSync(S7HaTe_Path)) {
                            fs.rmSync(S7HaTe_Path, { recursive: true, force: true });
                            log('info', 'SYSTEM', 'Temporary folder cleaned up.');
                        }
                    }, 5000);
                }
            }


            if (connection === 'close') {
                const reason = lastDisconnect?.error?.output?.statusCode;
                
                if (reason !== DisconnectReason.loggedOut) {
                    log('warn', 'SYSTEM', `Connection closed (Reason: ${reason}). Reconnecting...`);
                    startSY();
                } else {
                    log('error', 'SYSTEM', `Session Logged Out. Cleaning up...`);
                    if (fs.existsSync(S7HaTe_Path)) {
                        fs.rmSync(S7HaTe_Path, { recursive: true, force: true });
                    }
                }
            }
        });
    }

    startSY();
});

SABIR7718_APP.listen(PORT, () => {
    log('info', 'SYSTEM', `SERVER RUNNING ON PORT ${PORT}`);
});
