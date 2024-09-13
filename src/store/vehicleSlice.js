import { createSlice } from '@reduxjs/toolkit';

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
    filteredVehicles: [],
  },
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
      state.filteredVehicles = action.payload;
    },
    filterVehicles: (state, action) => {
      state.filteredVehicles = state.vehicles.filter(vehicle =>
        vehicle.model.toLowerCase().includes(action.payload.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setVehicles, filterVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;
