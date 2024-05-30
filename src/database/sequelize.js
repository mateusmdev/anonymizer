const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false
})

// Testar a conexão com o banco de dados
async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Conexão bem-sucedida.');
    } catch (error) {
      console.error('Erro ao conectar-se ao banco de dados:', error);
    }
}
  
// Chamar a função para testar a conexão
testConnection()

module.exports = sequelize