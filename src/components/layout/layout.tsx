interface LayoutProp {
  children: React.ReactNode;
  display?: 'header' | 'footer' | 'both' | 'none';
  backgroundColor?: string;
}

const Layout = ({ children, display = 'none', backgroundColor = 'white' }: LayoutProp) => {
  // Determine the padding top based on the display prop
  const paddingTop = display === 'footer' || display === 'none' ? 'pt-0' : 'pt-[60px]';
  // Determine the padding bottom based on the display prop
  const paddingBottom = display === 'header' || display === 'none' ? 'pb-0' : 'pb-[120px]';

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div
        className={`${paddingTop} ${paddingBottom}  flex flex-1 justify-center items-start overflow-auto scrollbar-hide`}
      >
        <main
          className={`w-full bg-${backgroundColor} max-w-[430px] overflow-y-auto relative font-Pretendard`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
