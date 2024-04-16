import Header from './header';

interface LayoutProp {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProp) => {
  return (
    <>
      <div className="flex-1  flex-col w-full flex justify-center">
        <main className="max-w-[430px] overflow-hidden scrollbar-hide w-full bg-white overflow-y-scroll overflow-x-hidden relative mx-auto">
          <Header />
          <div className="flex-grow bg-white overflow-hidden scrollbar-hide">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
