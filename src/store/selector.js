import { createSelector } from "reselect"
import { get, reject } from "lodash"
import { ethers } from "ethers"

const AllFundraisers = (state) =>
  get(state, "fundraiser.AllFundraisers.data", [])

const AllIncreases = (state) => get(state, "fundraiser.AllIncreases.data", [])
const finalFundraiser = (state) => {
  const all = AllFundraisers(state)
  const Increases = AllIncreases(state)
  const finalFundraiser = reject(all, (f) => {
    const finalfunds = Increases.some(
      (o) => o._fundraiserCreator.toString() === f._fundraiserCreator.id
    )
    return finalfunds
  })
  return finalFundraiser
}

export const fundraisersSelector = createSelector(finalFundraiser, (funds) => {
  if (!funds) {
    return
  }
  funds = decorateFundsBook(funds)

  console.log(funds)

  return funds
})

const decorateFundsBook = (funds) => {
  return funds.map((funds) => {
    funds = decorateFunds(funds)
    return funds
  })
}
const decorateFunds = (funds) => {
  let Name, Amount, FundraiserCreator, ispriceincreaser, Id
  Id = funds.id
  Name = funds._name
  Amount = funds._amount
  FundraiserCreator = funds._fundraiserCreator
  ispriceincreaser = funds.isPriceIncreaser
  return {
    ...funds,
    id: Id,
    _name: Name,
    _amount: ethers.utils.formatUnits(Amount, "ether"),
    _fundraiserCreator: FundraiserCreator,
    isPriceIncreaser: ispriceincreaser,
  }
}
export const increaserSelector = createSelector(AllIncreases, (increases) => {
  if (!increases) {
  }
  increases = decorateIncreaseBook(increases)
  console.log(increases)
  return increases
})

const decorateIncreaseBook = (increases) => {
  return increases.map((increase) => {
    increase = decorateIncrease(increase)

    return increase
  })
}
const decorateIncrease = (increase) => {
  let Id, Amount, Name, fundraiserCreator
  Id = increase.id
  Name = increase._name
  Amount = increase._amount
  fundraiserCreator = increase._fundraiserCreator

  return {
    ...increase,
    id: Id,
    _name: Name,
    _amount: ethers.utils.formatUnits(Amount, "ether"),
    _fundraiserCreator: fundraiserCreator,
  }
}
