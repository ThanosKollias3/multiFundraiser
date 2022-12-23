import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { loadTransfer } from "../store/interactions"

const Transfer = () => {
  const provider = useSelector((state) => state.provider.connection)
  const fundraiser = useSelector((state) => state.fundraiser.contract)
  const dispatch = useDispatch()

  const [transferAddress, setTransferAddress] = useState("")

  const addressHandler = (e) => {
    setTransferAddress(e.target.value)
  }
  const transferHandler = (e) => {
    e.preventDefault()
    loadTransfer(provider, fundraiser, transferAddress, dispatch)

    setTransferAddress("")
  }

  return (
    <div className="component exchange__transfers">
      <div className="component__header flex-center">
        <form onSubmit={(e) => transferHandler(e)}>
          <label htmlFor="Address">
            {""}
            Transfer The Money To The Chosen Oraganization
          </label>
          <input
            type="text"
            id="Address"
            placeholder="Address"
            value={transferAddress === "" ? "" : transferAddress}
            onChange={(e) => addressHandler(e)}
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
export default Transfer
