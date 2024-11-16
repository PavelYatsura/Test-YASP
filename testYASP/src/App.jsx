import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [dev, setDev] = useState({});
  const [test, setTest] = useState({});
  const [prod, setProd] = useState({});

  async function fetchData() {
    const response = await fetch("https://rcslabs.ru/ttrp1.json");
    const data = await response.json();
    const dev = data.dev;
    const test = data.test;
    const prod = data.prod;
    setData(data);
    setDev(dev);
    setTest(test);
    setProd(prod);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const hight = (props) => {
    if (props < "20") {
      return props * 5 * 1.34;
    } else if (props > "20" && props < "30") {
      return props * 4.5;
    } else if (props >= "101" && props <= "999") {
      return (props / 10) * 1.34;
    } else if (props >= "1000" && props <= "10000") {
      return (props / 100) * 1.34;
    } else if (props >= "10001" && props <= "100000") {
      return (props / 1000) * 1.34;
    } else if (props >= "100001" && props <= "1000000") {
      return (props / 10000) * 1.34;
    } else return props * 1.34;
  };
  const hightNorm = (props) => {
    if (props < "30") {
      return props * 5 * 1.34;
    } else if (props > "20" && props <= "50") {
      return props * 3.5 * 1.34;
    } else if (props >= "100001" && props <= "1000000") {
      return (props / 10000) * 1.34;
    } else return props * 1.34;
  };
  const sumDev = dev.front + dev.back + dev.db;
  const sumTest = test.front + test.back + test.db;
  const sumProd = prod.front + prod.back + prod.db;
  const comparison = (num1, num2) => {
    if (num1 > num2) {
      return -(num1 - num2);
    } else if (num1 < num2) {
      return -(num1 - num2);
    } else return 0;
  };
  let devUp = "none";
  let devDawn = "none";
  let devTest = "oval";
  if (sumDev > sumTest) {
    devTest += " negative";
    devDawn += " visible";
  } else if (sumDev < sumTest) {
    devTest += " pozitive";
    devUp += " visible";
  }
  let testProd = "oval";
  let testUp = "none";
  let testDawn = "none";
  if (sumTest < sumProd) {
    testProd += " pozitive";
    testUp += " visible";
  } else if (sumTest > sumProd) {
    testProd += " negative";
    testDawn += " visible";
  }

  return (
    <div className="container">
      <div className="chart">
        <h1 className="title">
          Количество пройденных тестов &quot;{data.title}&quot;
        </h1>
        <div className="dots">...</div>
        <div className="wrapper">
          <div className="oval__left">
            <div className={devTest}>
              <img
                className={devDawn}
                src="/Vectordawn.svg"
                alt="Vector dawn.svg"
              />
              <img
                className={devUp}
                src="/Vectorup.svg"
                alt="Vector dawn.svg"
              />
              <p className="oval__text ">{comparison(sumDev, sumTest)}</p>
            </div>
          </div>
          <div className="oval__right">
            <div className={testProd}>
              <img
                className={testDawn}
                src="/Vectordawn.svg"
                alt="Vector dawn.svg"
              />
              <img
                className={testUp}
                src="/Vectorup.svg"
                alt="Vector dawn.svg"
              />
              <p className="oval__text">{comparison(sumTest, sumProd)}</p>
            </div>
          </div>
          <div className="line-up line-up_dev"></div>
          <div className="line-horizont line-horizont_dev-test"></div>
          <div className="arrow arrow_test">
            <div></div>
          </div>
          <div className="line-up line-up_test"></div>
          <div className="line-horizont line-horizont_test-pord"></div>
          <div className="arrow arrow_prod">
            <div></div>
          </div>

          <div className="chart__box">
            <div className="chart__rect">
              <div
                className="rect rect__dev color-dev"
                style={{ height: `${hight(dev.front)}px` }}
              >
                <p className="chart__text">{dev.front}</p>
              </div>
              <div
                className="rect rect__back color-test"
                style={{ height: `${hight(dev.back)}px` }}
              >
                <p className="chart__text">{dev.back}</p>
              </div>
              <div
                className="rect rect__db color-db"
                style={{ height: `${hight(dev.db)}px` }}
              >
                <p className="chart__text">{dev.db}</p>
              </div>
              <p className="rect__text text">dev</p>
            </div>
            <div className="chart__rect">
              <div
                className="rect rect__dev color-dev"
                style={{ height: `${hight(test.front)}px` }}
              >
                <p className="chart__text">{test.front}</p>
              </div>
              <div
                className="rect rect__back color-test"
                style={{ height: `${hight(test.back)}px` }}
              >
                <p className="chart__text">{test.back}</p>
              </div>
              <div
                className="rect rect__db color-db"
                style={{ height: `${hight(test.db)}px` }}
              >
                <p className="chart__text">{test.db}</p>
              </div>
              <p className="rect__text text">test</p>
            </div>
            <div className="chart__rect">
              <div
                className="rect rect__dev color-dev"
                style={{ height: `${hight(prod.front)}px` }}
              >
                <p className="chart__text">{prod.front}</p>
              </div>
              <div
                className="rect rect__back color-test"
                style={{ height: `${hight(prod.back)}px` }}
              >
                <p className="chart__text">{prod.back}</p>
              </div>
              <div
                className="rect rect__db color-db"
                style={{ height: `${hight(prod.db)}px` }}
              >
                <p className="chart__text">{prod.db}</p>
              </div>
              <p className="rect__text text">prod</p>
            </div>
            <div className="chart__rect">
              <div
                className="rect rect__norm"
                style={{ height: `${hightNorm(data.norm)}px` }}
              >
                <p className="chart__text text-norm">{data.norm}</p>
              </div>
              <p className="rect__text text">норматив</p>
            </div>
          </div>
          <div className="chart__info">
            <div className="info__box">
              <div className="info__square color-dev"></div>
              <p className="info__text text">Клиенская часть</p>
            </div>
            <div className="info__box">
              <div className="info__square color-test"></div>
              <p className="info__text text">Северная часть</p>
            </div>
            <div className="info__box">
              <div className="info__square color-db"></div>
              <p className="info__text text">База данных</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
