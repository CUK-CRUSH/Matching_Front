import Logo from '@/assets/MetLife_logo.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  };
  return (
    <header className=" text-black p-4 mx-auto  w-full">
      <img className="cursor-pointer" onClick={handleHome} src={Logo} />
      <h1 className="font-bold">Team. 8Seconds</h1>
    </header>
  );
};

export default Header;
