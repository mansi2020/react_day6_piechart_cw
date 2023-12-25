import React, { useState } from "react";
import "./App.css";
import Slider from "./Component/Slider/Slider";
import Dropdown from "./Component/Dropdown/Dropdown";
// pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  //common function to set value
  const [homeValue, setHomeValue] = useState(3000);
  const [downPayment, setDownPayment] = useState(600);
  const [loanAmount, setLoanAmount] = useState(2400);
  const [interestRate, setInterestRate] = useState(5);
  const [year, setYear] = useState(5);
  const [monthlyPayment, setMonthlyPaymnet] = useState(45.29);
  const [chartData, setChartData] = useState({
    labels: ["Principle", "Interest"],
    datasets: [
      {
        label: "# of Votes",
        data: [60, 5],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  // home value------------------->
  const handleHomeValueChange = (value) => {
    setHomeValue(value);
    let recalculateLoanAmount = value - downPayment;
    setLoanAmount(recalculateLoanAmount);

    // monthly payment
    let totalLoanMonths = year * 12;
    let interestPerMonth = interestRate / 1200;
    let newMonthlyPayment =
      (recalculateLoanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);
    setMonthlyPaymnet(newMonthlyPayment.toFixed(2));
  };

  //  downpayment value------------------
  const handleDownPaymentChange = (value) => {
    setDownPayment(value);
    let recalculateLoanAmount = homeValue - value;
    setLoanAmount(recalculateLoanAmount);

    // monthly payment
    let totalLoanMonths = year * 12;
    let interestPerMonth = interestRate / 1200;
    let newMonthlyPayment =
      (recalculateLoanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);
    setMonthlyPaymnet(newMonthlyPayment.toFixed(2));

    //new chartdata
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: [value/homeValue, interestRate/18],
        },
      ],
    });
  };

  //loan amount------------------->
  const handleLoanAmountChange = (value) => {
    let recalculateDownPayment =homeValue-value;
    setDownPayment(recalculateDownPayment);
    setLoanAmount(value);

    // monthly payment
    let totalLoanMonths = year * 12;
    let interestPerMonth = interestRate / 1200;
    let newMonthlyPayment =
      (value *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);
    setMonthlyPaymnet(newMonthlyPayment.toFixed(2));
  };

  //interestRate--------------------->
  const handleInterestRate = (value) => {
    setInterestRate(value);

    //new chartdata
    setChartData({
      ...chartData,
      datasets: [{ ...chartData.datasets[0], data: [downPayment/homeValue, value/18] }],
    });

    // monthly payment
    let totalLoanMonths = year * 12;
    let interestPerMonth = value / 1200;
    let newMonthlyPayment =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);
    setMonthlyPaymnet(newMonthlyPayment.toFixed(2));
  };

  //set year------------------->
  const handleYear = (value) => {
    setYear(value);

    // monthly payment
    let totalLoanMonths = value * 12;
    let interestPerMonth = interestRate / 1200;
    let newMonthlyPayment =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);
    setMonthlyPaymnet(newMonthlyPayment.toFixed(2));
  };

  // monthly payment calculation------------->

  //  formulas:=>
  //  monthlyPayment = (loanAmount * interestPerMonth *(1 + interestPerMonth) ** totalLoanMonths) / ((1 + interestPerMonth) ** totalLoanMonths - 1);

  // interest/Month = interestRate / 100 / 12;

  //  totalLoan = loanTerm * 12

  return (
    <div className="App">
      {/* header */}
      <header>
        <h1>Bank of React</h1>
      </header>
      {/* home value */}
      <div className="AppSliderAndDropDownContainer">
        <div className="appSliderContainer">
          <Slider
            title="Home Value"
            min="1000"
            max="10000"
            onChangeFunction={handleHomeValueChange}
            value={homeValue}
          ></Slider>

          {/* down payment */}
          <Slider
            title="Down Payment"
            min="0"
            max={homeValue}
            onChangeFunction={handleDownPaymentChange}
            value={downPayment}
          ></Slider>

          {/* loan amount */}
          <Slider
            title="Loan Amount"
            min="0"
            max={homeValue}
            changeLoanAmount={true}
            value={loanAmount}
            onChangeFunction={handleLoanAmountChange}
          ></Slider>

          {/* interest rate */}
          <Slider
            title="Interest Rate"
            min="2"
            max="18"
            showPercentage={true}
            showPercentageRange={true}
            value={interestRate}
            onChangeFunction={handleInterestRate}
          ></Slider>
          <div className="allDropDownContainer">
            <Dropdown onChangeFunction={handleYear}></Dropdown>
          </div>
        </div>
        {/* chart section */}
        <div className="AppChartContainer">
          <h1>Monthly Payment : $ {monthlyPayment}</h1>
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
