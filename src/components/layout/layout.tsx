import { useRecoilValue, useResetRecoilState } from 'recoil';
import Header from './header';
import { heightState } from '@/atom/customHeight';
import { typeHeightState } from '@/atom/typedHeight';
import { useEffect } from 'react';

interface LayoutProp {
  children: React.ReactNode;
  footerHidden?: boolean;
}

const Layout = ({ children }: LayoutProp) => {
  const customHeight = useRecoilValue(heightState);
  const typedHeight = useRecoilValue(typeHeightState);
  const typedHeightPx = `${typedHeight}px`;
  const resetHeight = useResetRecoilState(heightState);
  const resetTypedHeight = useResetRecoilState(typeHeightState);

  const newHeightCalculation = `${customHeight.slice(0, -1)} + ${typedHeightPx})`;

  useEffect(() => {
    return () => {
      resetHeight();
      resetTypedHeight();
    };
  }, [resetHeight, resetTypedHeight]);

  return (
    <>
      <div className="flex-1  flex-col w-full flex justify-center">
        <main className="max-w-[430px] overflow-hidden scrollbar-hide w-full bg-white overflow-y-scroll overflow-x-hidden relative mx-auto">
          <Header />
          <div
            style={{ height: newHeightCalculation, overflow: 'auto' }}
            className="flex-grow bg-white overflow-hidden scrollbar-hide"
          >
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
