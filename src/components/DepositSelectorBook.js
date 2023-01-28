import { useSelector } from "react-redux"

import { DepositSelector } from "../store/selector"
const DepositSelectorBook = () => {
  const depositBook = useSelector(DepositSelector)

  const account = useSelector((state) => state.provider.account)
  return (
    <div className="component exchange__transfers">
      {!depositBook || !account ? (
        <p className="flex-center">No Deposits Yet</p>
      ) : (
        <table>
          <caption>Deposits</caption>
          <thead>
            <tr>
              <th>Fundraiser</th>
              <th>DepositAmount</th>
              <th>Depositor</th>
            </tr>
          </thead>
          <tbody>
            {depositBook &&
              depositBook.map((deposit, index) => {
                return (
                  <tr key={index}>
                    <td>{deposit._name}</td>
                    <td> {deposit._depositAmount}</td>
                    <td>{deposit.sender}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default DepositSelectorBook
