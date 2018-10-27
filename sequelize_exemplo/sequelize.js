const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const BlogModel = require('./models/blog')
const TagModel = require('./models/tag')

const sequelize = new Sequelize('crud_sequelize', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

// relacionamento muito para muitos entre blog e tag
// esse relacionamento vai indicar a tabela blob_tag
Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
// relacionamento um para muito entre blog e usuario
Blog.belongsTo(User);

// se passar true o modelo sera criado a cada inicializacao
sequelize.sync({ force: false })
  .then(() => {
    console.log(`base de dados e tabelas criados!`)
  })

module.exports = {
  User,
  Blog,
  Tag
}