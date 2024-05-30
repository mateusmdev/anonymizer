class Anonymizer{
  constructor(strategy){
    this._strategy = strategy || null
  }

  async execute(data){
    return this._strategy.execute(data)
  }

  set strategy(value){
    this._strategy = value
  }
}

module.exports = Anonymizer