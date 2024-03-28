import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/routes';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleClickNavigateHomeButton = () => {
    navigate(pageRoutes.main, { replace: true });
  };

  return (
    <div
      id="error-page"
      className="flex flex-col justify-center align-center p-20 text-center h-screen"
    >
      <p className="text-3xl">페이지 경로가</p>
      <p className="text-3xl">잘못되었습니다.</p>
      <div className="m-10 w-25">
        <button
          className="text-2xl bg-gray-100 p-4 rounded-lg"
          onClick={handleClickNavigateHomeButton}
        >
          <p>홈으로 이동</p>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
