const NotImplementedException = require('./../exception/NotImplemented')

class IAnonymizerStrategy{
  async execute(){
    throw new NotImplementedException()
  }
}

module.exports = IAnonymizerStrategy