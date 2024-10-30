const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk54NXRDRXFVZEdWbkdZdmhrOU5NaWdlb3hxRFRia1NEVkFQSG5VY2hWND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWdvTzgyUjF6bytnd2dsbVR1QWtUa1hrZDFmODMyK05DZkZoYy9XRE9IUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSmpLTDhsdTBWbHZCdDl2Slpscm1YVDkxTHZ4YnlTVHR2TmRCZmRNd0Y0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGd1lkVVNzVFNxR2Q1VVFMQ1Zjd2QzQ1JrVHQ2QnRXc3pNL3U0MG5tY1FzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldLQi9WMDVPbE5BVEtWZzlycHdwcGNQdll0bk8zWlBCZEQ1V2grVlMvbG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpTaHRjR1NicjNRRTFPVUZQWTBKSUJvcEx1SWF4Z1A3M3Q5K2EyOWdjbEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUdlOGgxaTMxQ2Q0WmFQRmltRExkczJtTjZ1bEtSSmZNRHNsYTZodmRtMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU9waVhtVHd5RWJIeU5kN2w4MElaVDA2aHcrQlBWaEFYcWRLNFA5MVN6ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllkQmdCeHRPa0l5UjV5WjJ2OHdaYVdQcDU2aVdES2F6TVZPakZzbUpFd1hld2NnQmNLNENabUFwYmxuRDhHbjhhcTU2WkdsL3NZKzk0RzVrVkxkMGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU2LCJhZHZTZWNyZXRLZXkiOiIxZFVTUnRwSVFkTDZ2WUZKUldNL0w2K01iY3YzM3BpK1JBWUhXQ2dabTY0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ6eU1ucTkteVRCVzBLUWtPbnRObm9RIiwicGhvbmVJZCI6Ijc3MTMyNDIwLTZjZDctNDM0Yi1hZGM2LWE4MzkyNWVmZDU5MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJScTIwV2pTZ0dUbnFCQXU5Q3lkWUpPZnFlbms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU9aUUJEcTBCTzc0bmdwd1RLd2tyWkIyblJjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFRQ1RNRU1RIiwibWUiOnsiaWQiOiI5MjM0MDkwNjg3NTc6MjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi2KfYqNmGINiz2YjYp9iq24wifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tYRjY4SUdFTCt3aDdrR0dFWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InpkQm1YTWRTZHRXVTkzVGdna0pHaHVpQWpKSE9acm5lTnUxeUVabU02SG89IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFPWVk1d25tL25RWC9BZVBLL2N0MXFxcUZPTm40Zko1L1l3elJmMDkzWndzbWhybHB3VGZmRzgzM0xqUEM4a0ZjTG5LUi9uem9lLzIwL2RrSWhoZEN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ3Ukx2NUJYdzBnVldUMi9heExXRGxhNlFZREVxbWkycHNUd1NOMkJQOGFqUGhyY3VldmJuQ2x1TEJveDNDWnQwS2lPVExkN3hSVTZ4aVBOSXZNZ2Zqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzQwOTA2ODc1NzoyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjM1FabHpIVW5iVmxQZDA0SUpDUm9ib2dJeVJ6bWE1M2pidGNoR1pqT2g2In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMwMjcxMzExLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5aZSJ9',
    PREFIXES: (process.env.PREFIX || ',').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "03409068757",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,"flashmd12"
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,"HRKU-a0741397-ef05-47b8-b2b9-0d15568a8362"
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
