import { useSelector } from "react-redux"

import { fundraisersSelector, increaserSelector } from "../store/selector"
const FundraiserSelectorBook = () => {
  const fundraisersBook = useSelector(fundraisersSelector)
  const increaserBook = useSelector(increaserSelector)
  const account = useSelector((state) => state.provider.account)
  return (
    <div className="component exchange__transfers">
      <div className="component__header flex-center">
        <div className="exchange__transfers--form">
          <div className="flex-between">
            {!fundraisersBook || !account ? (
              <p className="flex-center">No Fundraisers Yet</p>
            ) : (
              <table>
                <caption>Fundraisers</caption>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Required Price</th>
                    <th>Creator</th>
                  </tr>
                </thead>
                <tbody>
                  {fundraisersBook &&
                    fundraisersBook.map((funds, index) => {
                      return (
                        <tr key={index}>
                          <td> {funds._name}</td>
                          <td>{funds._amount}</td>
                          <td>{funds._fundraiserCreator}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default FundraiserSelectorBook
