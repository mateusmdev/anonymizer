const Anonymizer = require('./../model/Anonymizer')
const Generalization = require('./../model/Generalization')
//const sequelize = require('./../database/sequelize')

class AnonymizerService{
    async execute(data){
        //const query = `SELECT anon.partial_email('daamien@gmail.com')`
        const anonymizer = new Anonymizer()
        anonymizer.strategy = new Generalization()
        
        try {
            //Executar query de anonymização
            //const result = await sequelize.query(query)
            const result = await anonymizer.execute(data)

            // console.log('here', result)
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = AnonymizerService