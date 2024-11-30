const Anonymizer = require('./../model/Anonymizer')
const Generalization = require('./../model/Generalization')

class AnonymizerService{
    async execute(data){
        
        const anonymizer = new Anonymizer()
        anonymizer.strategy = new Generalization()
        
        try {
            //Executar query de anonymização
            const result = await anonymizer.execute(data)

            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = AnonymizerService