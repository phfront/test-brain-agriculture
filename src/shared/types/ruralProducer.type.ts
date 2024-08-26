import { SelectOption } from "./select.type";

export type RuralProducerType = {
  id: number;
  document: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalHectares: number;
  agriculturalHectares: number;
  vegetationHectares: number;
  cropsPlanted: SelectOption[]
};
