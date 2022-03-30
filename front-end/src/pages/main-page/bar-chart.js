import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { selectTerms } from "../../store/terms-slice";
import stc from 'string-to-color'

export default function BarChart() {
  const [data, setData] = useState([]);
  
  const termsFromReducer = useSelector(selectTerms);
  
  useEffect(() => {
    console.log('termsFromReducer: ', termsFromReducer);
    if(Object.keys(termsFromReducer).length>0){

      const termsDataArr = [];
      for (const property in termsFromReducer) {
        termsDataArr.push([property, termsFromReducer[property], stc(property),null]);
    }

    const data = [
      [
        "Term",
        "appearance",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify",
        },
      ],
      ...termsDataArr
    ];
    setData(data);
  }
  }, [termsFromReducer]);
  

  const options = {
    title: " Terms by appearance",
    width: 1800,
    height: 600,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };

  return (
    <div>
      {Object.keys(termsFromReducer).length>0?
        <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
      :
    null
}
    </div>
  );
}
