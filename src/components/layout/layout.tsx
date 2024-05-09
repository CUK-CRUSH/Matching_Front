import { LayoutDTO } from '@/type/Layout/layout';

const Layout = ({ children, display = 'none', backgroundColor = '#fff' }: LayoutDTO) => {
  const paddingTop = display === 'footer' || display === 'none' ? 'pt-0' : 'pt-[60px]';

  const paddingBottom = display === 'header' || display === 'none' ? 'pb-0' : 'pb-[120px]';

  return (
    <div className="flex flex-col min-h-screen h-screen overflow-hidden ">
      <div
        className={`${paddingTop} ${paddingBottom} flex flex-1 justify-center items-start overflow-auto scrollbar-hide`}
      >
        <main 
          className={`w-full bg-[${backgroundColor}] max-w-[430px] h-full scrollbar-hide overflow-y-auto relative font-Pretendard`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
