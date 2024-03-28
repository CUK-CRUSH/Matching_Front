import { heightState } from '@/atom/customHeight';
import Layout from '@/components/layout/layout';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactTyped } from 'react-typed';
import { useEffect, useRef, useState } from 'react';
import { typeHeightState } from '@/atom/typedHeight';
import { insuranceProductState } from '@/atom/response';
import insuranceImg from '@/assets/toggle.svg';

export default function Result() {
  const typeRef = useRef<any>(null);
  const data = useRecoilValue(insuranceProductState);
  const [isTypedComplete, setIsTypedComplete] = useState(false);
  const [typedHeight, setTypeHeight] = useState(0);
  const [toggle, setToggle] = useState(false);

  const setHeight = useSetRecoilState(heightState);
  const calculatedHeight = `calc(100vh + ${(data.coveredList.length - 2) * 180}px)`;
  setHeight(calculatedHeight);

  const setTypedHeight = useSetRecoilState(typeHeightState);
  setTypedHeight(typedHeight);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (typeRef.current) {
      setTypeHeight(typeRef.current.clientHeight);
    }
  }, [isTypedComplete]);

  return (
    <Layout footerHidden={true}>
      <div className={`mx-2`}>
        <h2 className="mb-10 text-2xl font-bold tracking-tight my-4 text-gray-900">
          {data.productName}
        </h2>
        <button onClick={handleToggle} className="transform transition-transform duration-300">
          {toggle ? '🔼' : '▶️상세정보 확인하기'}
        </button>

        {toggle && <img src={insuranceImg} alt="보험상품 이미지" className="fadeIn" />}
        <div ref={typeRef} className="bg-white p-3 mb-2">
          <ReactTyped
            onComplete={() => setIsTypedComplete(true)}
            // strings={[`${data.aiText}`]}
            strings={['보험 상품을 분석 중입니다.']}
            typeSpeed={40}
          />
        </div>
        {isTypedComplete && (
          <div className={`${isTypedComplete ? 'fadeIn' : ''}`}>
            <div className="flex flex-col gap-y-4 w-full  items-center justify-center">
              {data.coveredList.map((cover, index) => (
                <div key={index} className="p-4 w-full bg-white rounded-lg shadow-md">
                  <div className="p-3 mb-2 rounded">
                    <p className="font-bold text-xl">{cover.coveredName}</p>
                    <p className="mt-8">{cover.diseaseName}</p>
                    <p>
                      보장금액 : <strong>{cover.coveredPrice.toLocaleString()}원</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                보험기간: <strong>{data.productDate}</strong>
              </p>
              <p className="text-gray-600">
                보험범위 지수: <strong>{data.productExp}</strong>
              </p>
              <p className="text-gray-600">
                가입 연령: <strong>{data.productAge}</strong>
              </p>
              <p className="text-gray-600">
                기타 정보: <strong>{data.productEtc}</strong>{' '}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* foo */}
      <div className="fixed bg-white w-[430px] bottom-0 p-4  shadow-md z-10 text-center">
        <p className="text-gray-600 font-bold">보험료: 3000만원</p>
      </div>
    </Layout>
  );
}
