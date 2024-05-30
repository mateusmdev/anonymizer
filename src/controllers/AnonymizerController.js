const AnonymizerService = require('./../services/AnonymizerService')

class AnonymizerController{
    async handle(request, response){
        const { body } = request
        const service = new AnonymizerService()

        try {
            const result = await service.execute(body)
            return response.status(201).json(result)
            
        } catch (error) {
            response.status(500).json({
                status: 500,
                message: error.message
            })    
        }
    }
}

module.exports = AnonymizerController