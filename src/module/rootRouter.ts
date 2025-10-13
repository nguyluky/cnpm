

import { Get, Use } from "@lib/httpMethod";
import AuthController from "./auth/controller";
import BusesController from "./buses/controller";
import RoutesController from "./routes/controller";
import SchedulesController from "./schedules/controller";
import DriversController from "./drivers/controller";
import ParentsController from "./parents/controller";
import StoppointsController from "./stoppoints/controller";

class RootRouter {
    @Use()
    auth = AuthController

    @Use()
    buses = BusesController

    @Use()
    routes = RoutesController

    @Use()
    schedules = SchedulesController 

    @Use()
    drivers = DriversController

    @Use()
    parents = ParentsController
  
    @Use()
    stoppoints = StoppointsController
}


export class ApiRouter {
    @Use()
    api = RootRouter

    @Get("/health")
    health() {
        return { status: "ok" };
    }
}
