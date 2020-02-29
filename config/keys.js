// If your app in in production (i.e, Heroku), check production env vars
if(process.env.NODE_ENV == "production") {
    module.exports = require('./keys_prod')

// Otherwise, if your app is running in working (your laptop), check working env vars    
} else {
    module.exports = require('./keys_work')
}