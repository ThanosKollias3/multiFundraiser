import logo from "../assets/logo.png"
import eth from "../assets/eth.svg"
import Blockies from "react-blockies"
import { useSelector, useDispatch } from "react-redux"
import config from "../config.json"
import { loadAccount } from "../store/interactions"

const Navbar = () => {
  const dispatch = useDispatch()

  const provider = useSelector((state) => state.provider.connection)
  const chainId = useSelector((state) => state.provider.chainId)
  const account = useSelector((state) => state.provider.account)
  const balance = useSelector((state) => state.provider.balance)
  const connectHandler = async () => {
    await loadAccount(provider, dispatch)
  }
  const networkHandler = async (e) => {
    console.log(e.target.value)
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.target.value }],
    })
  }
  return (
    <div className="exchange__header grid">
      <div className="exchange__header--brand flex">
        <img src={logo} className="logo" alt="Tφ Logo"></img>
        <h1>Twitch Fundraiser</h1>
      </div>

      <div className="exchange__header--networks flex">
        <img src={eth} className="Eth Logo" alt="Eth Logo" />
        {chainId && (
          <select
            name="networks"
            id="networks"
            value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
            onChange={networkHandler}
          >
            <option value="0" disabled>
              Select Network
            </option>
            <option value="0x7A69">Localhost</option>
            <option value="0x5">Goerli</option>
          </select>
        )}
      </div>

      <div className="exchange__header--account flex">
        {balance ? (
          <p>
            <small>My Balance</small>
            {Number(balance).toFixed(4)}
          </p>
        ) : (
          <p>
            <small>My Balance</small> 0 ETH
          </p>
        )}
        {account ? (
          <a
            href={
              config[chainId]
                ? `${config[chainId].explorerURL}/address/${account}`
                : `#`
            }
            target="_blank"
            rel="noreferrer"
          >
            {account.slice(0, 5) + "..." + account.slice(38, 42)}
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="#2187D0"
              bgColor="#F1F2F9"
              spotColor="#767F92"
              className="identicon"
            />
          </a>
        ) : (
          <button className="button" onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar