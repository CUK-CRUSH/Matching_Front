import { LocationDTO } from '@/type/services/GoogleLocation';
import { useQuery } from '@tanstack/react-query';

const fetchAddress = async (lat: number, lng: number): Promise<string> => {
  const apikey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.status === 'OK') {
    console.log(data);
    return data.results[0].formatted_address;
  } else {
    return '주소를 찾을 수 없습니다.';
  }
};

export const useLocationData = () => {
  const locationQuery = useQuery<LocationDTO, Error>({
    queryKey: ['location'],
    queryFn: () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => reject(new Error('위치 정보를 가져오는 데 실패했습니다.')),
        );
      }),

    refetchOnWindowFocus: false,
    enabled: false,
  });

  const addressQuery = useQuery<string, Error>({
    queryKey: ['address', locationQuery.data?.lat, locationQuery.data?.lng],
    queryFn: () => {
      if (locationQuery.data) {
        return fetchAddress(locationQuery.data.lat, locationQuery.data.lng);
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
