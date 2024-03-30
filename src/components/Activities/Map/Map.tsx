import { useEffect, useRef } from "react";

interface MapProps {
  ativityAddress: string;
}

const Map = (ativityAddress: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const address = ativityAddress.ativityAddress; // 변환하고 싶은 주소

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      naver.maps.Service.geocode(
        {
          query: address
        },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK) {
            return alert("주소를 찾을 수 없습니다.");
          }

          const result = response.v2.addresses[0];
          const location = new naver.maps.LatLng(+result.y, +result.x);

          const map = new naver.maps.Map(mapRef.current!, {
            center: location,
            zoom: 17
          });

          new naver.maps.Marker({
            position: location,
            map,
            title: result.roadAddress
          });
        }
      );
    }
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-[450px] rounded-2xl lg:w-full lg:h-[450px]"
    ></div>
  );
};
//style={{ width: "1000px", height: "500px" }}
export default Map;
