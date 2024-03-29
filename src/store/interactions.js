import { ethers } from "ethers"
import ABI from "../abis/Fundraisers.json"

export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum)
  dispatch({ type: "PROVIDER_LOADED", connection })
  return connection
}
export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork()
  dispatch({ type: "NETWORK_LOADED", chainId })
  return chainId
}
export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  })
  const account = ethers.utils.getAddress(accounts[0])
  dispatch({ type: "ACCOUNT_LOADED", account })

  let balance = await provider.getBalance(account)
  balance = ethers.utils.formatEther(balance)
  dispatch({ type: "ETHER_BALANCE_LOADED", balance })

  return account
}

export const loadFundraiser = async (provider, address, dispatch) => {
  const fundraiser = new ethers.Contract(address, ABI, provider)
  dispatch({ type: "FUNDRAISER_LOADED", fundraiser })
  return fundraiser
}
export const loadContractBalance = async (fundraiser, Address, dispatch) => {
  let balance

  balance = ethers.utils.formatUnits(await fundraiser.BalanceOf(Address), 18)

  dispatch({ type: "CONTRACT_BALANCE_LOADED", balance })
}

export const loadStarter = async (
  provider,
  fundraiser,
  fundraiserName,
  amount,
  dispatch
) => {
  let starter
  const signer = provider.getSigner()

  const Amount = ethers.utils.parseUnits(amount.toString(), 18)
  dispatch({ type: "FUNDRAISER_STARTER_LOADED_REQUEST" })
  try {
    starter = await fundraiser
      .connect(signer)
      .StartNewFund(fundraiserName, Amount)

    await starter.wait()
  } catch (error) {
    dispatch({ type: "FUNDRAISER_STARTER_LOADED_FAIL" })
  }
  return starter
}

export const loadDeposit = async (
  provider,
  fundraiser,
  amount,
  Address,
  dispatch
) => {
  let transaction

  dispatch({ type: "DEPOSIT_LOADED_REQUEST" })
  try {
    const signer = await provider.getSigner()
    const Amount = ethers.utils.parseEther(amount)

    transaction = await fundraiser.connect(signer).deposit(Address, {
      value: Amount,
    })
    await transaction.wait()
  } catch (error) {
    dispatch({ type: "DEPOSIT_LOADED_FAIL" })
  }
}
export const loadTransfer = async (
  provider,
  fundraiser,
  addressName,
  dispatch
) => {
  let transaction
  const signer = await provider.getSigner()
  dispatch({ type: "TRANSFER_LOADED_REQUEST" })
  try {
    transaction = await fundraiser.connect(signer).transferTo(addressName)
    await transaction.wait()
    dispatch({ type: "TRANSFER_LOADED_SUCCESS" })
  } catch (error) {
    dispatch({ type: "TRANSFER_LOADED_FAIL" })
  }
}
export const loadIncreaser = async (
  provider,
  fundraiser,
  increaser,
  dispatch
) => {
  let transaction
  const amount = ethers.utils.parseEther(increaser)
  const signer = provider.getSigner()
  dispatch({ type: "INCREASER_LOADED_REQUEST" })
  try {
    transaction = await fundraiser.connect(signer).PriceIncrease(amount)
    await transaction.wait()
  } catch (error) {
    dispatch({ type: "INCREASER_LOADED_FAIL" })
  }
}
export const loadAllEvents = async (provider, fundraiser, dispatch) => {
  const block = await provider.getBlockNumber()

  const funds = await fundraiser.queryFilter("NewFundraiser", 0, block)
  const AllFundraisers = funds.map((event) => event.args)
  dispatch({ type: "ALL_FUNDRAISERS_LOADED", AllFundraisers })

  const increases = await fundraiser.queryFilter("PriceIncreaser", 0, block)
  const AllIncreases = increases.map((event) => event.args)
  dispatch({ type: "ALL_INCREASERS_LOADED", AllIncreases })

  const transfer = await fundraiser.queryFilter("FundraiserCompleted", 0, block)
  const AllTransfers = transfer.map((event) => event.args)
  dispatch({ type: "ALL_TRANSFERS_LOADED", AllTransfers })

  const depositor = await fundraiser.queryFilter("Deposit", 0, block)
  const AllDeposits = depositor.map((event) => event.args)
  dispatch({ type: "All_DEPOSITS_LOADED", AllDeposits })
}
export const subscribeToEvents = (fundraiser, dispatch) => {
  fundraiser.on(
    "NewFundraiser",
    (id, _name, _amount, _fundraiserCreator, event) => {
      const NewFundraiser = event.args
      dispatch({
        type: "FUNDRAISER_STARTER_LOADED_SUCCESS",
        NewFundraiser,
        event,
      })
    }
  )
  fundraiser.on(
    "PriceIncreaser",
    (id, _name, _amount, _fundraiserCreator, event) => {
      const PriceIncreaser = event.args

      dispatch({
        type: "PRICE_INCREASER_LOADED_SUCCESS",
        PriceIncreaser,
        event,
      })
    }
  )
  fundraiser.on("Deposit", (_depositAmount, sender, _name, event) => {
    const deposit = event.args

    dispatch({ type: "DEPOSIT_LOADED_SUCCESS", deposit, event })
  })

  fundraiser.on(
    "FundraiserCompleted",
    (_name, _amount, _fundrdaiserCreator, event) => {
      const FundraiserCompleted = event.args
      dispatch({ type: "TRANSFER_LOADED_SUCCESS", FundraiserCompleted, event })
    }
  )
}
