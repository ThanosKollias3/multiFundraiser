import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadIncreaser } from "../store/interactions"

const PriceIncreaser = () => {
  const [increaser, setIncreaser] = useState(0)
  const dispatch = useDispatch()
  const provider = useSelector((state) => state.provider.connection)
  const fundraiser = useSelector((state) => state.fundraiser.contract)

  const amountHandler = (e) => {
    setIncreaser(e.target.value)
  }
  const increaserHandler = (e) => {
    e.preventDefault()
    loadIncreaser(provider, fundraiser, increaser, dispatch)
    setIncreaser(0)
  }

  return (
    <div className="component exchange__transfers">
      <div className="component__header flex-center">
        <form onSubmit={(e) => increaserHandler(e)}>
          <label htmlFor="Increaser">
            Increase The Price of The Fundraiser
          </label>
          <input
            type="text"
            id="Increaser"
            placeholder="0.000"
            value={increaser === 0 ? "" : increaser}
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
export default PriceIncreaser
