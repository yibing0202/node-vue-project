module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/web/'
    : '/',
    outputDir :__dirname + '/../serve/web'
}