module.exports = {
    apps: [{
        name: "bdstotnhat-fe-app",
        script: "npm start",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}
