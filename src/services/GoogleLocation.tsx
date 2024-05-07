import useOnboardingStore from '@/store/validationStore';
import { LocationDTO } from '@/type/services/GoogleLocation';
import { useQuery } from '@tanstack/react-query';

const fetchAddress = async (lat: number, lng: number): Promise<string> => {
  const apikey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.status === 'OK' && data.results?.length > 2) {
    return data.results[2].formatted_address;
  } else {
    throw new Error('주소를 찾을 수 없습니다.');
  }
};

export const useLocationData = () => {
  const { setUserData } = useOnboardingStore();

  const locationQuery = useQuery<LocationDTO, Error>({
    queryKey: ['location'],
    queryFn: () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserData('location_X', latitude);
            setUserData('location_Y', longitude);
            resolve({ lat: latitude, lng: longitude });
          },
          (error) => reject(new Error('위치 정보를 가져오는 데 실패했습니다.')),
        );
      }),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const addressQuery = useQuery({
    queryKey: ['address', locationQuery.data?.lat, locationQuery.data?.lng],
    queryFn: async () => {
      if (locationQuery.data) {
        const address = await fetchAddress(locationQuery.data.lat, locationQuery.data.lng);
        setUserData('address', address);
        return address;
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
