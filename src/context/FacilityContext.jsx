import React, { createContext, useContext, useState } from 'react';

const FacilityContext = createContext(null);

export const FACILITIES = [
  { id: 'ALL', name: 'All Spartan Facilities', code: 'ALL-HQ' },
  { id: 'LOC-1', name: 'South Campus Turf', code: 'SC-TURF' },
  { id: 'LOC-2', name: 'Ron\'s Private Facility', code: 'RON-HQ' },
  { id: 'LOC-3', name: 'Downtown Studio', code: 'DT-STUDIO' }
];

export const FacilityProvider = ({ children }) => {
  const [activeFacility, setActiveFacility] = useState(FACILITIES[0]);

  return (
    <FacilityContext.Provider value={{ activeFacility, setActiveFacility, facilities: FACILITIES }}>
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacility = () => {
  const context = useContext(FacilityContext);
  if (!context) throw new Error('useFacility must be used within FacilityProvider');
  return context;
};
