const IAnonymizerStrategy = require('./../interface/IAnonymizerStrategy')
const sequelize = require('./../database/sequelize')
const { QueryTypes } = require('sequelize')

class Generalization extends IAnonymizerStrategy{
  constructor(){
    super()
  }

  async execute(data){
    console.log(console.log(data))
    const result = {}
    console.log(result)

    const promiseArray = data.map(field => {
      return new Promise(async function(resolve, reject){
        const { value, type, anon } = field

        if (type === 'name'){
          result[field] = value
          return resolve()
        }

        const query = this._getGeneralizationSQL(type, anon)
        if (query == null) throw new Error('InvalidType Error.')

        const anonymizedData = await sequelize.query(query, {
          type: QueryTypes.SELECT,
        })

        result[field] = anonymizedData
        resolve()
      })
    })

    console.log(promiseArray)
    await Promise.all(promiseArray)

    console.log(result)
    return result
  }

  _getGeneralizationSQL(dataType, value, anon){
    const methods = {
      zipcode: `SELECT anon.generalize_int4range(${value})`,
      daterange: `SELECT anon.generalize_daterange(${value}, '${anon}')`
    }

    const sql = methods[dataType] || null
    return sql
  }
}

module.exports = Generalization