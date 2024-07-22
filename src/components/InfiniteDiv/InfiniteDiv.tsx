interface RefInterface {
    view: (node?: Element | null | undefined) => void;
  }
  
  const InfiniteDiv = ({ view } : RefInterface) => {
    return (
      <>
  
        <div className="" ref={view} ></div>
      </>
    );
  };
  
  export default InfiniteDiv;