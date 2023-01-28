export const provider = (state = {}, action) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
      return {
        ...state,
        connection: action.connection,
      }
    case "NETWORK_LOADED":
      return {
        ...state,
        chainId: action.chainId,
      }
    case "ACCOUNT_LOADED":
      return {
        ...state,
        account: action.account,
      }
    case "ETHER_BALANCE_LOADED":
      return {
        ...state,
        balance: action.balance,
      }

    default:
      return state
  }
}
const DEFAULT_FUNDRAISER_STATE = {
  loaded: false,
  contract: {},
  transaction: {
    transactionType: "",
    isSuccessfull: false,
  },
  AllDeposits: {
    data: [],
  },
  AllIncreases: {
    data: [],
  },
  AllFundraisers: {
    data: [],
  },

  AllTransfers: {
    data: [],
  },

  events: [],
}
export const fundraiser = (state = DEFAULT_FUNDRAISER_STATE, action) => {
  let data, index
  switch (action.type) {
    case "FUNDRAISER_LOADED":
      return {
        ...state,
        loaded: true,
        contract: action.fundraiser,
      }
    case "ALL_INCREASERS_LOADED":
      return {
        ...state,
        AllIncreases: {
          loaded: true,
          data: action.AllIncreases,
        },
      }

    case "ALL_FUNDRAISERS_LOADED":
      return {
        ...state,
        AllFundraisers: {
          loaded: true,
          data: action.AllFundraisers,
        },
      }

    case "ALL_TRANSFERS_LOADED":
      return {
        ...state,
        AllTransfers: {
          loaded: true,
          data: action.AllTransfers,
        },
      }
    case "All_DEPOSITS_LOADED":
      return {
        ...state,
        AllDeposits: {
          loaded: true,
          data: action.AllDeposits,
        },
      }
    case "PRICE_INCREASER_LOADED_REQUEST":
      return {
        ...state,
        transaction: {
          transactionType: "Price Increase",
          isPending: true,
          isSuccessfull: false,
          alertSeperator: 1,
        },
        transferInProgress: true,
      }
    case "PRICE_INCREASER_LOADED_SUCCESS":
      index = state.AllIncreases.data.findIndex(
        (PriceIncreaser) =>
          PriceIncreaser.id.toString() === action.PriceIncreaser.id.toString()
      )
      if (index === -1) {
        data = [...state.AllIncreases.data, action.PriceIncreaser]
      } else {
        data = state.AllIncreases.data
      }
      return {
        ...state,
        transferInProgress: false,
        AllFundraisers: {
          ...state.AllIncreases,
          data,
        },
        transaction: {
          transactionType: "Price Increase",
          isPending: false,
          isSuccessfull: true,
          alertSeperator: 1,
        },

        events: [action.event, ...state.events],
      }
    case "PRICE_INCREASER_LOADED_FAIL":
      return {
        ...state,
        transaction: {
          transactionType: "Price Increase",
          isPending: false,
          isSuccessfull: false,
          isError: true,
          alertSeperator: 1,
        },
        transferInProgress: false,
      }
    case "FUNDRAISER_STARTER_LOADED_REQUEST":
      return {
        ...state,
        transaction: {
          transactionType: "Fundraiser Starter",
          isPending: true,
          isSuccessfull: false,
          alertSeperator: 1,
        },
        transferInProgress: true,
      }
    case "FUNDRAISER_STARTER_LOADED_SUCCESS":
      index = state.AllFundraisers.data.findIndex(
        (NewFundraiser) =>
          NewFundraiser.id.toString() === action.NewFundraiser.id.toString()
      )
      if (index === -1) {
        data = [...state.AllFundraisers.data, action.NewFundraiser]
      } else {
        data = state.AllFundraisers.data
      }
      return {
        ...state,
        transferInProgress: false,
        AllFundraisers: {
          ...state.AllFundraisers,
          data,
        },
        transaction: {
          transactionType: "Fundraiser Starter",
          isPending: false,
          isSuccessfull: true,
          alertSeperator: 1,
        },

        events: [action.event, ...state.events],
      }
    case "FUNDRAISER_STARTER_LOADED_FAIL":
      return {
        ...state,
        transaction: {
          transactionType: "Fundraiser Starter",
          isPending: false,
          isSuccessfull: false,
          isError: true,
          alertSeperator: 1,
        },
        transferInProgress: false,
      }
    case "DEPOSIT_LOADED_REQUEST":
      return {
        ...state,
        transaction: {
          transactionType: "Deposit",
          isPending: true,
          isSuccessfull: false,
          alertSeperator: 3,
        },
        transferInProgress: true,
      }

    case "DEPOSIT_LOADED_SUCCESS":
      return {
        ...state,
        transaction: {
          transactionType: "Deposit",
          isPending: false,
          isSuccessfull: true,
          alertSeperator: 3,
        },
        transferInProgress: false,
        AllDeposits: {
          loaded: true,
          ...state.AllDeposits,
          data: [...state.AllDeposits.data, action.deposit],
        },
        events: [action.event, ...state.events],
      }
    case "DEPOSIT_LOADED_FAIL":
      return {
        ...state,
        transaction: {
          transactionType: "Deposit",
          isPending: false,
          isSuccessfull: false,
          isError: true,
          alertSeperator: 3,
        },
      }

    case "CONTRACT_BALANCE_LOADED":
      return {
        ...state,
        balance: action.balance,
      }
    case "PRICE_NEEDED_LOADED":
      return {
        ...state,
        FundraiserPrice: action.price,
      }
    case "FUNDRAISER_NAME_LOADED":
      return {
        ...state,
        FundraiserName: action.name,
      }
    case "TRANSFER_LOADED_REQUEST":
      return {
        ...state,
        transaction: {
          transactionType: "MoneyTransfer",
          isPending: true,
          isSuccessfull: false,
          alertSeperator: 4,
        },
        moneytransfer: true,
      }
    case "TRANSFER_LOADED_SUCCESS":
      index = state.AllTransfers.data.findIndex(
        (FundraiserCompleted) =>
          FundraiserCompleted._name.toString() ===
          action.FundraiserCompleted._name.toString()
      )
      if (index === -1) {
        data = [...state.AllTransfers.data, action.FundraiserCompleted]
      } else {
        data = state.AllTransfers.data
      }
      return {
        ...state,
        transaction: {
          transactionType: "MoneyTransfer",
          isPending: false,
          isSuccessfull: true,
          alertSeperator: 4,
        },
        AllTransfers: {
          ...state.AllTransfers,
          data,
        },
        events: [action.event, ...state.events],
        moneytransfer: false,
      }
    case "TRANSFER_LOADED_FAIL":
      return {
        ...state,
        transaction: {
          transactionType: "MoneyTransfer",
          isPending: false,
          isSuccessfull: false,
          isError: true,
          alertSeperator: 4,
        },
        moneytransfer: false,
      }

    default:
      return state
  }
}
