

import { Get, Use } from "@lib/httpMethod";
import AuthController from "./auth/controller";
import BusesController from "./buses/controller";
import RoutesController from "./routes/controller";
import SchedulesController from "./schedules/controller";
import DriversController from "./drivers/controller";

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
}


export class ApiRouter {
    @Use()
    api = RootRouter

    @Get("/health")
    health() {
        return { status: "ok" };
    }
}
