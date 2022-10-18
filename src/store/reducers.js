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
  Deposit: {
    data: [],
  },
  events: [],
}
export const fundraiser = (state = DEFAULT_FUNDRAISER_STATE, action) => {
  switch (action.type) {
    case "FUNDRAISER_LOADED":
      return {
        ...state,
        loaded: true,
        contract: action.fundraiser,
      }

    case "FUNDRAISER_STARTER_LOADED_REQUEST":
      return {
        ...state,
        transaction: {
          transactransactionTypetion: "Fundraiser Starter",
          isPending: true,
          isSuccessfull: false,
          alertSeperator: 1,
        },
        transferInProgress: true,
      }
    case "FUNDRAISER_STARTER_LOADED_SUCCESS":
      return {
        ...state,
        transaction: {
          transactionType: "Fundraiser Starter",
          isPending: false,
          isSuccessfull: true,
          alertSeperator: 1,
        },
        transferInProgress: false,

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
    case "INCREASER_LOADED_REQUEST":
      return {
        ...state,
        transaction: {
          transactionType: "Increase The Fundraiser",
          isPending: true,
          isSuccessfull: false,
          alertSeperator: 2,
        },
        increaseraction: true,
      }
    case "INCREASER_LOADED_SUCCESS":
      return {
        ...state,
        transaction: {
          transactionType: "Increase The Fundraiser",
          isPending: false,
          isSuccessfull: true,
          alertSeperator: 2,
        },
        increaseraction: false,
      }
    case "INCREASER_LOADED_FAIL":
      return {
        ...state,
        transaction: {
          transactionType: "Increase The Fundraiser",
          isPending: false,
          isSuccessfull: false,
          isError: true,
          alertSeperator: 2,
        },
        increaseraction: false,
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
      return {
        ...state,
        transaction: {
          transactionType: "MoneyTransfer",
          isPending: false,
          isSuccessfull: true,
          alertSeperator: 4,
        },
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
