// 🐨 you don't need to do anything in this file for the exercise. This is
// just here for the extra credit. See the instructions for more info.
function proxy(app) {
  app.get(/^\/$/, (_, res) => {
    res.redirect('/discover')
  })
}

module.exports = proxy