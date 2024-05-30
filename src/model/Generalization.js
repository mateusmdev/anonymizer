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

        if (type === 'name'){
          result[key] = anon
          return resolve()
        }
        
        const query = this._getGeneralizationSQL(type, value, anon)
        if (query == null) throw new Error('InvalidType Error.')

        const [anonymizedData] = await sequelize.query(query, {
          type: QueryTypes.SELECT
        })

        const sanitizedResult = this._sanitizeResult(anonymizedData)

        result[key] = sanitizedResult
        resolve()
      })
    })

    console.log(promiseArray)
    await Promise.all(promiseArray)

    console.log(result)
    return result
  }

  _getGeneralizationSQL(dataType, value, anon){
    console.log(dataType)
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