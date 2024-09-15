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
      state.filteredVehicles = state.vehicles.filter(vehicle => {
        const model = vehicle.Model ? vehicle.Model.toLowerCase() : '';
        const manufacturer = vehicle.Manufacturer ? vehicle.Manufacturer.toLowerCase() : '';
        const type = vehicle.Type ? vehicle.Type.toLowerCase() : ''; // Type field ko include kiya
        const searchTerm = action.payload.toLowerCase();
    
        return model.includes(searchTerm) || manufacturer.includes(searchTerm) || type.includes(searchTerm);
      });
    },
  },
});

export const { setVehicles, filterVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;
