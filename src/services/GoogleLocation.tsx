import { useQuery } from '@tanstack/react-query';
import useOnboardingStore from '@/store/validationStore';

declare global {
  interface Window {
    kakao: any; // `kakao` 객체에 대한 타입 정의
  }
}

type LocationDTO = {
  lat: number;
  lng: number;
};

export const useLocationData = () => {
  const { setUserData } = useOnboardingStore();

  const locationQuery = useQuery<LocationDTO, Error>({
    queryKey: ['location'],
    queryFn: () =>
      new Promise<LocationDTO>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserData('location', [latitude, longitude]);

            resolve({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Geolocation error:', error);
            reject(new Error('위치 정보를 가져오는 데 실패했습니다.'));
          },
        );
      }),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const addressQuery = useQuery<string, Error>({
    queryKey: ['address', locationQuery.data?.lat, locationQuery.data?.lng],
    queryFn: () => {
      if (locationQuery.data) {
        return new Promise<string>((resolve, reject) => {
          const geocoder = new window.kakao.maps.services.Geocoder();
          const coord = new window.kakao.maps.LatLng(
            locationQuery.data.lat,
            locationQuery.data.lng,
          );

          geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              resolve(result[0].address.address_name);
            } else {
              reject(new Error('주소를 찾을 수 없습니다.'));
            }
          });
        });
      }
      throw new Error('Location data is not available');
    },
    enabled: !!locationQuery.data,
    refetchOnWindowFocus: false,
  });

  return {
    locationQuery,
    addressQuery,
  };
};
