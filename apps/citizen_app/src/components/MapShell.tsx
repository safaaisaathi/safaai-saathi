import React, { useEffect, useRef, useState, useCallback } from 'react';

import { Ward, Van } from '../types';

import { Language, translations } from '../core/localization';

import { ContourCard } from './ContourCard';

import { GeoService, LocationCoords } from '../services/simulationService';

import { SEED_WARDS } from '../core/seedData';

import { CONSTANTS } from '../core/constants';

import {

  AlertOctagon,

  LocateFixed,

  Sparkles,

  ChevronDown,

  ChevronUp,

  MapPin,

  Globe,

  CheckCircle2

} from 'lucide-react';

import { StorageService } from '../services/storageService';

import L from 'leaflet';



interface MapShellProps {

  ward: Ward;

  vans: Van[];

  userLocation: LocationCoords | null;

  lang: Language;

  onReportMissedVan: () => void;

  hasReportedMissed: boolean;

  onOpenPostCollection: () => void;

  onSelectWard?: (ward: Ward) => void;

  onToggleLang?: () => void;

  onOpenSettings?: () => void;

}



export const MapShell: React.FC<MapShellProps> = ({

  ward,

  vans,

  userLocation,

  lang,

  onReportMissedVan,

  hasReportedMissed,

  onOpenPostCollection,

  onSelectWard,

  onToggleLang,

  onOpenSettings,

}) => {

  const t = translations[lang];

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const leafletMapRef = useRef<L.Map | null>(null);

  const vanMarkerRef = useRef<L.Marker | null>(null);

  const userMarkerRef = useRef<L.Marker | null>(null);

  const wardCirclesGroupRef = useRef<L.LayerGroup | null>(null);
  const vansGroupRef = useRef<L.LayerGroup | null>(null);

  const sheetRef = useRef<HTMLDivElement | null>(null);



  // Smooth dragging & sliding state

  const [isFullscreenMap, setIsFullscreenMap] = useState(false);

  const isDraggingRef = useRef<boolean>(false);

  const startYRef = useRef<number>(0);

  const startTranslateYRef = useRef<number>(0);

  const prevWardIdRef = useRef<string>(ward.id);

  const lastEtaTextRef = useRef<string>('');



  const [isCollectedToday, setIsCollectedToday] = useState(StorageService.isGarbageCollectedToday(ward.id));

  const [isDutyOver, setIsDutyOver] = useState(StorageService.isWardDutyOver(ward.id));

  const [allWards, setAllWards] = useState<Ward[]>(() => StorageService.getWards());



  useEffect(() => {

    const handleWardsUpdate = () => {

      setAllWards(StorageService.getWards());

    };

    window.addEventListener('safai_sathi_wards_updated', handleWardsUpdate);

    return () => {

      window.removeEventListener('safai_sathi_wards_updated', handleWardsUpdate);

    };

  }, []);



  useEffect(() => {

    setIsCollectedToday(StorageService.isGarbageCollectedToday(ward.id));

    setIsDutyOver(StorageService.isWardDutyOver(ward.id));



    const handleCollectionUpdate = () => {

      setIsCollectedToday(StorageService.isGarbageCollectedToday(ward.id));

    };

    const handleDutyUpdate = () => {

      setIsDutyOver(StorageService.isWardDutyOver(ward.id));

    };



    window.addEventListener('safai_sathi_collection_updated', handleCollectionUpdate);

    window.addEventListener('safai_sathi_ward_duty_updated', handleDutyUpdate);

    return () => {

      window.removeEventListener('safai_sathi_collection_updated', handleCollectionUpdate);

      window.removeEventListener('safai_sathi_ward_duty_updated', handleDutyUpdate);

    };

  }, [ward.id]);



  // Active van for this ward's route

  const activeVan = vans.find(v => v.routeId === ward.routeId && v.status === 'on_shift') || vans[0];



  const vanDistance = activeVan

    ? GeoService.getDistanceMeters(activeVan.lastLocation, userLocation || ward.center)

    : 0;



  const etaMinutes = GeoService.calculateEtaMinutes(vanDistance, activeVan?.lastLocation.speedKmph);

  const isNear = vanDistance <= CONSTANTS.ARRIVAL_ALERT_RADIUS_M;



  // Initialize Leaflet Map (Runs once on mount)

  useEffect(() => {

    if (!mapContainerRef.current) return;



    if (!leafletMapRef.current) {

      const map = L.map(mapContainerRef.current, {

        center: [ward.center.lat, ward.center.lng],

        zoom: 13,

        zoomControl: false,

        attributionControl: false,

      });



      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

        maxZoom: 19,

      }).addTo(map);



      wardCirclesGroupRef.current = L.layerGroup().addTo(map);
      vansGroupRef.current = L.layerGroup().addTo(map);
      leafletMapRef.current = map;

    }

  }, []);



  // Draw / update ALL Ward boundary sectors on the map

  useEffect(() => {

    if (!leafletMapRef.current || !wardCirclesGroupRef.current) return;

    const map = leafletMapRef.current;

    const group = wardCirclesGroupRef.current;



    group.clearLayers();

    allWards.forEach(w => {
      const isSelected = w.id === ward.id;
      const wardDisplayName = lang === 'gu' ? w.nameGu : w.name;
      const shortName = wardDisplayName.split(' - ')[0];

      // Draw dashed municipal polygon boundary like the reference image
      let layer: L.Polygon | L.Circle;
      if (w.polygon && w.polygon.length >= 3) {
        if (isSelected) {
          // PROMINENTLY HIGHLIGHTED: The citizen's own ward
          layer = L.polygon(w.polygon, {
            color: '#1B7A3F', // Bold municipal green dashed perimeter
            weight: 3.5,
            dashArray: '6, 6', // Crisp dashed style matching reference
            fillColor: '#2ECC71',
            fillOpacity: 0.28, // Luminous, clearly highlighted
            smoothFactor: 1,
          }).addTo(group);
        } else {
          // VERY VERY LIGHT: All other non-residential wards
          layer = L.polygon(w.polygon, {
            color: 'rgba(100, 116, 139, 0.40)', // Subtle soft slate border
            weight: 1.2,
            dashArray: '5, 6',
            fillColor: '#94A3B8',
            fillOpacity: 0.03, // Nearly transparent so map & roads are crystal clear
            smoothFactor: 1,
          }).addTo(group);
        }
      } else {
        // Fallback for legacy wards without polygon
        layer = L.circle([w.center.lat, w.center.lng], {
          radius: w.radiusM || 1800,
          color: isSelected ? '#1B7A3F' : 'rgba(148, 163, 184, 0.35)',
          weight: isSelected ? 3 : 1,
          dashArray: '5, 6',
          fillColor: isSelected ? '#2ECC71' : '#CBD5E1',
          fillOpacity: isSelected ? 0.25 : 0.02,
        }).addTo(group);
      }

      layer.on('click', () => {
        if (onSelectWard) {
          onSelectWard(w);
        }
      });

      // Interactive hover highlight for non-selected wards
      layer.on('mouseover', (e: any) => {
        if (!isSelected) {
          e.target.setStyle({ fillOpacity: 0.12, weight: 1.8, color: '#1B7A3F' });
        }
      });
      layer.on('mouseout', (e: any) => {
        if (!isSelected) {
          e.target.setStyle({ fillOpacity: 0.03, weight: 1.2, color: 'rgba(100, 116, 139, 0.40)' });
        }
      });

      // Center Badge Marker:
      // Vibrant with "Your Ward" for the resident's ward; very subtle & faint for other wards
      const wardLabelHtml = isSelected
        ? `
          <div style="
            background: linear-gradient(135deg, #1B7A3F 0%, #145E30 100%);
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 20px;
            white-space: nowrap;
            box-shadow: 0 4px 14px rgba(27,122,63,0.45);
            border: 2px solid #ffffff;
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: pointer;
            transform: scale(1.04);
          ">
            <span>📍</span>
            <span>${shortName}</span>
            <span style="
              background: rgba(255,255,255,0.25);
              font-size: 9px;
              padding: 1px 6px;
              border-radius: 10px;
              font-weight: 700;
            ">${lang === 'gu' ? 'તમારો વિસ્તાર' : 'Your Ward'}</span>
          </div>
        `
        : `
          <div style="
            background: rgba(255, 255, 255, 0.78);
            color: #64748B;
            font-size: 10px;
            font-weight: 600;
            padding: 2px 7px;
            border-radius: 12px;
            white-space: nowrap;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
            border: 1px solid rgba(203, 213, 225, 0.7);
            cursor: pointer;
            opacity: 0.7;
          ">
            ${shortName}
          </div>
        `;

      const wardLabelIcon = L.divIcon({
        className: isSelected ? 'ward-label-marker-selected' : 'ward-label-marker-dim',
        html: wardLabelHtml,
        iconAnchor: isSelected ? [55, 16] : [35, 12],
        iconSize: isSelected ? [110, 32] : [70, 24],
      });

      const marker = L.marker([w.center.lat, w.center.lng], {
        icon: wardLabelIcon,
        zIndexOffset: isSelected ? 500 : 100,
      }).addTo(group);

      marker.on('click', () => {
        if (onSelectWard) {
          onSelectWard(w);
        }
      });
    });



    // Fly to current ward center smoothly only when ward ID actually changes

    if (prevWardIdRef.current !== ward.id) {

      prevWardIdRef.current = ward.id;

      map.flyTo([ward.center.lat, ward.center.lng], 13, { duration: 0.8 });

    }

  }, [ward.id, lang, onSelectWard, allWards]);



  // Invalidate map size when fullscreen toggled

  useEffect(() => {

    if (leafletMapRef.current) {

      const timer = setTimeout(() => {

        leafletMapRef.current?.invalidateSize();

      }, 350);

      return () => clearTimeout(timer);

    }

  }, [isFullscreenMap]);



  // Render All City Vehicles with Active Van Highlight (matching reference design)
  useEffect(() => {
    if (!leafletMapRef.current || !vansGroupRef.current) return;
    const group = vansGroupRef.current;
    group.clearLayers();

    vans.forEach(v => {
      const isCurrentWardVan = activeVan && v.id === activeVan.id;
      const vanPos: [number, number] = [v.lastLocation.lat, v.lastLocation.lng];
      const isMoving = (v.lastLocation.speedKmph || 0) > 0;

      const vanIconHtml = `
        <div class="relative flex flex-col items-center">
          ${
            isCurrentWardVan
              ? `
                <div class="bg-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-[#14201A] shadow-md border border-[#DCE5D9] mb-1 whitespace-nowrap animate-bounce">
                  ${isNear ? '🚨 ' + (lang === 'gu' ? 'નજીક છે' : 'Arriving') : etaMinutes + ' ' + t.etaMinutes}
                </div>
              `
              : ''
          }
          <div class="relative w-10 h-10 rounded-full ${
            isCurrentWardVan ? 'bg-[#1B7A3F]' : isMoving ? 'bg-[#059669]' : 'bg-[#D97706]'
          } border-2 border-white shadow-lg flex items-center justify-center text-white">
            <span class="text-base select-none">🚛</span>
            ${
              isCurrentWardVan
                ? '<span class="absolute inset-0 rounded-full border-2 border-[#1B7A3F] animate-ping opacity-60"></span>'
                : ''
            }
          </div>
          <div class="bg-[#14201A]/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-1 shadow-sm border border-white/20 whitespace-nowrap tracking-tight">
            ${v.plateNo}
          </div>
        </div>
      `;

      const vanMarker = L.marker(vanPos, {
        icon: L.divIcon({
          className: isCurrentWardVan ? 'active-van-marker' : 'other-van-marker',
          html: vanIconHtml,
          iconSize: [60, isCurrentWardVan ? 76 : 60],
          iconAnchor: [30, isCurrentWardVan ? 76 : 56],
        }),
        zIndexOffset: isCurrentWardVan ? 1000 : 300,
      }).addTo(group);

      if (!isCurrentWardVan) {
        vanMarker.bindPopup(`
          <div class="p-1 text-xs">
            <p class="font-bold text-[#14201A]">🚛 Van ${v.plateNo}</p>
            <p class="text-gray-500 text-[10px]">${isMoving ? 'Moving • ' + v.lastLocation.speedKmph + ' km/h' : 'Stationary'}</p>
          </div>
        `);
      }
    });
  }, [vans, activeVan?.id, etaMinutes, isNear, lang, t.etaMinutes]);



  // Update User Location Dot

  useEffect(() => {

    if (!leafletMapRef.current || !userLocation) return;

    const map = leafletMapRef.current;

    const pos: [number, number] = [userLocation.lat, userLocation.lng];



    const userIconHtml = `

      <div class="relative w-6 h-6 flex items-center justify-center">

        <span class="absolute inset-0 rounded-full bg-[#F0873A] opacity-30 animate-ping"></span>

        <div class="w-4 h-4 rounded-full bg-[#F0873A] border-2 border-white shadow-md"></div>

      </div>

    `;



    const userIcon = L.divIcon({

      className: 'custom-user-marker',

      html: userIconHtml,

      iconSize: [24, 24],

      iconAnchor: [12, 12],

    });



    if (userMarkerRef.current) {

      userMarkerRef.current.setLatLng(pos);

    } else {

      userMarkerRef.current = L.marker(pos, { icon: userIcon }).addTo(map);

    }

  }, [userLocation]);



  // Recenter Map on Active Van

  const handleRecenter = () => {

    if (!leafletMapRef.current || !activeVan) return;

    leafletMapRef.current.flyTo(

      [activeVan.lastLocation.lat, activeVan.lastLocation.lng],

      14,

      { duration: 0.8 }

    );

  };



  // Smooth Snap State for Draggable Bottom Sheet

  const setSheetState = useCallback((collapsed: boolean) => {

    setIsFullscreenMap(collapsed);

    if (sheetRef.current) {

      sheetRef.current.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';

      sheetRef.current.style.transform = collapsed ? 'translateY(calc(100% - 68px))' : 'translateY(0px)';

    }

  }, []);



  // Gesture Handlers for Bottom Sheet Dragging

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {

    isDraggingRef.current = true;

    startYRef.current = e.clientY;

    const sheetHeight = sheetRef.current?.offsetHeight || 380;

    startTranslateYRef.current = isFullscreenMap ? (sheetHeight - 68) : 0;

    if (sheetRef.current) {

      sheetRef.current.style.transition = 'none';

      try {

        e.currentTarget.setPointerCapture(e.pointerId);

      } catch {}

    }

  };



  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {

    if (!isDraggingRef.current || !sheetRef.current) return;

    const deltaY = e.clientY - startYRef.current;



    if (!isFullscreenMap) {

      if (deltaY > 0) {

        sheetRef.current.style.transform = `translateY(${deltaY}px)`;

      } else {

        sheetRef.current.style.transform = `translateY(${deltaY * 0.2}px)`;

      }

    } else {

      const sheetHeight = sheetRef.current.offsetHeight || 380;

      const collapsedOffset = sheetHeight - 68;

      const newOffset = Math.max(0, collapsedOffset + deltaY);

      sheetRef.current.style.transform = `translateY(${newOffset}px)`;

    }

  };



  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {

    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    try {

      e.currentTarget.releasePointerCapture(e.pointerId);

    } catch {}



    const deltaY = e.clientY - startYRef.current;

    if (!isFullscreenMap) {

      if (deltaY > 80) {

        setSheetState(true);

      } else {

        setSheetState(false);

      }

    } else {

      if (deltaY < -40) {

        setSheetState(false);

      } else {

        setSheetState(true);

      }

    }

  };



  // Concise subtitle to prevent card text wrap & vertical overflow

  const cardSubtitle = isDutyOver

    ? (isCollectedToday

        ? (lang === 'gu' ? 'આજનું કચરા કલેક્શન સફળતાપૂર્વક નોંધાયેલ છે' : 'Waste collection recorded for today')

        : (lang === 'gu' ? 'આ વિસ્તારમાં આજની સેવા સંપન્ન થઈ ગઈ છે' : 'Duty completed in this area for today'))

    : isNear

    ? t.arrived

    : activeVan

    ? `${activeVan.plateNo} • ${activeVan.driverName || 'Driver'} • ${(lang === 'gu' ? ward.nameGu : ward.name).split(' - ')[0]}`

    : t.noVanOnRoute;



  return (

    <div className="relative w-full h-full overflow-hidden bg-[#E9F1E6]">

      {/* 1. Interactive Leaflet Map Canvas */}

      <div

        ref={mapContainerRef}

        className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing"

      />



      {/* Floating Header Banner: Ward Details & Civic Scope Badge */}

      <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between">

        <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-elev2 border border-[#DCE5D9] flex items-center gap-2 pointer-events-auto">

          <MapPin className="w-4 h-4 text-[#1B7A3F] shrink-0" />

          <div className="flex flex-col">

            <span className="text-xs font-bold text-[#14201A] leading-tight">

              {(lang === 'gu' ? ward.nameGu : ward.name).split(' - ')[0]}

            </span>

            <span className="text-[10px] text-[#566259] leading-tight font-medium">

              {ward.type === 'rural' ? (lang === 'gu' ? 'ગ્રામ પંચાયત' : 'Gram Panchayat') : (lang === 'gu' ? 'નગરપાલિકા વોર્ડ' : 'Ward')} • {ward.code}

            </span>

          </div>

        </div>



        {/* Quick Settings & Language Shortcut */}

        <div className="flex items-center gap-1.5 pointer-events-auto">

          {onToggleLang && (

            <button

              onClick={onToggleLang}

              className="px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-elev2 border border-[#DCE5D9] text-xs font-bold text-[#1B7A3F] flex items-center gap-1 active:scale-95 transition"

              title="Change Language"

            >

              <Globe className="w-3.5 h-3.5" />

              <span>{lang === 'gu' ? 'EN' : 'ગુ'}</span>

            </button>

          )}

          {onOpenSettings && (

            <button

              onClick={onOpenSettings}

              className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md shadow-elev2 border border-[#DCE5D9] text-[#14201A] flex items-center justify-center active:scale-95 transition"

              title="Settings & Ward Selector"

            >

              ⚙️

            </button>

          )}

        </div>

      </div>



      {/* Floating Map Controls: Clean Recenter Button */}

      <div

        className={`absolute right-4 z-20 transition-all duration-300 ${

          isFullscreenMap ? 'bottom-24' : 'bottom-[330px]'

        }`}

      >

        <button

          onClick={handleRecenter}

          className="w-11 h-11 rounded-full bg-white text-[#111A14] shadow-elev2 border border-[#DCE5D9] flex items-center justify-center active:scale-95 transition"

          aria-label="Recenter van"

          title="Recenter Map on Van"

        >

          <LocateFixed className="w-5 h-5 text-[#1B7A3F]" />

        </button>

      </div>



      {/* 2. Draggable Bottom Sheet (Compact, 100% visible on screen without scrolling) */}

      <div

        ref={sheetRef}

        style={{

          transform: isFullscreenMap ? 'translateY(calc(100% - 68px))' : 'translateY(0px)',

          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',

        }}

        className="absolute left-0 right-0 bottom-0 z-10 bg-white rounded-t-[28px] shadow-elev3 border-t border-[#DCE5D9] flex flex-col will-change-transform touch-none"

      >

        {/* Top Grab Handle & Optional Collapsed Status Bar */}

        <div

          onPointerDown={handlePointerDown}

          onPointerMove={handlePointerMove}

          onPointerUp={handlePointerUp}

          onPointerCancel={handlePointerUp}

          onClick={() => {

            if (isFullscreenMap) setSheetState(false);

          }}

          className="w-full pt-2.5 pb-2 px-5 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"

        >

          {/* Minimalist handle notch */}

          <div className="w-10 h-1 bg-[#CBD5E1] rounded-full hover:bg-[#1B7A3F] transition mb-1" />



          {/* Collapsed Mode Mini Ticker (Only visible when slid down into Fullscreen Map) */}

          {isFullscreenMap && (

            <div className="w-full flex items-center justify-between py-1">

              <div className="flex items-center gap-2">

                <span className="w-2.5 h-2.5 rounded-full bg-[#1B7A3F] animate-ping shrink-0" />

                <span className="text-xs font-bold text-[#14201A] truncate max-w-[240px]">

                  {isCollectedToday

                    ? (lang === 'gu' ? '✅ કલેક્શન પૂર્ણ' : '✅ Waste Collection Done')

                    : isDutyOver

                    ? (lang === 'gu' ? '🏁 વાનની સેવા પૂર્ણ' : '🏁 Van Duty Completed')

                    : (isNear ? t.arrived : `${t.etaTitle}: ${etaMinutes} ${t.etaMinutes}`)}

                </span>

              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-[#1B7A3F]">

                <span>{lang === 'gu' ? 'વિગત' : 'Details'}</span>

                <ChevronUp className="w-3.5 h-3.5" />

              </div>

            </div>

          )}

        </div>



        {/* Detailed Content inside Bottom Sheet (Directly visible, no scrolling needed) */}

        <div className="px-4 pb-20 pt-1 flex flex-col gap-3">

          {/* Compact Contour Card for Van ETA & Duty Status */}

          <ContourCard

            seed={ward.id.length * 17}

            label={isDutyOver ? (lang === 'gu' ? 'સેવા સંપન્ન' : 'Duty Completed') : t.etaTitle}

            heroValue={

              isDutyOver

                ? (lang === 'gu' ? 'ડ્યૂટી પૂર્ણ' : 'Duty Over')

                : isNear

                ? (lang === 'gu' ? 'નજીક છે' : 'Arrived')

                : etaMinutes

            }

            heroUnit={isDutyOver || isNear ? '' : t.etaMinutes}

            subtitle={cardSubtitle}

            badge={isDutyOver ? 'DUTY COMPLETED' : (activeVan ? activeVan.plateNo : 'ON ROUTE')}

            onAction={isDutyOver && !isCollectedToday ? onOpenPostCollection : undefined}

            actionIcon={isDutyOver && !isCollectedToday ? <Sparkles className="w-5 h-5 text-[#111A14]" /> : undefined}

          />



          {/* Action Buttons: Neatly aligned and 100% visible on screen */}

          <div className="flex flex-col gap-2">

            {/* Primary Action Button when Duty is Over: Confirm Waste Collection */}

            {isDutyOver && !isCollectedToday && (

              <button

                onClick={onOpenPostCollection}

                className="w-full h-11 rounded-full bg-[#1B7A3F] hover:bg-[#156032] text-white text-xs font-bold flex items-center justify-center gap-2 shadow transition active:scale-95"

              >

                <CheckCircle2 className="w-4 h-4" />

                <span>{lang === 'gu' ? 'હાજરી ચકાસો: કચરો આપ્યો?' : 'Confirm: Did you give waste?'}</span>

              </button>

            )}



            {/* Secondary Action: Van didn't arrive */}

            <button

              onClick={onReportMissedVan}

              disabled={hasReportedMissed}

              className={`w-full h-11 rounded-full border text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 ${

                hasReportedMissed

                  ? 'bg-[#E4F1DF] text-[#1B7A3F] border-[#1B7A3F]/30'

                  : 'bg-[#FFEBD9] hover:bg-[#FEDAC0] text-[#B34A0B] border-[#F0873A]/40'

              }`}

            >

              <AlertOctagon className="w-4 h-4" />

              <span>{hasReportedMissed ? t.vanReported : t.vanDidNotArrive}</span>

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

