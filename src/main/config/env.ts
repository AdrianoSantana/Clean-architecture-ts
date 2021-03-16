export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://ans3:679852@cluster0.7qew5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.port || 5050,
  jwtSecret: process.env.JWT_SECRET || 'th47&6a@5bjqo1'
}
