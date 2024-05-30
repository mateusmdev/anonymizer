const IAnonymizerStrategy = require('./../interface/IAnonymizerStrategy')
const sequelize = require('./../database/sequelize')

class Generalization extends IAnonymizerStrategy{
  constructor(){
    super()
  }

  async execute(data){
    console.log(console.log(data))
    const promiseResult = data.map(field => {
      return new Promise(function(resolve, reject){
        const { value, type, anon } = field

        const callback = this._getGeneralizationMethod(type)
      })
    })
    return 
  }

  _getGeneralizationMethod(dataType, anonValue){

  }
}

module.exports = Generalization