import { Chart, Line, Point, Tooltip } from 'bizcharts';
// import React from 'react';
// import ReactDOM from 'react-dom';

interface DataItem {
  year: string;
  value: number;
}

function Chartdata() {
  const data: DataItem[] = [
    { year: '1991', value: 1000 },
    { year: '1992', value: 1200 },
    { year: '1993', value: 2000 },
  ];

  return (
    <div className="mx-2">
      <div className="mx-10 my-5">
        <div className="flex justify-between flex-row text-xl">
          <p>해약환급금</p>
        </div>
      </div>
      <div className="border-2 border-sky-600 rounded-xl">
        <Chart
          appendPadding={[10, 0, 0, 10]}
          autoFit
          height={300}
          data={data}
          onLineClick={(e: any) => console.log(e)}
          scale={{
            value: { min: 0, alias: '가격', type: 'linear-strict' },
            year: { range: [0, 1] },
          }}
        >
          <Line position="year*value" />
          <Point position="year*value" />
          <Tooltip showCrosshairs follow={true} />
        </Chart>
      </div>
    </div>
  );
}

export default Chartdata;
