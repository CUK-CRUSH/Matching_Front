import SpinnerImage from '@/assets/Spinner.gif';

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <img src={SpinnerImage} alt="Loading..." className="w-40 h-40" />
  </div>
);

export default Spinner;
