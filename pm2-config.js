/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    apps: [
        {
            name: "dev-api-node",
            script: "npm run dev",
            watch: true,
            ignore_watch: ["node_modules"],
            env: {
                NODE_ENV: "development",
            },
        },
    ],
};