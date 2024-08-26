import { setupWorker } from "msw/browser";
import { RuralProducerHandler } from "./handlers/ruralProducer.handler";
import { DashboardHandler } from "./handlers/dashboard.handler";

const handlers = [...RuralProducerHandler, ...DashboardHandler];

export const worker = setupWorker(...handlers);

