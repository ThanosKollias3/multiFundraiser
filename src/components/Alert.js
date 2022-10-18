import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"

const Alert = () => {
  const alertRef = useRef(null)
  const account = useSelector((state) => state.provider.account)
  const isPending = useSelector(
    (state) => state.fundraiser.transaction.isPending
  )
  const isError = useSelector((state) => state.fundraiser.transaction.isError)
  const alertSeperator = useSelector(
    (state) => state.fundraiser.transaction.alertSeperator
  )
  const removeHandler = async (e) => {
    alertRef.current.className = "alert--remove"
  }
  useEffect(() => {
    if ((isPending || isError) && account) {
      alertRef.current.className = "alert"
    }
  }, [isPending, isError, account])
  return (
    <div>
      {isPending && alertSeperator === 1 ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Fundraiser Creation Pending...</h1>
        </div>
      ) : isPending && alertSeperator === 2 ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>New Fundraiser Price Pending...</h1>
        </div>
      ) : isPending && alertSeperator === 3 ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Deposit Pending...</h1>
        </div>
      ) : isPending && alertSeperator === 4 ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transfer Pending...</h1>
        </div>
      ) : isError && alertSeperator === 1 ? (
        <div
          className="allert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Fundraiser Creation Failed</h1>
        </div>
      ) : isError && alertSeperator === 2 ? (
        <div
          className="allert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Failed To Incresase The Fundraiser Price</h1>
        </div>
      ) : isError && alertSeperator === 3 ? (
        <div
          className="allert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Deposit Failed</h1>
        </div>
      ) : isError && alertSeperator === 4 ? (
        <div
          className="allert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transfer Failed</h1>
        </div>
      ) : !isPending && alertSeperator === 1 ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>New Fundraiser Created</h1>
        </div>
      ) : !isPending && alertSeperator === 2 ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Successfully Increase The Fundraiser Price</h1>
        </div>
      ) : !isPending && alertSeperator === 3 ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Succesfull Deposit</h1>
        </div>
      ) : !isPending && alertSeperator === 4 ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transfer Was Succesfull </h1>
        </div>
      ) : (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        ></div>
      )}
    </div>
  )
}
export default Alert
