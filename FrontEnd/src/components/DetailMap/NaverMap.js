/* global naver */
import { useEffect, useRef } from 'react';

const NAVER_MAP_CLIENT_ID = process.env.REACT_APP_ALL_NAVER_MAP_CLIENT_ID;

const NaverMap = () => {
  const mapRef = useRef(null);
  const polygonsRef = useRef([]);
  const detailModeRef = useRef(false);

  useEffect(() => {
    let map = null;
    let marker = null;
    let markerInfoWindow = null;

    // 네이버 지도 스크립트 동적 로딩 및 중복 방지
    const loadNaverScript = () => {
      if (window.naver && window.naver.maps) {
        loadMap();
      } else {
        const scriptId = 'naver-maps-script';
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`;
          script.async = true;
          script.onload = loadMap;
          document.head.appendChild(script);
        } else {
          document.getElementById(scriptId).onload = loadMap;
        }
      }
    };

    function loadMap() {
      map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.566826, 126.9786567),
        zoom: 8,
      });

      // === [1] 마커(핀) 생성 ===
      marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.566826, 126.9786567),
        map,
        title: '서울시청',
      });

      // === [2] 마커 인포윈도우 생성 ===
      markerInfoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:8px;">여기가 서울시청입니다</div>`,
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        markerInfoWindow.open(map, marker);
      });

      // === [3] 지도 폴리곤 관련 기능은 그대로 ===
      loadGeoJson('json/SiDo_ver2308.json');

      naver.maps.Event.addListener(map, 'zoom_changed', () => {
        const zoom = map.getZoom();
        if (!detailModeRef.current && zoom >= 9) {
          detailModeRef.current = true;
          removePolygons();
          loadGeoJson('json/SiGunGoo_ver2308.json');
        } else if (detailModeRef.current && zoom < 9) {
          detailModeRef.current = false;
          removePolygons();
          loadGeoJson('json/SiDo_ver2308.json');
        }
      });
    }

    async function loadGeoJson(path) {
      try {
        const res = await fetch(path);
        const geojson = await res.json();
        geojson.features.forEach(displayArea);
      } catch (err) {
        console.error(`GeoJSON load error: ${path}`, err);
      }
    }

    async function loadFilteredSigJson(regionCode) {
      try {
        const res = await fetch('json/SiGunGoo_ver2308.json');
        const geojson = await res.json();
        const filtered = geojson.features.filter(f =>
          (f.properties.SIG_CD || '').startsWith(regionCode)
        );
        filtered.forEach(displayArea);
      } catch (err) {
        console.error('Filtered SiGunGoo.json load error', err);
      }
    }

    function displayArea(feature) {
      const coords = feature.geometry.coordinates;
      const name = feature.properties.SIG_KOR_NM || feature.properties.name;
      const location = feature.properties.SIG_CD || '';
      let paths = [];

      if (feature.geometry.type === 'Polygon') {
        paths = coords[0].map(c => new naver.maps.LatLng(c[1], c[0]));
      } else if (feature.geometry.type === 'MultiPolygon') {
        paths = coords.flatMap(polygon =>
          polygon[0].map(c => new naver.maps.LatLng(c[1], c[0]))
        );
      }

      const polygon = new naver.maps.Polygon({
        map,
        paths,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ffffff',
        fillOpacity: 0.7,
      });

      // 폴리곤 InfoWindow
      const polyInfoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:4px;">${name}</div>`,
        backgroundColor: '#fff',
        borderColor: '#333',
        borderWidth: 1,
        anchorSize: new naver.maps.Size(10, 10),
      });

      naver.maps.Event.addListener(polygon, 'mouseover', (e) => {
        polygon.setOptions({ fillColor: '#09f' });
        polyInfoWindow.open(map, e.coord);
      });

      naver.maps.Event.addListener(polygon, 'mousemove', (e) => {
        polyInfoWindow.setPosition(e.coord);
      });

      naver.maps.Event.addListener(polygon, 'mouseout', () => {
        polygon.setOptions({ fillColor: '#ffffff' });
        polyInfoWindow.close();
      });

      naver.maps.Event.addListener(polygon, 'click', (e) => {
        map.panTo(e.coord);
        if (!detailModeRef.current) {
          map.setZoom(10);
          detailModeRef.current = true;
          removePolygons();
          loadFilteredSigJson(location.substring(0, 2));
        }
      });

      polygonsRef.current.push(polygon);
    }

    function removePolygons() {
      polygonsRef.current.forEach(p => p.setMap(null));
      polygonsRef.current = [];
    }

    loadNaverScript();

    // 클린업: 폴리곤, 마커 등 지도 위 객체 제거
    return () => {
      polygonsRef.current.forEach(p => p.setMap(null));
      polygonsRef.current = [];
      if (marker) marker.setMap(null);
      if (markerInfoWindow) markerInfoWindow.close();
    };
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default NaverMap;
