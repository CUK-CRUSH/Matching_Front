import Ui from './ui';
import Buttonui from './buttonui';
import Background from '../../assets/home.webp';
import Logoui from './logoui';

export default function Home() {
  return (
    <div className="flex-1 flex-col w-full flex justify-center">
      <main className="max-w-[430px] w-full bg-white  relative mx-auto">
        <div className="relative w-full h-screen overflow-hidden">
          <div
            style={{
              backgroundImage: `url(${Background}) `,
              filter: 'blur(2px) brightness(60%)',
              opacity: 0.75,
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="relative z-10 text-white">
            <div className="ml-12 p-5 pt-10">
              <Ui text={'보험 조회'} times={1000} />
            </div>
            <div className="p-5 ml-40">
              <Ui text={'보험 추천'} times={2000} />
            </div>

            <div className="pt-20 ml-20">
              <Ui text={'AI 컨설턴트로'} times={3000} />
            </div>
            <div className="ml-52">
              <Ui text={'한 번에'} times={3000} />
            </div>
            <div className="flex justify-center pt-20">
              <Ui text={'AI 컨설팅'} times={4000} />
            </div>
            <div className="flex justify-center pt-8">
              <Buttonui text={'시작하기'} times={4000} />
            </div>

            <div className="pt-12 flex justify-center">
              <Logoui times={5000} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
