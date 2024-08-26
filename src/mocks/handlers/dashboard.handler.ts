/* eslint-disable @typescript-eslint/no-unused-vars */
import { http, HttpResponse } from "msw";
import { RuralProducerType } from "../../shared/types/ruralProducer.type";
import { DashboardType } from "../../shared/types/dashboard.type";
import { States } from "../../shared/utils/state";

export const DashboardHandler = [
  http.get("/api/dashboard", () => {
    const responseString = localStorage.getItem("RURAL-PRODUCER-LIST");

    const dashboard: DashboardType = {
      totalFarm: 0,
      totalHectare: 0,
      statePieChart: [],
      culturePieChart: [
        { text: "Café", value: 0 },
        { text: "Milho", value: 0 },
        { text: "Algodão", value: 0 },
        { text: "Soja", value: 0 },
        { text: "Cana de Açucar", value: 0 },
      ],
      landUsePieChart: [
        { text: "Área agricultável", value: 0 },
        { text: "Vegetação", value: 0 },
      ],
    };

    const statePie: { [key: string]: number } = {};

    const response = responseString
      ? (JSON.parse(responseString) as RuralProducerType[])
      : [];

    response.forEach((item) => {
      dashboard.totalFarm++;
      dashboard.totalHectare += Number(item.totalHectares);

      if (statePie[item.state]) {
        statePie[item.state]++;
      } else {
        statePie[item.state] = 1;
      }

      item.cropsPlanted.forEach((crop) => {
        if (dashboard.culturePieChart[crop.value as number]) {
          dashboard.culturePieChart[crop.value as number].value++;
        }
      });
      
      dashboard.landUsePieChart[0].value += Number(item.agriculturalHectares);
      dashboard.landUsePieChart[1].value += Number(item.vegetationHectares);
    });

    Object.keys(statePie).forEach((state) => {
      const text = States.find((s) => s.value === state);
      dashboard.statePieChart.push({
        text: text ? text.label : state,
        value: statePie[state],
      });
    });

    return HttpResponse.json(dashboard);
  }),
];
