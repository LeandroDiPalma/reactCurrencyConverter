import React, { useState, useEffect } from "react";
import axios from "axios";
import { endpointPath, currenciesPath } from "../../config/api";
import Dropdowns from "../Dropdown/Dropdown";
import Result from "../Result/Result";
import "./index.css";

const CurrencyConverter = () => {
  const [from, setFrom] = useState("");
  const [into, setInto] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currencyResult, setCurrencyResult] = useState("");
  const [currencyRate, setCurrencyRate] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [currencies, setCurrencies] = useState();

  const convertCurrency = async (
    from,
    into,
    amount
  ) => {
    const amountValue =
      typeof amount === "string" ? parseFloat(amount) : amount;

    if (amountValue === 0 || isNaN(amountValue) || amountValue < 0) {
      setCurrencyResult("");
      setCurrencyRate("");
      setLoading(false);
      return;
    }

    const fromValue = from.split(" ")[0].trim();
    const intoValue = into.split(" ")[0].trim().toUpperCase();
    const currenciesValues =fromValue+','+intoValue
    const url = endpointPath(currenciesValues);
    try {
      setLoading(true);
      const response = await axios.get(url);
      const parsedData = response.data.data;
      if (intoValue in parsedData) {
        const currencyIntoRate = parsedData[intoValue];
        const currencyFromRate = parsedData[fromValue];
        const currencyRate = 1 / currencyFromRate * currencyIntoRate;
        const currencyResult = amountValue / currencyFromRate * currencyIntoRate;
        setCurrencyRate(currencyRate.toFixed(4));
        setCurrencyResult(currencyResult.toFixed(4));
        setAmountValue(amountValue.toString());
      } else {
        console.error("Error while converting currency: Invalid data");
      }
    } catch (error) {
      console.error("Error while converting currency:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (from && into) {
      convertCurrency(from, into, amount);
    }
  }, [from, into, amount]);

  const getAllCurrencies = async () => {
    
    try {
      setLoading(true);
      const response = await axios.get(currenciesPath());
      const parsedData = response.data.data;
      const currencyOptions = Object.entries(parsedData).map(([key, value]) => ({
        value: key,
        label: `${value.name} (${value.symbol})`
      }));
      if (currencyOptions) {
        setCurrencies(currencyOptions)
      }
    } catch (error) {
      console.error("Error while converting currency:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCurrencies()
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    setAmount(parseFloat(value));
  };

  const handleFrom = (selectedOption) => {
    setFrom(selectedOption.value);
  };

  const handleInto = (selectedOption) => {
    setInto(selectedOption.value);
  };

  const handleSwitch = () => {
    setFrom(into);
    setInto(from);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="currency-app">
          <input
            className="form-control-lg currency-amount"
            placeholder="Enter Amount"
            value={amount}
            type="number"
            onChange={handleInput}
          />
          <div className="currency-from">
            <Dropdowns
              handleChange={handleFrom}
              placeholder="Select a currency (From)"
              value={from}
              options={currencies}
            ></Dropdowns>
          </div>
          <div className="currency-swap">
            <button className="btn currency-swap-btn" onClick={handleSwitch}>
              <i className="fas fa-sort"></i>
            </button>
          </div>
          <div className="currency-into">
            <Dropdowns
              handleChange={handleInto}
              placeholder="Select a currency (To)"
              value={into}
              options={currencies}
            ></Dropdowns>
          </div>
          <div>
            <Result
              loading={loading}
              result={parseFloat(currencyResult)}
              rate={parseFloat(currencyRate)}
              into={into}
              from={from}
              amount={parseFloat(amountValue)}
            ></Result>
          </div>
        </div>
      </div>
      <div className="space"></div>
    </>
  );
};

export default CurrencyConverter;
