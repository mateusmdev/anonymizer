const IAnonymizerStrategy = require('./../interface/IAnonymizerStrategy')
const sequelize = require('./../database/sequelize')
const { QueryTypes } = require('sequelize')

class Generalization extends IAnonymizerStrategy{
  constructor(){
    super()
  }

  async execute(data){
    const result = {}
  
    const promiseArray = Object.entries(data).map(field => {
      return new Promise(async (resolve, reject) => {
        const [key, data] = field
        const { value, type, anon } = data
        
        try {
          const query = this._getGeneralizationSQL(type, value, anon)
          if (query == null) throw new Error('InvalidTypeError.')

          const [anonymizedData] = await sequelize.query(query, {
            type: QueryTypes.SELECT
          })

          const sanitizedResult = this._sanitizeResult(anonymizedData)

          result[key] = sanitizedResult
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })

    await Promise.all(promiseArray)

    return result
  }

  _getGeneralizationSQL(dataType, value, anon){
    
    const methods = {
      zipcode: `SELECT anon.generalize_int4range(${value})`,
      daterange: `SELECT anon.generalize_daterange('${value}', '${anon}')`
    }

    const sql = methods[dataType] || null
    return sql
  }

  _sanitizeResult(anonymizedData){
    const values = Object.values(anonymizedData)[0].map(obj => obj.value);
    return values
  }
}

module.exports = Generalization