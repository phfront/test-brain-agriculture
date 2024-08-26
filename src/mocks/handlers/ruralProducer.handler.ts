/* eslint-disable @typescript-eslint/no-unused-vars */
import { http, HttpResponse } from "msw";
import { RuralProducerType } from "../../shared/types/ruralProducer.type";

export const RuralProducerHandler = [
  http.get("/api/ruralProducer", () => {
    const responseString = localStorage.getItem("RURAL-PRODUCER-LIST");

    const response = responseString ? JSON.parse(responseString) : [];

    return HttpResponse.json(response);
  }),

  http.get("/api/ruralProducer/:id", ({ params }) => {
    const responseString = localStorage.getItem("RURAL-PRODUCER-LIST");

    const list = responseString
      ? (JSON.parse(responseString) as RuralProducerType[])
      : [];

    const ruralProducer = list.find((item) => item.id === Number(params.id));

    if (ruralProducer) {
      return HttpResponse.json(ruralProducer);
    }
    return HttpResponse.error();
  }),

  http.post("/api/ruralProducer", async ({ request }) => {
    const responseString = localStorage.getItem("RURAL-PRODUCER-LIST");
    const body = (await request.json()) as RuralProducerType;

    let list: RuralProducerType[] = [];

    if (responseString) {
      try {
        list = JSON.parse(responseString);
      } catch (error) {
        list = [];
      }
    }

    let id = 1;

    if (list.length) {
      id =
        list
          .map((i) => i.id)
          .reduce(
            (max, current) => (current > max ? current : max),
            list.map((i) => i.id)[0]
          ) + 1;
    }

    list.push({ ...body, id });

    localStorage.setItem("RURAL-PRODUCER-LIST", JSON.stringify(list));

    return HttpResponse.json(true);
  }),

  http.put("/api/ruralProducer/:id", async ({ request, params }) => {
    const id = Number(params.id);
    const responseString = localStorage.getItem("RURAL-PRODUCER-LIST");
    const body = (await request.json()) as RuralProducerType;

    let list: RuralProducerType[] = [];

    if (responseString) {
      try {
        list = JSON.parse(responseString);
      } catch (error) {
        list = [];
      }
    }
    
    const index = list.findIndex(item => item.id === id);

    console.log(index)

    if (index > -1) {
      list[index] = {
        ...list[index],
        ...body
      };
    }

    localStorage.setItem("RURAL-PRODUCER-LIST", JSON.stringify(list));

    return HttpResponse.json(true);
  }),

  http.delete("/api/ruralProducer/:id", ({ params }) => {
    const { id } = params;

    const responseString = localStorage.getItem("RURAL-PRODUCER-LIST");
    let list: RuralProducerType[] = [];
    if (responseString) {
      try {
        list = JSON.parse(responseString);
      } catch (error) {
        list = [];
      }
    }

    list = list.filter((item) => item.id !== Number(id));

    localStorage.setItem("RURAL-PRODUCER-LIST", JSON.stringify(list));

    return HttpResponse.json(true);
  }),
];
