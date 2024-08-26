import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RuralProducerType } from "../../shared/types/ruralProducer.type";

export interface RuralProducerState {
  data: RuralProducerType;
  list: RuralProducerType[];
}

const initialState: RuralProducerState = {
  data: {
    id: 0,
    document: "",
    producerName: "",
    farmName: "",
    city: "",
    state: "",
    totalHectares: 0,
    agriculturalHectares: 0,
    vegetationHectares: 0,
    cropsPlanted: [],
  },
  list: [],
};

const ruralProducerSlice = createSlice({
  name: "ruralProducer",
  initialState,
  reducers: {
    setRuralProducer(
      state: RuralProducerState,
      action: PayloadAction<RuralProducerType>
    ) {
      state.data = { ...state.data, ...action.payload };
    },
    updateRuralProducerList(
      state: RuralProducerState,
      action: PayloadAction<RuralProducerType[]>
    ) {
      state.list = action.payload;
    },
  },
});

export const { setRuralProducer, updateRuralProducerList } =
  ruralProducerSlice.actions;
export default ruralProducerSlice.reducer;
