import MoonLoader from 'react-spinners/MoonLoader';

function MyComponent() {
  return (
    <div className="my-component">
      <MoonLoader size={150} color={'#123abc'} loading={true} />
    </div>
  );
}

export default MyComponent;
