import React from "react";
import Loading from "../Loading/Loading";
import "./index.css";

function Result({
  loading,
  result,
  rate,
  into,
  from,
  amount,
}) {
  const fromField = from.split(" ")[0].trim().toUpperCase();
  const intoField = into.split(" ")[0].trim().toUpperCase();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        !isNaN(result) &&
        !isNaN(rate) && (
          <>
            <p className="currency-value">
              {amount} {fromField}{" "}
              <span
                className={`currency-flag currency-flag-sm currency-flag-${from.toLowerCase()}`}
              />
            </p>
            <p className="currency-result">
              {result} ({intoField.toUpperCase()}){" "}
              <span
                className={`currency-flag currency-flag-lg currency-flag-${intoField.toLowerCase()}`}
              />
            </p>
            <p className="currency-rate">
              Rate={rate}{" "}
              <span
                className={`currency-flag currency-flag-sm currency-flag-${intoField.toLowerCase()}`}
              />
            </p>
          </>
        )
      )}
    </>
  );
}

export default Result;
