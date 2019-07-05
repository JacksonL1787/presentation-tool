module.exports = function(data) {
  return {
    id: data.id,
    user: "jlawrence1787@gmail.com",
    title: data.title,
    design: data.design,
    slides: [
      {
        components: []
      }
    ],
    created: Date.now(),
    modified: Date.now()
  }
}
