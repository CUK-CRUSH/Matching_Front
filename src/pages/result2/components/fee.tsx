import { useState } from 'react';
import { ReactTyped } from 'react-typed';
import { Chart, Line, Point, Tooltip } from 'bizcharts';
import insuranceImg from '@/assets/toggle.svg';

interface DataItem {
  year: string;
  value: number;
}

function fee() {
  const [isTypedComplete, setIsTypedComplete] = useState(false);
  const [toggle, setToggle] = useState(false);
  const data: DataItem[] = [
    { year: '2034', value: 2000 },
    { year: '2039', value: 2400 },
    { year: '2044', value: 2700 },
  ];
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="mx-2">
      <div className="bg-white p-3 mb-2">
        <ReactTyped
          onComplete={() => setIsTypedComplete(true)}
          // strings={[`${data.aiText}`]}
          strings={['보험 상품을 분석 중입니다.']}
          typeSpeed={40}
        />
      </div>
      <button onClick={handleToggle} className="transform transition-transform duration-300 my-5">
        {toggle ? '🔼' : '▶️상세정보 확인하기'}
      </button>

      {toggle && <img src={insuranceImg} alt="보험상품 이미지" className="fadeIn mb-7" />}
      {isTypedComplete && (
        <div className={`${isTypedComplete ? 'fadeIn' : ''}`}>
          <div className="p-10 border-2 border-sky-600 rounded-xl">
            <div className="flex justify-between flex-row">
              <p className="px-2 py-3">보험료</p>
              <div className="flex flex-row">
                <p className="px-2 py-3">월</p>
                <p className="text-4xl fontweight-20 text-blue-500 font-bold">300,000</p>
                <p className="px-2 py-3">원</p>
              </div>
            </div>
            <div></div>
            <div className="flex justify-between flex-row">
              <p className="px-2 py-3">공시이율</p>
              <div className="flex flex-row">
                <p className="text-4xl fontweight-20 text-blue-500 font-bold">2.4</p>
                <p className="px-2 py-3">%</p>
              </div>
            </div>
            <div className="flex justify-between flex-row">
              <p className="px-2 py-3">혜택</p>
              <div className="flex flex-row">
                <p className="px-2 py-3">10년 유지 후 비과세</p>
              </div>
            </div>
          </div>
          <div className="mx-2 px-2 pr-4">
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
        </div>
      )}
    </div>
  );
}

export default fee;
