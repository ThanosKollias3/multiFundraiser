import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  loadNetwork,
  loadProvider,
  loadAccount,
  loadFundraiser,
  subscribeToEvents,
} from "../store/interactions"
import FundraiserStarter from "./FundraiserStarter"
import Navbar from "./Navbar"
import Deposit from "./Deposit"
import TransferMoney from "./TransferMoney"
import Alert from "./Alert.js"

import config from "../config.json"
import PriceIncreaser from "./PriceIncreaser"

function App() {
  const dispatch = useDispatch()
  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch)
    const chainId = await loadNetwork(provider, dispatch)
    window.ethereum.on("chainChanged", () => {
      window.location.reload()
    })

    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch)
    })
    const fundraiserconfig = config[chainId].Fundraisers
    const fundraiser = await loadFundraiser(
      provider,
      fundraiserconfig.address,
      dispatch
    )

    console.log(fundraiser)
    subscribeToEvents(fundraiser, dispatch)
  }
  useEffect(() => {
    loadBlockchainData()
  })

  return (
    <div>
      <Navbar />
      <main className="exchange grid">
        <section className="exchange__section--left grid ">
          <Deposit />
        </section>
        <section className="exchange__section--right grid">
          <FundraiserStarter />
        </section>
        <section className="exchange__section--left grid">
          <PriceIncreaser />
        </section>

        <section className="exchange__section--left grid">
          <TransferMoney />
        </section>
      </main>

      <Alert />
    </div>
  )
}

export default App
