import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadStarter } from "../store/interactions"

const FundraiserStarter = () => {
  const [starter, setStarter] = useState(0)
  const [fundraiserName, setFundraiserName] = useState("")

  const dispatch = useDispatch()

  const provider = useSelector((state) => state.provider.connection)
  const fundraiser = useSelector((state) => state.fundraiser.contract)

  const amountHandler = (e) => {
    setStarter(e.target.value)
  }
  const nameHandler = (e) => {
    setFundraiserName(e.target.value)
  }

  const starterHandler = (e) => {
    e.preventDefault()
    loadStarter(provider, fundraiser, fundraiserName, starter, dispatch)

    setStarter(0)
    setFundraiserName("")
  }

  return (
    <div className="component exchange__transfers">
      <div className="component__header flex-center">
        <div className="exchange__transfers--form">
          <div className="flex-between"></div>
        </div>
        <form onSubmit={(e) => starterHandler(e)}>
          <label htmlFor="Starter">
            Give the Name of the Fundraiser and the Price you want to raise
          </label>
          <input
            type="text"
            id="Starter"
            placeholder="Fundraiser Name"
            value={fundraiserName === "" ? "" : fundraiserName}
            onChange={(e) => nameHandler(e)}
          />
          <input
            type="text"
            id="Starter"
            placeholder="0.0000"
            value={starter === 0 ? "" : starter}
            onChange={(e) => amountHandler(e)}
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
export default FundraiserStarter
