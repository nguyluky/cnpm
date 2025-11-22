import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const BusScalarFieldEnumSchema = z.enum(['id','licensePlate','capacity','status','meta','createdAt','updatedAt']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const ReportScalarFieldEnumSchema = z.enum(['id','reportType','description','timestamp','reporterId','tripId','meta','createdAt','updatedAt']);

export const RolepermissionsScalarFieldEnumSchema = z.enum(['roleId','permissionId']);

export const RolesScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const RouteScalarFieldEnumSchema = z.enum(['id','name','estimatedDuration','startLocation','endLocation','isActive','meta','createdAt','updatedAt']);

export const RoutestoppointScalarFieldEnumSchema = z.enum(['id','routeId','stopPointId','sequence','direction']);

export const ScheduleScalarFieldEnumSchema = z.enum(['id','routeId','busId','driverId','type','daysOfWeek','startTime','startDate','endDate','status','meta','createdAt','updatedAt']);

export const StoppointScalarFieldEnumSchema = z.enum(['id','name','location','meta','createdAt','updatedAt']);

export const StudentScalarFieldEnumSchema = z.enum(['id','name','meta','userId','createdAt','updatedAt']);

export const StudentassignmentScalarFieldEnumSchema = z.enum(['id','studentId','routeId','stopId','direction','effectiveFrom','effectiveTo','createdAt','updatedAt']);

export const StudentattendanceScalarFieldEnumSchema = z.enum(['id','tripId','studentId','pickupTime','dropoffTime','status']);

export const TrackingbushistoryScalarFieldEnumSchema = z.enum(['id','tripId','timestamp','location']);

export const TripScalarFieldEnumSchema = z.enum(['id','scheduleId','date','actualStartTime','actualEndTime','status','currentStopId','location','createdAt','updatedAt','type']);

export const TripstopScalarFieldEnumSchema = z.enum(['id','tripId','stopId','actualArrival','actualDeparture','status']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','email','passwordHash','createdAt','updatedAt']);

export const UserrolesScalarFieldEnumSchema = z.enum(['userId','roleId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const busOrderByRelevanceFieldEnumSchema = z.enum(['id','licensePlate']);

export const permissionOrderByRelevanceFieldEnumSchema = z.enum(['name']);

export const reportOrderByRelevanceFieldEnumSchema = z.enum(['id','reportType','description','reporterId','tripId']);

export const rolesOrderByRelevanceFieldEnumSchema = z.enum(['name']);

export const routeOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const routestoppointOrderByRelevanceFieldEnumSchema = z.enum(['routeId','stopPointId']);

export const scheduleOrderByRelevanceFieldEnumSchema = z.enum(['id','routeId','busId','driverId']);

export const stoppointOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const studentOrderByRelevanceFieldEnumSchema = z.enum(['id','name','userId']);

export const studentassignmentOrderByRelevanceFieldEnumSchema = z.enum(['id','studentId','routeId','stopId']);

export const studentattendanceOrderByRelevanceFieldEnumSchema = z.enum(['id','tripId','studentId']);

export const trackingbushistoryOrderByRelevanceFieldEnumSchema = z.enum(['id','tripId']);

export const tripOrderByRelevanceFieldEnumSchema = z.enum(['id','scheduleId','currentStopId']);

export const tripstopOrderByRelevanceFieldEnumSchema = z.enum(['id','tripId','stopId']);

export const userOrderByRelevanceFieldEnumSchema = z.enum(['id','username','email','passwordHash']);

export const userrolesOrderByRelevanceFieldEnumSchema = z.enum(['userId']);

export const bus_statusSchema = z.enum(['ACTIVE','MAINTENANCE']);

export type bus_statusType = `${z.infer<typeof bus_statusSchema>}`

export const routestoppoint_directionSchema = z.enum(['PICKUP','DROPOFF']);

export type routestoppoint_directionType = `${z.infer<typeof routestoppoint_directionSchema>}`

export const schedule_typeSchema = z.enum(['MORNING','AFTERNOON']);

export type schedule_typeType = `${z.infer<typeof schedule_typeSchema>}`

export const studentassignment_directionSchema = z.enum(['PICKUP','DROPOFF']);

export type studentassignment_directionType = `${z.infer<typeof studentassignment_directionSchema>}`

export const studentattendance_statusSchema = z.enum(['PENDING','PICKED_UP','DROPPED_OFF','MISSED']);

export type studentattendance_statusType = `${z.infer<typeof studentattendance_statusSchema>}`

export const trip_statusSchema = z.enum(['PLANNED','ONGOING','COMPLETED','CANCELLED']);

export type trip_statusType = `${z.infer<typeof trip_statusSchema>}`

export const tripstop_statusSchema = z.enum(['PENDING','ARRIVED','DONE','SKIPPED']);

export type tripstop_statusType = `${z.infer<typeof tripstop_statusSchema>}`

export const schedule_statusSchema = z.enum(['ACTIVE','INACTIVE']);

export type schedule_statusType = `${z.infer<typeof schedule_statusSchema>}`

export const trip_typeSchema = z.enum(['DISPATCH','RETURN']);

export type trip_typeType = `${z.infer<typeof trip_typeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BUS SCHEMA
/////////////////////////////////////////

export const busSchema = z.object({
  status: bus_statusSchema.nullable(),
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  meta: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type bus = z.infer<typeof busSchema>

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const permissionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type permission = z.infer<typeof permissionSchema>

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const reportSchema = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  reporterId: z.string(),
  tripId: z.string().nullable(),
  meta: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type report = z.infer<typeof reportSchema>

/////////////////////////////////////////
// ROLEPERMISSIONS SCHEMA
/////////////////////////////////////////

export const rolepermissionsSchema = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int(),
})

export type rolepermissions = z.infer<typeof rolepermissionsSchema>

/////////////////////////////////////////
// ROLES SCHEMA
/////////////////////////////////////////

export const rolesSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type roles = z.infer<typeof rolesSchema>

/////////////////////////////////////////
// ROUTE SCHEMA
/////////////////////////////////////////

export const routeSchema = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().nullable(),
  startLocation: JsonValueSchema,
  endLocation: JsonValueSchema,
  isActive: z.boolean().nullable(),
  meta: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type route = z.infer<typeof routeSchema>

/////////////////////////////////////////
// ROUTESTOPPOINT SCHEMA
/////////////////////////////////////////

export const routestoppointSchema = z.object({
  direction: routestoppoint_directionSchema,
  id: z.number().int(),
  routeId: z.string(),
  stopPointId: z.string(),
  sequence: z.number().int(),
})

export type routestoppoint = z.infer<typeof routestoppointSchema>

/////////////////////////////////////////
// SCHEDULE SCHEMA
/////////////////////////////////////////

export const scheduleSchema = z.object({
  type: schedule_typeSchema,
  status: schedule_statusSchema.nullable(),
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  driverId: z.string(),
  daysOfWeek: JsonValueSchema,
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  meta: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type schedule = z.infer<typeof scheduleSchema>

/////////////////////////////////////////
// STOPPOINT SCHEMA
/////////////////////////////////////////

export const stoppointSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: JsonValueSchema,
  meta: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type stoppoint = z.infer<typeof stoppointSchema>

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  meta: JsonValueSchema.nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type student = z.infer<typeof studentSchema>

/////////////////////////////////////////
// STUDENTASSIGNMENT SCHEMA
/////////////////////////////////////////

export const studentassignmentSchema = z.object({
  direction: studentassignment_directionSchema,
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type studentassignment = z.infer<typeof studentassignmentSchema>

/////////////////////////////////////////
// STUDENTATTENDANCE SCHEMA
/////////////////////////////////////////

export const studentattendanceSchema = z.object({
  status: studentattendance_statusSchema.nullable(),
  id: z.string(),
  tripId: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().nullable(),
  dropoffTime: z.coerce.date().nullable(),
})

export type studentattendance = z.infer<typeof studentattendanceSchema>

/////////////////////////////////////////
// TRACKINGBUSHISTORY SCHEMA
/////////////////////////////////////////

export const trackingbushistorySchema = z.object({
  id: z.string(),
  tripId: z.string(),
  timestamp: z.coerce.date(),
  location: JsonValueSchema,
})

export type trackingbushistory = z.infer<typeof trackingbushistorySchema>

/////////////////////////////////////////
// TRIP SCHEMA
/////////////////////////////////////////

export const tripSchema = z.object({
  status: trip_statusSchema.nullable(),
  type: trip_typeSchema,
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().nullable(),
  actualEndTime: z.coerce.date().nullable(),
  currentStopId: z.string().nullable(),
  location: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type trip = z.infer<typeof tripSchema>

/////////////////////////////////////////
// TRIPSTOP SCHEMA
/////////////////////////////////////////

export const tripstopSchema = z.object({
  status: tripstop_statusSchema.nullable(),
  id: z.string(),
  tripId: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().nullable(),
  actualDeparture: z.coerce.date().nullable(),
})

export type tripstop = z.infer<typeof tripstopSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type user = z.infer<typeof userSchema>

/////////////////////////////////////////
// USERROLES SCHEMA
/////////////////////////////////////////

export const userrolesSchema = z.object({
  userId: z.string(),
  roleId: z.number().int(),
})

export type userroles = z.infer<typeof userrolesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BUS
//------------------------------------------------------

export const busIncludeSchema: z.ZodType<Prisma.busInclude> = z.object({
  schedule: z.union([z.boolean(),z.lazy(() => scheduleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BusCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const busArgsSchema: z.ZodType<Prisma.busDefaultArgs> = z.object({
  select: z.lazy(() => busSelectSchema).optional(),
  include: z.lazy(() => busIncludeSchema).optional(),
}).strict();

export const busCountOutputTypeArgsSchema: z.ZodType<Prisma.busCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => busCountOutputTypeSelectSchema).nullish(),
}).strict();

export const busCountOutputTypeSelectSchema: z.ZodType<Prisma.busCountOutputTypeSelect> = z.object({
  schedule: z.boolean().optional(),
}).strict();

export const busSelectSchema: z.ZodType<Prisma.busSelect> = z.object({
  id: z.boolean().optional(),
  licensePlate: z.boolean().optional(),
  capacity: z.boolean().optional(),
  status: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  schedule: z.union([z.boolean(),z.lazy(() => scheduleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BusCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMISSION
//------------------------------------------------------

export const permissionIncludeSchema: z.ZodType<Prisma.permissionInclude> = z.object({
  rolepermissions: z.union([z.boolean(),z.lazy(() => rolepermissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const permissionArgsSchema: z.ZodType<Prisma.permissionDefaultArgs> = z.object({
  select: z.lazy(() => permissionSelectSchema).optional(),
  include: z.lazy(() => permissionIncludeSchema).optional(),
}).strict();

export const permissionCountOutputTypeArgsSchema: z.ZodType<Prisma.permissionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => permissionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const permissionCountOutputTypeSelectSchema: z.ZodType<Prisma.permissionCountOutputTypeSelect> = z.object({
  rolepermissions: z.boolean().optional(),
}).strict();

export const permissionSelectSchema: z.ZodType<Prisma.permissionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  rolepermissions: z.union([z.boolean(),z.lazy(() => rolepermissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const reportIncludeSchema: z.ZodType<Prisma.reportInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripArgsSchema)]).optional(),
}).strict()

export const reportArgsSchema: z.ZodType<Prisma.reportDefaultArgs> = z.object({
  select: z.lazy(() => reportSelectSchema).optional(),
  include: z.lazy(() => reportIncludeSchema).optional(),
}).strict();

export const reportSelectSchema: z.ZodType<Prisma.reportSelect> = z.object({
  id: z.boolean().optional(),
  reportType: z.boolean().optional(),
  description: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  reporterId: z.boolean().optional(),
  tripId: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripArgsSchema)]).optional(),
}).strict()

// ROLEPERMISSIONS
//------------------------------------------------------

export const rolepermissionsIncludeSchema: z.ZodType<Prisma.rolepermissionsInclude> = z.object({
  permission: z.union([z.boolean(),z.lazy(() => permissionArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
}).strict()

export const rolepermissionsArgsSchema: z.ZodType<Prisma.rolepermissionsDefaultArgs> = z.object({
  select: z.lazy(() => rolepermissionsSelectSchema).optional(),
  include: z.lazy(() => rolepermissionsIncludeSchema).optional(),
}).strict();

export const rolepermissionsSelectSchema: z.ZodType<Prisma.rolepermissionsSelect> = z.object({
  roleId: z.boolean().optional(),
  permissionId: z.boolean().optional(),
  permission: z.union([z.boolean(),z.lazy(() => permissionArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
}).strict()

// ROLES
//------------------------------------------------------

export const rolesIncludeSchema: z.ZodType<Prisma.rolesInclude> = z.object({
  rolepermissions: z.union([z.boolean(),z.lazy(() => rolepermissionsFindManyArgsSchema)]).optional(),
  userroles: z.union([z.boolean(),z.lazy(() => userrolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const rolesArgsSchema: z.ZodType<Prisma.rolesDefaultArgs> = z.object({
  select: z.lazy(() => rolesSelectSchema).optional(),
  include: z.lazy(() => rolesIncludeSchema).optional(),
}).strict();

export const rolesCountOutputTypeArgsSchema: z.ZodType<Prisma.rolesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => rolesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const rolesCountOutputTypeSelectSchema: z.ZodType<Prisma.rolesCountOutputTypeSelect> = z.object({
  rolepermissions: z.boolean().optional(),
  userroles: z.boolean().optional(),
}).strict();

export const rolesSelectSchema: z.ZodType<Prisma.rolesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  rolepermissions: z.union([z.boolean(),z.lazy(() => rolepermissionsFindManyArgsSchema)]).optional(),
  userroles: z.union([z.boolean(),z.lazy(() => userrolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROUTE
//------------------------------------------------------

export const routeIncludeSchema: z.ZodType<Prisma.routeInclude> = z.object({
  routestoppoint: z.union([z.boolean(),z.lazy(() => routestoppointFindManyArgsSchema)]).optional(),
  schedule: z.union([z.boolean(),z.lazy(() => scheduleFindManyArgsSchema)]).optional(),
  studentassignment: z.union([z.boolean(),z.lazy(() => studentassignmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RouteCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const routeArgsSchema: z.ZodType<Prisma.routeDefaultArgs> = z.object({
  select: z.lazy(() => routeSelectSchema).optional(),
  include: z.lazy(() => routeIncludeSchema).optional(),
}).strict();

export const routeCountOutputTypeArgsSchema: z.ZodType<Prisma.routeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => routeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const routeCountOutputTypeSelectSchema: z.ZodType<Prisma.routeCountOutputTypeSelect> = z.object({
  routestoppoint: z.boolean().optional(),
  schedule: z.boolean().optional(),
  studentassignment: z.boolean().optional(),
}).strict();

export const routeSelectSchema: z.ZodType<Prisma.routeSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  estimatedDuration: z.boolean().optional(),
  startLocation: z.boolean().optional(),
  endLocation: z.boolean().optional(),
  isActive: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  routestoppoint: z.union([z.boolean(),z.lazy(() => routestoppointFindManyArgsSchema)]).optional(),
  schedule: z.union([z.boolean(),z.lazy(() => scheduleFindManyArgsSchema)]).optional(),
  studentassignment: z.union([z.boolean(),z.lazy(() => studentassignmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RouteCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROUTESTOPPOINT
//------------------------------------------------------

export const routestoppointIncludeSchema: z.ZodType<Prisma.routestoppointInclude> = z.object({
  route: z.union([z.boolean(),z.lazy(() => routeArgsSchema)]).optional(),
  stoppoint: z.union([z.boolean(),z.lazy(() => stoppointArgsSchema)]).optional(),
}).strict()

export const routestoppointArgsSchema: z.ZodType<Prisma.routestoppointDefaultArgs> = z.object({
  select: z.lazy(() => routestoppointSelectSchema).optional(),
  include: z.lazy(() => routestoppointIncludeSchema).optional(),
}).strict();

export const routestoppointSelectSchema: z.ZodType<Prisma.routestoppointSelect> = z.object({
  id: z.boolean().optional(),
  routeId: z.boolean().optional(),
  stopPointId: z.boolean().optional(),
  sequence: z.boolean().optional(),
  direction: z.boolean().optional(),
  route: z.union([z.boolean(),z.lazy(() => routeArgsSchema)]).optional(),
  stoppoint: z.union([z.boolean(),z.lazy(() => stoppointArgsSchema)]).optional(),
}).strict()

// SCHEDULE
//------------------------------------------------------

export const scheduleIncludeSchema: z.ZodType<Prisma.scheduleInclude> = z.object({
  bus: z.union([z.boolean(),z.lazy(() => busArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
  route: z.union([z.boolean(),z.lazy(() => routeArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ScheduleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const scheduleArgsSchema: z.ZodType<Prisma.scheduleDefaultArgs> = z.object({
  select: z.lazy(() => scheduleSelectSchema).optional(),
  include: z.lazy(() => scheduleIncludeSchema).optional(),
}).strict();

export const scheduleCountOutputTypeArgsSchema: z.ZodType<Prisma.scheduleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => scheduleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const scheduleCountOutputTypeSelectSchema: z.ZodType<Prisma.scheduleCountOutputTypeSelect> = z.object({
  trip: z.boolean().optional(),
}).strict();

export const scheduleSelectSchema: z.ZodType<Prisma.scheduleSelect> = z.object({
  id: z.boolean().optional(),
  routeId: z.boolean().optional(),
  busId: z.boolean().optional(),
  driverId: z.boolean().optional(),
  type: z.boolean().optional(),
  daysOfWeek: z.boolean().optional(),
  startTime: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  status: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  bus: z.union([z.boolean(),z.lazy(() => busArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
  route: z.union([z.boolean(),z.lazy(() => routeArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ScheduleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STOPPOINT
//------------------------------------------------------

export const stoppointIncludeSchema: z.ZodType<Prisma.stoppointInclude> = z.object({
  routestoppoint: z.union([z.boolean(),z.lazy(() => routestoppointFindManyArgsSchema)]).optional(),
  studentassignment: z.union([z.boolean(),z.lazy(() => studentassignmentFindManyArgsSchema)]).optional(),
  tripstop: z.union([z.boolean(),z.lazy(() => tripstopFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StoppointCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const stoppointArgsSchema: z.ZodType<Prisma.stoppointDefaultArgs> = z.object({
  select: z.lazy(() => stoppointSelectSchema).optional(),
  include: z.lazy(() => stoppointIncludeSchema).optional(),
}).strict();

export const stoppointCountOutputTypeArgsSchema: z.ZodType<Prisma.stoppointCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => stoppointCountOutputTypeSelectSchema).nullish(),
}).strict();

export const stoppointCountOutputTypeSelectSchema: z.ZodType<Prisma.stoppointCountOutputTypeSelect> = z.object({
  routestoppoint: z.boolean().optional(),
  studentassignment: z.boolean().optional(),
  tripstop: z.boolean().optional(),
}).strict();

export const stoppointSelectSchema: z.ZodType<Prisma.stoppointSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  location: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  routestoppoint: z.union([z.boolean(),z.lazy(() => routestoppointFindManyArgsSchema)]).optional(),
  studentassignment: z.union([z.boolean(),z.lazy(() => studentassignmentFindManyArgsSchema)]).optional(),
  tripstop: z.union([z.boolean(),z.lazy(() => tripstopFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StoppointCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STUDENT
//------------------------------------------------------

export const studentIncludeSchema: z.ZodType<Prisma.studentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
  studentassignment: z.union([z.boolean(),z.lazy(() => studentassignmentFindManyArgsSchema)]).optional(),
  studentattendance: z.union([z.boolean(),z.lazy(() => studentattendanceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const studentArgsSchema: z.ZodType<Prisma.studentDefaultArgs> = z.object({
  select: z.lazy(() => studentSelectSchema).optional(),
  include: z.lazy(() => studentIncludeSchema).optional(),
}).strict();

export const studentCountOutputTypeArgsSchema: z.ZodType<Prisma.studentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => studentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const studentCountOutputTypeSelectSchema: z.ZodType<Prisma.studentCountOutputTypeSelect> = z.object({
  studentassignment: z.boolean().optional(),
  studentattendance: z.boolean().optional(),
}).strict();

export const studentSelectSchema: z.ZodType<Prisma.studentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  meta: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
  studentassignment: z.union([z.boolean(),z.lazy(() => studentassignmentFindManyArgsSchema)]).optional(),
  studentattendance: z.union([z.boolean(),z.lazy(() => studentattendanceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STUDENTASSIGNMENT
//------------------------------------------------------

export const studentassignmentIncludeSchema: z.ZodType<Prisma.studentassignmentInclude> = z.object({
  route: z.union([z.boolean(),z.lazy(() => routeArgsSchema)]).optional(),
  stoppoint: z.union([z.boolean(),z.lazy(() => stoppointArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => studentArgsSchema)]).optional(),
}).strict()

export const studentassignmentArgsSchema: z.ZodType<Prisma.studentassignmentDefaultArgs> = z.object({
  select: z.lazy(() => studentassignmentSelectSchema).optional(),
  include: z.lazy(() => studentassignmentIncludeSchema).optional(),
}).strict();

export const studentassignmentSelectSchema: z.ZodType<Prisma.studentassignmentSelect> = z.object({
  id: z.boolean().optional(),
  studentId: z.boolean().optional(),
  routeId: z.boolean().optional(),
  stopId: z.boolean().optional(),
  direction: z.boolean().optional(),
  effectiveFrom: z.boolean().optional(),
  effectiveTo: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  route: z.union([z.boolean(),z.lazy(() => routeArgsSchema)]).optional(),
  stoppoint: z.union([z.boolean(),z.lazy(() => stoppointArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => studentArgsSchema)]).optional(),
}).strict()

// STUDENTATTENDANCE
//------------------------------------------------------

export const studentattendanceIncludeSchema: z.ZodType<Prisma.studentattendanceInclude> = z.object({
  student: z.union([z.boolean(),z.lazy(() => studentArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripArgsSchema)]).optional(),
}).strict()

export const studentattendanceArgsSchema: z.ZodType<Prisma.studentattendanceDefaultArgs> = z.object({
  select: z.lazy(() => studentattendanceSelectSchema).optional(),
  include: z.lazy(() => studentattendanceIncludeSchema).optional(),
}).strict();

export const studentattendanceSelectSchema: z.ZodType<Prisma.studentattendanceSelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  studentId: z.boolean().optional(),
  pickupTime: z.boolean().optional(),
  dropoffTime: z.boolean().optional(),
  status: z.boolean().optional(),
  student: z.union([z.boolean(),z.lazy(() => studentArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripArgsSchema)]).optional(),
}).strict()

// TRACKINGBUSHISTORY
//------------------------------------------------------

export const trackingbushistoryIncludeSchema: z.ZodType<Prisma.trackingbushistoryInclude> = z.object({
  trip: z.union([z.boolean(),z.lazy(() => tripArgsSchema)]).optional(),
}).strict()

export const trackingbushistoryArgsSchema: z.ZodType<Prisma.trackingbushistoryDefaultArgs> = z.object({
  select: z.lazy(() => trackingbushistorySelectSchema).optional(),
  include: z.lazy(() => trackingbushistoryIncludeSchema).optional(),
}).strict();

export const trackingbushistorySelectSchema: z.ZodType<Prisma.trackingbushistorySelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  location: z.boolean().optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripArgsSchema)]).optional(),
}).strict()

// TRIP
//------------------------------------------------------

export const tripIncludeSchema: z.ZodType<Prisma.tripInclude> = z.object({
  report: z.union([z.boolean(),z.lazy(() => reportFindManyArgsSchema)]).optional(),
  studentattendance: z.union([z.boolean(),z.lazy(() => studentattendanceFindManyArgsSchema)]).optional(),
  trackingbushistory: z.union([z.boolean(),z.lazy(() => trackingbushistoryFindManyArgsSchema)]).optional(),
  schedule: z.union([z.boolean(),z.lazy(() => scheduleArgsSchema)]).optional(),
  tripstop: z.union([z.boolean(),z.lazy(() => tripstopFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const tripArgsSchema: z.ZodType<Prisma.tripDefaultArgs> = z.object({
  select: z.lazy(() => tripSelectSchema).optional(),
  include: z.lazy(() => tripIncludeSchema).optional(),
}).strict();

export const tripCountOutputTypeArgsSchema: z.ZodType<Prisma.tripCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => tripCountOutputTypeSelectSchema).nullish(),
}).strict();

export const tripCountOutputTypeSelectSchema: z.ZodType<Prisma.tripCountOutputTypeSelect> = z.object({
  report: z.boolean().optional(),
  studentattendance: z.boolean().optional(),
  trackingbushistory: z.boolean().optional(),
  tripstop: z.boolean().optional(),
}).strict();

export const tripSelectSchema: z.ZodType<Prisma.tripSelect> = z.object({
  id: z.boolean().optional(),
  scheduleId: z.boolean().optional(),
  date: z.boolean().optional(),
  actualStartTime: z.boolean().optional(),
  actualEndTime: z.boolean().optional(),
  status: z.boolean().optional(),
  currentStopId: z.boolean().optional(),
  location: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  type: z.boolean().optional(),
  report: z.union([z.boolean(),z.lazy(() => reportFindManyArgsSchema)]).optional(),
  studentattendance: z.union([z.boolean(),z.lazy(() => studentattendanceFindManyArgsSchema)]).optional(),
  trackingbushistory: z.union([z.boolean(),z.lazy(() => trackingbushistoryFindManyArgsSchema)]).optional(),
  schedule: z.union([z.boolean(),z.lazy(() => scheduleArgsSchema)]).optional(),
  tripstop: z.union([z.boolean(),z.lazy(() => tripstopFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRIPSTOP
//------------------------------------------------------

export const tripstopIncludeSchema: z.ZodType<Prisma.tripstopInclude> = z.object({
  stoppoint: z.union([z.boolean(),z.lazy(() => stoppointArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripArgsSchema)]).optional(),
}).strict()

export const tripstopArgsSchema: z.ZodType<Prisma.tripstopDefaultArgs> = z.object({
  select: z.lazy(() => tripstopSelectSchema).optional(),
  include: z.lazy(() => tripstopIncludeSchema).optional(),
}).strict();

export const tripstopSelectSchema: z.ZodType<Prisma.tripstopSelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  stopId: z.boolean().optional(),
  actualArrival: z.boolean().optional(),
  actualDeparture: z.boolean().optional(),
  status: z.boolean().optional(),
  stoppoint: z.union([z.boolean(),z.lazy(() => stoppointArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => tripArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const userIncludeSchema: z.ZodType<Prisma.userInclude> = z.object({
  report: z.union([z.boolean(),z.lazy(() => reportFindManyArgsSchema)]).optional(),
  schedule: z.union([z.boolean(),z.lazy(() => scheduleFindManyArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => studentArgsSchema)]).optional(),
  userroles: z.union([z.boolean(),z.lazy(() => userrolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const userArgsSchema: z.ZodType<Prisma.userDefaultArgs> = z.object({
  select: z.lazy(() => userSelectSchema).optional(),
  include: z.lazy(() => userIncludeSchema).optional(),
}).strict();

export const userCountOutputTypeArgsSchema: z.ZodType<Prisma.userCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => userCountOutputTypeSelectSchema).nullish(),
}).strict();

export const userCountOutputTypeSelectSchema: z.ZodType<Prisma.userCountOutputTypeSelect> = z.object({
  report: z.boolean().optional(),
  schedule: z.boolean().optional(),
  userroles: z.boolean().optional(),
}).strict();

export const userSelectSchema: z.ZodType<Prisma.userSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  email: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  report: z.union([z.boolean(),z.lazy(() => reportFindManyArgsSchema)]).optional(),
  schedule: z.union([z.boolean(),z.lazy(() => scheduleFindManyArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => studentArgsSchema)]).optional(),
  userroles: z.union([z.boolean(),z.lazy(() => userrolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USERROLES
//------------------------------------------------------

export const userrolesIncludeSchema: z.ZodType<Prisma.userrolesInclude> = z.object({
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
}).strict()

export const userrolesArgsSchema: z.ZodType<Prisma.userrolesDefaultArgs> = z.object({
  select: z.lazy(() => userrolesSelectSchema).optional(),
  include: z.lazy(() => userrolesIncludeSchema).optional(),
}).strict();

export const userrolesSelectSchema: z.ZodType<Prisma.userrolesSelect> = z.object({
  userId: z.boolean().optional(),
  roleId: z.boolean().optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const busWhereInputSchema: z.ZodType<Prisma.busWhereInput> = z.object({
  AND: z.union([ z.lazy(() => busWhereInputSchema),z.lazy(() => busWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => busWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => busWhereInputSchema),z.lazy(() => busWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licensePlate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => Enumbus_statusNullableFilterSchema),z.lazy(() => bus_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional()
}).strict();

export const busOrderByWithRelationInputSchema: z.ZodType<Prisma.busOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => scheduleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => busOrderByRelevanceInputSchema).optional()
}).strict();

export const busWhereUniqueInputSchema: z.ZodType<Prisma.busWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    licensePlate: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    licensePlate: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  licensePlate: z.string().optional(),
  AND: z.union([ z.lazy(() => busWhereInputSchema),z.lazy(() => busWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => busWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => busWhereInputSchema),z.lazy(() => busWhereInputSchema).array() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => Enumbus_statusNullableFilterSchema),z.lazy(() => bus_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional()
}).strict());

export const busOrderByWithAggregationInputSchema: z.ZodType<Prisma.busOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => busCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => busAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => busMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => busMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => busSumOrderByAggregateInputSchema).optional()
}).strict();

export const busScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.busScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => busScalarWhereWithAggregatesInputSchema),z.lazy(() => busScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => busScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => busScalarWhereWithAggregatesInputSchema),z.lazy(() => busScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  licensePlate: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  capacity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => Enumbus_statusNullableWithAggregatesFilterSchema),z.lazy(() => bus_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const permissionWhereInputSchema: z.ZodType<Prisma.permissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => permissionWhereInputSchema),z.lazy(() => permissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionWhereInputSchema),z.lazy(() => permissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rolepermissions: z.lazy(() => RolepermissionsListRelationFilterSchema).optional()
}).strict();

export const permissionOrderByWithRelationInputSchema: z.ZodType<Prisma.permissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rolepermissions: z.lazy(() => rolepermissionsOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => permissionOrderByRelevanceInputSchema).optional()
}).strict();

export const permissionWhereUniqueInputSchema: z.ZodType<Prisma.permissionWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => permissionWhereInputSchema),z.lazy(() => permissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionWhereInputSchema),z.lazy(() => permissionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rolepermissions: z.lazy(() => RolepermissionsListRelationFilterSchema).optional()
}).strict());

export const permissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.permissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => permissionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => permissionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => permissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => permissionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => permissionSumOrderByAggregateInputSchema).optional()
}).strict();

export const permissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.permissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => permissionScalarWhereWithAggregatesInputSchema),z.lazy(() => permissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionScalarWhereWithAggregatesInputSchema),z.lazy(() => permissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const reportWhereInputSchema: z.ZodType<Prisma.reportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => reportWhereInputSchema),z.lazy(() => reportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => reportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => reportWhereInputSchema),z.lazy(() => reportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
  trip: z.union([ z.lazy(() => TripNullableScalarRelationFilterSchema),z.lazy(() => tripWhereInputSchema) ]).optional().nullable(),
}).strict();

export const reportOrderByWithRelationInputSchema: z.ZodType<Prisma.reportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
  trip: z.lazy(() => tripOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => reportOrderByRelevanceInputSchema).optional()
}).strict();

export const reportWhereUniqueInputSchema: z.ZodType<Prisma.reportWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => reportWhereInputSchema),z.lazy(() => reportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => reportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => reportWhereInputSchema),z.lazy(() => reportWhereInputSchema).array() ]).optional(),
  reportType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
  trip: z.union([ z.lazy(() => TripNullableScalarRelationFilterSchema),z.lazy(() => tripWhereInputSchema) ]).optional().nullable(),
}).strict());

export const reportOrderByWithAggregationInputSchema: z.ZodType<Prisma.reportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => reportCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => reportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => reportMinOrderByAggregateInputSchema).optional()
}).strict();

export const reportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.reportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => reportScalarWhereWithAggregatesInputSchema),z.lazy(() => reportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => reportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => reportScalarWhereWithAggregatesInputSchema),z.lazy(() => reportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const rolepermissionsWhereInputSchema: z.ZodType<Prisma.rolepermissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => rolepermissionsWhereInputSchema),z.lazy(() => rolepermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolepermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolepermissionsWhereInputSchema),z.lazy(() => rolepermissionsWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => permissionWhereInputSchema) ]).optional(),
  roles: z.union([ z.lazy(() => RolesScalarRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
}).strict();

export const rolepermissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.rolepermissionsOrderByWithRelationInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  permission: z.lazy(() => permissionOrderByWithRelationInputSchema).optional(),
  roles: z.lazy(() => rolesOrderByWithRelationInputSchema).optional()
}).strict();

export const rolepermissionsWhereUniqueInputSchema: z.ZodType<Prisma.rolepermissionsWhereUniqueInput> = z.object({
  roleId_permissionId: z.lazy(() => rolepermissionsRoleIdPermissionIdCompoundUniqueInputSchema)
})
.and(z.object({
  roleId_permissionId: z.lazy(() => rolepermissionsRoleIdPermissionIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => rolepermissionsWhereInputSchema),z.lazy(() => rolepermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolepermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolepermissionsWhereInputSchema),z.lazy(() => rolepermissionsWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => permissionWhereInputSchema) ]).optional(),
  roles: z.union([ z.lazy(() => RolesScalarRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
}).strict());

export const rolepermissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.rolepermissionsOrderByWithAggregationInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => rolepermissionsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => rolepermissionsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => rolepermissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => rolepermissionsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => rolepermissionsSumOrderByAggregateInputSchema).optional()
}).strict();

export const rolepermissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.rolepermissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => rolepermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => rolepermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolepermissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolepermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => rolepermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const rolesWhereInputSchema: z.ZodType<Prisma.rolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rolepermissions: z.lazy(() => RolepermissionsListRelationFilterSchema).optional(),
  userroles: z.lazy(() => UserrolesListRelationFilterSchema).optional()
}).strict();

export const rolesOrderByWithRelationInputSchema: z.ZodType<Prisma.rolesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rolepermissions: z.lazy(() => rolepermissionsOrderByRelationAggregateInputSchema).optional(),
  userroles: z.lazy(() => userrolesOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => rolesOrderByRelevanceInputSchema).optional()
}).strict();

export const rolesWhereUniqueInputSchema: z.ZodType<Prisma.rolesWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rolepermissions: z.lazy(() => RolepermissionsListRelationFilterSchema).optional(),
  userroles: z.lazy(() => UserrolesListRelationFilterSchema).optional()
}).strict());

export const rolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.rolesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => rolesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => rolesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => rolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => rolesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => rolesSumOrderByAggregateInputSchema).optional()
}).strict();

export const rolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.rolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const routeWhereInputSchema: z.ZodType<Prisma.routeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => routeWhereInputSchema),z.lazy(() => routeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => routeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => routeWhereInputSchema),z.lazy(() => routeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedDuration: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  startLocation: z.lazy(() => JsonFilterSchema).optional(),
  endLocation: z.lazy(() => JsonFilterSchema).optional(),
  isActive: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  routestoppoint: z.lazy(() => RoutestoppointListRelationFilterSchema).optional(),
  schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional(),
  studentassignment: z.lazy(() => StudentassignmentListRelationFilterSchema).optional()
}).strict();

export const routeOrderByWithRelationInputSchema: z.ZodType<Prisma.routeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startLocation: z.lazy(() => SortOrderSchema).optional(),
  endLocation: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  routestoppoint: z.lazy(() => routestoppointOrderByRelationAggregateInputSchema).optional(),
  schedule: z.lazy(() => scheduleOrderByRelationAggregateInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => routeOrderByRelevanceInputSchema).optional()
}).strict();

export const routeWhereUniqueInputSchema: z.ZodType<Prisma.routeWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => routeWhereInputSchema),z.lazy(() => routeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => routeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => routeWhereInputSchema),z.lazy(() => routeWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedDuration: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  startLocation: z.lazy(() => JsonFilterSchema).optional(),
  endLocation: z.lazy(() => JsonFilterSchema).optional(),
  isActive: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  routestoppoint: z.lazy(() => RoutestoppointListRelationFilterSchema).optional(),
  schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional(),
  studentassignment: z.lazy(() => StudentassignmentListRelationFilterSchema).optional()
}).strict());

export const routeOrderByWithAggregationInputSchema: z.ZodType<Prisma.routeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startLocation: z.lazy(() => SortOrderSchema).optional(),
  endLocation: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => routeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => routeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => routeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => routeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => routeSumOrderByAggregateInputSchema).optional()
}).strict();

export const routeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.routeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => routeScalarWhereWithAggregatesInputSchema),z.lazy(() => routeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => routeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => routeScalarWhereWithAggregatesInputSchema),z.lazy(() => routeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  estimatedDuration: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  startLocation: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  endLocation: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  isActive: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const routestoppointWhereInputSchema: z.ZodType<Prisma.routestoppointWhereInput> = z.object({
  AND: z.union([ z.lazy(() => routestoppointWhereInputSchema),z.lazy(() => routestoppointWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => routestoppointWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => routestoppointWhereInputSchema),z.lazy(() => routestoppointWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopPointId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sequence: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  direction: z.union([ z.lazy(() => Enumroutestoppoint_directionFilterSchema),z.lazy(() => routestoppoint_directionSchema) ]).optional(),
  route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => routeWhereInputSchema) ]).optional(),
  stoppoint: z.union([ z.lazy(() => StoppointScalarRelationFilterSchema),z.lazy(() => stoppointWhereInputSchema) ]).optional(),
}).strict();

export const routestoppointOrderByWithRelationInputSchema: z.ZodType<Prisma.routestoppointOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  route: z.lazy(() => routeOrderByWithRelationInputSchema).optional(),
  stoppoint: z.lazy(() => stoppointOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => routestoppointOrderByRelevanceInputSchema).optional()
}).strict();

export const routestoppointWhereUniqueInputSchema: z.ZodType<Prisma.routestoppointWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => routestoppointWhereInputSchema),z.lazy(() => routestoppointWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => routestoppointWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => routestoppointWhereInputSchema),z.lazy(() => routestoppointWhereInputSchema).array() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopPointId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sequence: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  direction: z.union([ z.lazy(() => Enumroutestoppoint_directionFilterSchema),z.lazy(() => routestoppoint_directionSchema) ]).optional(),
  route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => routeWhereInputSchema) ]).optional(),
  stoppoint: z.union([ z.lazy(() => StoppointScalarRelationFilterSchema),z.lazy(() => stoppointWhereInputSchema) ]).optional(),
}).strict());

export const routestoppointOrderByWithAggregationInputSchema: z.ZodType<Prisma.routestoppointOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => routestoppointCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => routestoppointAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => routestoppointMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => routestoppointMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => routestoppointSumOrderByAggregateInputSchema).optional()
}).strict();

export const routestoppointScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.routestoppointScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => routestoppointScalarWhereWithAggregatesInputSchema),z.lazy(() => routestoppointScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => routestoppointScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => routestoppointScalarWhereWithAggregatesInputSchema),z.lazy(() => routestoppointScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  routeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stopPointId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sequence: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  direction: z.union([ z.lazy(() => Enumroutestoppoint_directionWithAggregatesFilterSchema),z.lazy(() => routestoppoint_directionSchema) ]).optional(),
}).strict();

export const scheduleWhereInputSchema: z.ZodType<Prisma.scheduleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => scheduleWhereInputSchema),z.lazy(() => scheduleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => scheduleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => scheduleWhereInputSchema),z.lazy(() => scheduleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  busId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => Enumschedule_typeFilterSchema),z.lazy(() => schedule_typeSchema) ]).optional(),
  daysOfWeek: z.lazy(() => JsonFilterSchema).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => Enumschedule_statusNullableFilterSchema),z.lazy(() => schedule_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bus: z.union([ z.lazy(() => BusScalarRelationFilterSchema),z.lazy(() => busWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
  route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => routeWhereInputSchema) ]).optional(),
  trip: z.lazy(() => TripListRelationFilterSchema).optional()
}).strict();

export const scheduleOrderByWithRelationInputSchema: z.ZodType<Prisma.scheduleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  busId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  daysOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  bus: z.lazy(() => busOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
  route: z.lazy(() => routeOrderByWithRelationInputSchema).optional(),
  trip: z.lazy(() => tripOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => scheduleOrderByRelevanceInputSchema).optional()
}).strict();

export const scheduleWhereUniqueInputSchema: z.ZodType<Prisma.scheduleWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => scheduleWhereInputSchema),z.lazy(() => scheduleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => scheduleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => scheduleWhereInputSchema),z.lazy(() => scheduleWhereInputSchema).array() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  busId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => Enumschedule_typeFilterSchema),z.lazy(() => schedule_typeSchema) ]).optional(),
  daysOfWeek: z.lazy(() => JsonFilterSchema).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => Enumschedule_statusNullableFilterSchema),z.lazy(() => schedule_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bus: z.union([ z.lazy(() => BusScalarRelationFilterSchema),z.lazy(() => busWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
  route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => routeWhereInputSchema) ]).optional(),
  trip: z.lazy(() => TripListRelationFilterSchema).optional()
}).strict());

export const scheduleOrderByWithAggregationInputSchema: z.ZodType<Prisma.scheduleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  busId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  daysOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => scheduleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => scheduleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => scheduleMinOrderByAggregateInputSchema).optional()
}).strict();

export const scheduleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.scheduleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => scheduleScalarWhereWithAggregatesInputSchema),z.lazy(() => scheduleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => scheduleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => scheduleScalarWhereWithAggregatesInputSchema),z.lazy(() => scheduleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  busId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => Enumschedule_typeWithAggregatesFilterSchema),z.lazy(() => schedule_typeSchema) ]).optional(),
  daysOfWeek: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => Enumschedule_statusNullableWithAggregatesFilterSchema),z.lazy(() => schedule_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const stoppointWhereInputSchema: z.ZodType<Prisma.stoppointWhereInput> = z.object({
  AND: z.union([ z.lazy(() => stoppointWhereInputSchema),z.lazy(() => stoppointWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => stoppointWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => stoppointWhereInputSchema),z.lazy(() => stoppointWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  routestoppoint: z.lazy(() => RoutestoppointListRelationFilterSchema).optional(),
  studentassignment: z.lazy(() => StudentassignmentListRelationFilterSchema).optional(),
  tripstop: z.lazy(() => TripstopListRelationFilterSchema).optional()
}).strict();

export const stoppointOrderByWithRelationInputSchema: z.ZodType<Prisma.stoppointOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  routestoppoint: z.lazy(() => routestoppointOrderByRelationAggregateInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentOrderByRelationAggregateInputSchema).optional(),
  tripstop: z.lazy(() => tripstopOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => stoppointOrderByRelevanceInputSchema).optional()
}).strict();

export const stoppointWhereUniqueInputSchema: z.ZodType<Prisma.stoppointWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => stoppointWhereInputSchema),z.lazy(() => stoppointWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => stoppointWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => stoppointWhereInputSchema),z.lazy(() => stoppointWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  routestoppoint: z.lazy(() => RoutestoppointListRelationFilterSchema).optional(),
  studentassignment: z.lazy(() => StudentassignmentListRelationFilterSchema).optional(),
  tripstop: z.lazy(() => TripstopListRelationFilterSchema).optional()
}).strict());

export const stoppointOrderByWithAggregationInputSchema: z.ZodType<Prisma.stoppointOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => stoppointCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => stoppointMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => stoppointMinOrderByAggregateInputSchema).optional()
}).strict();

export const stoppointScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.stoppointScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => stoppointScalarWhereWithAggregatesInputSchema),z.lazy(() => stoppointScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => stoppointScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => stoppointScalarWhereWithAggregatesInputSchema),z.lazy(() => stoppointScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  location: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const studentWhereInputSchema: z.ZodType<Prisma.studentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => studentWhereInputSchema),z.lazy(() => studentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentWhereInputSchema),z.lazy(() => studentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
  studentassignment: z.lazy(() => StudentassignmentListRelationFilterSchema).optional(),
  studentattendance: z.lazy(() => StudentattendanceListRelationFilterSchema).optional()
}).strict();

export const studentOrderByWithRelationInputSchema: z.ZodType<Prisma.studentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentOrderByRelationAggregateInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => studentOrderByRelevanceInputSchema).optional()
}).strict();

export const studentWhereUniqueInputSchema: z.ZodType<Prisma.studentWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => studentWhereInputSchema),z.lazy(() => studentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentWhereInputSchema),z.lazy(() => studentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
  studentassignment: z.lazy(() => StudentassignmentListRelationFilterSchema).optional(),
  studentattendance: z.lazy(() => StudentattendanceListRelationFilterSchema).optional()
}).strict());

export const studentOrderByWithAggregationInputSchema: z.ZodType<Prisma.studentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => studentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => studentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => studentMinOrderByAggregateInputSchema).optional()
}).strict();

export const studentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.studentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => studentScalarWhereWithAggregatesInputSchema),z.lazy(() => studentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentScalarWhereWithAggregatesInputSchema),z.lazy(() => studentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const studentassignmentWhereInputSchema: z.ZodType<Prisma.studentassignmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => studentassignmentWhereInputSchema),z.lazy(() => studentassignmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentassignmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentassignmentWhereInputSchema),z.lazy(() => studentassignmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  direction: z.union([ z.lazy(() => Enumstudentassignment_directionFilterSchema),z.lazy(() => studentassignment_directionSchema) ]).optional(),
  effectiveFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  effectiveTo: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => routeWhereInputSchema) ]).optional(),
  stoppoint: z.union([ z.lazy(() => StoppointScalarRelationFilterSchema),z.lazy(() => stoppointWhereInputSchema) ]).optional(),
  student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => studentWhereInputSchema) ]).optional(),
}).strict();

export const studentassignmentOrderByWithRelationInputSchema: z.ZodType<Prisma.studentassignmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  effectiveFrom: z.lazy(() => SortOrderSchema).optional(),
  effectiveTo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  route: z.lazy(() => routeOrderByWithRelationInputSchema).optional(),
  stoppoint: z.lazy(() => stoppointOrderByWithRelationInputSchema).optional(),
  student: z.lazy(() => studentOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => studentassignmentOrderByRelevanceInputSchema).optional()
}).strict();

export const studentassignmentWhereUniqueInputSchema: z.ZodType<Prisma.studentassignmentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => studentassignmentWhereInputSchema),z.lazy(() => studentassignmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentassignmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentassignmentWhereInputSchema),z.lazy(() => studentassignmentWhereInputSchema).array() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  direction: z.union([ z.lazy(() => Enumstudentassignment_directionFilterSchema),z.lazy(() => studentassignment_directionSchema) ]).optional(),
  effectiveFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  effectiveTo: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => routeWhereInputSchema) ]).optional(),
  stoppoint: z.union([ z.lazy(() => StoppointScalarRelationFilterSchema),z.lazy(() => stoppointWhereInputSchema) ]).optional(),
  student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => studentWhereInputSchema) ]).optional(),
}).strict());

export const studentassignmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.studentassignmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  effectiveFrom: z.lazy(() => SortOrderSchema).optional(),
  effectiveTo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => studentassignmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => studentassignmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => studentassignmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const studentassignmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.studentassignmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => studentassignmentScalarWhereWithAggregatesInputSchema),z.lazy(() => studentassignmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentassignmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentassignmentScalarWhereWithAggregatesInputSchema),z.lazy(() => studentassignmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  direction: z.union([ z.lazy(() => Enumstudentassignment_directionWithAggregatesFilterSchema),z.lazy(() => studentassignment_directionSchema) ]).optional(),
  effectiveFrom: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  effectiveTo: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const studentattendanceWhereInputSchema: z.ZodType<Prisma.studentattendanceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => studentattendanceWhereInputSchema),z.lazy(() => studentattendanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentattendanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentattendanceWhereInputSchema),z.lazy(() => studentattendanceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dropoffTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumstudentattendance_statusNullableFilterSchema),z.lazy(() => studentattendance_statusSchema) ]).optional().nullable(),
  student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => studentWhereInputSchema) ]).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => tripWhereInputSchema) ]).optional(),
}).strict();

export const studentattendanceOrderByWithRelationInputSchema: z.ZodType<Prisma.studentattendanceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dropoffTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  student: z.lazy(() => studentOrderByWithRelationInputSchema).optional(),
  trip: z.lazy(() => tripOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => studentattendanceOrderByRelevanceInputSchema).optional()
}).strict();

export const studentattendanceWhereUniqueInputSchema: z.ZodType<Prisma.studentattendanceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => studentattendanceWhereInputSchema),z.lazy(() => studentattendanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentattendanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentattendanceWhereInputSchema),z.lazy(() => studentattendanceWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dropoffTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumstudentattendance_statusNullableFilterSchema),z.lazy(() => studentattendance_statusSchema) ]).optional().nullable(),
  student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => studentWhereInputSchema) ]).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => tripWhereInputSchema) ]).optional(),
}).strict());

export const studentattendanceOrderByWithAggregationInputSchema: z.ZodType<Prisma.studentattendanceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dropoffTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => studentattendanceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => studentattendanceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => studentattendanceMinOrderByAggregateInputSchema).optional()
}).strict();

export const studentattendanceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.studentattendanceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => studentattendanceScalarWhereWithAggregatesInputSchema),z.lazy(() => studentattendanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentattendanceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentattendanceScalarWhereWithAggregatesInputSchema),z.lazy(() => studentattendanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  dropoffTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumstudentattendance_statusNullableWithAggregatesFilterSchema),z.lazy(() => studentattendance_statusSchema) ]).optional().nullable(),
}).strict();

export const trackingbushistoryWhereInputSchema: z.ZodType<Prisma.trackingbushistoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => trackingbushistoryWhereInputSchema),z.lazy(() => trackingbushistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => trackingbushistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => trackingbushistoryWhereInputSchema),z.lazy(() => trackingbushistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => tripWhereInputSchema) ]).optional(),
}).strict();

export const trackingbushistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.trackingbushistoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  trip: z.lazy(() => tripOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => trackingbushistoryOrderByRelevanceInputSchema).optional()
}).strict();

export const trackingbushistoryWhereUniqueInputSchema: z.ZodType<Prisma.trackingbushistoryWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => trackingbushistoryWhereInputSchema),z.lazy(() => trackingbushistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => trackingbushistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => trackingbushistoryWhereInputSchema),z.lazy(() => trackingbushistoryWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => tripWhereInputSchema) ]).optional(),
}).strict());

export const trackingbushistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.trackingbushistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => trackingbushistoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => trackingbushistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => trackingbushistoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const trackingbushistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.trackingbushistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => trackingbushistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => trackingbushistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => trackingbushistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => trackingbushistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => trackingbushistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  location: z.lazy(() => JsonWithAggregatesFilterSchema).optional()
}).strict();

export const tripWhereInputSchema: z.ZodType<Prisma.tripWhereInput> = z.object({
  AND: z.union([ z.lazy(() => tripWhereInputSchema),z.lazy(() => tripWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tripWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tripWhereInputSchema),z.lazy(() => tripWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  actualStartTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualEndTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumtrip_statusNullableFilterSchema),z.lazy(() => trip_statusSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => Enumtrip_typeFilterSchema),z.lazy(() => trip_typeSchema) ]).optional(),
  report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  studentattendance: z.lazy(() => StudentattendanceListRelationFilterSchema).optional(),
  trackingbushistory: z.lazy(() => TrackingbushistoryListRelationFilterSchema).optional(),
  schedule: z.union([ z.lazy(() => ScheduleScalarRelationFilterSchema),z.lazy(() => scheduleWhereInputSchema) ]).optional(),
  tripstop: z.lazy(() => TripstopListRelationFilterSchema).optional()
}).strict();

export const tripOrderByWithRelationInputSchema: z.ZodType<Prisma.tripOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scheduleId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  actualStartTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualEndTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  currentStopId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  report: z.lazy(() => reportOrderByRelationAggregateInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceOrderByRelationAggregateInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryOrderByRelationAggregateInputSchema).optional(),
  schedule: z.lazy(() => scheduleOrderByWithRelationInputSchema).optional(),
  tripstop: z.lazy(() => tripstopOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => tripOrderByRelevanceInputSchema).optional()
}).strict();

export const tripWhereUniqueInputSchema: z.ZodType<Prisma.tripWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => tripWhereInputSchema),z.lazy(() => tripWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tripWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tripWhereInputSchema),z.lazy(() => tripWhereInputSchema).array() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  actualStartTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualEndTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumtrip_statusNullableFilterSchema),z.lazy(() => trip_statusSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => Enumtrip_typeFilterSchema),z.lazy(() => trip_typeSchema) ]).optional(),
  report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  studentattendance: z.lazy(() => StudentattendanceListRelationFilterSchema).optional(),
  trackingbushistory: z.lazy(() => TrackingbushistoryListRelationFilterSchema).optional(),
  schedule: z.union([ z.lazy(() => ScheduleScalarRelationFilterSchema),z.lazy(() => scheduleWhereInputSchema) ]).optional(),
  tripstop: z.lazy(() => TripstopListRelationFilterSchema).optional()
}).strict());

export const tripOrderByWithAggregationInputSchema: z.ZodType<Prisma.tripOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scheduleId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  actualStartTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualEndTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  currentStopId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => tripCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => tripMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => tripMinOrderByAggregateInputSchema).optional()
}).strict();

export const tripScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.tripScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => tripScalarWhereWithAggregatesInputSchema),z.lazy(() => tripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => tripScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tripScalarWhereWithAggregatesInputSchema),z.lazy(() => tripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  actualStartTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualEndTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumtrip_statusNullableWithAggregatesFilterSchema),z.lazy(() => trip_statusSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  location: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => Enumtrip_typeWithAggregatesFilterSchema),z.lazy(() => trip_typeSchema) ]).optional(),
}).strict();

export const tripstopWhereInputSchema: z.ZodType<Prisma.tripstopWhereInput> = z.object({
  AND: z.union([ z.lazy(() => tripstopWhereInputSchema),z.lazy(() => tripstopWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tripstopWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tripstopWhereInputSchema),z.lazy(() => tripstopWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actualArrival: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualDeparture: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumtripstop_statusNullableFilterSchema),z.lazy(() => tripstop_statusSchema) ]).optional().nullable(),
  stoppoint: z.union([ z.lazy(() => StoppointScalarRelationFilterSchema),z.lazy(() => stoppointWhereInputSchema) ]).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => tripWhereInputSchema) ]).optional(),
}).strict();

export const tripstopOrderByWithRelationInputSchema: z.ZodType<Prisma.tripstopOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualDeparture: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stoppoint: z.lazy(() => stoppointOrderByWithRelationInputSchema).optional(),
  trip: z.lazy(() => tripOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => tripstopOrderByRelevanceInputSchema).optional()
}).strict();

export const tripstopWhereUniqueInputSchema: z.ZodType<Prisma.tripstopWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => tripstopWhereInputSchema),z.lazy(() => tripstopWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tripstopWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tripstopWhereInputSchema),z.lazy(() => tripstopWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actualArrival: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualDeparture: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumtripstop_statusNullableFilterSchema),z.lazy(() => tripstop_statusSchema) ]).optional().nullable(),
  stoppoint: z.union([ z.lazy(() => StoppointScalarRelationFilterSchema),z.lazy(() => stoppointWhereInputSchema) ]).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => tripWhereInputSchema) ]).optional(),
}).strict());

export const tripstopOrderByWithAggregationInputSchema: z.ZodType<Prisma.tripstopOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualDeparture: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => tripstopCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => tripstopMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => tripstopMinOrderByAggregateInputSchema).optional()
}).strict();

export const tripstopScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.tripstopScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => tripstopScalarWhereWithAggregatesInputSchema),z.lazy(() => tripstopScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => tripstopScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tripstopScalarWhereWithAggregatesInputSchema),z.lazy(() => tripstopScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  actualArrival: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualDeparture: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumtripstop_statusNullableWithAggregatesFilterSchema),z.lazy(() => tripstop_statusSchema) ]).optional().nullable(),
}).strict();

export const userWhereInputSchema: z.ZodType<Prisma.userWhereInput> = z.object({
  AND: z.union([ z.lazy(() => userWhereInputSchema),z.lazy(() => userWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => userWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userWhereInputSchema),z.lazy(() => userWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional(),
  student: z.union([ z.lazy(() => StudentNullableScalarRelationFilterSchema),z.lazy(() => studentWhereInputSchema) ]).optional().nullable(),
  userroles: z.lazy(() => UserrolesListRelationFilterSchema).optional()
}).strict();

export const userOrderByWithRelationInputSchema: z.ZodType<Prisma.userOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  report: z.lazy(() => reportOrderByRelationAggregateInputSchema).optional(),
  schedule: z.lazy(() => scheduleOrderByRelationAggregateInputSchema).optional(),
  student: z.lazy(() => studentOrderByWithRelationInputSchema).optional(),
  userroles: z.lazy(() => userrolesOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => userOrderByRelevanceInputSchema).optional()
}).strict();

export const userWhereUniqueInputSchema: z.ZodType<Prisma.userWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    username: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
    username: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => userWhereInputSchema),z.lazy(() => userWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => userWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userWhereInputSchema),z.lazy(() => userWhereInputSchema).array() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional(),
  student: z.union([ z.lazy(() => StudentNullableScalarRelationFilterSchema),z.lazy(() => studentWhereInputSchema) ]).optional().nullable(),
  userroles: z.lazy(() => UserrolesListRelationFilterSchema).optional()
}).strict());

export const userOrderByWithAggregationInputSchema: z.ZodType<Prisma.userOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => userCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => userMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => userMinOrderByAggregateInputSchema).optional()
}).strict();

export const userScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.userScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => userScalarWhereWithAggregatesInputSchema),z.lazy(() => userScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => userScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userScalarWhereWithAggregatesInputSchema),z.lazy(() => userScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const userrolesWhereInputSchema: z.ZodType<Prisma.userrolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => userrolesWhereInputSchema),z.lazy(() => userrolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => userrolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userrolesWhereInputSchema),z.lazy(() => userrolesWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  roles: z.union([ z.lazy(() => RolesScalarRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
}).strict();

export const userrolesOrderByWithRelationInputSchema: z.ZodType<Prisma.userrolesOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  roles: z.lazy(() => rolesOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => userrolesOrderByRelevanceInputSchema).optional()
}).strict();

export const userrolesWhereUniqueInputSchema: z.ZodType<Prisma.userrolesWhereUniqueInput> = z.object({
  userId_roleId: z.lazy(() => userrolesUserIdRoleIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_roleId: z.lazy(() => userrolesUserIdRoleIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => userrolesWhereInputSchema),z.lazy(() => userrolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => userrolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userrolesWhereInputSchema),z.lazy(() => userrolesWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  roles: z.union([ z.lazy(() => RolesScalarRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
}).strict());

export const userrolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.userrolesOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => userrolesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => userrolesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => userrolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => userrolesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => userrolesSumOrderByAggregateInputSchema).optional()
}).strict();

export const userrolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.userrolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => userrolesScalarWhereWithAggregatesInputSchema),z.lazy(() => userrolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => userrolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userrolesScalarWhereWithAggregatesInputSchema),z.lazy(() => userrolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const busCreateInputSchema: z.ZodType<Prisma.busCreateInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schedule: z.lazy(() => scheduleCreateNestedManyWithoutBusInputSchema).optional()
}).strict();

export const busUncheckedCreateInputSchema: z.ZodType<Prisma.busUncheckedCreateInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schedule: z.lazy(() => scheduleUncheckedCreateNestedManyWithoutBusInputSchema).optional()
}).strict();

export const busUpdateInputSchema: z.ZodType<Prisma.busUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NullableEnumbus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.lazy(() => scheduleUpdateManyWithoutBusNestedInputSchema).optional()
}).strict();

export const busUncheckedUpdateInputSchema: z.ZodType<Prisma.busUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NullableEnumbus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.lazy(() => scheduleUncheckedUpdateManyWithoutBusNestedInputSchema).optional()
}).strict();

export const busCreateManyInputSchema: z.ZodType<Prisma.busCreateManyInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const busUpdateManyMutationInputSchema: z.ZodType<Prisma.busUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NullableEnumbus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const busUncheckedUpdateManyInputSchema: z.ZodType<Prisma.busUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NullableEnumbus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const permissionCreateInputSchema: z.ZodType<Prisma.permissionCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rolepermissions: z.lazy(() => rolepermissionsCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const permissionUncheckedCreateInputSchema: z.ZodType<Prisma.permissionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rolepermissions: z.lazy(() => rolepermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const permissionUpdateInputSchema: z.ZodType<Prisma.permissionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rolepermissions: z.lazy(() => rolepermissionsUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const permissionUncheckedUpdateInputSchema: z.ZodType<Prisma.permissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rolepermissions: z.lazy(() => rolepermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const permissionCreateManyInputSchema: z.ZodType<Prisma.permissionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const permissionUpdateManyMutationInputSchema: z.ZodType<Prisma.permissionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const permissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.permissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const reportCreateInputSchema: z.ZodType<Prisma.reportCreateInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => userCreateNestedOneWithoutReportInputSchema),
  trip: z.lazy(() => tripCreateNestedOneWithoutReportInputSchema).optional()
}).strict();

export const reportUncheckedCreateInputSchema: z.ZodType<Prisma.reportUncheckedCreateInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  reporterId: z.string(),
  tripId: z.string().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const reportUpdateInputSchema: z.ZodType<Prisma.reportUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutReportNestedInputSchema).optional(),
  trip: z.lazy(() => tripUpdateOneWithoutReportNestedInputSchema).optional()
}).strict();

export const reportUncheckedUpdateInputSchema: z.ZodType<Prisma.reportUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const reportCreateManyInputSchema: z.ZodType<Prisma.reportCreateManyInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  reporterId: z.string(),
  tripId: z.string().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const reportUpdateManyMutationInputSchema: z.ZodType<Prisma.reportUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const reportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.reportUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolepermissionsCreateInputSchema: z.ZodType<Prisma.rolepermissionsCreateInput> = z.object({
  permission: z.lazy(() => permissionCreateNestedOneWithoutRolepermissionsInputSchema),
  roles: z.lazy(() => rolesCreateNestedOneWithoutRolepermissionsInputSchema)
}).strict();

export const rolepermissionsUncheckedCreateInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedCreateInput> = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int()
}).strict();

export const rolepermissionsUpdateInputSchema: z.ZodType<Prisma.rolepermissionsUpdateInput> = z.object({
  permission: z.lazy(() => permissionUpdateOneRequiredWithoutRolepermissionsNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRolepermissionsNestedInputSchema).optional()
}).strict();

export const rolepermissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedUpdateInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolepermissionsCreateManyInputSchema: z.ZodType<Prisma.rolepermissionsCreateManyInput> = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int()
}).strict();

export const rolepermissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.rolepermissionsUpdateManyMutationInput> = z.object({
}).strict();

export const rolepermissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedUpdateManyInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolesCreateInputSchema: z.ZodType<Prisma.rolesCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rolepermissions: z.lazy(() => rolepermissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  userroles: z.lazy(() => userrolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUncheckedCreateInputSchema: z.ZodType<Prisma.rolesUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rolepermissions: z.lazy(() => rolepermissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUpdateInputSchema: z.ZodType<Prisma.rolesUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rolepermissions: z.lazy(() => rolepermissionsUpdateManyWithoutRolesNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rolepermissions: z.lazy(() => rolepermissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesCreateManyInputSchema: z.ZodType<Prisma.rolesCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const rolesUpdateManyMutationInputSchema: z.ZodType<Prisma.rolesUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routeCreateInputSchema: z.ZodType<Prisma.routeCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointCreateNestedManyWithoutRouteInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedManyWithoutRouteInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const routeUncheckedCreateInputSchema: z.ZodType<Prisma.routeUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const routeUpdateInputSchema: z.ZodType<Prisma.routeUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUpdateManyWithoutRouteNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateManyWithoutRouteNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const routeUncheckedUpdateInputSchema: z.ZodType<Prisma.routeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const routeCreateManyInputSchema: z.ZodType<Prisma.routeCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const routeUpdateManyMutationInputSchema: z.ZodType<Prisma.routeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.routeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routestoppointCreateInputSchema: z.ZodType<Prisma.routestoppointCreateInput> = z.object({
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema),
  route: z.lazy(() => routeCreateNestedOneWithoutRoutestoppointInputSchema),
  stoppoint: z.lazy(() => stoppointCreateNestedOneWithoutRoutestoppointInputSchema)
}).strict();

export const routestoppointUncheckedCreateInputSchema: z.ZodType<Prisma.routestoppointUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  routeId: z.string(),
  stopPointId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema)
}).strict();

export const routestoppointUpdateInputSchema: z.ZodType<Prisma.routestoppointUpdateInput> = z.object({
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutRoutestoppointNestedInputSchema).optional(),
  stoppoint: z.lazy(() => stoppointUpdateOneRequiredWithoutRoutestoppointNestedInputSchema).optional()
}).strict();

export const routestoppointUncheckedUpdateInputSchema: z.ZodType<Prisma.routestoppointUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopPointId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routestoppointCreateManyInputSchema: z.ZodType<Prisma.routestoppointCreateManyInput> = z.object({
  id: z.number().int().optional(),
  routeId: z.string(),
  stopPointId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema)
}).strict();

export const routestoppointUpdateManyMutationInputSchema: z.ZodType<Prisma.routestoppointUpdateManyMutationInput> = z.object({
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routestoppointUncheckedUpdateManyInputSchema: z.ZodType<Prisma.routestoppointUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopPointId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const scheduleCreateInputSchema: z.ZodType<Prisma.scheduleCreateInput> = z.object({
  id: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bus: z.lazy(() => busCreateNestedOneWithoutScheduleInputSchema),
  user: z.lazy(() => userCreateNestedOneWithoutScheduleInputSchema),
  route: z.lazy(() => routeCreateNestedOneWithoutScheduleInputSchema),
  trip: z.lazy(() => tripCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const scheduleUncheckedCreateInputSchema: z.ZodType<Prisma.scheduleUncheckedCreateInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trip: z.lazy(() => tripUncheckedCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const scheduleUpdateInputSchema: z.ZodType<Prisma.scheduleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bus: z.lazy(() => busUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  trip: z.lazy(() => tripUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleUncheckedUpdateInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => tripUncheckedUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleCreateManyInputSchema: z.ZodType<Prisma.scheduleCreateManyInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const scheduleUpdateManyMutationInputSchema: z.ZodType<Prisma.scheduleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const scheduleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const stoppointCreateInputSchema: z.ZodType<Prisma.stoppointCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointCreateNestedManyWithoutStoppointInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutStoppointInputSchema).optional(),
  tripstop: z.lazy(() => tripstopCreateNestedManyWithoutStoppointInputSchema).optional()
}).strict();

export const stoppointUncheckedCreateInputSchema: z.ZodType<Prisma.stoppointUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedCreateNestedManyWithoutStoppointInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutStoppointInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedCreateNestedManyWithoutStoppointInputSchema).optional()
}).strict();

export const stoppointUpdateInputSchema: z.ZodType<Prisma.stoppointUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUpdateManyWithoutStoppointNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutStoppointNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUpdateManyWithoutStoppointNestedInputSchema).optional()
}).strict();

export const stoppointUncheckedUpdateInputSchema: z.ZodType<Prisma.stoppointUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional()
}).strict();

export const stoppointCreateManyInputSchema: z.ZodType<Prisma.stoppointCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const stoppointUpdateManyMutationInputSchema: z.ZodType<Prisma.stoppointUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const stoppointUncheckedUpdateManyInputSchema: z.ZodType<Prisma.stoppointUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentCreateInputSchema: z.ZodType<Prisma.studentCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => userCreateNestedOneWithoutStudentInputSchema),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutStudentInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const studentUncheckedCreateInputSchema: z.ZodType<Prisma.studentUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const studentUpdateInputSchema: z.ZodType<Prisma.studentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutStudentNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const studentUncheckedUpdateInputSchema: z.ZodType<Prisma.studentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const studentCreateManyInputSchema: z.ZodType<Prisma.studentCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentUpdateManyMutationInputSchema: z.ZodType<Prisma.studentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.studentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentassignmentCreateInputSchema: z.ZodType<Prisma.studentassignmentCreateInput> = z.object({
  id: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  route: z.lazy(() => routeCreateNestedOneWithoutStudentassignmentInputSchema),
  stoppoint: z.lazy(() => stoppointCreateNestedOneWithoutStudentassignmentInputSchema),
  student: z.lazy(() => studentCreateNestedOneWithoutStudentassignmentInputSchema)
}).strict();

export const studentassignmentUncheckedCreateInputSchema: z.ZodType<Prisma.studentassignmentUncheckedCreateInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentassignmentUpdateInputSchema: z.ZodType<Prisma.studentassignmentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional(),
  stoppoint: z.lazy(() => stoppointUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional(),
  student: z.lazy(() => studentUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional()
}).strict();

export const studentassignmentUncheckedUpdateInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentassignmentCreateManyInputSchema: z.ZodType<Prisma.studentassignmentCreateManyInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentassignmentUpdateManyMutationInputSchema: z.ZodType<Prisma.studentassignmentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentassignmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentattendanceCreateInputSchema: z.ZodType<Prisma.studentattendanceCreateInput> = z.object({
  id: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable(),
  student: z.lazy(() => studentCreateNestedOneWithoutStudentattendanceInputSchema),
  trip: z.lazy(() => tripCreateNestedOneWithoutStudentattendanceInputSchema)
}).strict();

export const studentattendanceUncheckedCreateInputSchema: z.ZodType<Prisma.studentattendanceUncheckedCreateInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable()
}).strict();

export const studentattendanceUpdateInputSchema: z.ZodType<Prisma.studentattendanceUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  student: z.lazy(() => studentUpdateOneRequiredWithoutStudentattendanceNestedInputSchema).optional(),
  trip: z.lazy(() => tripUpdateOneRequiredWithoutStudentattendanceNestedInputSchema).optional()
}).strict();

export const studentattendanceUncheckedUpdateInputSchema: z.ZodType<Prisma.studentattendanceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentattendanceCreateManyInputSchema: z.ZodType<Prisma.studentattendanceCreateManyInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable()
}).strict();

export const studentattendanceUpdateManyMutationInputSchema: z.ZodType<Prisma.studentattendanceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentattendanceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.studentattendanceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const trackingbushistoryCreateInputSchema: z.ZodType<Prisma.trackingbushistoryCreateInput> = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  trip: z.lazy(() => tripCreateNestedOneWithoutTrackingbushistoryInputSchema)
}).strict();

export const trackingbushistoryUncheckedCreateInputSchema: z.ZodType<Prisma.trackingbushistoryUncheckedCreateInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const trackingbushistoryUpdateInputSchema: z.ZodType<Prisma.trackingbushistoryUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  trip: z.lazy(() => tripUpdateOneRequiredWithoutTrackingbushistoryNestedInputSchema).optional()
}).strict();

export const trackingbushistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.trackingbushistoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const trackingbushistoryCreateManyInputSchema: z.ZodType<Prisma.trackingbushistoryCreateManyInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const trackingbushistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.trackingbushistoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const trackingbushistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.trackingbushistoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const tripCreateInputSchema: z.ZodType<Prisma.tripCreateInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportCreateNestedManyWithoutTripInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryCreateNestedManyWithoutTripInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedOneWithoutTripInputSchema),
  tripstop: z.lazy(() => tripstopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripUncheckedCreateInputSchema: z.ZodType<Prisma.tripUncheckedCreateInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripUpdateInputSchema: z.ZodType<Prisma.tripUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutTripNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const tripUncheckedUpdateInputSchema: z.ZodType<Prisma.tripUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const tripCreateManyInputSchema: z.ZodType<Prisma.tripCreateManyInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema)
}).strict();

export const tripUpdateManyMutationInputSchema: z.ZodType<Prisma.tripUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tripUncheckedUpdateManyInputSchema: z.ZodType<Prisma.tripUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tripstopCreateInputSchema: z.ZodType<Prisma.tripstopCreateInput> = z.object({
  id: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable(),
  stoppoint: z.lazy(() => stoppointCreateNestedOneWithoutTripstopInputSchema),
  trip: z.lazy(() => tripCreateNestedOneWithoutTripstopInputSchema)
}).strict();

export const tripstopUncheckedCreateInputSchema: z.ZodType<Prisma.tripstopUncheckedCreateInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable()
}).strict();

export const tripstopUpdateInputSchema: z.ZodType<Prisma.tripstopUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stoppoint: z.lazy(() => stoppointUpdateOneRequiredWithoutTripstopNestedInputSchema).optional(),
  trip: z.lazy(() => tripUpdateOneRequiredWithoutTripstopNestedInputSchema).optional()
}).strict();

export const tripstopUncheckedUpdateInputSchema: z.ZodType<Prisma.tripstopUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const tripstopCreateManyInputSchema: z.ZodType<Prisma.tripstopCreateManyInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable()
}).strict();

export const tripstopUpdateManyMutationInputSchema: z.ZodType<Prisma.tripstopUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const tripstopUncheckedUpdateManyInputSchema: z.ZodType<Prisma.tripstopUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const userCreateInputSchema: z.ZodType<Prisma.userCreateInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  report: z.lazy(() => reportCreateNestedManyWithoutUserInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedManyWithoutUserInputSchema).optional(),
  student: z.lazy(() => studentCreateNestedOneWithoutUserInputSchema).optional(),
  userroles: z.lazy(() => userrolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userUncheckedCreateInputSchema: z.ZodType<Prisma.userUncheckedCreateInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  student: z.lazy(() => studentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userUpdateInputSchema: z.ZodType<Prisma.userUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutUserNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateManyWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => studentUpdateOneWithoutUserNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const userUncheckedUpdateInputSchema: z.ZodType<Prisma.userUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => studentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const userCreateManyInputSchema: z.ZodType<Prisma.userCreateManyInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const userUpdateManyMutationInputSchema: z.ZodType<Prisma.userUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const userUncheckedUpdateManyInputSchema: z.ZodType<Prisma.userUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const userrolesCreateInputSchema: z.ZodType<Prisma.userrolesCreateInput> = z.object({
  roles: z.lazy(() => rolesCreateNestedOneWithoutUserrolesInputSchema),
  user: z.lazy(() => userCreateNestedOneWithoutUserrolesInputSchema)
}).strict();

export const userrolesUncheckedCreateInputSchema: z.ZodType<Prisma.userrolesUncheckedCreateInput> = z.object({
  userId: z.string(),
  roleId: z.number().int()
}).strict();

export const userrolesUpdateInputSchema: z.ZodType<Prisma.userrolesUpdateInput> = z.object({
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutUserrolesNestedInputSchema).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutUserrolesNestedInputSchema).optional()
}).strict();

export const userrolesUncheckedUpdateInputSchema: z.ZodType<Prisma.userrolesUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const userrolesCreateManyInputSchema: z.ZodType<Prisma.userrolesCreateManyInput> = z.object({
  userId: z.string(),
  roleId: z.number().int()
}).strict();

export const userrolesUpdateManyMutationInputSchema: z.ZodType<Prisma.userrolesUpdateManyMutationInput> = z.object({
}).strict();

export const userrolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.userrolesUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const Enumbus_statusNullableFilterSchema: z.ZodType<Prisma.Enumbus_statusNullableFilter> = z.object({
  equals: z.lazy(() => bus_statusSchema).optional().nullable(),
  in: z.lazy(() => bus_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => bus_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NestedEnumbus_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ScheduleListRelationFilterSchema: z.ZodType<Prisma.ScheduleListRelationFilter> = z.object({
  every: z.lazy(() => scheduleWhereInputSchema).optional(),
  some: z.lazy(() => scheduleWhereInputSchema).optional(),
  none: z.lazy(() => scheduleWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const scheduleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.scheduleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const busOrderByRelevanceInputSchema: z.ZodType<Prisma.busOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => busOrderByRelevanceFieldEnumSchema),z.lazy(() => busOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const busCountOrderByAggregateInputSchema: z.ZodType<Prisma.busCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const busAvgOrderByAggregateInputSchema: z.ZodType<Prisma.busAvgOrderByAggregateInput> = z.object({
  capacity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const busMaxOrderByAggregateInputSchema: z.ZodType<Prisma.busMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const busMinOrderByAggregateInputSchema: z.ZodType<Prisma.busMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const busSumOrderByAggregateInputSchema: z.ZodType<Prisma.busSumOrderByAggregateInput> = z.object({
  capacity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const Enumbus_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumbus_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => bus_statusSchema).optional().nullable(),
  in: z.lazy(() => bus_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => bus_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NestedEnumbus_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumbus_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumbus_statusNullableFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const RolepermissionsListRelationFilterSchema: z.ZodType<Prisma.RolepermissionsListRelationFilter> = z.object({
  every: z.lazy(() => rolepermissionsWhereInputSchema).optional(),
  some: z.lazy(() => rolepermissionsWhereInputSchema).optional(),
  none: z.lazy(() => rolepermissionsWhereInputSchema).optional()
}).strict();

export const rolepermissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.rolepermissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const permissionOrderByRelevanceInputSchema: z.ZodType<Prisma.permissionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => permissionOrderByRelevanceFieldEnumSchema),z.lazy(() => permissionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const permissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.permissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const permissionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.permissionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const permissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.permissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const permissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.permissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const permissionSumOrderByAggregateInputSchema: z.ZodType<Prisma.permissionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => userWhereInputSchema).optional(),
  isNot: z.lazy(() => userWhereInputSchema).optional()
}).strict();

export const TripNullableScalarRelationFilterSchema: z.ZodType<Prisma.TripNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => tripWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => tripWhereInputSchema).optional().nullable()
}).strict();

export const reportOrderByRelevanceInputSchema: z.ZodType<Prisma.reportOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => reportOrderByRelevanceFieldEnumSchema),z.lazy(() => reportOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const reportCountOrderByAggregateInputSchema: z.ZodType<Prisma.reportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const reportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.reportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const reportMinOrderByAggregateInputSchema: z.ZodType<Prisma.reportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const PermissionScalarRelationFilterSchema: z.ZodType<Prisma.PermissionScalarRelationFilter> = z.object({
  is: z.lazy(() => permissionWhereInputSchema).optional(),
  isNot: z.lazy(() => permissionWhereInputSchema).optional()
}).strict();

export const RolesScalarRelationFilterSchema: z.ZodType<Prisma.RolesScalarRelationFilter> = z.object({
  is: z.lazy(() => rolesWhereInputSchema).optional(),
  isNot: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export const rolepermissionsRoleIdPermissionIdCompoundUniqueInputSchema: z.ZodType<Prisma.rolepermissionsRoleIdPermissionIdCompoundUniqueInput> = z.object({
  roleId: z.number(),
  permissionId: z.number()
}).strict();

export const rolepermissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.rolepermissionsCountOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolepermissionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.rolepermissionsAvgOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolepermissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.rolepermissionsMaxOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolepermissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.rolepermissionsMinOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolepermissionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.rolepermissionsSumOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserrolesListRelationFilterSchema: z.ZodType<Prisma.UserrolesListRelationFilter> = z.object({
  every: z.lazy(() => userrolesWhereInputSchema).optional(),
  some: z.lazy(() => userrolesWhereInputSchema).optional(),
  none: z.lazy(() => userrolesWhereInputSchema).optional()
}).strict();

export const userrolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.userrolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesOrderByRelevanceInputSchema: z.ZodType<Prisma.rolesOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => rolesOrderByRelevanceFieldEnumSchema),z.lazy(() => rolesOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const rolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.rolesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.rolesAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.rolesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.rolesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesSumOrderByAggregateInputSchema: z.ZodType<Prisma.rolesSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RoutestoppointListRelationFilterSchema: z.ZodType<Prisma.RoutestoppointListRelationFilter> = z.object({
  every: z.lazy(() => routestoppointWhereInputSchema).optional(),
  some: z.lazy(() => routestoppointWhereInputSchema).optional(),
  none: z.lazy(() => routestoppointWhereInputSchema).optional()
}).strict();

export const StudentassignmentListRelationFilterSchema: z.ZodType<Prisma.StudentassignmentListRelationFilter> = z.object({
  every: z.lazy(() => studentassignmentWhereInputSchema).optional(),
  some: z.lazy(() => studentassignmentWhereInputSchema).optional(),
  none: z.lazy(() => studentassignmentWhereInputSchema).optional()
}).strict();

export const routestoppointOrderByRelationAggregateInputSchema: z.ZodType<Prisma.routestoppointOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentassignmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.studentassignmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routeOrderByRelevanceInputSchema: z.ZodType<Prisma.routeOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => routeOrderByRelevanceFieldEnumSchema),z.lazy(() => routeOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const routeCountOrderByAggregateInputSchema: z.ZodType<Prisma.routeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.lazy(() => SortOrderSchema).optional(),
  startLocation: z.lazy(() => SortOrderSchema).optional(),
  endLocation: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.routeAvgOrderByAggregateInput> = z.object({
  estimatedDuration: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.routeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routeMinOrderByAggregateInputSchema: z.ZodType<Prisma.routeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routeSumOrderByAggregateInputSchema: z.ZodType<Prisma.routeSumOrderByAggregateInput> = z.object({
  estimatedDuration: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const Enumroutestoppoint_directionFilterSchema: z.ZodType<Prisma.Enumroutestoppoint_directionFilter> = z.object({
  equals: z.lazy(() => routestoppoint_directionSchema).optional(),
  in: z.lazy(() => routestoppoint_directionSchema).array().optional(),
  notIn: z.lazy(() => routestoppoint_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => NestedEnumroutestoppoint_directionFilterSchema) ]).optional(),
}).strict();

export const RouteScalarRelationFilterSchema: z.ZodType<Prisma.RouteScalarRelationFilter> = z.object({
  is: z.lazy(() => routeWhereInputSchema).optional(),
  isNot: z.lazy(() => routeWhereInputSchema).optional()
}).strict();

export const StoppointScalarRelationFilterSchema: z.ZodType<Prisma.StoppointScalarRelationFilter> = z.object({
  is: z.lazy(() => stoppointWhereInputSchema).optional(),
  isNot: z.lazy(() => stoppointWhereInputSchema).optional()
}).strict();

export const routestoppointOrderByRelevanceInputSchema: z.ZodType<Prisma.routestoppointOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => routestoppointOrderByRelevanceFieldEnumSchema),z.lazy(() => routestoppointOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const routestoppointCountOrderByAggregateInputSchema: z.ZodType<Prisma.routestoppointCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routestoppointAvgOrderByAggregateInputSchema: z.ZodType<Prisma.routestoppointAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routestoppointMaxOrderByAggregateInputSchema: z.ZodType<Prisma.routestoppointMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routestoppointMinOrderByAggregateInputSchema: z.ZodType<Prisma.routestoppointMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const routestoppointSumOrderByAggregateInputSchema: z.ZodType<Prisma.routestoppointSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumroutestoppoint_directionWithAggregatesFilterSchema: z.ZodType<Prisma.Enumroutestoppoint_directionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => routestoppoint_directionSchema).optional(),
  in: z.lazy(() => routestoppoint_directionSchema).array().optional(),
  notIn: z.lazy(() => routestoppoint_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => NestedEnumroutestoppoint_directionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumroutestoppoint_directionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumroutestoppoint_directionFilterSchema).optional()
}).strict();

export const Enumschedule_typeFilterSchema: z.ZodType<Prisma.Enumschedule_typeFilter> = z.object({
  equals: z.lazy(() => schedule_typeSchema).optional(),
  in: z.lazy(() => schedule_typeSchema).array().optional(),
  notIn: z.lazy(() => schedule_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => NestedEnumschedule_typeFilterSchema) ]).optional(),
}).strict();

export const Enumschedule_statusNullableFilterSchema: z.ZodType<Prisma.Enumschedule_statusNullableFilter> = z.object({
  equals: z.lazy(() => schedule_statusSchema).optional().nullable(),
  in: z.lazy(() => schedule_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => schedule_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NestedEnumschedule_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BusScalarRelationFilterSchema: z.ZodType<Prisma.BusScalarRelationFilter> = z.object({
  is: z.lazy(() => busWhereInputSchema).optional(),
  isNot: z.lazy(() => busWhereInputSchema).optional()
}).strict();

export const TripListRelationFilterSchema: z.ZodType<Prisma.TripListRelationFilter> = z.object({
  every: z.lazy(() => tripWhereInputSchema).optional(),
  some: z.lazy(() => tripWhereInputSchema).optional(),
  none: z.lazy(() => tripWhereInputSchema).optional()
}).strict();

export const tripOrderByRelationAggregateInputSchema: z.ZodType<Prisma.tripOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const scheduleOrderByRelevanceInputSchema: z.ZodType<Prisma.scheduleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => scheduleOrderByRelevanceFieldEnumSchema),z.lazy(() => scheduleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const scheduleCountOrderByAggregateInputSchema: z.ZodType<Prisma.scheduleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  busId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  daysOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const scheduleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.scheduleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  busId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const scheduleMinOrderByAggregateInputSchema: z.ZodType<Prisma.scheduleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  busId: z.lazy(() => SortOrderSchema).optional(),
  driverId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumschedule_typeWithAggregatesFilterSchema: z.ZodType<Prisma.Enumschedule_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => schedule_typeSchema).optional(),
  in: z.lazy(() => schedule_typeSchema).array().optional(),
  notIn: z.lazy(() => schedule_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => NestedEnumschedule_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumschedule_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumschedule_typeFilterSchema).optional()
}).strict();

export const Enumschedule_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumschedule_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => schedule_statusSchema).optional().nullable(),
  in: z.lazy(() => schedule_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => schedule_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NestedEnumschedule_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumschedule_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumschedule_statusNullableFilterSchema).optional()
}).strict();

export const TripstopListRelationFilterSchema: z.ZodType<Prisma.TripstopListRelationFilter> = z.object({
  every: z.lazy(() => tripstopWhereInputSchema).optional(),
  some: z.lazy(() => tripstopWhereInputSchema).optional(),
  none: z.lazy(() => tripstopWhereInputSchema).optional()
}).strict();

export const tripstopOrderByRelationAggregateInputSchema: z.ZodType<Prisma.tripstopOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const stoppointOrderByRelevanceInputSchema: z.ZodType<Prisma.stoppointOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => stoppointOrderByRelevanceFieldEnumSchema),z.lazy(() => stoppointOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const stoppointCountOrderByAggregateInputSchema: z.ZodType<Prisma.stoppointCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const stoppointMaxOrderByAggregateInputSchema: z.ZodType<Prisma.stoppointMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const stoppointMinOrderByAggregateInputSchema: z.ZodType<Prisma.stoppointMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentattendanceListRelationFilterSchema: z.ZodType<Prisma.StudentattendanceListRelationFilter> = z.object({
  every: z.lazy(() => studentattendanceWhereInputSchema).optional(),
  some: z.lazy(() => studentattendanceWhereInputSchema).optional(),
  none: z.lazy(() => studentattendanceWhereInputSchema).optional()
}).strict();

export const studentattendanceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.studentattendanceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentOrderByRelevanceInputSchema: z.ZodType<Prisma.studentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => studentOrderByRelevanceFieldEnumSchema),z.lazy(() => studentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const studentCountOrderByAggregateInputSchema: z.ZodType<Prisma.studentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.studentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentMinOrderByAggregateInputSchema: z.ZodType<Prisma.studentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumstudentassignment_directionFilterSchema: z.ZodType<Prisma.Enumstudentassignment_directionFilter> = z.object({
  equals: z.lazy(() => studentassignment_directionSchema).optional(),
  in: z.lazy(() => studentassignment_directionSchema).array().optional(),
  notIn: z.lazy(() => studentassignment_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => NestedEnumstudentassignment_directionFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StudentScalarRelationFilterSchema: z.ZodType<Prisma.StudentScalarRelationFilter> = z.object({
  is: z.lazy(() => studentWhereInputSchema).optional(),
  isNot: z.lazy(() => studentWhereInputSchema).optional()
}).strict();

export const studentassignmentOrderByRelevanceInputSchema: z.ZodType<Prisma.studentassignmentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => studentassignmentOrderByRelevanceFieldEnumSchema),z.lazy(() => studentassignmentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const studentassignmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.studentassignmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  effectiveFrom: z.lazy(() => SortOrderSchema).optional(),
  effectiveTo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentassignmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.studentassignmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  effectiveFrom: z.lazy(() => SortOrderSchema).optional(),
  effectiveTo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentassignmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.studentassignmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  effectiveFrom: z.lazy(() => SortOrderSchema).optional(),
  effectiveTo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumstudentassignment_directionWithAggregatesFilterSchema: z.ZodType<Prisma.Enumstudentassignment_directionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => studentassignment_directionSchema).optional(),
  in: z.lazy(() => studentassignment_directionSchema).array().optional(),
  notIn: z.lazy(() => studentassignment_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => NestedEnumstudentassignment_directionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstudentassignment_directionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstudentassignment_directionFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const Enumstudentattendance_statusNullableFilterSchema: z.ZodType<Prisma.Enumstudentattendance_statusNullableFilter> = z.object({
  equals: z.lazy(() => studentattendance_statusSchema).optional().nullable(),
  in: z.lazy(() => studentattendance_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => studentattendance_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NestedEnumstudentattendance_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TripScalarRelationFilterSchema: z.ZodType<Prisma.TripScalarRelationFilter> = z.object({
  is: z.lazy(() => tripWhereInputSchema).optional(),
  isNot: z.lazy(() => tripWhereInputSchema).optional()
}).strict();

export const studentattendanceOrderByRelevanceInputSchema: z.ZodType<Prisma.studentattendanceOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => studentattendanceOrderByRelevanceFieldEnumSchema),z.lazy(() => studentattendanceOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const studentattendanceCountOrderByAggregateInputSchema: z.ZodType<Prisma.studentattendanceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional(),
  dropoffTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentattendanceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.studentattendanceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional(),
  dropoffTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentattendanceMinOrderByAggregateInputSchema: z.ZodType<Prisma.studentattendanceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional(),
  dropoffTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumstudentattendance_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumstudentattendance_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => studentattendance_statusSchema).optional().nullable(),
  in: z.lazy(() => studentattendance_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => studentattendance_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NestedEnumstudentattendance_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstudentattendance_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstudentattendance_statusNullableFilterSchema).optional()
}).strict();

export const trackingbushistoryOrderByRelevanceInputSchema: z.ZodType<Prisma.trackingbushistoryOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => trackingbushistoryOrderByRelevanceFieldEnumSchema),z.lazy(() => trackingbushistoryOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const trackingbushistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.trackingbushistoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const trackingbushistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.trackingbushistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const trackingbushistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.trackingbushistoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumtrip_statusNullableFilterSchema: z.ZodType<Prisma.Enumtrip_statusNullableFilter> = z.object({
  equals: z.lazy(() => trip_statusSchema).optional().nullable(),
  in: z.lazy(() => trip_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => trip_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NestedEnumtrip_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumtrip_typeFilterSchema: z.ZodType<Prisma.Enumtrip_typeFilter> = z.object({
  equals: z.lazy(() => trip_typeSchema).optional(),
  in: z.lazy(() => trip_typeSchema).array().optional(),
  notIn: z.lazy(() => trip_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => NestedEnumtrip_typeFilterSchema) ]).optional(),
}).strict();

export const ReportListRelationFilterSchema: z.ZodType<Prisma.ReportListRelationFilter> = z.object({
  every: z.lazy(() => reportWhereInputSchema).optional(),
  some: z.lazy(() => reportWhereInputSchema).optional(),
  none: z.lazy(() => reportWhereInputSchema).optional()
}).strict();

export const TrackingbushistoryListRelationFilterSchema: z.ZodType<Prisma.TrackingbushistoryListRelationFilter> = z.object({
  every: z.lazy(() => trackingbushistoryWhereInputSchema).optional(),
  some: z.lazy(() => trackingbushistoryWhereInputSchema).optional(),
  none: z.lazy(() => trackingbushistoryWhereInputSchema).optional()
}).strict();

export const ScheduleScalarRelationFilterSchema: z.ZodType<Prisma.ScheduleScalarRelationFilter> = z.object({
  is: z.lazy(() => scheduleWhereInputSchema).optional(),
  isNot: z.lazy(() => scheduleWhereInputSchema).optional()
}).strict();

export const reportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.reportOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const trackingbushistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.trackingbushistoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tripOrderByRelevanceInputSchema: z.ZodType<Prisma.tripOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => tripOrderByRelevanceFieldEnumSchema),z.lazy(() => tripOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const tripCountOrderByAggregateInputSchema: z.ZodType<Prisma.tripCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scheduleId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  actualStartTime: z.lazy(() => SortOrderSchema).optional(),
  actualEndTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  currentStopId: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tripMaxOrderByAggregateInputSchema: z.ZodType<Prisma.tripMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scheduleId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  actualStartTime: z.lazy(() => SortOrderSchema).optional(),
  actualEndTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  currentStopId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tripMinOrderByAggregateInputSchema: z.ZodType<Prisma.tripMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scheduleId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  actualStartTime: z.lazy(() => SortOrderSchema).optional(),
  actualEndTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  currentStopId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumtrip_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumtrip_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => trip_statusSchema).optional().nullable(),
  in: z.lazy(() => trip_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => trip_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NestedEnumtrip_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtrip_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtrip_statusNullableFilterSchema).optional()
}).strict();

export const Enumtrip_typeWithAggregatesFilterSchema: z.ZodType<Prisma.Enumtrip_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => trip_typeSchema).optional(),
  in: z.lazy(() => trip_typeSchema).array().optional(),
  notIn: z.lazy(() => trip_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => NestedEnumtrip_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtrip_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtrip_typeFilterSchema).optional()
}).strict();

export const Enumtripstop_statusNullableFilterSchema: z.ZodType<Prisma.Enumtripstop_statusNullableFilter> = z.object({
  equals: z.lazy(() => tripstop_statusSchema).optional().nullable(),
  in: z.lazy(() => tripstop_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => tripstop_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NestedEnumtripstop_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const tripstopOrderByRelevanceInputSchema: z.ZodType<Prisma.tripstopOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => tripstopOrderByRelevanceFieldEnumSchema),z.lazy(() => tripstopOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const tripstopCountOrderByAggregateInputSchema: z.ZodType<Prisma.tripstopCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.lazy(() => SortOrderSchema).optional(),
  actualDeparture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tripstopMaxOrderByAggregateInputSchema: z.ZodType<Prisma.tripstopMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.lazy(() => SortOrderSchema).optional(),
  actualDeparture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tripstopMinOrderByAggregateInputSchema: z.ZodType<Prisma.tripstopMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.lazy(() => SortOrderSchema).optional(),
  actualDeparture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumtripstop_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumtripstop_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => tripstop_statusSchema).optional().nullable(),
  in: z.lazy(() => tripstop_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => tripstop_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NestedEnumtripstop_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtripstop_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtripstop_statusNullableFilterSchema).optional()
}).strict();

export const StudentNullableScalarRelationFilterSchema: z.ZodType<Prisma.StudentNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => studentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => studentWhereInputSchema).optional().nullable()
}).strict();

export const userOrderByRelevanceInputSchema: z.ZodType<Prisma.userOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => userOrderByRelevanceFieldEnumSchema),z.lazy(() => userOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const userCountOrderByAggregateInputSchema: z.ZodType<Prisma.userCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userMaxOrderByAggregateInputSchema: z.ZodType<Prisma.userMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userMinOrderByAggregateInputSchema: z.ZodType<Prisma.userMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userrolesOrderByRelevanceInputSchema: z.ZodType<Prisma.userrolesOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => userrolesOrderByRelevanceFieldEnumSchema),z.lazy(() => userrolesOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const userrolesUserIdRoleIdCompoundUniqueInputSchema: z.ZodType<Prisma.userrolesUserIdRoleIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  roleId: z.number()
}).strict();

export const userrolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.userrolesCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userrolesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.userrolesAvgOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userrolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.userrolesMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userrolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.userrolesMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userrolesSumOrderByAggregateInputSchema: z.ZodType<Prisma.userrolesSumOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const scheduleCreateNestedManyWithoutBusInputSchema: z.ZodType<Prisma.scheduleCreateNestedManyWithoutBusInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutBusInputSchema),z.lazy(() => scheduleCreateWithoutBusInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutBusInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutBusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyBusInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const scheduleUncheckedCreateNestedManyWithoutBusInputSchema: z.ZodType<Prisma.scheduleUncheckedCreateNestedManyWithoutBusInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutBusInputSchema),z.lazy(() => scheduleCreateWithoutBusInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutBusInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutBusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyBusInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableEnumbus_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumbus_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => bus_statusSchema).optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const scheduleUpdateManyWithoutBusNestedInputSchema: z.ZodType<Prisma.scheduleUpdateManyWithoutBusNestedInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutBusInputSchema),z.lazy(() => scheduleCreateWithoutBusInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutBusInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutBusInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => scheduleUpsertWithWhereUniqueWithoutBusInputSchema),z.lazy(() => scheduleUpsertWithWhereUniqueWithoutBusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyBusInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => scheduleUpdateWithWhereUniqueWithoutBusInputSchema),z.lazy(() => scheduleUpdateWithWhereUniqueWithoutBusInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => scheduleUpdateManyWithWhereWithoutBusInputSchema),z.lazy(() => scheduleUpdateManyWithWhereWithoutBusInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => scheduleScalarWhereInputSchema),z.lazy(() => scheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const scheduleUncheckedUpdateManyWithoutBusNestedInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateManyWithoutBusNestedInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutBusInputSchema),z.lazy(() => scheduleCreateWithoutBusInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutBusInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutBusInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => scheduleUpsertWithWhereUniqueWithoutBusInputSchema),z.lazy(() => scheduleUpsertWithWhereUniqueWithoutBusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyBusInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => scheduleUpdateWithWhereUniqueWithoutBusInputSchema),z.lazy(() => scheduleUpdateWithWhereUniqueWithoutBusInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => scheduleUpdateManyWithWhereWithoutBusInputSchema),z.lazy(() => scheduleUpdateManyWithWhereWithoutBusInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => scheduleScalarWhereInputSchema),z.lazy(() => scheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const rolepermissionsCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolepermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => rolepermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolepermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const rolepermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolepermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => rolepermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolepermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const rolepermissionsUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.rolepermissionsUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolepermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => rolepermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolepermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolepermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolepermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolepermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolepermissionsScalarWhereInputSchema),z.lazy(() => rolepermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const rolepermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolepermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => rolepermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolepermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolepermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolepermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolepermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolepermissionsScalarWhereInputSchema),z.lazy(() => rolepermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const userCreateNestedOneWithoutReportInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutReportInputSchema),z.lazy(() => userUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutReportInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional()
}).strict();

export const tripCreateNestedOneWithoutReportInputSchema: z.ZodType<Prisma.tripCreateNestedOneWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutReportInputSchema),z.lazy(() => tripUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tripCreateOrConnectWithoutReportInputSchema).optional(),
  connect: z.lazy(() => tripWhereUniqueInputSchema).optional()
}).strict();

export const userUpdateOneRequiredWithoutReportNestedInputSchema: z.ZodType<Prisma.userUpdateOneRequiredWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutReportInputSchema),z.lazy(() => userUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutReportInputSchema).optional(),
  upsert: z.lazy(() => userUpsertWithoutReportInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => userUpdateToOneWithWhereWithoutReportInputSchema),z.lazy(() => userUpdateWithoutReportInputSchema),z.lazy(() => userUncheckedUpdateWithoutReportInputSchema) ]).optional(),
}).strict();

export const tripUpdateOneWithoutReportNestedInputSchema: z.ZodType<Prisma.tripUpdateOneWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutReportInputSchema),z.lazy(() => tripUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tripCreateOrConnectWithoutReportInputSchema).optional(),
  upsert: z.lazy(() => tripUpsertWithoutReportInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => tripWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => tripWhereInputSchema) ]).optional(),
  connect: z.lazy(() => tripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => tripUpdateToOneWithWhereWithoutReportInputSchema),z.lazy(() => tripUpdateWithoutReportInputSchema),z.lazy(() => tripUncheckedUpdateWithoutReportInputSchema) ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const permissionCreateNestedOneWithoutRolepermissionsInputSchema: z.ZodType<Prisma.permissionCreateNestedOneWithoutRolepermissionsInput> = z.object({
  create: z.union([ z.lazy(() => permissionCreateWithoutRolepermissionsInputSchema),z.lazy(() => permissionUncheckedCreateWithoutRolepermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionCreateOrConnectWithoutRolepermissionsInputSchema).optional(),
  connect: z.lazy(() => permissionWhereUniqueInputSchema).optional()
}).strict();

export const rolesCreateNestedOneWithoutRolepermissionsInputSchema: z.ZodType<Prisma.rolesCreateNestedOneWithoutRolepermissionsInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutRolepermissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRolepermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutRolepermissionsInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional()
}).strict();

export const permissionUpdateOneRequiredWithoutRolepermissionsNestedInputSchema: z.ZodType<Prisma.permissionUpdateOneRequiredWithoutRolepermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionCreateWithoutRolepermissionsInputSchema),z.lazy(() => permissionUncheckedCreateWithoutRolepermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionCreateOrConnectWithoutRolepermissionsInputSchema).optional(),
  upsert: z.lazy(() => permissionUpsertWithoutRolepermissionsInputSchema).optional(),
  connect: z.lazy(() => permissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => permissionUpdateToOneWithWhereWithoutRolepermissionsInputSchema),z.lazy(() => permissionUpdateWithoutRolepermissionsInputSchema),z.lazy(() => permissionUncheckedUpdateWithoutRolepermissionsInputSchema) ]).optional(),
}).strict();

export const rolesUpdateOneRequiredWithoutRolepermissionsNestedInputSchema: z.ZodType<Prisma.rolesUpdateOneRequiredWithoutRolepermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutRolepermissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRolepermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutRolepermissionsInputSchema).optional(),
  upsert: z.lazy(() => rolesUpsertWithoutRolepermissionsInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => rolesUpdateToOneWithWhereWithoutRolepermissionsInputSchema),z.lazy(() => rolesUpdateWithoutRolepermissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRolepermissionsInputSchema) ]).optional(),
}).strict();

export const rolepermissionsCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolepermissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => rolepermissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolepermissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const userrolesCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.userrolesCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => userrolesCreateWithoutRolesInputSchema),z.lazy(() => userrolesCreateWithoutRolesInputSchema).array(),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => userrolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => userrolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => userrolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const rolepermissionsUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolepermissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => rolepermissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolepermissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const userrolesUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.userrolesUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => userrolesCreateWithoutRolesInputSchema),z.lazy(() => userrolesCreateWithoutRolesInputSchema).array(),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => userrolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => userrolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => userrolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const rolepermissionsUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.rolepermissionsUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolepermissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => rolepermissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolepermissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => rolepermissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolepermissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolepermissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => rolepermissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolepermissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => rolepermissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolepermissionsScalarWhereInputSchema),z.lazy(() => rolepermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const userrolesUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.userrolesUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => userrolesCreateWithoutRolesInputSchema),z.lazy(() => userrolesCreateWithoutRolesInputSchema).array(),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => userrolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => userrolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => userrolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => userrolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => userrolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => userrolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => userrolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => userrolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => userrolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => userrolesScalarWhereInputSchema),z.lazy(() => userrolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const rolepermissionsUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolepermissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => rolepermissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolepermissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => rolepermissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolepermissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolepermissionsWhereUniqueInputSchema),z.lazy(() => rolepermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolepermissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => rolepermissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolepermissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => rolepermissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolepermissionsScalarWhereInputSchema),z.lazy(() => rolepermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const userrolesUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.userrolesUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => userrolesCreateWithoutRolesInputSchema),z.lazy(() => userrolesCreateWithoutRolesInputSchema).array(),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => userrolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => userrolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => userrolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => userrolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => userrolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => userrolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => userrolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => userrolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => userrolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => userrolesScalarWhereInputSchema),z.lazy(() => userrolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const routestoppointCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => routestoppointCreateWithoutRouteInputSchema),z.lazy(() => routestoppointCreateWithoutRouteInputSchema).array(),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => routestoppointCreateOrConnectWithoutRouteInputSchema),z.lazy(() => routestoppointCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => routestoppointCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const scheduleCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.scheduleCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutRouteInputSchema),z.lazy(() => scheduleCreateWithoutRouteInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutRouteInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentCreateWithoutRouteInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutRouteInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const routestoppointUncheckedCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointUncheckedCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => routestoppointCreateWithoutRouteInputSchema),z.lazy(() => routestoppointCreateWithoutRouteInputSchema).array(),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => routestoppointCreateOrConnectWithoutRouteInputSchema),z.lazy(() => routestoppointCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => routestoppointCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const scheduleUncheckedCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.scheduleUncheckedCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutRouteInputSchema),z.lazy(() => scheduleCreateWithoutRouteInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutRouteInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentUncheckedCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentUncheckedCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentCreateWithoutRouteInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutRouteInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const routestoppointUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.routestoppointUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => routestoppointCreateWithoutRouteInputSchema),z.lazy(() => routestoppointCreateWithoutRouteInputSchema).array(),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => routestoppointCreateOrConnectWithoutRouteInputSchema),z.lazy(() => routestoppointCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => routestoppointUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => routestoppointUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => routestoppointCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => routestoppointUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => routestoppointUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => routestoppointUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => routestoppointUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => routestoppointScalarWhereInputSchema),z.lazy(() => routestoppointScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const scheduleUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.scheduleUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutRouteInputSchema),z.lazy(() => scheduleCreateWithoutRouteInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutRouteInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => scheduleUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => scheduleUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => scheduleUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => scheduleUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => scheduleUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => scheduleUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => scheduleScalarWhereInputSchema),z.lazy(() => scheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.studentassignmentUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentCreateWithoutRouteInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutRouteInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentassignmentUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => studentassignmentUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentassignmentScalarWhereInputSchema),z.lazy(() => studentassignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const routestoppointUncheckedUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.routestoppointUncheckedUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => routestoppointCreateWithoutRouteInputSchema),z.lazy(() => routestoppointCreateWithoutRouteInputSchema).array(),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => routestoppointCreateOrConnectWithoutRouteInputSchema),z.lazy(() => routestoppointCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => routestoppointUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => routestoppointUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => routestoppointCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => routestoppointUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => routestoppointUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => routestoppointUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => routestoppointUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => routestoppointScalarWhereInputSchema),z.lazy(() => routestoppointScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const scheduleUncheckedUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutRouteInputSchema),z.lazy(() => scheduleCreateWithoutRouteInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutRouteInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => scheduleUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => scheduleUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => scheduleUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => scheduleUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => scheduleUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => scheduleUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => scheduleScalarWhereInputSchema),z.lazy(() => scheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentUncheckedUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentCreateWithoutRouteInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutRouteInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentassignmentUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => studentassignmentUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentassignmentScalarWhereInputSchema),z.lazy(() => studentassignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const routeCreateNestedOneWithoutRoutestoppointInputSchema: z.ZodType<Prisma.routeCreateNestedOneWithoutRoutestoppointInput> = z.object({
  create: z.union([ z.lazy(() => routeCreateWithoutRoutestoppointInputSchema),z.lazy(() => routeUncheckedCreateWithoutRoutestoppointInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => routeCreateOrConnectWithoutRoutestoppointInputSchema).optional(),
  connect: z.lazy(() => routeWhereUniqueInputSchema).optional()
}).strict();

export const stoppointCreateNestedOneWithoutRoutestoppointInputSchema: z.ZodType<Prisma.stoppointCreateNestedOneWithoutRoutestoppointInput> = z.object({
  create: z.union([ z.lazy(() => stoppointCreateWithoutRoutestoppointInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutRoutestoppointInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => stoppointCreateOrConnectWithoutRoutestoppointInputSchema).optional(),
  connect: z.lazy(() => stoppointWhereUniqueInputSchema).optional()
}).strict();

export const Enumroutestoppoint_directionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumroutestoppoint_directionFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => routestoppoint_directionSchema).optional()
}).strict();

export const routeUpdateOneRequiredWithoutRoutestoppointNestedInputSchema: z.ZodType<Prisma.routeUpdateOneRequiredWithoutRoutestoppointNestedInput> = z.object({
  create: z.union([ z.lazy(() => routeCreateWithoutRoutestoppointInputSchema),z.lazy(() => routeUncheckedCreateWithoutRoutestoppointInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => routeCreateOrConnectWithoutRoutestoppointInputSchema).optional(),
  upsert: z.lazy(() => routeUpsertWithoutRoutestoppointInputSchema).optional(),
  connect: z.lazy(() => routeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => routeUpdateToOneWithWhereWithoutRoutestoppointInputSchema),z.lazy(() => routeUpdateWithoutRoutestoppointInputSchema),z.lazy(() => routeUncheckedUpdateWithoutRoutestoppointInputSchema) ]).optional(),
}).strict();

export const stoppointUpdateOneRequiredWithoutRoutestoppointNestedInputSchema: z.ZodType<Prisma.stoppointUpdateOneRequiredWithoutRoutestoppointNestedInput> = z.object({
  create: z.union([ z.lazy(() => stoppointCreateWithoutRoutestoppointInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutRoutestoppointInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => stoppointCreateOrConnectWithoutRoutestoppointInputSchema).optional(),
  upsert: z.lazy(() => stoppointUpsertWithoutRoutestoppointInputSchema).optional(),
  connect: z.lazy(() => stoppointWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => stoppointUpdateToOneWithWhereWithoutRoutestoppointInputSchema),z.lazy(() => stoppointUpdateWithoutRoutestoppointInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutRoutestoppointInputSchema) ]).optional(),
}).strict();

export const busCreateNestedOneWithoutScheduleInputSchema: z.ZodType<Prisma.busCreateNestedOneWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => busCreateWithoutScheduleInputSchema),z.lazy(() => busUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => busCreateOrConnectWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => busWhereUniqueInputSchema).optional()
}).strict();

export const userCreateNestedOneWithoutScheduleInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutScheduleInputSchema),z.lazy(() => userUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional()
}).strict();

export const routeCreateNestedOneWithoutScheduleInputSchema: z.ZodType<Prisma.routeCreateNestedOneWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => routeCreateWithoutScheduleInputSchema),z.lazy(() => routeUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => routeCreateOrConnectWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => routeWhereUniqueInputSchema).optional()
}).strict();

export const tripCreateNestedManyWithoutScheduleInputSchema: z.ZodType<Prisma.tripCreateNestedManyWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutScheduleInputSchema),z.lazy(() => tripCreateWithoutScheduleInputSchema).array(),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => tripCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripCreateManyScheduleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const tripUncheckedCreateNestedManyWithoutScheduleInputSchema: z.ZodType<Prisma.tripUncheckedCreateNestedManyWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutScheduleInputSchema),z.lazy(() => tripCreateWithoutScheduleInputSchema).array(),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => tripCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripCreateManyScheduleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Enumschedule_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumschedule_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => schedule_typeSchema).optional()
}).strict();

export const NullableEnumschedule_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumschedule_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => schedule_statusSchema).optional().nullable()
}).strict();

export const busUpdateOneRequiredWithoutScheduleNestedInputSchema: z.ZodType<Prisma.busUpdateOneRequiredWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => busCreateWithoutScheduleInputSchema),z.lazy(() => busUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => busCreateOrConnectWithoutScheduleInputSchema).optional(),
  upsert: z.lazy(() => busUpsertWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => busWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => busUpdateToOneWithWhereWithoutScheduleInputSchema),z.lazy(() => busUpdateWithoutScheduleInputSchema),z.lazy(() => busUncheckedUpdateWithoutScheduleInputSchema) ]).optional(),
}).strict();

export const userUpdateOneRequiredWithoutScheduleNestedInputSchema: z.ZodType<Prisma.userUpdateOneRequiredWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutScheduleInputSchema),z.lazy(() => userUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutScheduleInputSchema).optional(),
  upsert: z.lazy(() => userUpsertWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => userUpdateToOneWithWhereWithoutScheduleInputSchema),z.lazy(() => userUpdateWithoutScheduleInputSchema),z.lazy(() => userUncheckedUpdateWithoutScheduleInputSchema) ]).optional(),
}).strict();

export const routeUpdateOneRequiredWithoutScheduleNestedInputSchema: z.ZodType<Prisma.routeUpdateOneRequiredWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => routeCreateWithoutScheduleInputSchema),z.lazy(() => routeUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => routeCreateOrConnectWithoutScheduleInputSchema).optional(),
  upsert: z.lazy(() => routeUpsertWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => routeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => routeUpdateToOneWithWhereWithoutScheduleInputSchema),z.lazy(() => routeUpdateWithoutScheduleInputSchema),z.lazy(() => routeUncheckedUpdateWithoutScheduleInputSchema) ]).optional(),
}).strict();

export const tripUpdateManyWithoutScheduleNestedInputSchema: z.ZodType<Prisma.tripUpdateManyWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutScheduleInputSchema),z.lazy(() => tripCreateWithoutScheduleInputSchema).array(),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => tripCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => tripUpsertWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => tripUpsertWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripCreateManyScheduleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => tripUpdateWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => tripUpdateWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => tripUpdateManyWithWhereWithoutScheduleInputSchema),z.lazy(() => tripUpdateManyWithWhereWithoutScheduleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => tripScalarWhereInputSchema),z.lazy(() => tripScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const tripUncheckedUpdateManyWithoutScheduleNestedInputSchema: z.ZodType<Prisma.tripUncheckedUpdateManyWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutScheduleInputSchema),z.lazy(() => tripCreateWithoutScheduleInputSchema).array(),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => tripCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => tripUpsertWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => tripUpsertWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripCreateManyScheduleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => tripWhereUniqueInputSchema),z.lazy(() => tripWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => tripUpdateWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => tripUpdateWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => tripUpdateManyWithWhereWithoutScheduleInputSchema),z.lazy(() => tripUpdateManyWithWhereWithoutScheduleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => tripScalarWhereInputSchema),z.lazy(() => tripScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const routestoppointCreateNestedManyWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointCreateNestedManyWithoutStoppointInput> = z.object({
  create: z.union([ z.lazy(() => routestoppointCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointCreateWithoutStoppointInputSchema).array(),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => routestoppointCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => routestoppointCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => routestoppointCreateManyStoppointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentCreateNestedManyWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentCreateNestedManyWithoutStoppointInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyStoppointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const tripstopCreateNestedManyWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopCreateNestedManyWithoutStoppointInput> = z.object({
  create: z.union([ z.lazy(() => tripstopCreateWithoutStoppointInputSchema),z.lazy(() => tripstopCreateWithoutStoppointInputSchema).array(),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripstopCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => tripstopCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripstopCreateManyStoppointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const routestoppointUncheckedCreateNestedManyWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointUncheckedCreateNestedManyWithoutStoppointInput> = z.object({
  create: z.union([ z.lazy(() => routestoppointCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointCreateWithoutStoppointInputSchema).array(),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => routestoppointCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => routestoppointCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => routestoppointCreateManyStoppointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentUncheckedCreateNestedManyWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentUncheckedCreateNestedManyWithoutStoppointInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyStoppointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const tripstopUncheckedCreateNestedManyWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopUncheckedCreateNestedManyWithoutStoppointInput> = z.object({
  create: z.union([ z.lazy(() => tripstopCreateWithoutStoppointInputSchema),z.lazy(() => tripstopCreateWithoutStoppointInputSchema).array(),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripstopCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => tripstopCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripstopCreateManyStoppointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const routestoppointUpdateManyWithoutStoppointNestedInputSchema: z.ZodType<Prisma.routestoppointUpdateManyWithoutStoppointNestedInput> = z.object({
  create: z.union([ z.lazy(() => routestoppointCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointCreateWithoutStoppointInputSchema).array(),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => routestoppointCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => routestoppointCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => routestoppointUpsertWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => routestoppointUpsertWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => routestoppointCreateManyStoppointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => routestoppointUpdateWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => routestoppointUpdateWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => routestoppointUpdateManyWithWhereWithoutStoppointInputSchema),z.lazy(() => routestoppointUpdateManyWithWhereWithoutStoppointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => routestoppointScalarWhereInputSchema),z.lazy(() => routestoppointScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentUpdateManyWithoutStoppointNestedInputSchema: z.ZodType<Prisma.studentassignmentUpdateManyWithoutStoppointNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyStoppointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentassignmentUpdateManyWithWhereWithoutStoppointInputSchema),z.lazy(() => studentassignmentUpdateManyWithWhereWithoutStoppointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentassignmentScalarWhereInputSchema),z.lazy(() => studentassignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const tripstopUpdateManyWithoutStoppointNestedInputSchema: z.ZodType<Prisma.tripstopUpdateManyWithoutStoppointNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripstopCreateWithoutStoppointInputSchema),z.lazy(() => tripstopCreateWithoutStoppointInputSchema).array(),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripstopCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => tripstopCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => tripstopUpsertWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => tripstopUpsertWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripstopCreateManyStoppointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => tripstopUpdateWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => tripstopUpdateWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => tripstopUpdateManyWithWhereWithoutStoppointInputSchema),z.lazy(() => tripstopUpdateManyWithWhereWithoutStoppointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => tripstopScalarWhereInputSchema),z.lazy(() => tripstopScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const routestoppointUncheckedUpdateManyWithoutStoppointNestedInputSchema: z.ZodType<Prisma.routestoppointUncheckedUpdateManyWithoutStoppointNestedInput> = z.object({
  create: z.union([ z.lazy(() => routestoppointCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointCreateWithoutStoppointInputSchema).array(),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => routestoppointCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => routestoppointCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => routestoppointUpsertWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => routestoppointUpsertWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => routestoppointCreateManyStoppointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => routestoppointWhereUniqueInputSchema),z.lazy(() => routestoppointWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => routestoppointUpdateWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => routestoppointUpdateWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => routestoppointUpdateManyWithWhereWithoutStoppointInputSchema),z.lazy(() => routestoppointUpdateManyWithWhereWithoutStoppointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => routestoppointScalarWhereInputSchema),z.lazy(() => routestoppointScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentUncheckedUpdateManyWithoutStoppointNestedInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateManyWithoutStoppointNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyStoppointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentassignmentUpdateManyWithWhereWithoutStoppointInputSchema),z.lazy(() => studentassignmentUpdateManyWithWhereWithoutStoppointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentassignmentScalarWhereInputSchema),z.lazy(() => studentassignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const tripstopUncheckedUpdateManyWithoutStoppointNestedInputSchema: z.ZodType<Prisma.tripstopUncheckedUpdateManyWithoutStoppointNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripstopCreateWithoutStoppointInputSchema),z.lazy(() => tripstopCreateWithoutStoppointInputSchema).array(),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripstopCreateOrConnectWithoutStoppointInputSchema),z.lazy(() => tripstopCreateOrConnectWithoutStoppointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => tripstopUpsertWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => tripstopUpsertWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripstopCreateManyStoppointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => tripstopUpdateWithWhereUniqueWithoutStoppointInputSchema),z.lazy(() => tripstopUpdateWithWhereUniqueWithoutStoppointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => tripstopUpdateManyWithWhereWithoutStoppointInputSchema),z.lazy(() => tripstopUpdateManyWithWhereWithoutStoppointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => tripstopScalarWhereInputSchema),z.lazy(() => tripstopScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const userCreateNestedOneWithoutStudentInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutStudentInputSchema),z.lazy(() => userUncheckedCreateWithoutStudentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutStudentInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional()
}).strict();

export const studentassignmentCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentCreateWithoutStudentInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentattendanceCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceCreateWithoutStudentInputSchema).array(),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentattendanceCreateOrConnectWithoutStudentInputSchema),z.lazy(() => studentattendanceCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentattendanceCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentCreateWithoutStudentInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentattendanceUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceCreateWithoutStudentInputSchema).array(),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentattendanceCreateOrConnectWithoutStudentInputSchema),z.lazy(() => studentattendanceCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentattendanceCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const userUpdateOneRequiredWithoutStudentNestedInputSchema: z.ZodType<Prisma.userUpdateOneRequiredWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutStudentInputSchema),z.lazy(() => userUncheckedCreateWithoutStudentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutStudentInputSchema).optional(),
  upsert: z.lazy(() => userUpsertWithoutStudentInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => userUpdateToOneWithWhereWithoutStudentInputSchema),z.lazy(() => userUpdateWithoutStudentInputSchema),z.lazy(() => userUncheckedUpdateWithoutStudentInputSchema) ]).optional(),
}).strict();

export const studentassignmentUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.studentassignmentUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentCreateWithoutStudentInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentassignmentUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => studentassignmentUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentassignmentScalarWhereInputSchema),z.lazy(() => studentassignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentattendanceUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.studentattendanceUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceCreateWithoutStudentInputSchema).array(),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentattendanceCreateOrConnectWithoutStudentInputSchema),z.lazy(() => studentattendanceCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentattendanceUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => studentattendanceUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentattendanceCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentattendanceUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => studentattendanceUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentattendanceUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => studentattendanceUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentattendanceScalarWhereInputSchema),z.lazy(() => studentattendanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentassignmentUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentCreateWithoutStudentInputSchema).array(),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentassignmentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => studentassignmentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => studentassignmentUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentassignmentCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentassignmentWhereUniqueInputSchema),z.lazy(() => studentassignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => studentassignmentUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentassignmentUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => studentassignmentUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentassignmentScalarWhereInputSchema),z.lazy(() => studentassignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentattendanceUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.studentattendanceUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceCreateWithoutStudentInputSchema).array(),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentattendanceCreateOrConnectWithoutStudentInputSchema),z.lazy(() => studentattendanceCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentattendanceUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => studentattendanceUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentattendanceCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentattendanceUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => studentattendanceUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentattendanceUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => studentattendanceUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentattendanceScalarWhereInputSchema),z.lazy(() => studentattendanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const routeCreateNestedOneWithoutStudentassignmentInputSchema: z.ZodType<Prisma.routeCreateNestedOneWithoutStudentassignmentInput> = z.object({
  create: z.union([ z.lazy(() => routeCreateWithoutStudentassignmentInputSchema),z.lazy(() => routeUncheckedCreateWithoutStudentassignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => routeCreateOrConnectWithoutStudentassignmentInputSchema).optional(),
  connect: z.lazy(() => routeWhereUniqueInputSchema).optional()
}).strict();

export const stoppointCreateNestedOneWithoutStudentassignmentInputSchema: z.ZodType<Prisma.stoppointCreateNestedOneWithoutStudentassignmentInput> = z.object({
  create: z.union([ z.lazy(() => stoppointCreateWithoutStudentassignmentInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutStudentassignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => stoppointCreateOrConnectWithoutStudentassignmentInputSchema).optional(),
  connect: z.lazy(() => stoppointWhereUniqueInputSchema).optional()
}).strict();

export const studentCreateNestedOneWithoutStudentassignmentInputSchema: z.ZodType<Prisma.studentCreateNestedOneWithoutStudentassignmentInput> = z.object({
  create: z.union([ z.lazy(() => studentCreateWithoutStudentassignmentInputSchema),z.lazy(() => studentUncheckedCreateWithoutStudentassignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => studentCreateOrConnectWithoutStudentassignmentInputSchema).optional(),
  connect: z.lazy(() => studentWhereUniqueInputSchema).optional()
}).strict();

export const Enumstudentassignment_directionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumstudentassignment_directionFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => studentassignment_directionSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const routeUpdateOneRequiredWithoutStudentassignmentNestedInputSchema: z.ZodType<Prisma.routeUpdateOneRequiredWithoutStudentassignmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => routeCreateWithoutStudentassignmentInputSchema),z.lazy(() => routeUncheckedCreateWithoutStudentassignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => routeCreateOrConnectWithoutStudentassignmentInputSchema).optional(),
  upsert: z.lazy(() => routeUpsertWithoutStudentassignmentInputSchema).optional(),
  connect: z.lazy(() => routeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => routeUpdateToOneWithWhereWithoutStudentassignmentInputSchema),z.lazy(() => routeUpdateWithoutStudentassignmentInputSchema),z.lazy(() => routeUncheckedUpdateWithoutStudentassignmentInputSchema) ]).optional(),
}).strict();

export const stoppointUpdateOneRequiredWithoutStudentassignmentNestedInputSchema: z.ZodType<Prisma.stoppointUpdateOneRequiredWithoutStudentassignmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => stoppointCreateWithoutStudentassignmentInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutStudentassignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => stoppointCreateOrConnectWithoutStudentassignmentInputSchema).optional(),
  upsert: z.lazy(() => stoppointUpsertWithoutStudentassignmentInputSchema).optional(),
  connect: z.lazy(() => stoppointWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => stoppointUpdateToOneWithWhereWithoutStudentassignmentInputSchema),z.lazy(() => stoppointUpdateWithoutStudentassignmentInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutStudentassignmentInputSchema) ]).optional(),
}).strict();

export const studentUpdateOneRequiredWithoutStudentassignmentNestedInputSchema: z.ZodType<Prisma.studentUpdateOneRequiredWithoutStudentassignmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentCreateWithoutStudentassignmentInputSchema),z.lazy(() => studentUncheckedCreateWithoutStudentassignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => studentCreateOrConnectWithoutStudentassignmentInputSchema).optional(),
  upsert: z.lazy(() => studentUpsertWithoutStudentassignmentInputSchema).optional(),
  connect: z.lazy(() => studentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => studentUpdateToOneWithWhereWithoutStudentassignmentInputSchema),z.lazy(() => studentUpdateWithoutStudentassignmentInputSchema),z.lazy(() => studentUncheckedUpdateWithoutStudentassignmentInputSchema) ]).optional(),
}).strict();

export const studentCreateNestedOneWithoutStudentattendanceInputSchema: z.ZodType<Prisma.studentCreateNestedOneWithoutStudentattendanceInput> = z.object({
  create: z.union([ z.lazy(() => studentCreateWithoutStudentattendanceInputSchema),z.lazy(() => studentUncheckedCreateWithoutStudentattendanceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => studentCreateOrConnectWithoutStudentattendanceInputSchema).optional(),
  connect: z.lazy(() => studentWhereUniqueInputSchema).optional()
}).strict();

export const tripCreateNestedOneWithoutStudentattendanceInputSchema: z.ZodType<Prisma.tripCreateNestedOneWithoutStudentattendanceInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutStudentattendanceInputSchema),z.lazy(() => tripUncheckedCreateWithoutStudentattendanceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tripCreateOrConnectWithoutStudentattendanceInputSchema).optional(),
  connect: z.lazy(() => tripWhereUniqueInputSchema).optional()
}).strict();

export const NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumstudentattendance_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => studentattendance_statusSchema).optional().nullable()
}).strict();

export const studentUpdateOneRequiredWithoutStudentattendanceNestedInputSchema: z.ZodType<Prisma.studentUpdateOneRequiredWithoutStudentattendanceNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentCreateWithoutStudentattendanceInputSchema),z.lazy(() => studentUncheckedCreateWithoutStudentattendanceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => studentCreateOrConnectWithoutStudentattendanceInputSchema).optional(),
  upsert: z.lazy(() => studentUpsertWithoutStudentattendanceInputSchema).optional(),
  connect: z.lazy(() => studentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => studentUpdateToOneWithWhereWithoutStudentattendanceInputSchema),z.lazy(() => studentUpdateWithoutStudentattendanceInputSchema),z.lazy(() => studentUncheckedUpdateWithoutStudentattendanceInputSchema) ]).optional(),
}).strict();

export const tripUpdateOneRequiredWithoutStudentattendanceNestedInputSchema: z.ZodType<Prisma.tripUpdateOneRequiredWithoutStudentattendanceNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutStudentattendanceInputSchema),z.lazy(() => tripUncheckedCreateWithoutStudentattendanceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tripCreateOrConnectWithoutStudentattendanceInputSchema).optional(),
  upsert: z.lazy(() => tripUpsertWithoutStudentattendanceInputSchema).optional(),
  connect: z.lazy(() => tripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => tripUpdateToOneWithWhereWithoutStudentattendanceInputSchema),z.lazy(() => tripUpdateWithoutStudentattendanceInputSchema),z.lazy(() => tripUncheckedUpdateWithoutStudentattendanceInputSchema) ]).optional(),
}).strict();

export const tripCreateNestedOneWithoutTrackingbushistoryInputSchema: z.ZodType<Prisma.tripCreateNestedOneWithoutTrackingbushistoryInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutTrackingbushistoryInputSchema),z.lazy(() => tripUncheckedCreateWithoutTrackingbushistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tripCreateOrConnectWithoutTrackingbushistoryInputSchema).optional(),
  connect: z.lazy(() => tripWhereUniqueInputSchema).optional()
}).strict();

export const tripUpdateOneRequiredWithoutTrackingbushistoryNestedInputSchema: z.ZodType<Prisma.tripUpdateOneRequiredWithoutTrackingbushistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutTrackingbushistoryInputSchema),z.lazy(() => tripUncheckedCreateWithoutTrackingbushistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tripCreateOrConnectWithoutTrackingbushistoryInputSchema).optional(),
  upsert: z.lazy(() => tripUpsertWithoutTrackingbushistoryInputSchema).optional(),
  connect: z.lazy(() => tripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => tripUpdateToOneWithWhereWithoutTrackingbushistoryInputSchema),z.lazy(() => tripUpdateWithoutTrackingbushistoryInputSchema),z.lazy(() => tripUncheckedUpdateWithoutTrackingbushistoryInputSchema) ]).optional(),
}).strict();

export const reportCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.reportCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => reportCreateWithoutTripInputSchema),z.lazy(() => reportCreateWithoutTripInputSchema).array(),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => reportCreateOrConnectWithoutTripInputSchema),z.lazy(() => reportCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => reportCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentattendanceCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutTripInputSchema),z.lazy(() => studentattendanceCreateWithoutTripInputSchema).array(),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentattendanceCreateOrConnectWithoutTripInputSchema),z.lazy(() => studentattendanceCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentattendanceCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const trackingbushistoryCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema).array(),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => trackingbushistoryCreateOrConnectWithoutTripInputSchema),z.lazy(() => trackingbushistoryCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => trackingbushistoryCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const scheduleCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.scheduleCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutTripInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => scheduleCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => scheduleWhereUniqueInputSchema).optional()
}).strict();

export const tripstopCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.tripstopCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => tripstopCreateWithoutTripInputSchema),z.lazy(() => tripstopCreateWithoutTripInputSchema).array(),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripstopCreateOrConnectWithoutTripInputSchema),z.lazy(() => tripstopCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripstopCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const reportUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.reportUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => reportCreateWithoutTripInputSchema),z.lazy(() => reportCreateWithoutTripInputSchema).array(),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => reportCreateOrConnectWithoutTripInputSchema),z.lazy(() => reportCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => reportCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentattendanceUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutTripInputSchema),z.lazy(() => studentattendanceCreateWithoutTripInputSchema).array(),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentattendanceCreateOrConnectWithoutTripInputSchema),z.lazy(() => studentattendanceCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentattendanceCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const trackingbushistoryUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema).array(),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => trackingbushistoryCreateOrConnectWithoutTripInputSchema),z.lazy(() => trackingbushistoryCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => trackingbushistoryCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const tripstopUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.tripstopUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => tripstopCreateWithoutTripInputSchema),z.lazy(() => tripstopCreateWithoutTripInputSchema).array(),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripstopCreateOrConnectWithoutTripInputSchema),z.lazy(() => tripstopCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripstopCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumtrip_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumtrip_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => trip_statusSchema).optional().nullable()
}).strict();

export const Enumtrip_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumtrip_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => trip_typeSchema).optional()
}).strict();

export const reportUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.reportUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => reportCreateWithoutTripInputSchema),z.lazy(() => reportCreateWithoutTripInputSchema).array(),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => reportCreateOrConnectWithoutTripInputSchema),z.lazy(() => reportCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => reportUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => reportUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => reportCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => reportUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => reportUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => reportUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => reportUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => reportScalarWhereInputSchema),z.lazy(() => reportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentattendanceUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.studentattendanceUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutTripInputSchema),z.lazy(() => studentattendanceCreateWithoutTripInputSchema).array(),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentattendanceCreateOrConnectWithoutTripInputSchema),z.lazy(() => studentattendanceCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentattendanceUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => studentattendanceUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentattendanceCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentattendanceUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => studentattendanceUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentattendanceUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => studentattendanceUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentattendanceScalarWhereInputSchema),z.lazy(() => studentattendanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const trackingbushistoryUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.trackingbushistoryUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema).array(),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => trackingbushistoryCreateOrConnectWithoutTripInputSchema),z.lazy(() => trackingbushistoryCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => trackingbushistoryUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => trackingbushistoryUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => trackingbushistoryCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => trackingbushistoryUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => trackingbushistoryUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => trackingbushistoryUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => trackingbushistoryUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => trackingbushistoryScalarWhereInputSchema),z.lazy(() => trackingbushistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const scheduleUpdateOneRequiredWithoutTripNestedInputSchema: z.ZodType<Prisma.scheduleUpdateOneRequiredWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutTripInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => scheduleCreateOrConnectWithoutTripInputSchema).optional(),
  upsert: z.lazy(() => scheduleUpsertWithoutTripInputSchema).optional(),
  connect: z.lazy(() => scheduleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => scheduleUpdateToOneWithWhereWithoutTripInputSchema),z.lazy(() => scheduleUpdateWithoutTripInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutTripInputSchema) ]).optional(),
}).strict();

export const tripstopUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.tripstopUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripstopCreateWithoutTripInputSchema),z.lazy(() => tripstopCreateWithoutTripInputSchema).array(),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripstopCreateOrConnectWithoutTripInputSchema),z.lazy(() => tripstopCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => tripstopUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => tripstopUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripstopCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => tripstopUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => tripstopUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => tripstopUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => tripstopUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => tripstopScalarWhereInputSchema),z.lazy(() => tripstopScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const reportUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.reportUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => reportCreateWithoutTripInputSchema),z.lazy(() => reportCreateWithoutTripInputSchema).array(),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => reportCreateOrConnectWithoutTripInputSchema),z.lazy(() => reportCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => reportUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => reportUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => reportCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => reportUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => reportUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => reportUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => reportUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => reportScalarWhereInputSchema),z.lazy(() => reportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentattendanceUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.studentattendanceUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutTripInputSchema),z.lazy(() => studentattendanceCreateWithoutTripInputSchema).array(),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => studentattendanceCreateOrConnectWithoutTripInputSchema),z.lazy(() => studentattendanceCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => studentattendanceUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => studentattendanceUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => studentattendanceCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => studentattendanceWhereUniqueInputSchema),z.lazy(() => studentattendanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => studentattendanceUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => studentattendanceUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => studentattendanceUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => studentattendanceUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => studentattendanceScalarWhereInputSchema),z.lazy(() => studentattendanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const trackingbushistoryUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.trackingbushistoryUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema).array(),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => trackingbushistoryCreateOrConnectWithoutTripInputSchema),z.lazy(() => trackingbushistoryCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => trackingbushistoryUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => trackingbushistoryUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => trackingbushistoryCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => trackingbushistoryWhereUniqueInputSchema),z.lazy(() => trackingbushistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => trackingbushistoryUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => trackingbushistoryUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => trackingbushistoryUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => trackingbushistoryUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => trackingbushistoryScalarWhereInputSchema),z.lazy(() => trackingbushistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const tripstopUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.tripstopUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripstopCreateWithoutTripInputSchema),z.lazy(() => tripstopCreateWithoutTripInputSchema).array(),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tripstopCreateOrConnectWithoutTripInputSchema),z.lazy(() => tripstopCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => tripstopUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => tripstopUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tripstopCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => tripstopWhereUniqueInputSchema),z.lazy(() => tripstopWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => tripstopUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => tripstopUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => tripstopUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => tripstopUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => tripstopScalarWhereInputSchema),z.lazy(() => tripstopScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const stoppointCreateNestedOneWithoutTripstopInputSchema: z.ZodType<Prisma.stoppointCreateNestedOneWithoutTripstopInput> = z.object({
  create: z.union([ z.lazy(() => stoppointCreateWithoutTripstopInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutTripstopInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => stoppointCreateOrConnectWithoutTripstopInputSchema).optional(),
  connect: z.lazy(() => stoppointWhereUniqueInputSchema).optional()
}).strict();

export const tripCreateNestedOneWithoutTripstopInputSchema: z.ZodType<Prisma.tripCreateNestedOneWithoutTripstopInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutTripstopInputSchema),z.lazy(() => tripUncheckedCreateWithoutTripstopInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tripCreateOrConnectWithoutTripstopInputSchema).optional(),
  connect: z.lazy(() => tripWhereUniqueInputSchema).optional()
}).strict();

export const NullableEnumtripstop_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumtripstop_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => tripstop_statusSchema).optional().nullable()
}).strict();

export const stoppointUpdateOneRequiredWithoutTripstopNestedInputSchema: z.ZodType<Prisma.stoppointUpdateOneRequiredWithoutTripstopNestedInput> = z.object({
  create: z.union([ z.lazy(() => stoppointCreateWithoutTripstopInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutTripstopInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => stoppointCreateOrConnectWithoutTripstopInputSchema).optional(),
  upsert: z.lazy(() => stoppointUpsertWithoutTripstopInputSchema).optional(),
  connect: z.lazy(() => stoppointWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => stoppointUpdateToOneWithWhereWithoutTripstopInputSchema),z.lazy(() => stoppointUpdateWithoutTripstopInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutTripstopInputSchema) ]).optional(),
}).strict();

export const tripUpdateOneRequiredWithoutTripstopNestedInputSchema: z.ZodType<Prisma.tripUpdateOneRequiredWithoutTripstopNestedInput> = z.object({
  create: z.union([ z.lazy(() => tripCreateWithoutTripstopInputSchema),z.lazy(() => tripUncheckedCreateWithoutTripstopInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tripCreateOrConnectWithoutTripstopInputSchema).optional(),
  upsert: z.lazy(() => tripUpsertWithoutTripstopInputSchema).optional(),
  connect: z.lazy(() => tripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => tripUpdateToOneWithWhereWithoutTripstopInputSchema),z.lazy(() => tripUpdateWithoutTripstopInputSchema),z.lazy(() => tripUncheckedUpdateWithoutTripstopInputSchema) ]).optional(),
}).strict();

export const reportCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.reportCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => reportCreateWithoutUserInputSchema),z.lazy(() => reportCreateWithoutUserInputSchema).array(),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => reportCreateOrConnectWithoutUserInputSchema),z.lazy(() => reportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => reportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const scheduleCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.scheduleCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutUserInputSchema),z.lazy(() => scheduleCreateWithoutUserInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutUserInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.studentCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => studentCreateWithoutUserInputSchema),z.lazy(() => studentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => studentCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => studentWhereUniqueInputSchema).optional()
}).strict();

export const userrolesCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.userrolesCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => userrolesCreateWithoutUserInputSchema),z.lazy(() => userrolesCreateWithoutUserInputSchema).array(),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => userrolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => userrolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => userrolesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const reportUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.reportUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => reportCreateWithoutUserInputSchema),z.lazy(() => reportCreateWithoutUserInputSchema).array(),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => reportCreateOrConnectWithoutUserInputSchema),z.lazy(() => reportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => reportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const scheduleUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.scheduleUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutUserInputSchema),z.lazy(() => scheduleCreateWithoutUserInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutUserInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const studentUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.studentUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => studentCreateWithoutUserInputSchema),z.lazy(() => studentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => studentCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => studentWhereUniqueInputSchema).optional()
}).strict();

export const userrolesUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.userrolesUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => userrolesCreateWithoutUserInputSchema),z.lazy(() => userrolesCreateWithoutUserInputSchema).array(),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => userrolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => userrolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => userrolesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const reportUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.reportUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => reportCreateWithoutUserInputSchema),z.lazy(() => reportCreateWithoutUserInputSchema).array(),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => reportCreateOrConnectWithoutUserInputSchema),z.lazy(() => reportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => reportUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => reportUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => reportCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => reportUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => reportUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => reportUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => reportUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => reportScalarWhereInputSchema),z.lazy(() => reportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const scheduleUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.scheduleUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutUserInputSchema),z.lazy(() => scheduleCreateWithoutUserInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutUserInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => scheduleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => scheduleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => scheduleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => scheduleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => scheduleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => scheduleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => scheduleScalarWhereInputSchema),z.lazy(() => scheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.studentUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentCreateWithoutUserInputSchema),z.lazy(() => studentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => studentCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => studentUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => studentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => studentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => studentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => studentUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => studentUpdateWithoutUserInputSchema),z.lazy(() => studentUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const userrolesUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.userrolesUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => userrolesCreateWithoutUserInputSchema),z.lazy(() => userrolesCreateWithoutUserInputSchema).array(),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => userrolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => userrolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => userrolesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => userrolesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => userrolesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => userrolesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => userrolesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => userrolesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => userrolesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => userrolesScalarWhereInputSchema),z.lazy(() => userrolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const reportUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.reportUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => reportCreateWithoutUserInputSchema),z.lazy(() => reportCreateWithoutUserInputSchema).array(),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => reportCreateOrConnectWithoutUserInputSchema),z.lazy(() => reportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => reportUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => reportUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => reportCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => reportWhereUniqueInputSchema),z.lazy(() => reportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => reportUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => reportUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => reportUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => reportUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => reportScalarWhereInputSchema),z.lazy(() => reportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const scheduleUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => scheduleCreateWithoutUserInputSchema),z.lazy(() => scheduleCreateWithoutUserInputSchema).array(),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => scheduleCreateOrConnectWithoutUserInputSchema),z.lazy(() => scheduleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => scheduleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => scheduleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => scheduleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => scheduleWhereUniqueInputSchema),z.lazy(() => scheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => scheduleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => scheduleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => scheduleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => scheduleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => scheduleScalarWhereInputSchema),z.lazy(() => scheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const studentUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.studentUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => studentCreateWithoutUserInputSchema),z.lazy(() => studentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => studentCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => studentUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => studentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => studentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => studentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => studentUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => studentUpdateWithoutUserInputSchema),z.lazy(() => studentUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const userrolesUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.userrolesUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => userrolesCreateWithoutUserInputSchema),z.lazy(() => userrolesCreateWithoutUserInputSchema).array(),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => userrolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => userrolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => userrolesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => userrolesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => userrolesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => userrolesWhereUniqueInputSchema),z.lazy(() => userrolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => userrolesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => userrolesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => userrolesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => userrolesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => userrolesScalarWhereInputSchema),z.lazy(() => userrolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const rolesCreateNestedOneWithoutUserrolesInputSchema: z.ZodType<Prisma.rolesCreateNestedOneWithoutUserrolesInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUserrolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUserrolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutUserrolesInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional()
}).strict();

export const userCreateNestedOneWithoutUserrolesInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutUserrolesInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutUserrolesInputSchema),z.lazy(() => userUncheckedCreateWithoutUserrolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutUserrolesInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional()
}).strict();

export const rolesUpdateOneRequiredWithoutUserrolesNestedInputSchema: z.ZodType<Prisma.rolesUpdateOneRequiredWithoutUserrolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUserrolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUserrolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutUserrolesInputSchema).optional(),
  upsert: z.lazy(() => rolesUpsertWithoutUserrolesInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => rolesUpdateToOneWithWhereWithoutUserrolesInputSchema),z.lazy(() => rolesUpdateWithoutUserrolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUserrolesInputSchema) ]).optional(),
}).strict();

export const userUpdateOneRequiredWithoutUserrolesNestedInputSchema: z.ZodType<Prisma.userUpdateOneRequiredWithoutUserrolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutUserrolesInputSchema),z.lazy(() => userUncheckedCreateWithoutUserrolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutUserrolesInputSchema).optional(),
  upsert: z.lazy(() => userUpsertWithoutUserrolesInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => userUpdateToOneWithWhereWithoutUserrolesInputSchema),z.lazy(() => userUpdateWithoutUserrolesInputSchema),z.lazy(() => userUncheckedUpdateWithoutUserrolesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedEnumbus_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumbus_statusNullableFilter> = z.object({
  equals: z.lazy(() => bus_statusSchema).optional().nullable(),
  in: z.lazy(() => bus_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => bus_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NestedEnumbus_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumbus_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumbus_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => bus_statusSchema).optional().nullable(),
  in: z.lazy(() => bus_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => bus_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NestedEnumbus_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumbus_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumbus_statusNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedEnumroutestoppoint_directionFilterSchema: z.ZodType<Prisma.NestedEnumroutestoppoint_directionFilter> = z.object({
  equals: z.lazy(() => routestoppoint_directionSchema).optional(),
  in: z.lazy(() => routestoppoint_directionSchema).array().optional(),
  notIn: z.lazy(() => routestoppoint_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => NestedEnumroutestoppoint_directionFilterSchema) ]).optional(),
}).strict();

export const NestedEnumroutestoppoint_directionWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumroutestoppoint_directionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => routestoppoint_directionSchema).optional(),
  in: z.lazy(() => routestoppoint_directionSchema).array().optional(),
  notIn: z.lazy(() => routestoppoint_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => NestedEnumroutestoppoint_directionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumroutestoppoint_directionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumroutestoppoint_directionFilterSchema).optional()
}).strict();

export const NestedEnumschedule_typeFilterSchema: z.ZodType<Prisma.NestedEnumschedule_typeFilter> = z.object({
  equals: z.lazy(() => schedule_typeSchema).optional(),
  in: z.lazy(() => schedule_typeSchema).array().optional(),
  notIn: z.lazy(() => schedule_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => NestedEnumschedule_typeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumschedule_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumschedule_statusNullableFilter> = z.object({
  equals: z.lazy(() => schedule_statusSchema).optional().nullable(),
  in: z.lazy(() => schedule_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => schedule_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NestedEnumschedule_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumschedule_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumschedule_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => schedule_typeSchema).optional(),
  in: z.lazy(() => schedule_typeSchema).array().optional(),
  notIn: z.lazy(() => schedule_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => NestedEnumschedule_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumschedule_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumschedule_typeFilterSchema).optional()
}).strict();

export const NestedEnumschedule_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumschedule_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => schedule_statusSchema).optional().nullable(),
  in: z.lazy(() => schedule_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => schedule_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NestedEnumschedule_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumschedule_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumschedule_statusNullableFilterSchema).optional()
}).strict();

export const NestedEnumstudentassignment_directionFilterSchema: z.ZodType<Prisma.NestedEnumstudentassignment_directionFilter> = z.object({
  equals: z.lazy(() => studentassignment_directionSchema).optional(),
  in: z.lazy(() => studentassignment_directionSchema).array().optional(),
  notIn: z.lazy(() => studentassignment_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => NestedEnumstudentassignment_directionFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumstudentassignment_directionWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumstudentassignment_directionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => studentassignment_directionSchema).optional(),
  in: z.lazy(() => studentassignment_directionSchema).array().optional(),
  notIn: z.lazy(() => studentassignment_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => NestedEnumstudentassignment_directionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstudentassignment_directionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstudentassignment_directionFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumstudentattendance_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumstudentattendance_statusNullableFilter> = z.object({
  equals: z.lazy(() => studentattendance_statusSchema).optional().nullable(),
  in: z.lazy(() => studentattendance_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => studentattendance_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NestedEnumstudentattendance_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumstudentattendance_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumstudentattendance_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => studentattendance_statusSchema).optional().nullable(),
  in: z.lazy(() => studentattendance_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => studentattendance_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NestedEnumstudentattendance_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstudentattendance_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstudentattendance_statusNullableFilterSchema).optional()
}).strict();

export const NestedEnumtrip_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumtrip_statusNullableFilter> = z.object({
  equals: z.lazy(() => trip_statusSchema).optional().nullable(),
  in: z.lazy(() => trip_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => trip_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NestedEnumtrip_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumtrip_typeFilterSchema: z.ZodType<Prisma.NestedEnumtrip_typeFilter> = z.object({
  equals: z.lazy(() => trip_typeSchema).optional(),
  in: z.lazy(() => trip_typeSchema).array().optional(),
  notIn: z.lazy(() => trip_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => NestedEnumtrip_typeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumtrip_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumtrip_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => trip_statusSchema).optional().nullable(),
  in: z.lazy(() => trip_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => trip_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NestedEnumtrip_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtrip_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtrip_statusNullableFilterSchema).optional()
}).strict();

export const NestedEnumtrip_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumtrip_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => trip_typeSchema).optional(),
  in: z.lazy(() => trip_typeSchema).array().optional(),
  notIn: z.lazy(() => trip_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => NestedEnumtrip_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtrip_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtrip_typeFilterSchema).optional()
}).strict();

export const NestedEnumtripstop_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumtripstop_statusNullableFilter> = z.object({
  equals: z.lazy(() => tripstop_statusSchema).optional().nullable(),
  in: z.lazy(() => tripstop_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => tripstop_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NestedEnumtripstop_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumtripstop_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumtripstop_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => tripstop_statusSchema).optional().nullable(),
  in: z.lazy(() => tripstop_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => tripstop_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NestedEnumtripstop_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtripstop_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtripstop_statusNullableFilterSchema).optional()
}).strict();

export const scheduleCreateWithoutBusInputSchema: z.ZodType<Prisma.scheduleCreateWithoutBusInput> = z.object({
  id: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => userCreateNestedOneWithoutScheduleInputSchema),
  route: z.lazy(() => routeCreateNestedOneWithoutScheduleInputSchema),
  trip: z.lazy(() => tripCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const scheduleUncheckedCreateWithoutBusInputSchema: z.ZodType<Prisma.scheduleUncheckedCreateWithoutBusInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trip: z.lazy(() => tripUncheckedCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const scheduleCreateOrConnectWithoutBusInputSchema: z.ZodType<Prisma.scheduleCreateOrConnectWithoutBusInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => scheduleCreateWithoutBusInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema) ]),
}).strict();

export const scheduleCreateManyBusInputEnvelopeSchema: z.ZodType<Prisma.scheduleCreateManyBusInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => scheduleCreateManyBusInputSchema),z.lazy(() => scheduleCreateManyBusInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const scheduleUpsertWithWhereUniqueWithoutBusInputSchema: z.ZodType<Prisma.scheduleUpsertWithWhereUniqueWithoutBusInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => scheduleUpdateWithoutBusInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutBusInputSchema) ]),
  create: z.union([ z.lazy(() => scheduleCreateWithoutBusInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutBusInputSchema) ]),
}).strict();

export const scheduleUpdateWithWhereUniqueWithoutBusInputSchema: z.ZodType<Prisma.scheduleUpdateWithWhereUniqueWithoutBusInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => scheduleUpdateWithoutBusInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutBusInputSchema) ]),
}).strict();

export const scheduleUpdateManyWithWhereWithoutBusInputSchema: z.ZodType<Prisma.scheduleUpdateManyWithWhereWithoutBusInput> = z.object({
  where: z.lazy(() => scheduleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => scheduleUpdateManyMutationInputSchema),z.lazy(() => scheduleUncheckedUpdateManyWithoutBusInputSchema) ]),
}).strict();

export const scheduleScalarWhereInputSchema: z.ZodType<Prisma.scheduleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => scheduleScalarWhereInputSchema),z.lazy(() => scheduleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => scheduleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => scheduleScalarWhereInputSchema),z.lazy(() => scheduleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  busId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => Enumschedule_typeFilterSchema),z.lazy(() => schedule_typeSchema) ]).optional(),
  daysOfWeek: z.lazy(() => JsonFilterSchema).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => Enumschedule_statusNullableFilterSchema),z.lazy(() => schedule_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const rolepermissionsCreateWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsCreateWithoutPermissionInput> = z.object({
  roles: z.lazy(() => rolesCreateNestedOneWithoutRolepermissionsInputSchema)
}).strict();

export const rolepermissionsUncheckedCreateWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedCreateWithoutPermissionInput> = z.object({
  roleId: z.number().int()
}).strict();

export const rolepermissionsCreateOrConnectWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsCreateOrConnectWithoutPermissionInput> = z.object({
  where: z.lazy(() => rolepermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const rolepermissionsCreateManyPermissionInputEnvelopeSchema: z.ZodType<Prisma.rolepermissionsCreateManyPermissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => rolepermissionsCreateManyPermissionInputSchema),z.lazy(() => rolepermissionsCreateManyPermissionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const rolepermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsUpsertWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => rolepermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => rolepermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const rolepermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsUpdateWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => rolepermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => rolepermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => rolepermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
}).strict();

export const rolepermissionsUpdateManyWithWhereWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsUpdateManyWithWhereWithoutPermissionInput> = z.object({
  where: z.lazy(() => rolepermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => rolepermissionsUpdateManyMutationInputSchema),z.lazy(() => rolepermissionsUncheckedUpdateManyWithoutPermissionInputSchema) ]),
}).strict();

export const rolepermissionsScalarWhereInputSchema: z.ZodType<Prisma.rolepermissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => rolepermissionsScalarWhereInputSchema),z.lazy(() => rolepermissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolepermissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolepermissionsScalarWhereInputSchema),z.lazy(() => rolepermissionsScalarWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const userCreateWithoutReportInputSchema: z.ZodType<Prisma.userCreateWithoutReportInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schedule: z.lazy(() => scheduleCreateNestedManyWithoutUserInputSchema).optional(),
  student: z.lazy(() => studentCreateNestedOneWithoutUserInputSchema).optional(),
  userroles: z.lazy(() => userrolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schedule: z.lazy(() => scheduleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  student: z.lazy(() => studentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => userCreateWithoutReportInputSchema),z.lazy(() => userUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const tripCreateWithoutReportInputSchema: z.ZodType<Prisma.tripCreateWithoutReportInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  studentattendance: z.lazy(() => studentattendanceCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryCreateNestedManyWithoutTripInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedOneWithoutTripInputSchema),
  tripstop: z.lazy(() => tripstopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.tripUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  studentattendance: z.lazy(() => studentattendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.tripCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => tripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tripCreateWithoutReportInputSchema),z.lazy(() => tripUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const userUpsertWithoutReportInputSchema: z.ZodType<Prisma.userUpsertWithoutReportInput> = z.object({
  update: z.union([ z.lazy(() => userUpdateWithoutReportInputSchema),z.lazy(() => userUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => userCreateWithoutReportInputSchema),z.lazy(() => userUncheckedCreateWithoutReportInputSchema) ]),
  where: z.lazy(() => userWhereInputSchema).optional()
}).strict();

export const userUpdateToOneWithWhereWithoutReportInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => userUpdateWithoutReportInputSchema),z.lazy(() => userUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const userUpdateWithoutReportInputSchema: z.ZodType<Prisma.userUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.lazy(() => scheduleUpdateManyWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => studentUpdateOneWithoutUserNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const userUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.lazy(() => scheduleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => studentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const tripUpsertWithoutReportInputSchema: z.ZodType<Prisma.tripUpsertWithoutReportInput> = z.object({
  update: z.union([ z.lazy(() => tripUpdateWithoutReportInputSchema),z.lazy(() => tripUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => tripCreateWithoutReportInputSchema),z.lazy(() => tripUncheckedCreateWithoutReportInputSchema) ]),
  where: z.lazy(() => tripWhereInputSchema).optional()
}).strict();

export const tripUpdateToOneWithWhereWithoutReportInputSchema: z.ZodType<Prisma.tripUpdateToOneWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => tripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => tripUpdateWithoutReportInputSchema),z.lazy(() => tripUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const tripUpdateWithoutReportInputSchema: z.ZodType<Prisma.tripUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  studentattendance: z.lazy(() => studentattendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const tripUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.tripUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const permissionCreateWithoutRolepermissionsInputSchema: z.ZodType<Prisma.permissionCreateWithoutRolepermissionsInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const permissionUncheckedCreateWithoutRolepermissionsInputSchema: z.ZodType<Prisma.permissionUncheckedCreateWithoutRolepermissionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const permissionCreateOrConnectWithoutRolepermissionsInputSchema: z.ZodType<Prisma.permissionCreateOrConnectWithoutRolepermissionsInput> = z.object({
  where: z.lazy(() => permissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => permissionCreateWithoutRolepermissionsInputSchema),z.lazy(() => permissionUncheckedCreateWithoutRolepermissionsInputSchema) ]),
}).strict();

export const rolesCreateWithoutRolepermissionsInputSchema: z.ZodType<Prisma.rolesCreateWithoutRolepermissionsInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userroles: z.lazy(() => userrolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUncheckedCreateWithoutRolepermissionsInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutRolepermissionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userroles: z.lazy(() => userrolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesCreateOrConnectWithoutRolepermissionsInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutRolepermissionsInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutRolepermissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRolepermissionsInputSchema) ]),
}).strict();

export const permissionUpsertWithoutRolepermissionsInputSchema: z.ZodType<Prisma.permissionUpsertWithoutRolepermissionsInput> = z.object({
  update: z.union([ z.lazy(() => permissionUpdateWithoutRolepermissionsInputSchema),z.lazy(() => permissionUncheckedUpdateWithoutRolepermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => permissionCreateWithoutRolepermissionsInputSchema),z.lazy(() => permissionUncheckedCreateWithoutRolepermissionsInputSchema) ]),
  where: z.lazy(() => permissionWhereInputSchema).optional()
}).strict();

export const permissionUpdateToOneWithWhereWithoutRolepermissionsInputSchema: z.ZodType<Prisma.permissionUpdateToOneWithWhereWithoutRolepermissionsInput> = z.object({
  where: z.lazy(() => permissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => permissionUpdateWithoutRolepermissionsInputSchema),z.lazy(() => permissionUncheckedUpdateWithoutRolepermissionsInputSchema) ]),
}).strict();

export const permissionUpdateWithoutRolepermissionsInputSchema: z.ZodType<Prisma.permissionUpdateWithoutRolepermissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const permissionUncheckedUpdateWithoutRolepermissionsInputSchema: z.ZodType<Prisma.permissionUncheckedUpdateWithoutRolepermissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolesUpsertWithoutRolepermissionsInputSchema: z.ZodType<Prisma.rolesUpsertWithoutRolepermissionsInput> = z.object({
  update: z.union([ z.lazy(() => rolesUpdateWithoutRolepermissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRolepermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutRolepermissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRolepermissionsInputSchema) ]),
  where: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export const rolesUpdateToOneWithWhereWithoutRolepermissionsInputSchema: z.ZodType<Prisma.rolesUpdateToOneWithWhereWithoutRolepermissionsInput> = z.object({
  where: z.lazy(() => rolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => rolesUpdateWithoutRolepermissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRolepermissionsInputSchema) ]),
}).strict();

export const rolesUpdateWithoutRolepermissionsInputSchema: z.ZodType<Prisma.rolesUpdateWithoutRolepermissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userroles: z.lazy(() => userrolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateWithoutRolepermissionsInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateWithoutRolepermissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userroles: z.lazy(() => userrolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolepermissionsCreateWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsCreateWithoutRolesInput> = z.object({
  permission: z.lazy(() => permissionCreateNestedOneWithoutRolepermissionsInputSchema)
}).strict();

export const rolepermissionsUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedCreateWithoutRolesInput> = z.object({
  permissionId: z.number().int()
}).strict();

export const rolepermissionsCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => rolepermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const rolepermissionsCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.rolepermissionsCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => rolepermissionsCreateManyRolesInputSchema),z.lazy(() => rolepermissionsCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const userrolesCreateWithoutRolesInputSchema: z.ZodType<Prisma.userrolesCreateWithoutRolesInput> = z.object({
  user: z.lazy(() => userCreateNestedOneWithoutUserrolesInputSchema)
}).strict();

export const userrolesUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.userrolesUncheckedCreateWithoutRolesInput> = z.object({
  userId: z.string()
}).strict();

export const userrolesCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.userrolesCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => userrolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => userrolesCreateWithoutRolesInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const userrolesCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.userrolesCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => userrolesCreateManyRolesInputSchema),z.lazy(() => userrolesCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const rolepermissionsUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => rolepermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => rolepermissionsUpdateWithoutRolesInputSchema),z.lazy(() => rolepermissionsUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => rolepermissionsCreateWithoutRolesInputSchema),z.lazy(() => rolepermissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const rolepermissionsUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => rolepermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => rolepermissionsUpdateWithoutRolesInputSchema),z.lazy(() => rolepermissionsUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const rolepermissionsUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => rolepermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => rolepermissionsUpdateManyMutationInputSchema),z.lazy(() => rolepermissionsUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const userrolesUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.userrolesUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => userrolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => userrolesUpdateWithoutRolesInputSchema),z.lazy(() => userrolesUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => userrolesCreateWithoutRolesInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const userrolesUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.userrolesUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => userrolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => userrolesUpdateWithoutRolesInputSchema),z.lazy(() => userrolesUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const userrolesUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.userrolesUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => userrolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => userrolesUpdateManyMutationInputSchema),z.lazy(() => userrolesUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const userrolesScalarWhereInputSchema: z.ZodType<Prisma.userrolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => userrolesScalarWhereInputSchema),z.lazy(() => userrolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => userrolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userrolesScalarWhereInputSchema),z.lazy(() => userrolesScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const routestoppointCreateWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointCreateWithoutRouteInput> = z.object({
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema),
  stoppoint: z.lazy(() => stoppointCreateNestedOneWithoutRoutestoppointInputSchema)
}).strict();

export const routestoppointUncheckedCreateWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointUncheckedCreateWithoutRouteInput> = z.object({
  id: z.number().int().optional(),
  stopPointId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema)
}).strict();

export const routestoppointCreateOrConnectWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointCreateOrConnectWithoutRouteInput> = z.object({
  where: z.lazy(() => routestoppointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => routestoppointCreateWithoutRouteInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const routestoppointCreateManyRouteInputEnvelopeSchema: z.ZodType<Prisma.routestoppointCreateManyRouteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => routestoppointCreateManyRouteInputSchema),z.lazy(() => routestoppointCreateManyRouteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const scheduleCreateWithoutRouteInputSchema: z.ZodType<Prisma.scheduleCreateWithoutRouteInput> = z.object({
  id: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bus: z.lazy(() => busCreateNestedOneWithoutScheduleInputSchema),
  user: z.lazy(() => userCreateNestedOneWithoutScheduleInputSchema),
  trip: z.lazy(() => tripCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const scheduleUncheckedCreateWithoutRouteInputSchema: z.ZodType<Prisma.scheduleUncheckedCreateWithoutRouteInput> = z.object({
  id: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trip: z.lazy(() => tripUncheckedCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const scheduleCreateOrConnectWithoutRouteInputSchema: z.ZodType<Prisma.scheduleCreateOrConnectWithoutRouteInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => scheduleCreateWithoutRouteInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const scheduleCreateManyRouteInputEnvelopeSchema: z.ZodType<Prisma.scheduleCreateManyRouteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => scheduleCreateManyRouteInputSchema),z.lazy(() => scheduleCreateManyRouteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const studentassignmentCreateWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentCreateWithoutRouteInput> = z.object({
  id: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stoppoint: z.lazy(() => stoppointCreateNestedOneWithoutStudentassignmentInputSchema),
  student: z.lazy(() => studentCreateNestedOneWithoutStudentassignmentInputSchema)
}).strict();

export const studentassignmentUncheckedCreateWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentUncheckedCreateWithoutRouteInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentassignmentCreateOrConnectWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentCreateOrConnectWithoutRouteInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const studentassignmentCreateManyRouteInputEnvelopeSchema: z.ZodType<Prisma.studentassignmentCreateManyRouteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => studentassignmentCreateManyRouteInputSchema),z.lazy(() => studentassignmentCreateManyRouteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const routestoppointUpsertWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointUpsertWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => routestoppointWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => routestoppointUpdateWithoutRouteInputSchema),z.lazy(() => routestoppointUncheckedUpdateWithoutRouteInputSchema) ]),
  create: z.union([ z.lazy(() => routestoppointCreateWithoutRouteInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const routestoppointUpdateWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointUpdateWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => routestoppointWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => routestoppointUpdateWithoutRouteInputSchema),z.lazy(() => routestoppointUncheckedUpdateWithoutRouteInputSchema) ]),
}).strict();

export const routestoppointUpdateManyWithWhereWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointUpdateManyWithWhereWithoutRouteInput> = z.object({
  where: z.lazy(() => routestoppointScalarWhereInputSchema),
  data: z.union([ z.lazy(() => routestoppointUpdateManyMutationInputSchema),z.lazy(() => routestoppointUncheckedUpdateManyWithoutRouteInputSchema) ]),
}).strict();

export const routestoppointScalarWhereInputSchema: z.ZodType<Prisma.routestoppointScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => routestoppointScalarWhereInputSchema),z.lazy(() => routestoppointScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => routestoppointScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => routestoppointScalarWhereInputSchema),z.lazy(() => routestoppointScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopPointId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sequence: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  direction: z.union([ z.lazy(() => Enumroutestoppoint_directionFilterSchema),z.lazy(() => routestoppoint_directionSchema) ]).optional(),
}).strict();

export const scheduleUpsertWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.scheduleUpsertWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => scheduleUpdateWithoutRouteInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutRouteInputSchema) ]),
  create: z.union([ z.lazy(() => scheduleCreateWithoutRouteInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const scheduleUpdateWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.scheduleUpdateWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => scheduleUpdateWithoutRouteInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutRouteInputSchema) ]),
}).strict();

export const scheduleUpdateManyWithWhereWithoutRouteInputSchema: z.ZodType<Prisma.scheduleUpdateManyWithWhereWithoutRouteInput> = z.object({
  where: z.lazy(() => scheduleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => scheduleUpdateManyMutationInputSchema),z.lazy(() => scheduleUncheckedUpdateManyWithoutRouteInputSchema) ]),
}).strict();

export const studentassignmentUpsertWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentUpsertWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithoutRouteInputSchema),z.lazy(() => studentassignmentUncheckedUpdateWithoutRouteInputSchema) ]),
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutRouteInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const studentassignmentUpdateWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentUpdateWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => studentassignmentUpdateWithoutRouteInputSchema),z.lazy(() => studentassignmentUncheckedUpdateWithoutRouteInputSchema) ]),
}).strict();

export const studentassignmentUpdateManyWithWhereWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentUpdateManyWithWhereWithoutRouteInput> = z.object({
  where: z.lazy(() => studentassignmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => studentassignmentUpdateManyMutationInputSchema),z.lazy(() => studentassignmentUncheckedUpdateManyWithoutRouteInputSchema) ]),
}).strict();

export const studentassignmentScalarWhereInputSchema: z.ZodType<Prisma.studentassignmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => studentassignmentScalarWhereInputSchema),z.lazy(() => studentassignmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentassignmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentassignmentScalarWhereInputSchema),z.lazy(() => studentassignmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  direction: z.union([ z.lazy(() => Enumstudentassignment_directionFilterSchema),z.lazy(() => studentassignment_directionSchema) ]).optional(),
  effectiveFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  effectiveTo: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const routeCreateWithoutRoutestoppointInputSchema: z.ZodType<Prisma.routeCreateWithoutRoutestoppointInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schedule: z.lazy(() => scheduleCreateNestedManyWithoutRouteInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const routeUncheckedCreateWithoutRoutestoppointInputSchema: z.ZodType<Prisma.routeUncheckedCreateWithoutRoutestoppointInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schedule: z.lazy(() => scheduleUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const routeCreateOrConnectWithoutRoutestoppointInputSchema: z.ZodType<Prisma.routeCreateOrConnectWithoutRoutestoppointInput> = z.object({
  where: z.lazy(() => routeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => routeCreateWithoutRoutestoppointInputSchema),z.lazy(() => routeUncheckedCreateWithoutRoutestoppointInputSchema) ]),
}).strict();

export const stoppointCreateWithoutRoutestoppointInputSchema: z.ZodType<Prisma.stoppointCreateWithoutRoutestoppointInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutStoppointInputSchema).optional(),
  tripstop: z.lazy(() => tripstopCreateNestedManyWithoutStoppointInputSchema).optional()
}).strict();

export const stoppointUncheckedCreateWithoutRoutestoppointInputSchema: z.ZodType<Prisma.stoppointUncheckedCreateWithoutRoutestoppointInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutStoppointInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedCreateNestedManyWithoutStoppointInputSchema).optional()
}).strict();

export const stoppointCreateOrConnectWithoutRoutestoppointInputSchema: z.ZodType<Prisma.stoppointCreateOrConnectWithoutRoutestoppointInput> = z.object({
  where: z.lazy(() => stoppointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => stoppointCreateWithoutRoutestoppointInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutRoutestoppointInputSchema) ]),
}).strict();

export const routeUpsertWithoutRoutestoppointInputSchema: z.ZodType<Prisma.routeUpsertWithoutRoutestoppointInput> = z.object({
  update: z.union([ z.lazy(() => routeUpdateWithoutRoutestoppointInputSchema),z.lazy(() => routeUncheckedUpdateWithoutRoutestoppointInputSchema) ]),
  create: z.union([ z.lazy(() => routeCreateWithoutRoutestoppointInputSchema),z.lazy(() => routeUncheckedCreateWithoutRoutestoppointInputSchema) ]),
  where: z.lazy(() => routeWhereInputSchema).optional()
}).strict();

export const routeUpdateToOneWithWhereWithoutRoutestoppointInputSchema: z.ZodType<Prisma.routeUpdateToOneWithWhereWithoutRoutestoppointInput> = z.object({
  where: z.lazy(() => routeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => routeUpdateWithoutRoutestoppointInputSchema),z.lazy(() => routeUncheckedUpdateWithoutRoutestoppointInputSchema) ]),
}).strict();

export const routeUpdateWithoutRoutestoppointInputSchema: z.ZodType<Prisma.routeUpdateWithoutRoutestoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.lazy(() => scheduleUpdateManyWithoutRouteNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const routeUncheckedUpdateWithoutRoutestoppointInputSchema: z.ZodType<Prisma.routeUncheckedUpdateWithoutRoutestoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.lazy(() => scheduleUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const stoppointUpsertWithoutRoutestoppointInputSchema: z.ZodType<Prisma.stoppointUpsertWithoutRoutestoppointInput> = z.object({
  update: z.union([ z.lazy(() => stoppointUpdateWithoutRoutestoppointInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutRoutestoppointInputSchema) ]),
  create: z.union([ z.lazy(() => stoppointCreateWithoutRoutestoppointInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutRoutestoppointInputSchema) ]),
  where: z.lazy(() => stoppointWhereInputSchema).optional()
}).strict();

export const stoppointUpdateToOneWithWhereWithoutRoutestoppointInputSchema: z.ZodType<Prisma.stoppointUpdateToOneWithWhereWithoutRoutestoppointInput> = z.object({
  where: z.lazy(() => stoppointWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => stoppointUpdateWithoutRoutestoppointInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutRoutestoppointInputSchema) ]),
}).strict();

export const stoppointUpdateWithoutRoutestoppointInputSchema: z.ZodType<Prisma.stoppointUpdateWithoutRoutestoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutStoppointNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUpdateManyWithoutStoppointNestedInputSchema).optional()
}).strict();

export const stoppointUncheckedUpdateWithoutRoutestoppointInputSchema: z.ZodType<Prisma.stoppointUncheckedUpdateWithoutRoutestoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional()
}).strict();

export const busCreateWithoutScheduleInputSchema: z.ZodType<Prisma.busCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const busUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.busUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const busCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.busCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => busWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => busCreateWithoutScheduleInputSchema),z.lazy(() => busUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const userCreateWithoutScheduleInputSchema: z.ZodType<Prisma.userCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  report: z.lazy(() => reportCreateNestedManyWithoutUserInputSchema).optional(),
  student: z.lazy(() => studentCreateNestedOneWithoutUserInputSchema).optional(),
  userroles: z.lazy(() => userrolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  student: z.lazy(() => studentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => userCreateWithoutScheduleInputSchema),z.lazy(() => userUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const routeCreateWithoutScheduleInputSchema: z.ZodType<Prisma.routeCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointCreateNestedManyWithoutRouteInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const routeUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.routeUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const routeCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.routeCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => routeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => routeCreateWithoutScheduleInputSchema),z.lazy(() => routeUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const tripCreateWithoutScheduleInputSchema: z.ZodType<Prisma.tripCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportCreateNestedManyWithoutTripInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryCreateNestedManyWithoutTripInputSchema).optional(),
  tripstop: z.lazy(() => tripstopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.tripUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.tripCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => tripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tripCreateWithoutScheduleInputSchema),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const tripCreateManyScheduleInputEnvelopeSchema: z.ZodType<Prisma.tripCreateManyScheduleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => tripCreateManyScheduleInputSchema),z.lazy(() => tripCreateManyScheduleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const busUpsertWithoutScheduleInputSchema: z.ZodType<Prisma.busUpsertWithoutScheduleInput> = z.object({
  update: z.union([ z.lazy(() => busUpdateWithoutScheduleInputSchema),z.lazy(() => busUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => busCreateWithoutScheduleInputSchema),z.lazy(() => busUncheckedCreateWithoutScheduleInputSchema) ]),
  where: z.lazy(() => busWhereInputSchema).optional()
}).strict();

export const busUpdateToOneWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.busUpdateToOneWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => busWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => busUpdateWithoutScheduleInputSchema),z.lazy(() => busUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export const busUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.busUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NullableEnumbus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const busUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.busUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => bus_statusSchema),z.lazy(() => NullableEnumbus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const userUpsertWithoutScheduleInputSchema: z.ZodType<Prisma.userUpsertWithoutScheduleInput> = z.object({
  update: z.union([ z.lazy(() => userUpdateWithoutScheduleInputSchema),z.lazy(() => userUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => userCreateWithoutScheduleInputSchema),z.lazy(() => userUncheckedCreateWithoutScheduleInputSchema) ]),
  where: z.lazy(() => userWhereInputSchema).optional()
}).strict();

export const userUpdateToOneWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => userUpdateWithoutScheduleInputSchema),z.lazy(() => userUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export const userUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.userUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => studentUpdateOneWithoutUserNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const userUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => studentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const routeUpsertWithoutScheduleInputSchema: z.ZodType<Prisma.routeUpsertWithoutScheduleInput> = z.object({
  update: z.union([ z.lazy(() => routeUpdateWithoutScheduleInputSchema),z.lazy(() => routeUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => routeCreateWithoutScheduleInputSchema),z.lazy(() => routeUncheckedCreateWithoutScheduleInputSchema) ]),
  where: z.lazy(() => routeWhereInputSchema).optional()
}).strict();

export const routeUpdateToOneWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.routeUpdateToOneWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => routeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => routeUpdateWithoutScheduleInputSchema),z.lazy(() => routeUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export const routeUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.routeUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUpdateManyWithoutRouteNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const routeUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.routeUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const tripUpsertWithWhereUniqueWithoutScheduleInputSchema: z.ZodType<Prisma.tripUpsertWithWhereUniqueWithoutScheduleInput> = z.object({
  where: z.lazy(() => tripWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => tripUpdateWithoutScheduleInputSchema),z.lazy(() => tripUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => tripCreateWithoutScheduleInputSchema),z.lazy(() => tripUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const tripUpdateWithWhereUniqueWithoutScheduleInputSchema: z.ZodType<Prisma.tripUpdateWithWhereUniqueWithoutScheduleInput> = z.object({
  where: z.lazy(() => tripWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => tripUpdateWithoutScheduleInputSchema),z.lazy(() => tripUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export const tripUpdateManyWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.tripUpdateManyWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => tripScalarWhereInputSchema),
  data: z.union([ z.lazy(() => tripUpdateManyMutationInputSchema),z.lazy(() => tripUncheckedUpdateManyWithoutScheduleInputSchema) ]),
}).strict();

export const tripScalarWhereInputSchema: z.ZodType<Prisma.tripScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => tripScalarWhereInputSchema),z.lazy(() => tripScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tripScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tripScalarWhereInputSchema),z.lazy(() => tripScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  actualStartTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualEndTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumtrip_statusNullableFilterSchema),z.lazy(() => trip_statusSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => Enumtrip_typeFilterSchema),z.lazy(() => trip_typeSchema) ]).optional(),
}).strict();

export const routestoppointCreateWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointCreateWithoutStoppointInput> = z.object({
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema),
  route: z.lazy(() => routeCreateNestedOneWithoutRoutestoppointInputSchema)
}).strict();

export const routestoppointUncheckedCreateWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointUncheckedCreateWithoutStoppointInput> = z.object({
  id: z.number().int().optional(),
  routeId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema)
}).strict();

export const routestoppointCreateOrConnectWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointCreateOrConnectWithoutStoppointInput> = z.object({
  where: z.lazy(() => routestoppointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => routestoppointCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema) ]),
}).strict();

export const routestoppointCreateManyStoppointInputEnvelopeSchema: z.ZodType<Prisma.routestoppointCreateManyStoppointInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => routestoppointCreateManyStoppointInputSchema),z.lazy(() => routestoppointCreateManyStoppointInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const studentassignmentCreateWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentCreateWithoutStoppointInput> = z.object({
  id: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  route: z.lazy(() => routeCreateNestedOneWithoutStudentassignmentInputSchema),
  student: z.lazy(() => studentCreateNestedOneWithoutStudentassignmentInputSchema)
}).strict();

export const studentassignmentUncheckedCreateWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentUncheckedCreateWithoutStoppointInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentassignmentCreateOrConnectWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentCreateOrConnectWithoutStoppointInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema) ]),
}).strict();

export const studentassignmentCreateManyStoppointInputEnvelopeSchema: z.ZodType<Prisma.studentassignmentCreateManyStoppointInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => studentassignmentCreateManyStoppointInputSchema),z.lazy(() => studentassignmentCreateManyStoppointInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const tripstopCreateWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopCreateWithoutStoppointInput> = z.object({
  id: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable(),
  trip: z.lazy(() => tripCreateNestedOneWithoutTripstopInputSchema)
}).strict();

export const tripstopUncheckedCreateWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopUncheckedCreateWithoutStoppointInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable()
}).strict();

export const tripstopCreateOrConnectWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopCreateOrConnectWithoutStoppointInput> = z.object({
  where: z.lazy(() => tripstopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tripstopCreateWithoutStoppointInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema) ]),
}).strict();

export const tripstopCreateManyStoppointInputEnvelopeSchema: z.ZodType<Prisma.tripstopCreateManyStoppointInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => tripstopCreateManyStoppointInputSchema),z.lazy(() => tripstopCreateManyStoppointInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const routestoppointUpsertWithWhereUniqueWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointUpsertWithWhereUniqueWithoutStoppointInput> = z.object({
  where: z.lazy(() => routestoppointWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => routestoppointUpdateWithoutStoppointInputSchema),z.lazy(() => routestoppointUncheckedUpdateWithoutStoppointInputSchema) ]),
  create: z.union([ z.lazy(() => routestoppointCreateWithoutStoppointInputSchema),z.lazy(() => routestoppointUncheckedCreateWithoutStoppointInputSchema) ]),
}).strict();

export const routestoppointUpdateWithWhereUniqueWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointUpdateWithWhereUniqueWithoutStoppointInput> = z.object({
  where: z.lazy(() => routestoppointWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => routestoppointUpdateWithoutStoppointInputSchema),z.lazy(() => routestoppointUncheckedUpdateWithoutStoppointInputSchema) ]),
}).strict();

export const routestoppointUpdateManyWithWhereWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointUpdateManyWithWhereWithoutStoppointInput> = z.object({
  where: z.lazy(() => routestoppointScalarWhereInputSchema),
  data: z.union([ z.lazy(() => routestoppointUpdateManyMutationInputSchema),z.lazy(() => routestoppointUncheckedUpdateManyWithoutStoppointInputSchema) ]),
}).strict();

export const studentassignmentUpsertWithWhereUniqueWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentUpsertWithWhereUniqueWithoutStoppointInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithoutStoppointInputSchema),z.lazy(() => studentassignmentUncheckedUpdateWithoutStoppointInputSchema) ]),
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStoppointInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStoppointInputSchema) ]),
}).strict();

export const studentassignmentUpdateWithWhereUniqueWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentUpdateWithWhereUniqueWithoutStoppointInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => studentassignmentUpdateWithoutStoppointInputSchema),z.lazy(() => studentassignmentUncheckedUpdateWithoutStoppointInputSchema) ]),
}).strict();

export const studentassignmentUpdateManyWithWhereWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentUpdateManyWithWhereWithoutStoppointInput> = z.object({
  where: z.lazy(() => studentassignmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => studentassignmentUpdateManyMutationInputSchema),z.lazy(() => studentassignmentUncheckedUpdateManyWithoutStoppointInputSchema) ]),
}).strict();

export const tripstopUpsertWithWhereUniqueWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopUpsertWithWhereUniqueWithoutStoppointInput> = z.object({
  where: z.lazy(() => tripstopWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => tripstopUpdateWithoutStoppointInputSchema),z.lazy(() => tripstopUncheckedUpdateWithoutStoppointInputSchema) ]),
  create: z.union([ z.lazy(() => tripstopCreateWithoutStoppointInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutStoppointInputSchema) ]),
}).strict();

export const tripstopUpdateWithWhereUniqueWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopUpdateWithWhereUniqueWithoutStoppointInput> = z.object({
  where: z.lazy(() => tripstopWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => tripstopUpdateWithoutStoppointInputSchema),z.lazy(() => tripstopUncheckedUpdateWithoutStoppointInputSchema) ]),
}).strict();

export const tripstopUpdateManyWithWhereWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopUpdateManyWithWhereWithoutStoppointInput> = z.object({
  where: z.lazy(() => tripstopScalarWhereInputSchema),
  data: z.union([ z.lazy(() => tripstopUpdateManyMutationInputSchema),z.lazy(() => tripstopUncheckedUpdateManyWithoutStoppointInputSchema) ]),
}).strict();

export const tripstopScalarWhereInputSchema: z.ZodType<Prisma.tripstopScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => tripstopScalarWhereInputSchema),z.lazy(() => tripstopScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tripstopScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tripstopScalarWhereInputSchema),z.lazy(() => tripstopScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actualArrival: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualDeparture: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumtripstop_statusNullableFilterSchema),z.lazy(() => tripstop_statusSchema) ]).optional().nullable(),
}).strict();

export const userCreateWithoutStudentInputSchema: z.ZodType<Prisma.userCreateWithoutStudentInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  report: z.lazy(() => reportCreateNestedManyWithoutUserInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedManyWithoutUserInputSchema).optional(),
  userroles: z.lazy(() => userrolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutStudentInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => userCreateWithoutStudentInputSchema),z.lazy(() => userUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const studentassignmentCreateWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentCreateWithoutStudentInput> = z.object({
  id: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  route: z.lazy(() => routeCreateNestedOneWithoutStudentassignmentInputSchema),
  stoppoint: z.lazy(() => stoppointCreateNestedOneWithoutStudentassignmentInputSchema)
}).strict();

export const studentassignmentUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentUncheckedCreateWithoutStudentInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentassignmentCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const studentassignmentCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.studentassignmentCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => studentassignmentCreateManyStudentInputSchema),z.lazy(() => studentassignmentCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const studentattendanceCreateWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceCreateWithoutStudentInput> = z.object({
  id: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable(),
  trip: z.lazy(() => tripCreateNestedOneWithoutStudentattendanceInputSchema)
}).strict();

export const studentattendanceUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceUncheckedCreateWithoutStudentInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable()
}).strict();

export const studentattendanceCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => studentattendanceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const studentattendanceCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.studentattendanceCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => studentattendanceCreateManyStudentInputSchema),z.lazy(() => studentattendanceCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const userUpsertWithoutStudentInputSchema: z.ZodType<Prisma.userUpsertWithoutStudentInput> = z.object({
  update: z.union([ z.lazy(() => userUpdateWithoutStudentInputSchema),z.lazy(() => userUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => userCreateWithoutStudentInputSchema),z.lazy(() => userUncheckedCreateWithoutStudentInputSchema) ]),
  where: z.lazy(() => userWhereInputSchema).optional()
}).strict();

export const userUpdateToOneWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => userUpdateWithoutStudentInputSchema),z.lazy(() => userUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const userUpdateWithoutStudentInputSchema: z.ZodType<Prisma.userUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutUserNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateManyWithoutUserNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const userUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userroles: z.lazy(() => userrolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const studentassignmentUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => studentassignmentUpdateWithoutStudentInputSchema),z.lazy(() => studentassignmentUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => studentassignmentCreateWithoutStudentInputSchema),z.lazy(() => studentassignmentUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const studentassignmentUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => studentassignmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => studentassignmentUpdateWithoutStudentInputSchema),z.lazy(() => studentassignmentUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const studentassignmentUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => studentassignmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => studentassignmentUpdateManyMutationInputSchema),z.lazy(() => studentassignmentUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const studentattendanceUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => studentattendanceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => studentattendanceUpdateWithoutStudentInputSchema),z.lazy(() => studentattendanceUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutStudentInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const studentattendanceUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => studentattendanceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => studentattendanceUpdateWithoutStudentInputSchema),z.lazy(() => studentattendanceUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const studentattendanceUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => studentattendanceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => studentattendanceUpdateManyMutationInputSchema),z.lazy(() => studentattendanceUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const studentattendanceScalarWhereInputSchema: z.ZodType<Prisma.studentattendanceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => studentattendanceScalarWhereInputSchema),z.lazy(() => studentattendanceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentattendanceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentattendanceScalarWhereInputSchema),z.lazy(() => studentattendanceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dropoffTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => Enumstudentattendance_statusNullableFilterSchema),z.lazy(() => studentattendance_statusSchema) ]).optional().nullable(),
}).strict();

export const routeCreateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.routeCreateWithoutStudentassignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointCreateNestedManyWithoutRouteInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const routeUncheckedCreateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.routeUncheckedCreateWithoutStudentassignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const routeCreateOrConnectWithoutStudentassignmentInputSchema: z.ZodType<Prisma.routeCreateOrConnectWithoutStudentassignmentInput> = z.object({
  where: z.lazy(() => routeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => routeCreateWithoutStudentassignmentInputSchema),z.lazy(() => routeUncheckedCreateWithoutStudentassignmentInputSchema) ]),
}).strict();

export const stoppointCreateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.stoppointCreateWithoutStudentassignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointCreateNestedManyWithoutStoppointInputSchema).optional(),
  tripstop: z.lazy(() => tripstopCreateNestedManyWithoutStoppointInputSchema).optional()
}).strict();

export const stoppointUncheckedCreateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.stoppointUncheckedCreateWithoutStudentassignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedCreateNestedManyWithoutStoppointInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedCreateNestedManyWithoutStoppointInputSchema).optional()
}).strict();

export const stoppointCreateOrConnectWithoutStudentassignmentInputSchema: z.ZodType<Prisma.stoppointCreateOrConnectWithoutStudentassignmentInput> = z.object({
  where: z.lazy(() => stoppointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => stoppointCreateWithoutStudentassignmentInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutStudentassignmentInputSchema) ]),
}).strict();

export const studentCreateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.studentCreateWithoutStudentassignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => userCreateNestedOneWithoutStudentInputSchema),
  studentattendance: z.lazy(() => studentattendanceCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const studentUncheckedCreateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.studentUncheckedCreateWithoutStudentassignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const studentCreateOrConnectWithoutStudentassignmentInputSchema: z.ZodType<Prisma.studentCreateOrConnectWithoutStudentassignmentInput> = z.object({
  where: z.lazy(() => studentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => studentCreateWithoutStudentassignmentInputSchema),z.lazy(() => studentUncheckedCreateWithoutStudentassignmentInputSchema) ]),
}).strict();

export const routeUpsertWithoutStudentassignmentInputSchema: z.ZodType<Prisma.routeUpsertWithoutStudentassignmentInput> = z.object({
  update: z.union([ z.lazy(() => routeUpdateWithoutStudentassignmentInputSchema),z.lazy(() => routeUncheckedUpdateWithoutStudentassignmentInputSchema) ]),
  create: z.union([ z.lazy(() => routeCreateWithoutStudentassignmentInputSchema),z.lazy(() => routeUncheckedCreateWithoutStudentassignmentInputSchema) ]),
  where: z.lazy(() => routeWhereInputSchema).optional()
}).strict();

export const routeUpdateToOneWithWhereWithoutStudentassignmentInputSchema: z.ZodType<Prisma.routeUpdateToOneWithWhereWithoutStudentassignmentInput> = z.object({
  where: z.lazy(() => routeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => routeUpdateWithoutStudentassignmentInputSchema),z.lazy(() => routeUncheckedUpdateWithoutStudentassignmentInputSchema) ]),
}).strict();

export const routeUpdateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.routeUpdateWithoutStudentassignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUpdateManyWithoutRouteNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const routeUncheckedUpdateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.routeUncheckedUpdateWithoutStudentassignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const stoppointUpsertWithoutStudentassignmentInputSchema: z.ZodType<Prisma.stoppointUpsertWithoutStudentassignmentInput> = z.object({
  update: z.union([ z.lazy(() => stoppointUpdateWithoutStudentassignmentInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutStudentassignmentInputSchema) ]),
  create: z.union([ z.lazy(() => stoppointCreateWithoutStudentassignmentInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutStudentassignmentInputSchema) ]),
  where: z.lazy(() => stoppointWhereInputSchema).optional()
}).strict();

export const stoppointUpdateToOneWithWhereWithoutStudentassignmentInputSchema: z.ZodType<Prisma.stoppointUpdateToOneWithWhereWithoutStudentassignmentInput> = z.object({
  where: z.lazy(() => stoppointWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => stoppointUpdateWithoutStudentassignmentInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutStudentassignmentInputSchema) ]),
}).strict();

export const stoppointUpdateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.stoppointUpdateWithoutStudentassignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUpdateManyWithoutStoppointNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUpdateManyWithoutStoppointNestedInputSchema).optional()
}).strict();

export const stoppointUncheckedUpdateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.stoppointUncheckedUpdateWithoutStudentassignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional()
}).strict();

export const studentUpsertWithoutStudentassignmentInputSchema: z.ZodType<Prisma.studentUpsertWithoutStudentassignmentInput> = z.object({
  update: z.union([ z.lazy(() => studentUpdateWithoutStudentassignmentInputSchema),z.lazy(() => studentUncheckedUpdateWithoutStudentassignmentInputSchema) ]),
  create: z.union([ z.lazy(() => studentCreateWithoutStudentassignmentInputSchema),z.lazy(() => studentUncheckedCreateWithoutStudentassignmentInputSchema) ]),
  where: z.lazy(() => studentWhereInputSchema).optional()
}).strict();

export const studentUpdateToOneWithWhereWithoutStudentassignmentInputSchema: z.ZodType<Prisma.studentUpdateToOneWithWhereWithoutStudentassignmentInput> = z.object({
  where: z.lazy(() => studentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => studentUpdateWithoutStudentassignmentInputSchema),z.lazy(() => studentUncheckedUpdateWithoutStudentassignmentInputSchema) ]),
}).strict();

export const studentUpdateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.studentUpdateWithoutStudentassignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const studentUncheckedUpdateWithoutStudentassignmentInputSchema: z.ZodType<Prisma.studentUncheckedUpdateWithoutStudentassignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const studentCreateWithoutStudentattendanceInputSchema: z.ZodType<Prisma.studentCreateWithoutStudentattendanceInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => userCreateNestedOneWithoutStudentInputSchema),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const studentUncheckedCreateWithoutStudentattendanceInputSchema: z.ZodType<Prisma.studentUncheckedCreateWithoutStudentattendanceInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const studentCreateOrConnectWithoutStudentattendanceInputSchema: z.ZodType<Prisma.studentCreateOrConnectWithoutStudentattendanceInput> = z.object({
  where: z.lazy(() => studentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => studentCreateWithoutStudentattendanceInputSchema),z.lazy(() => studentUncheckedCreateWithoutStudentattendanceInputSchema) ]),
}).strict();

export const tripCreateWithoutStudentattendanceInputSchema: z.ZodType<Prisma.tripCreateWithoutStudentattendanceInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryCreateNestedManyWithoutTripInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedOneWithoutTripInputSchema),
  tripstop: z.lazy(() => tripstopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripUncheckedCreateWithoutStudentattendanceInputSchema: z.ZodType<Prisma.tripUncheckedCreateWithoutStudentattendanceInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripCreateOrConnectWithoutStudentattendanceInputSchema: z.ZodType<Prisma.tripCreateOrConnectWithoutStudentattendanceInput> = z.object({
  where: z.lazy(() => tripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tripCreateWithoutStudentattendanceInputSchema),z.lazy(() => tripUncheckedCreateWithoutStudentattendanceInputSchema) ]),
}).strict();

export const studentUpsertWithoutStudentattendanceInputSchema: z.ZodType<Prisma.studentUpsertWithoutStudentattendanceInput> = z.object({
  update: z.union([ z.lazy(() => studentUpdateWithoutStudentattendanceInputSchema),z.lazy(() => studentUncheckedUpdateWithoutStudentattendanceInputSchema) ]),
  create: z.union([ z.lazy(() => studentCreateWithoutStudentattendanceInputSchema),z.lazy(() => studentUncheckedCreateWithoutStudentattendanceInputSchema) ]),
  where: z.lazy(() => studentWhereInputSchema).optional()
}).strict();

export const studentUpdateToOneWithWhereWithoutStudentattendanceInputSchema: z.ZodType<Prisma.studentUpdateToOneWithWhereWithoutStudentattendanceInput> = z.object({
  where: z.lazy(() => studentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => studentUpdateWithoutStudentattendanceInputSchema),z.lazy(() => studentUncheckedUpdateWithoutStudentattendanceInputSchema) ]),
}).strict();

export const studentUpdateWithoutStudentattendanceInputSchema: z.ZodType<Prisma.studentUpdateWithoutStudentattendanceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const studentUncheckedUpdateWithoutStudentattendanceInputSchema: z.ZodType<Prisma.studentUncheckedUpdateWithoutStudentattendanceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const tripUpsertWithoutStudentattendanceInputSchema: z.ZodType<Prisma.tripUpsertWithoutStudentattendanceInput> = z.object({
  update: z.union([ z.lazy(() => tripUpdateWithoutStudentattendanceInputSchema),z.lazy(() => tripUncheckedUpdateWithoutStudentattendanceInputSchema) ]),
  create: z.union([ z.lazy(() => tripCreateWithoutStudentattendanceInputSchema),z.lazy(() => tripUncheckedCreateWithoutStudentattendanceInputSchema) ]),
  where: z.lazy(() => tripWhereInputSchema).optional()
}).strict();

export const tripUpdateToOneWithWhereWithoutStudentattendanceInputSchema: z.ZodType<Prisma.tripUpdateToOneWithWhereWithoutStudentattendanceInput> = z.object({
  where: z.lazy(() => tripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => tripUpdateWithoutStudentattendanceInputSchema),z.lazy(() => tripUncheckedUpdateWithoutStudentattendanceInputSchema) ]),
}).strict();

export const tripUpdateWithoutStudentattendanceInputSchema: z.ZodType<Prisma.tripUpdateWithoutStudentattendanceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const tripUncheckedUpdateWithoutStudentattendanceInputSchema: z.ZodType<Prisma.tripUncheckedUpdateWithoutStudentattendanceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const tripCreateWithoutTrackingbushistoryInputSchema: z.ZodType<Prisma.tripCreateWithoutTrackingbushistoryInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportCreateNestedManyWithoutTripInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceCreateNestedManyWithoutTripInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedOneWithoutTripInputSchema),
  tripstop: z.lazy(() => tripstopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripUncheckedCreateWithoutTrackingbushistoryInputSchema: z.ZodType<Prisma.tripUncheckedCreateWithoutTrackingbushistoryInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripCreateOrConnectWithoutTrackingbushistoryInputSchema: z.ZodType<Prisma.tripCreateOrConnectWithoutTrackingbushistoryInput> = z.object({
  where: z.lazy(() => tripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tripCreateWithoutTrackingbushistoryInputSchema),z.lazy(() => tripUncheckedCreateWithoutTrackingbushistoryInputSchema) ]),
}).strict();

export const tripUpsertWithoutTrackingbushistoryInputSchema: z.ZodType<Prisma.tripUpsertWithoutTrackingbushistoryInput> = z.object({
  update: z.union([ z.lazy(() => tripUpdateWithoutTrackingbushistoryInputSchema),z.lazy(() => tripUncheckedUpdateWithoutTrackingbushistoryInputSchema) ]),
  create: z.union([ z.lazy(() => tripCreateWithoutTrackingbushistoryInputSchema),z.lazy(() => tripUncheckedCreateWithoutTrackingbushistoryInputSchema) ]),
  where: z.lazy(() => tripWhereInputSchema).optional()
}).strict();

export const tripUpdateToOneWithWhereWithoutTrackingbushistoryInputSchema: z.ZodType<Prisma.tripUpdateToOneWithWhereWithoutTrackingbushistoryInput> = z.object({
  where: z.lazy(() => tripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => tripUpdateWithoutTrackingbushistoryInputSchema),z.lazy(() => tripUncheckedUpdateWithoutTrackingbushistoryInputSchema) ]),
}).strict();

export const tripUpdateWithoutTrackingbushistoryInputSchema: z.ZodType<Prisma.tripUpdateWithoutTrackingbushistoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutTripNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const tripUncheckedUpdateWithoutTrackingbushistoryInputSchema: z.ZodType<Prisma.tripUncheckedUpdateWithoutTrackingbushistoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const reportCreateWithoutTripInputSchema: z.ZodType<Prisma.reportCreateWithoutTripInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => userCreateNestedOneWithoutReportInputSchema)
}).strict();

export const reportUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.reportUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  reporterId: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const reportCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.reportCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => reportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => reportCreateWithoutTripInputSchema),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const reportCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.reportCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => reportCreateManyTripInputSchema),z.lazy(() => reportCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const studentattendanceCreateWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceCreateWithoutTripInput> = z.object({
  id: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable(),
  student: z.lazy(() => studentCreateNestedOneWithoutStudentattendanceInputSchema)
}).strict();

export const studentattendanceUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable()
}).strict();

export const studentattendanceCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => studentattendanceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutTripInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const studentattendanceCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.studentattendanceCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => studentattendanceCreateManyTripInputSchema),z.lazy(() => studentattendanceCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const trackingbushistoryCreateWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryCreateWithoutTripInput> = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const trackingbushistoryUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const trackingbushistoryCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => trackingbushistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const trackingbushistoryCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.trackingbushistoryCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => trackingbushistoryCreateManyTripInputSchema),z.lazy(() => trackingbushistoryCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const scheduleCreateWithoutTripInputSchema: z.ZodType<Prisma.scheduleCreateWithoutTripInput> = z.object({
  id: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bus: z.lazy(() => busCreateNestedOneWithoutScheduleInputSchema),
  user: z.lazy(() => userCreateNestedOneWithoutScheduleInputSchema),
  route: z.lazy(() => routeCreateNestedOneWithoutScheduleInputSchema)
}).strict();

export const scheduleUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.scheduleUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const scheduleCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.scheduleCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => scheduleCreateWithoutTripInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const tripstopCreateWithoutTripInputSchema: z.ZodType<Prisma.tripstopCreateWithoutTripInput> = z.object({
  id: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable(),
  stoppoint: z.lazy(() => stoppointCreateNestedOneWithoutTripstopInputSchema)
}).strict();

export const tripstopUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.tripstopUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable()
}).strict();

export const tripstopCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.tripstopCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => tripstopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tripstopCreateWithoutTripInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const tripstopCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.tripstopCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => tripstopCreateManyTripInputSchema),z.lazy(() => tripstopCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const reportUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.reportUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => reportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => reportUpdateWithoutTripInputSchema),z.lazy(() => reportUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => reportCreateWithoutTripInputSchema),z.lazy(() => reportUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const reportUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.reportUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => reportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => reportUpdateWithoutTripInputSchema),z.lazy(() => reportUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const reportUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.reportUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => reportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => reportUpdateManyMutationInputSchema),z.lazy(() => reportUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const reportScalarWhereInputSchema: z.ZodType<Prisma.reportScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => reportScalarWhereInputSchema),z.lazy(() => reportScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => reportScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => reportScalarWhereInputSchema),z.lazy(() => reportScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const studentattendanceUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => studentattendanceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => studentattendanceUpdateWithoutTripInputSchema),z.lazy(() => studentattendanceUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => studentattendanceCreateWithoutTripInputSchema),z.lazy(() => studentattendanceUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const studentattendanceUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => studentattendanceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => studentattendanceUpdateWithoutTripInputSchema),z.lazy(() => studentattendanceUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const studentattendanceUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => studentattendanceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => studentattendanceUpdateManyMutationInputSchema),z.lazy(() => studentattendanceUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const trackingbushistoryUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => trackingbushistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => trackingbushistoryUpdateWithoutTripInputSchema),z.lazy(() => trackingbushistoryUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => trackingbushistoryCreateWithoutTripInputSchema),z.lazy(() => trackingbushistoryUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const trackingbushistoryUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => trackingbushistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => trackingbushistoryUpdateWithoutTripInputSchema),z.lazy(() => trackingbushistoryUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const trackingbushistoryUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => trackingbushistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => trackingbushistoryUpdateManyMutationInputSchema),z.lazy(() => trackingbushistoryUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const trackingbushistoryScalarWhereInputSchema: z.ZodType<Prisma.trackingbushistoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => trackingbushistoryScalarWhereInputSchema),z.lazy(() => trackingbushistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => trackingbushistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => trackingbushistoryScalarWhereInputSchema),z.lazy(() => trackingbushistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional()
}).strict();

export const scheduleUpsertWithoutTripInputSchema: z.ZodType<Prisma.scheduleUpsertWithoutTripInput> = z.object({
  update: z.union([ z.lazy(() => scheduleUpdateWithoutTripInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => scheduleCreateWithoutTripInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutTripInputSchema) ]),
  where: z.lazy(() => scheduleWhereInputSchema).optional()
}).strict();

export const scheduleUpdateToOneWithWhereWithoutTripInputSchema: z.ZodType<Prisma.scheduleUpdateToOneWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => scheduleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => scheduleUpdateWithoutTripInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const scheduleUpdateWithoutTripInputSchema: z.ZodType<Prisma.scheduleUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bus: z.lazy(() => busUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tripstopUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.tripstopUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => tripstopWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => tripstopUpdateWithoutTripInputSchema),z.lazy(() => tripstopUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => tripstopCreateWithoutTripInputSchema),z.lazy(() => tripstopUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const tripstopUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.tripstopUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => tripstopWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => tripstopUpdateWithoutTripInputSchema),z.lazy(() => tripstopUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const tripstopUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.tripstopUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => tripstopScalarWhereInputSchema),
  data: z.union([ z.lazy(() => tripstopUpdateManyMutationInputSchema),z.lazy(() => tripstopUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const stoppointCreateWithoutTripstopInputSchema: z.ZodType<Prisma.stoppointCreateWithoutTripstopInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointCreateNestedManyWithoutStoppointInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutStoppointInputSchema).optional()
}).strict();

export const stoppointUncheckedCreateWithoutTripstopInputSchema: z.ZodType<Prisma.stoppointUncheckedCreateWithoutTripstopInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedCreateNestedManyWithoutStoppointInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutStoppointInputSchema).optional()
}).strict();

export const stoppointCreateOrConnectWithoutTripstopInputSchema: z.ZodType<Prisma.stoppointCreateOrConnectWithoutTripstopInput> = z.object({
  where: z.lazy(() => stoppointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => stoppointCreateWithoutTripstopInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutTripstopInputSchema) ]),
}).strict();

export const tripCreateWithoutTripstopInputSchema: z.ZodType<Prisma.tripCreateWithoutTripstopInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportCreateNestedManyWithoutTripInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryCreateNestedManyWithoutTripInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedOneWithoutTripInputSchema)
}).strict();

export const tripUncheckedCreateWithoutTripstopInputSchema: z.ZodType<Prisma.tripUncheckedCreateWithoutTripstopInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const tripCreateOrConnectWithoutTripstopInputSchema: z.ZodType<Prisma.tripCreateOrConnectWithoutTripstopInput> = z.object({
  where: z.lazy(() => tripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tripCreateWithoutTripstopInputSchema),z.lazy(() => tripUncheckedCreateWithoutTripstopInputSchema) ]),
}).strict();

export const stoppointUpsertWithoutTripstopInputSchema: z.ZodType<Prisma.stoppointUpsertWithoutTripstopInput> = z.object({
  update: z.union([ z.lazy(() => stoppointUpdateWithoutTripstopInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutTripstopInputSchema) ]),
  create: z.union([ z.lazy(() => stoppointCreateWithoutTripstopInputSchema),z.lazy(() => stoppointUncheckedCreateWithoutTripstopInputSchema) ]),
  where: z.lazy(() => stoppointWhereInputSchema).optional()
}).strict();

export const stoppointUpdateToOneWithWhereWithoutTripstopInputSchema: z.ZodType<Prisma.stoppointUpdateToOneWithWhereWithoutTripstopInput> = z.object({
  where: z.lazy(() => stoppointWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => stoppointUpdateWithoutTripstopInputSchema),z.lazy(() => stoppointUncheckedUpdateWithoutTripstopInputSchema) ]),
}).strict();

export const stoppointUpdateWithoutTripstopInputSchema: z.ZodType<Prisma.stoppointUpdateWithoutTripstopInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUpdateManyWithoutStoppointNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutStoppointNestedInputSchema).optional()
}).strict();

export const stoppointUncheckedUpdateWithoutTripstopInputSchema: z.ZodType<Prisma.stoppointUncheckedUpdateWithoutTripstopInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  routestoppoint: z.lazy(() => routestoppointUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutStoppointNestedInputSchema).optional()
}).strict();

export const tripUpsertWithoutTripstopInputSchema: z.ZodType<Prisma.tripUpsertWithoutTripstopInput> = z.object({
  update: z.union([ z.lazy(() => tripUpdateWithoutTripstopInputSchema),z.lazy(() => tripUncheckedUpdateWithoutTripstopInputSchema) ]),
  create: z.union([ z.lazy(() => tripCreateWithoutTripstopInputSchema),z.lazy(() => tripUncheckedCreateWithoutTripstopInputSchema) ]),
  where: z.lazy(() => tripWhereInputSchema).optional()
}).strict();

export const tripUpdateToOneWithWhereWithoutTripstopInputSchema: z.ZodType<Prisma.tripUpdateToOneWithWhereWithoutTripstopInput> = z.object({
  where: z.lazy(() => tripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => tripUpdateWithoutTripstopInputSchema),z.lazy(() => tripUncheckedUpdateWithoutTripstopInputSchema) ]),
}).strict();

export const tripUpdateWithoutTripstopInputSchema: z.ZodType<Prisma.tripUpdateWithoutTripstopInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutTripNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional()
}).strict();

export const tripUncheckedUpdateWithoutTripstopInputSchema: z.ZodType<Prisma.tripUncheckedUpdateWithoutTripstopInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const reportCreateWithoutUserInputSchema: z.ZodType<Prisma.reportCreateWithoutUserInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trip: z.lazy(() => tripCreateNestedOneWithoutReportInputSchema).optional()
}).strict();

export const reportUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.reportUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  tripId: z.string().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const reportCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.reportCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => reportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => reportCreateWithoutUserInputSchema),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const reportCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.reportCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => reportCreateManyUserInputSchema),z.lazy(() => reportCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const scheduleCreateWithoutUserInputSchema: z.ZodType<Prisma.scheduleCreateWithoutUserInput> = z.object({
  id: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bus: z.lazy(() => busCreateNestedOneWithoutScheduleInputSchema),
  route: z.lazy(() => routeCreateNestedOneWithoutScheduleInputSchema),
  trip: z.lazy(() => tripCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const scheduleUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.scheduleUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trip: z.lazy(() => tripUncheckedCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const scheduleCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.scheduleCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => scheduleCreateWithoutUserInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const scheduleCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.scheduleCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => scheduleCreateManyUserInputSchema),z.lazy(() => scheduleCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const studentCreateWithoutUserInputSchema: z.ZodType<Prisma.studentCreateWithoutUserInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  studentassignment: z.lazy(() => studentassignmentCreateNestedManyWithoutStudentInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const studentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.studentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const studentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.studentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => studentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => studentCreateWithoutUserInputSchema),z.lazy(() => studentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const userrolesCreateWithoutUserInputSchema: z.ZodType<Prisma.userrolesCreateWithoutUserInput> = z.object({
  roles: z.lazy(() => rolesCreateNestedOneWithoutUserrolesInputSchema)
}).strict();

export const userrolesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.userrolesUncheckedCreateWithoutUserInput> = z.object({
  roleId: z.number().int()
}).strict();

export const userrolesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.userrolesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => userrolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => userrolesCreateWithoutUserInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const userrolesCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.userrolesCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => userrolesCreateManyUserInputSchema),z.lazy(() => userrolesCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const reportUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.reportUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => reportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => reportUpdateWithoutUserInputSchema),z.lazy(() => reportUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => reportCreateWithoutUserInputSchema),z.lazy(() => reportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const reportUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.reportUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => reportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => reportUpdateWithoutUserInputSchema),z.lazy(() => reportUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const reportUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.reportUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => reportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => reportUpdateManyMutationInputSchema),z.lazy(() => reportUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const scheduleUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.scheduleUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => scheduleUpdateWithoutUserInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => scheduleCreateWithoutUserInputSchema),z.lazy(() => scheduleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const scheduleUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.scheduleUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => scheduleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => scheduleUpdateWithoutUserInputSchema),z.lazy(() => scheduleUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const scheduleUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.scheduleUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => scheduleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => scheduleUpdateManyMutationInputSchema),z.lazy(() => scheduleUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const studentUpsertWithoutUserInputSchema: z.ZodType<Prisma.studentUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => studentUpdateWithoutUserInputSchema),z.lazy(() => studentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => studentCreateWithoutUserInputSchema),z.lazy(() => studentUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => studentWhereInputSchema).optional()
}).strict();

export const studentUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.studentUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => studentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => studentUpdateWithoutUserInputSchema),z.lazy(() => studentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const studentUpdateWithoutUserInputSchema: z.ZodType<Prisma.studentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  studentassignment: z.lazy(() => studentassignmentUpdateManyWithoutStudentNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const studentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.studentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  studentassignment: z.lazy(() => studentassignmentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const userrolesUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.userrolesUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => userrolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => userrolesUpdateWithoutUserInputSchema),z.lazy(() => userrolesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => userrolesCreateWithoutUserInputSchema),z.lazy(() => userrolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const userrolesUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.userrolesUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => userrolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => userrolesUpdateWithoutUserInputSchema),z.lazy(() => userrolesUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const userrolesUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.userrolesUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => userrolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => userrolesUpdateManyMutationInputSchema),z.lazy(() => userrolesUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const rolesCreateWithoutUserrolesInputSchema: z.ZodType<Prisma.rolesCreateWithoutUserrolesInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rolepermissions: z.lazy(() => rolepermissionsCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUncheckedCreateWithoutUserrolesInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutUserrolesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rolepermissions: z.lazy(() => rolepermissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesCreateOrConnectWithoutUserrolesInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutUserrolesInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutUserrolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUserrolesInputSchema) ]),
}).strict();

export const userCreateWithoutUserrolesInputSchema: z.ZodType<Prisma.userCreateWithoutUserrolesInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  report: z.lazy(() => reportCreateNestedManyWithoutUserInputSchema).optional(),
  schedule: z.lazy(() => scheduleCreateNestedManyWithoutUserInputSchema).optional(),
  student: z.lazy(() => studentCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const userUncheckedCreateWithoutUserrolesInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutUserrolesInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  report: z.lazy(() => reportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  student: z.lazy(() => studentUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const userCreateOrConnectWithoutUserrolesInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutUserrolesInput> = z.object({
  where: z.lazy(() => userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => userCreateWithoutUserrolesInputSchema),z.lazy(() => userUncheckedCreateWithoutUserrolesInputSchema) ]),
}).strict();

export const rolesUpsertWithoutUserrolesInputSchema: z.ZodType<Prisma.rolesUpsertWithoutUserrolesInput> = z.object({
  update: z.union([ z.lazy(() => rolesUpdateWithoutUserrolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUserrolesInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutUserrolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUserrolesInputSchema) ]),
  where: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export const rolesUpdateToOneWithWhereWithoutUserrolesInputSchema: z.ZodType<Prisma.rolesUpdateToOneWithWhereWithoutUserrolesInput> = z.object({
  where: z.lazy(() => rolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => rolesUpdateWithoutUserrolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUserrolesInputSchema) ]),
}).strict();

export const rolesUpdateWithoutUserrolesInputSchema: z.ZodType<Prisma.rolesUpdateWithoutUserrolesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rolepermissions: z.lazy(() => rolepermissionsUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateWithoutUserrolesInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateWithoutUserrolesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rolepermissions: z.lazy(() => rolepermissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const userUpsertWithoutUserrolesInputSchema: z.ZodType<Prisma.userUpsertWithoutUserrolesInput> = z.object({
  update: z.union([ z.lazy(() => userUpdateWithoutUserrolesInputSchema),z.lazy(() => userUncheckedUpdateWithoutUserrolesInputSchema) ]),
  create: z.union([ z.lazy(() => userCreateWithoutUserrolesInputSchema),z.lazy(() => userUncheckedCreateWithoutUserrolesInputSchema) ]),
  where: z.lazy(() => userWhereInputSchema).optional()
}).strict();

export const userUpdateToOneWithWhereWithoutUserrolesInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutUserrolesInput> = z.object({
  where: z.lazy(() => userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => userUpdateWithoutUserrolesInputSchema),z.lazy(() => userUncheckedUpdateWithoutUserrolesInputSchema) ]),
}).strict();

export const userUpdateWithoutUserrolesInputSchema: z.ZodType<Prisma.userUpdateWithoutUserrolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutUserNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUpdateManyWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => studentUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const userUncheckedUpdateWithoutUserrolesInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutUserrolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  schedule: z.lazy(() => scheduleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => studentUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const scheduleCreateManyBusInputSchema: z.ZodType<Prisma.scheduleCreateManyBusInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const scheduleUpdateWithoutBusInputSchema: z.ZodType<Prisma.scheduleUpdateWithoutBusInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  trip: z.lazy(() => tripUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleUncheckedUpdateWithoutBusInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateWithoutBusInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => tripUncheckedUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleUncheckedUpdateManyWithoutBusInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateManyWithoutBusInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolepermissionsCreateManyPermissionInputSchema: z.ZodType<Prisma.rolepermissionsCreateManyPermissionInput> = z.object({
  roleId: z.number().int()
}).strict();

export const rolepermissionsUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsUpdateWithoutPermissionInput> = z.object({
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRolepermissionsNestedInputSchema).optional()
}).strict();

export const rolepermissionsUncheckedUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedUpdateWithoutPermissionInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolepermissionsUncheckedUpdateManyWithoutPermissionInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedUpdateManyWithoutPermissionInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolepermissionsCreateManyRolesInputSchema: z.ZodType<Prisma.rolepermissionsCreateManyRolesInput> = z.object({
  permissionId: z.number().int()
}).strict();

export const userrolesCreateManyRolesInputSchema: z.ZodType<Prisma.userrolesCreateManyRolesInput> = z.object({
  userId: z.string()
}).strict();

export const rolepermissionsUpdateWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsUpdateWithoutRolesInput> = z.object({
  permission: z.lazy(() => permissionUpdateOneRequiredWithoutRolepermissionsNestedInputSchema).optional()
}).strict();

export const rolepermissionsUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedUpdateWithoutRolesInput> = z.object({
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolepermissionsUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.rolepermissionsUncheckedUpdateManyWithoutRolesInput> = z.object({
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const userrolesUpdateWithoutRolesInputSchema: z.ZodType<Prisma.userrolesUpdateWithoutRolesInput> = z.object({
  user: z.lazy(() => userUpdateOneRequiredWithoutUserrolesNestedInputSchema).optional()
}).strict();

export const userrolesUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.userrolesUncheckedUpdateWithoutRolesInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const userrolesUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.userrolesUncheckedUpdateManyWithoutRolesInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routestoppointCreateManyRouteInputSchema: z.ZodType<Prisma.routestoppointCreateManyRouteInput> = z.object({
  id: z.number().int().optional(),
  stopPointId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema)
}).strict();

export const scheduleCreateManyRouteInputSchema: z.ZodType<Prisma.scheduleCreateManyRouteInput> = z.object({
  id: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentassignmentCreateManyRouteInputSchema: z.ZodType<Prisma.studentassignmentCreateManyRouteInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const routestoppointUpdateWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointUpdateWithoutRouteInput> = z.object({
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
  stoppoint: z.lazy(() => stoppointUpdateOneRequiredWithoutRoutestoppointNestedInputSchema).optional()
}).strict();

export const routestoppointUncheckedUpdateWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointUncheckedUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stopPointId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routestoppointUncheckedUpdateManyWithoutRouteInputSchema: z.ZodType<Prisma.routestoppointUncheckedUpdateManyWithoutRouteInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stopPointId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const scheduleUpdateWithoutRouteInputSchema: z.ZodType<Prisma.scheduleUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bus: z.lazy(() => busUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  trip: z.lazy(() => tripUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleUncheckedUpdateWithoutRouteInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => tripUncheckedUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleUncheckedUpdateManyWithoutRouteInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateManyWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentassignmentUpdateWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stoppoint: z.lazy(() => stoppointUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional(),
  student: z.lazy(() => studentUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional()
}).strict();

export const studentassignmentUncheckedUpdateWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentassignmentUncheckedUpdateManyWithoutRouteInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateManyWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tripCreateManyScheduleInputSchema: z.ZodType<Prisma.tripCreateManyScheduleInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => trip_typeSchema)
}).strict();

export const tripUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.tripUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUpdateManyWithoutTripNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const tripUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.tripUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => reportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  studentattendance: z.lazy(() => studentattendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  trackingbushistory: z.lazy(() => trackingbushistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripstop: z.lazy(() => tripstopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const tripUncheckedUpdateManyWithoutScheduleInputSchema: z.ZodType<Prisma.tripUncheckedUpdateManyWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => trip_statusSchema),z.lazy(() => NullableEnumtrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => trip_typeSchema),z.lazy(() => Enumtrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routestoppointCreateManyStoppointInputSchema: z.ZodType<Prisma.routestoppointCreateManyStoppointInput> = z.object({
  id: z.number().int().optional(),
  routeId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => routestoppoint_directionSchema)
}).strict();

export const studentassignmentCreateManyStoppointInputSchema: z.ZodType<Prisma.studentassignmentCreateManyStoppointInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const tripstopCreateManyStoppointInputSchema: z.ZodType<Prisma.tripstopCreateManyStoppointInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable()
}).strict();

export const routestoppointUpdateWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointUpdateWithoutStoppointInput> = z.object({
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutRoutestoppointNestedInputSchema).optional()
}).strict();

export const routestoppointUncheckedUpdateWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointUncheckedUpdateWithoutStoppointInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const routestoppointUncheckedUpdateManyWithoutStoppointInputSchema: z.ZodType<Prisma.routestoppointUncheckedUpdateManyWithoutStoppointInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => routestoppoint_directionSchema),z.lazy(() => Enumroutestoppoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentassignmentUpdateWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentUpdateWithoutStoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional(),
  student: z.lazy(() => studentUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional()
}).strict();

export const studentassignmentUncheckedUpdateWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateWithoutStoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentassignmentUncheckedUpdateManyWithoutStoppointInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateManyWithoutStoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tripstopUpdateWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopUpdateWithoutStoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => tripUpdateOneRequiredWithoutTripstopNestedInputSchema).optional()
}).strict();

export const tripstopUncheckedUpdateWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopUncheckedUpdateWithoutStoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const tripstopUncheckedUpdateManyWithoutStoppointInputSchema: z.ZodType<Prisma.tripstopUncheckedUpdateManyWithoutStoppointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentassignmentCreateManyStudentInputSchema: z.ZodType<Prisma.studentassignmentCreateManyStudentInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => studentassignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentattendanceCreateManyStudentInputSchema: z.ZodType<Prisma.studentattendanceCreateManyStudentInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable()
}).strict();

export const studentassignmentUpdateWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional(),
  stoppoint: z.lazy(() => stoppointUpdateOneRequiredWithoutStudentassignmentNestedInputSchema).optional()
}).strict();

export const studentassignmentUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentassignmentUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.studentassignmentUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => studentassignment_directionSchema),z.lazy(() => Enumstudentassignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentattendanceUpdateWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => tripUpdateOneRequiredWithoutStudentattendanceNestedInputSchema).optional()
}).strict();

export const studentattendanceUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentattendanceUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.studentattendanceUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const reportCreateManyTripInputSchema: z.ZodType<Prisma.reportCreateManyTripInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  reporterId: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const studentattendanceCreateManyTripInputSchema: z.ZodType<Prisma.studentattendanceCreateManyTripInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => studentattendance_statusSchema).optional().nullable()
}).strict();

export const trackingbushistoryCreateManyTripInputSchema: z.ZodType<Prisma.trackingbushistoryCreateManyTripInput> = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const tripstopCreateManyTripInputSchema: z.ZodType<Prisma.tripstopCreateManyTripInput> = z.object({
  id: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => tripstop_statusSchema).optional().nullable()
}).strict();

export const reportUpdateWithoutTripInputSchema: z.ZodType<Prisma.reportUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => userUpdateOneRequiredWithoutReportNestedInputSchema).optional()
}).strict();

export const reportUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.reportUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const reportUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.reportUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const studentattendanceUpdateWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  student: z.lazy(() => studentUpdateOneRequiredWithoutStudentattendanceNestedInputSchema).optional()
}).strict();

export const studentattendanceUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentattendanceUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.studentattendanceUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => studentattendance_statusSchema),z.lazy(() => NullableEnumstudentattendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const trackingbushistoryUpdateWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const trackingbushistoryUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const trackingbushistoryUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.trackingbushistoryUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const tripstopUpdateWithoutTripInputSchema: z.ZodType<Prisma.tripstopUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stoppoint: z.lazy(() => stoppointUpdateOneRequiredWithoutTripstopNestedInputSchema).optional()
}).strict();

export const tripstopUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.tripstopUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const tripstopUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.tripstopUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => tripstop_statusSchema),z.lazy(() => NullableEnumtripstop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const reportCreateManyUserInputSchema: z.ZodType<Prisma.reportCreateManyUserInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  tripId: z.string().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const scheduleCreateManyUserInputSchema: z.ZodType<Prisma.scheduleCreateManyUserInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  type: z.lazy(() => schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const userrolesCreateManyUserInputSchema: z.ZodType<Prisma.userrolesCreateManyUserInput> = z.object({
  roleId: z.number().int()
}).strict();

export const reportUpdateWithoutUserInputSchema: z.ZodType<Prisma.reportUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => tripUpdateOneWithoutReportNestedInputSchema).optional()
}).strict();

export const reportUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.reportUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const reportUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.reportUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const scheduleUpdateWithoutUserInputSchema: z.ZodType<Prisma.scheduleUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bus: z.lazy(() => busUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  route: z.lazy(() => routeUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  trip: z.lazy(() => tripUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => tripUncheckedUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const scheduleUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.scheduleUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => schedule_typeSchema),z.lazy(() => Enumschedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => schedule_statusSchema),z.lazy(() => NullableEnumschedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const userrolesUpdateWithoutUserInputSchema: z.ZodType<Prisma.userrolesUpdateWithoutUserInput> = z.object({
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutUserrolesNestedInputSchema).optional()
}).strict();

export const userrolesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.userrolesUncheckedUpdateWithoutUserInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const userrolesUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.userrolesUncheckedUpdateManyWithoutUserInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const busFindFirstArgsSchema: z.ZodType<Prisma.busFindFirstArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  where: busWhereInputSchema.optional(),
  orderBy: z.union([ busOrderByWithRelationInputSchema.array(),busOrderByWithRelationInputSchema ]).optional(),
  cursor: busWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusScalarFieldEnumSchema,BusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const busFindFirstOrThrowArgsSchema: z.ZodType<Prisma.busFindFirstOrThrowArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  where: busWhereInputSchema.optional(),
  orderBy: z.union([ busOrderByWithRelationInputSchema.array(),busOrderByWithRelationInputSchema ]).optional(),
  cursor: busWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusScalarFieldEnumSchema,BusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const busFindManyArgsSchema: z.ZodType<Prisma.busFindManyArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  where: busWhereInputSchema.optional(),
  orderBy: z.union([ busOrderByWithRelationInputSchema.array(),busOrderByWithRelationInputSchema ]).optional(),
  cursor: busWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusScalarFieldEnumSchema,BusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const busAggregateArgsSchema: z.ZodType<Prisma.busAggregateArgs> = z.object({
  where: busWhereInputSchema.optional(),
  orderBy: z.union([ busOrderByWithRelationInputSchema.array(),busOrderByWithRelationInputSchema ]).optional(),
  cursor: busWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const busGroupByArgsSchema: z.ZodType<Prisma.busGroupByArgs> = z.object({
  where: busWhereInputSchema.optional(),
  orderBy: z.union([ busOrderByWithAggregationInputSchema.array(),busOrderByWithAggregationInputSchema ]).optional(),
  by: BusScalarFieldEnumSchema.array(),
  having: busScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const busFindUniqueArgsSchema: z.ZodType<Prisma.busFindUniqueArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  where: busWhereUniqueInputSchema,
}).strict() ;

export const busFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.busFindUniqueOrThrowArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  where: busWhereUniqueInputSchema,
}).strict() ;

export const permissionFindFirstArgsSchema: z.ZodType<Prisma.permissionFindFirstArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  where: permissionWhereInputSchema.optional(),
  orderBy: z.union([ permissionOrderByWithRelationInputSchema.array(),permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const permissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.permissionFindFirstOrThrowArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  where: permissionWhereInputSchema.optional(),
  orderBy: z.union([ permissionOrderByWithRelationInputSchema.array(),permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const permissionFindManyArgsSchema: z.ZodType<Prisma.permissionFindManyArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  where: permissionWhereInputSchema.optional(),
  orderBy: z.union([ permissionOrderByWithRelationInputSchema.array(),permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const permissionAggregateArgsSchema: z.ZodType<Prisma.permissionAggregateArgs> = z.object({
  where: permissionWhereInputSchema.optional(),
  orderBy: z.union([ permissionOrderByWithRelationInputSchema.array(),permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const permissionGroupByArgsSchema: z.ZodType<Prisma.permissionGroupByArgs> = z.object({
  where: permissionWhereInputSchema.optional(),
  orderBy: z.union([ permissionOrderByWithAggregationInputSchema.array(),permissionOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionScalarFieldEnumSchema.array(),
  having: permissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const permissionFindUniqueArgsSchema: z.ZodType<Prisma.permissionFindUniqueArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  where: permissionWhereUniqueInputSchema,
}).strict() ;

export const permissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.permissionFindUniqueOrThrowArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  where: permissionWhereUniqueInputSchema,
}).strict() ;

export const reportFindFirstArgsSchema: z.ZodType<Prisma.reportFindFirstArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  where: reportWhereInputSchema.optional(),
  orderBy: z.union([ reportOrderByWithRelationInputSchema.array(),reportOrderByWithRelationInputSchema ]).optional(),
  cursor: reportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const reportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.reportFindFirstOrThrowArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  where: reportWhereInputSchema.optional(),
  orderBy: z.union([ reportOrderByWithRelationInputSchema.array(),reportOrderByWithRelationInputSchema ]).optional(),
  cursor: reportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const reportFindManyArgsSchema: z.ZodType<Prisma.reportFindManyArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  where: reportWhereInputSchema.optional(),
  orderBy: z.union([ reportOrderByWithRelationInputSchema.array(),reportOrderByWithRelationInputSchema ]).optional(),
  cursor: reportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const reportAggregateArgsSchema: z.ZodType<Prisma.reportAggregateArgs> = z.object({
  where: reportWhereInputSchema.optional(),
  orderBy: z.union([ reportOrderByWithRelationInputSchema.array(),reportOrderByWithRelationInputSchema ]).optional(),
  cursor: reportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const reportGroupByArgsSchema: z.ZodType<Prisma.reportGroupByArgs> = z.object({
  where: reportWhereInputSchema.optional(),
  orderBy: z.union([ reportOrderByWithAggregationInputSchema.array(),reportOrderByWithAggregationInputSchema ]).optional(),
  by: ReportScalarFieldEnumSchema.array(),
  having: reportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const reportFindUniqueArgsSchema: z.ZodType<Prisma.reportFindUniqueArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  where: reportWhereUniqueInputSchema,
}).strict() ;

export const reportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.reportFindUniqueOrThrowArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  where: reportWhereUniqueInputSchema,
}).strict() ;

export const rolepermissionsFindFirstArgsSchema: z.ZodType<Prisma.rolepermissionsFindFirstArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  where: rolepermissionsWhereInputSchema.optional(),
  orderBy: z.union([ rolepermissionsOrderByWithRelationInputSchema.array(),rolepermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: rolepermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolepermissionsScalarFieldEnumSchema,RolepermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const rolepermissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.rolepermissionsFindFirstOrThrowArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  where: rolepermissionsWhereInputSchema.optional(),
  orderBy: z.union([ rolepermissionsOrderByWithRelationInputSchema.array(),rolepermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: rolepermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolepermissionsScalarFieldEnumSchema,RolepermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const rolepermissionsFindManyArgsSchema: z.ZodType<Prisma.rolepermissionsFindManyArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  where: rolepermissionsWhereInputSchema.optional(),
  orderBy: z.union([ rolepermissionsOrderByWithRelationInputSchema.array(),rolepermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: rolepermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolepermissionsScalarFieldEnumSchema,RolepermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const rolepermissionsAggregateArgsSchema: z.ZodType<Prisma.rolepermissionsAggregateArgs> = z.object({
  where: rolepermissionsWhereInputSchema.optional(),
  orderBy: z.union([ rolepermissionsOrderByWithRelationInputSchema.array(),rolepermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: rolepermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const rolepermissionsGroupByArgsSchema: z.ZodType<Prisma.rolepermissionsGroupByArgs> = z.object({
  where: rolepermissionsWhereInputSchema.optional(),
  orderBy: z.union([ rolepermissionsOrderByWithAggregationInputSchema.array(),rolepermissionsOrderByWithAggregationInputSchema ]).optional(),
  by: RolepermissionsScalarFieldEnumSchema.array(),
  having: rolepermissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const rolepermissionsFindUniqueArgsSchema: z.ZodType<Prisma.rolepermissionsFindUniqueArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  where: rolepermissionsWhereUniqueInputSchema,
}).strict() ;

export const rolepermissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.rolepermissionsFindUniqueOrThrowArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  where: rolepermissionsWhereUniqueInputSchema,
}).strict() ;

export const rolesFindFirstArgsSchema: z.ZodType<Prisma.rolesFindFirstArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const rolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.rolesFindFirstOrThrowArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const rolesFindManyArgsSchema: z.ZodType<Prisma.rolesFindManyArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const rolesAggregateArgsSchema: z.ZodType<Prisma.rolesAggregateArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const rolesGroupByArgsSchema: z.ZodType<Prisma.rolesGroupByArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithAggregationInputSchema.array(),rolesOrderByWithAggregationInputSchema ]).optional(),
  by: RolesScalarFieldEnumSchema.array(),
  having: rolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const rolesFindUniqueArgsSchema: z.ZodType<Prisma.rolesFindUniqueArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereUniqueInputSchema,
}).strict() ;

export const rolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.rolesFindUniqueOrThrowArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereUniqueInputSchema,
}).strict() ;

export const routeFindFirstArgsSchema: z.ZodType<Prisma.routeFindFirstArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  where: routeWhereInputSchema.optional(),
  orderBy: z.union([ routeOrderByWithRelationInputSchema.array(),routeOrderByWithRelationInputSchema ]).optional(),
  cursor: routeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteScalarFieldEnumSchema,RouteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const routeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.routeFindFirstOrThrowArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  where: routeWhereInputSchema.optional(),
  orderBy: z.union([ routeOrderByWithRelationInputSchema.array(),routeOrderByWithRelationInputSchema ]).optional(),
  cursor: routeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteScalarFieldEnumSchema,RouteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const routeFindManyArgsSchema: z.ZodType<Prisma.routeFindManyArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  where: routeWhereInputSchema.optional(),
  orderBy: z.union([ routeOrderByWithRelationInputSchema.array(),routeOrderByWithRelationInputSchema ]).optional(),
  cursor: routeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteScalarFieldEnumSchema,RouteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const routeAggregateArgsSchema: z.ZodType<Prisma.routeAggregateArgs> = z.object({
  where: routeWhereInputSchema.optional(),
  orderBy: z.union([ routeOrderByWithRelationInputSchema.array(),routeOrderByWithRelationInputSchema ]).optional(),
  cursor: routeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const routeGroupByArgsSchema: z.ZodType<Prisma.routeGroupByArgs> = z.object({
  where: routeWhereInputSchema.optional(),
  orderBy: z.union([ routeOrderByWithAggregationInputSchema.array(),routeOrderByWithAggregationInputSchema ]).optional(),
  by: RouteScalarFieldEnumSchema.array(),
  having: routeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const routeFindUniqueArgsSchema: z.ZodType<Prisma.routeFindUniqueArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  where: routeWhereUniqueInputSchema,
}).strict() ;

export const routeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.routeFindUniqueOrThrowArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  where: routeWhereUniqueInputSchema,
}).strict() ;

export const routestoppointFindFirstArgsSchema: z.ZodType<Prisma.routestoppointFindFirstArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  where: routestoppointWhereInputSchema.optional(),
  orderBy: z.union([ routestoppointOrderByWithRelationInputSchema.array(),routestoppointOrderByWithRelationInputSchema ]).optional(),
  cursor: routestoppointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoutestoppointScalarFieldEnumSchema,RoutestoppointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const routestoppointFindFirstOrThrowArgsSchema: z.ZodType<Prisma.routestoppointFindFirstOrThrowArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  where: routestoppointWhereInputSchema.optional(),
  orderBy: z.union([ routestoppointOrderByWithRelationInputSchema.array(),routestoppointOrderByWithRelationInputSchema ]).optional(),
  cursor: routestoppointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoutestoppointScalarFieldEnumSchema,RoutestoppointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const routestoppointFindManyArgsSchema: z.ZodType<Prisma.routestoppointFindManyArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  where: routestoppointWhereInputSchema.optional(),
  orderBy: z.union([ routestoppointOrderByWithRelationInputSchema.array(),routestoppointOrderByWithRelationInputSchema ]).optional(),
  cursor: routestoppointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoutestoppointScalarFieldEnumSchema,RoutestoppointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const routestoppointAggregateArgsSchema: z.ZodType<Prisma.routestoppointAggregateArgs> = z.object({
  where: routestoppointWhereInputSchema.optional(),
  orderBy: z.union([ routestoppointOrderByWithRelationInputSchema.array(),routestoppointOrderByWithRelationInputSchema ]).optional(),
  cursor: routestoppointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const routestoppointGroupByArgsSchema: z.ZodType<Prisma.routestoppointGroupByArgs> = z.object({
  where: routestoppointWhereInputSchema.optional(),
  orderBy: z.union([ routestoppointOrderByWithAggregationInputSchema.array(),routestoppointOrderByWithAggregationInputSchema ]).optional(),
  by: RoutestoppointScalarFieldEnumSchema.array(),
  having: routestoppointScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const routestoppointFindUniqueArgsSchema: z.ZodType<Prisma.routestoppointFindUniqueArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  where: routestoppointWhereUniqueInputSchema,
}).strict() ;

export const routestoppointFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.routestoppointFindUniqueOrThrowArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  where: routestoppointWhereUniqueInputSchema,
}).strict() ;

export const scheduleFindFirstArgsSchema: z.ZodType<Prisma.scheduleFindFirstArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  where: scheduleWhereInputSchema.optional(),
  orderBy: z.union([ scheduleOrderByWithRelationInputSchema.array(),scheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: scheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScheduleScalarFieldEnumSchema,ScheduleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const scheduleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.scheduleFindFirstOrThrowArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  where: scheduleWhereInputSchema.optional(),
  orderBy: z.union([ scheduleOrderByWithRelationInputSchema.array(),scheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: scheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScheduleScalarFieldEnumSchema,ScheduleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const scheduleFindManyArgsSchema: z.ZodType<Prisma.scheduleFindManyArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  where: scheduleWhereInputSchema.optional(),
  orderBy: z.union([ scheduleOrderByWithRelationInputSchema.array(),scheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: scheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScheduleScalarFieldEnumSchema,ScheduleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const scheduleAggregateArgsSchema: z.ZodType<Prisma.scheduleAggregateArgs> = z.object({
  where: scheduleWhereInputSchema.optional(),
  orderBy: z.union([ scheduleOrderByWithRelationInputSchema.array(),scheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: scheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const scheduleGroupByArgsSchema: z.ZodType<Prisma.scheduleGroupByArgs> = z.object({
  where: scheduleWhereInputSchema.optional(),
  orderBy: z.union([ scheduleOrderByWithAggregationInputSchema.array(),scheduleOrderByWithAggregationInputSchema ]).optional(),
  by: ScheduleScalarFieldEnumSchema.array(),
  having: scheduleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const scheduleFindUniqueArgsSchema: z.ZodType<Prisma.scheduleFindUniqueArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  where: scheduleWhereUniqueInputSchema,
}).strict() ;

export const scheduleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.scheduleFindUniqueOrThrowArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  where: scheduleWhereUniqueInputSchema,
}).strict() ;

export const stoppointFindFirstArgsSchema: z.ZodType<Prisma.stoppointFindFirstArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  where: stoppointWhereInputSchema.optional(),
  orderBy: z.union([ stoppointOrderByWithRelationInputSchema.array(),stoppointOrderByWithRelationInputSchema ]).optional(),
  cursor: stoppointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StoppointScalarFieldEnumSchema,StoppointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const stoppointFindFirstOrThrowArgsSchema: z.ZodType<Prisma.stoppointFindFirstOrThrowArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  where: stoppointWhereInputSchema.optional(),
  orderBy: z.union([ stoppointOrderByWithRelationInputSchema.array(),stoppointOrderByWithRelationInputSchema ]).optional(),
  cursor: stoppointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StoppointScalarFieldEnumSchema,StoppointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const stoppointFindManyArgsSchema: z.ZodType<Prisma.stoppointFindManyArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  where: stoppointWhereInputSchema.optional(),
  orderBy: z.union([ stoppointOrderByWithRelationInputSchema.array(),stoppointOrderByWithRelationInputSchema ]).optional(),
  cursor: stoppointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StoppointScalarFieldEnumSchema,StoppointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const stoppointAggregateArgsSchema: z.ZodType<Prisma.stoppointAggregateArgs> = z.object({
  where: stoppointWhereInputSchema.optional(),
  orderBy: z.union([ stoppointOrderByWithRelationInputSchema.array(),stoppointOrderByWithRelationInputSchema ]).optional(),
  cursor: stoppointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const stoppointGroupByArgsSchema: z.ZodType<Prisma.stoppointGroupByArgs> = z.object({
  where: stoppointWhereInputSchema.optional(),
  orderBy: z.union([ stoppointOrderByWithAggregationInputSchema.array(),stoppointOrderByWithAggregationInputSchema ]).optional(),
  by: StoppointScalarFieldEnumSchema.array(),
  having: stoppointScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const stoppointFindUniqueArgsSchema: z.ZodType<Prisma.stoppointFindUniqueArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  where: stoppointWhereUniqueInputSchema,
}).strict() ;

export const stoppointFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.stoppointFindUniqueOrThrowArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  where: stoppointWhereUniqueInputSchema,
}).strict() ;

export const studentFindFirstArgsSchema: z.ZodType<Prisma.studentFindFirstArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithRelationInputSchema.array(),studentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.studentFindFirstOrThrowArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithRelationInputSchema.array(),studentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentFindManyArgsSchema: z.ZodType<Prisma.studentFindManyArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithRelationInputSchema.array(),studentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentAggregateArgsSchema: z.ZodType<Prisma.studentAggregateArgs> = z.object({
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithRelationInputSchema.array(),studentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const studentGroupByArgsSchema: z.ZodType<Prisma.studentGroupByArgs> = z.object({
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithAggregationInputSchema.array(),studentOrderByWithAggregationInputSchema ]).optional(),
  by: StudentScalarFieldEnumSchema.array(),
  having: studentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const studentFindUniqueArgsSchema: z.ZodType<Prisma.studentFindUniqueArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  where: studentWhereUniqueInputSchema,
}).strict() ;

export const studentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.studentFindUniqueOrThrowArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  where: studentWhereUniqueInputSchema,
}).strict() ;

export const studentassignmentFindFirstArgsSchema: z.ZodType<Prisma.studentassignmentFindFirstArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  where: studentassignmentWhereInputSchema.optional(),
  orderBy: z.union([ studentassignmentOrderByWithRelationInputSchema.array(),studentassignmentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentassignmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentassignmentScalarFieldEnumSchema,StudentassignmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentassignmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.studentassignmentFindFirstOrThrowArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  where: studentassignmentWhereInputSchema.optional(),
  orderBy: z.union([ studentassignmentOrderByWithRelationInputSchema.array(),studentassignmentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentassignmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentassignmentScalarFieldEnumSchema,StudentassignmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentassignmentFindManyArgsSchema: z.ZodType<Prisma.studentassignmentFindManyArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  where: studentassignmentWhereInputSchema.optional(),
  orderBy: z.union([ studentassignmentOrderByWithRelationInputSchema.array(),studentassignmentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentassignmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentassignmentScalarFieldEnumSchema,StudentassignmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentassignmentAggregateArgsSchema: z.ZodType<Prisma.studentassignmentAggregateArgs> = z.object({
  where: studentassignmentWhereInputSchema.optional(),
  orderBy: z.union([ studentassignmentOrderByWithRelationInputSchema.array(),studentassignmentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentassignmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const studentassignmentGroupByArgsSchema: z.ZodType<Prisma.studentassignmentGroupByArgs> = z.object({
  where: studentassignmentWhereInputSchema.optional(),
  orderBy: z.union([ studentassignmentOrderByWithAggregationInputSchema.array(),studentassignmentOrderByWithAggregationInputSchema ]).optional(),
  by: StudentassignmentScalarFieldEnumSchema.array(),
  having: studentassignmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const studentassignmentFindUniqueArgsSchema: z.ZodType<Prisma.studentassignmentFindUniqueArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  where: studentassignmentWhereUniqueInputSchema,
}).strict() ;

export const studentassignmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.studentassignmentFindUniqueOrThrowArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  where: studentassignmentWhereUniqueInputSchema,
}).strict() ;

export const studentattendanceFindFirstArgsSchema: z.ZodType<Prisma.studentattendanceFindFirstArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  where: studentattendanceWhereInputSchema.optional(),
  orderBy: z.union([ studentattendanceOrderByWithRelationInputSchema.array(),studentattendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: studentattendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentattendanceScalarFieldEnumSchema,StudentattendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentattendanceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.studentattendanceFindFirstOrThrowArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  where: studentattendanceWhereInputSchema.optional(),
  orderBy: z.union([ studentattendanceOrderByWithRelationInputSchema.array(),studentattendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: studentattendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentattendanceScalarFieldEnumSchema,StudentattendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentattendanceFindManyArgsSchema: z.ZodType<Prisma.studentattendanceFindManyArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  where: studentattendanceWhereInputSchema.optional(),
  orderBy: z.union([ studentattendanceOrderByWithRelationInputSchema.array(),studentattendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: studentattendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentattendanceScalarFieldEnumSchema,StudentattendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentattendanceAggregateArgsSchema: z.ZodType<Prisma.studentattendanceAggregateArgs> = z.object({
  where: studentattendanceWhereInputSchema.optional(),
  orderBy: z.union([ studentattendanceOrderByWithRelationInputSchema.array(),studentattendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: studentattendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const studentattendanceGroupByArgsSchema: z.ZodType<Prisma.studentattendanceGroupByArgs> = z.object({
  where: studentattendanceWhereInputSchema.optional(),
  orderBy: z.union([ studentattendanceOrderByWithAggregationInputSchema.array(),studentattendanceOrderByWithAggregationInputSchema ]).optional(),
  by: StudentattendanceScalarFieldEnumSchema.array(),
  having: studentattendanceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const studentattendanceFindUniqueArgsSchema: z.ZodType<Prisma.studentattendanceFindUniqueArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  where: studentattendanceWhereUniqueInputSchema,
}).strict() ;

export const studentattendanceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.studentattendanceFindUniqueOrThrowArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  where: studentattendanceWhereUniqueInputSchema,
}).strict() ;

export const trackingbushistoryFindFirstArgsSchema: z.ZodType<Prisma.trackingbushistoryFindFirstArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  where: trackingbushistoryWhereInputSchema.optional(),
  orderBy: z.union([ trackingbushistoryOrderByWithRelationInputSchema.array(),trackingbushistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: trackingbushistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrackingbushistoryScalarFieldEnumSchema,TrackingbushistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const trackingbushistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.trackingbushistoryFindFirstOrThrowArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  where: trackingbushistoryWhereInputSchema.optional(),
  orderBy: z.union([ trackingbushistoryOrderByWithRelationInputSchema.array(),trackingbushistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: trackingbushistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrackingbushistoryScalarFieldEnumSchema,TrackingbushistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const trackingbushistoryFindManyArgsSchema: z.ZodType<Prisma.trackingbushistoryFindManyArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  where: trackingbushistoryWhereInputSchema.optional(),
  orderBy: z.union([ trackingbushistoryOrderByWithRelationInputSchema.array(),trackingbushistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: trackingbushistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrackingbushistoryScalarFieldEnumSchema,TrackingbushistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const trackingbushistoryAggregateArgsSchema: z.ZodType<Prisma.trackingbushistoryAggregateArgs> = z.object({
  where: trackingbushistoryWhereInputSchema.optional(),
  orderBy: z.union([ trackingbushistoryOrderByWithRelationInputSchema.array(),trackingbushistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: trackingbushistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const trackingbushistoryGroupByArgsSchema: z.ZodType<Prisma.trackingbushistoryGroupByArgs> = z.object({
  where: trackingbushistoryWhereInputSchema.optional(),
  orderBy: z.union([ trackingbushistoryOrderByWithAggregationInputSchema.array(),trackingbushistoryOrderByWithAggregationInputSchema ]).optional(),
  by: TrackingbushistoryScalarFieldEnumSchema.array(),
  having: trackingbushistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const trackingbushistoryFindUniqueArgsSchema: z.ZodType<Prisma.trackingbushistoryFindUniqueArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  where: trackingbushistoryWhereUniqueInputSchema,
}).strict() ;

export const trackingbushistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.trackingbushistoryFindUniqueOrThrowArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  where: trackingbushistoryWhereUniqueInputSchema,
}).strict() ;

export const tripFindFirstArgsSchema: z.ZodType<Prisma.tripFindFirstArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  where: tripWhereInputSchema.optional(),
  orderBy: z.union([ tripOrderByWithRelationInputSchema.array(),tripOrderByWithRelationInputSchema ]).optional(),
  cursor: tripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tripFindFirstOrThrowArgsSchema: z.ZodType<Prisma.tripFindFirstOrThrowArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  where: tripWhereInputSchema.optional(),
  orderBy: z.union([ tripOrderByWithRelationInputSchema.array(),tripOrderByWithRelationInputSchema ]).optional(),
  cursor: tripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tripFindManyArgsSchema: z.ZodType<Prisma.tripFindManyArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  where: tripWhereInputSchema.optional(),
  orderBy: z.union([ tripOrderByWithRelationInputSchema.array(),tripOrderByWithRelationInputSchema ]).optional(),
  cursor: tripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tripAggregateArgsSchema: z.ZodType<Prisma.tripAggregateArgs> = z.object({
  where: tripWhereInputSchema.optional(),
  orderBy: z.union([ tripOrderByWithRelationInputSchema.array(),tripOrderByWithRelationInputSchema ]).optional(),
  cursor: tripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const tripGroupByArgsSchema: z.ZodType<Prisma.tripGroupByArgs> = z.object({
  where: tripWhereInputSchema.optional(),
  orderBy: z.union([ tripOrderByWithAggregationInputSchema.array(),tripOrderByWithAggregationInputSchema ]).optional(),
  by: TripScalarFieldEnumSchema.array(),
  having: tripScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const tripFindUniqueArgsSchema: z.ZodType<Prisma.tripFindUniqueArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  where: tripWhereUniqueInputSchema,
}).strict() ;

export const tripFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.tripFindUniqueOrThrowArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  where: tripWhereUniqueInputSchema,
}).strict() ;

export const tripstopFindFirstArgsSchema: z.ZodType<Prisma.tripstopFindFirstArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  where: tripstopWhereInputSchema.optional(),
  orderBy: z.union([ tripstopOrderByWithRelationInputSchema.array(),tripstopOrderByWithRelationInputSchema ]).optional(),
  cursor: tripstopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripstopScalarFieldEnumSchema,TripstopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tripstopFindFirstOrThrowArgsSchema: z.ZodType<Prisma.tripstopFindFirstOrThrowArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  where: tripstopWhereInputSchema.optional(),
  orderBy: z.union([ tripstopOrderByWithRelationInputSchema.array(),tripstopOrderByWithRelationInputSchema ]).optional(),
  cursor: tripstopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripstopScalarFieldEnumSchema,TripstopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tripstopFindManyArgsSchema: z.ZodType<Prisma.tripstopFindManyArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  where: tripstopWhereInputSchema.optional(),
  orderBy: z.union([ tripstopOrderByWithRelationInputSchema.array(),tripstopOrderByWithRelationInputSchema ]).optional(),
  cursor: tripstopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripstopScalarFieldEnumSchema,TripstopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tripstopAggregateArgsSchema: z.ZodType<Prisma.tripstopAggregateArgs> = z.object({
  where: tripstopWhereInputSchema.optional(),
  orderBy: z.union([ tripstopOrderByWithRelationInputSchema.array(),tripstopOrderByWithRelationInputSchema ]).optional(),
  cursor: tripstopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const tripstopGroupByArgsSchema: z.ZodType<Prisma.tripstopGroupByArgs> = z.object({
  where: tripstopWhereInputSchema.optional(),
  orderBy: z.union([ tripstopOrderByWithAggregationInputSchema.array(),tripstopOrderByWithAggregationInputSchema ]).optional(),
  by: TripstopScalarFieldEnumSchema.array(),
  having: tripstopScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const tripstopFindUniqueArgsSchema: z.ZodType<Prisma.tripstopFindUniqueArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  where: tripstopWhereUniqueInputSchema,
}).strict() ;

export const tripstopFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.tripstopFindUniqueOrThrowArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  where: tripstopWhereUniqueInputSchema,
}).strict() ;

export const userFindFirstArgsSchema: z.ZodType<Prisma.userFindFirstArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithRelationInputSchema.array(),userOrderByWithRelationInputSchema ]).optional(),
  cursor: userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userFindFirstOrThrowArgsSchema: z.ZodType<Prisma.userFindFirstOrThrowArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithRelationInputSchema.array(),userOrderByWithRelationInputSchema ]).optional(),
  cursor: userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userFindManyArgsSchema: z.ZodType<Prisma.userFindManyArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithRelationInputSchema.array(),userOrderByWithRelationInputSchema ]).optional(),
  cursor: userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userAggregateArgsSchema: z.ZodType<Prisma.userAggregateArgs> = z.object({
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithRelationInputSchema.array(),userOrderByWithRelationInputSchema ]).optional(),
  cursor: userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const userGroupByArgsSchema: z.ZodType<Prisma.userGroupByArgs> = z.object({
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithAggregationInputSchema.array(),userOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: userScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const userFindUniqueArgsSchema: z.ZodType<Prisma.userFindUniqueArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereUniqueInputSchema,
}).strict() ;

export const userFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.userFindUniqueOrThrowArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereUniqueInputSchema,
}).strict() ;

export const userrolesFindFirstArgsSchema: z.ZodType<Prisma.userrolesFindFirstArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  where: userrolesWhereInputSchema.optional(),
  orderBy: z.union([ userrolesOrderByWithRelationInputSchema.array(),userrolesOrderByWithRelationInputSchema ]).optional(),
  cursor: userrolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserrolesScalarFieldEnumSchema,UserrolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userrolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.userrolesFindFirstOrThrowArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  where: userrolesWhereInputSchema.optional(),
  orderBy: z.union([ userrolesOrderByWithRelationInputSchema.array(),userrolesOrderByWithRelationInputSchema ]).optional(),
  cursor: userrolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserrolesScalarFieldEnumSchema,UserrolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userrolesFindManyArgsSchema: z.ZodType<Prisma.userrolesFindManyArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  where: userrolesWhereInputSchema.optional(),
  orderBy: z.union([ userrolesOrderByWithRelationInputSchema.array(),userrolesOrderByWithRelationInputSchema ]).optional(),
  cursor: userrolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserrolesScalarFieldEnumSchema,UserrolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userrolesAggregateArgsSchema: z.ZodType<Prisma.userrolesAggregateArgs> = z.object({
  where: userrolesWhereInputSchema.optional(),
  orderBy: z.union([ userrolesOrderByWithRelationInputSchema.array(),userrolesOrderByWithRelationInputSchema ]).optional(),
  cursor: userrolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const userrolesGroupByArgsSchema: z.ZodType<Prisma.userrolesGroupByArgs> = z.object({
  where: userrolesWhereInputSchema.optional(),
  orderBy: z.union([ userrolesOrderByWithAggregationInputSchema.array(),userrolesOrderByWithAggregationInputSchema ]).optional(),
  by: UserrolesScalarFieldEnumSchema.array(),
  having: userrolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const userrolesFindUniqueArgsSchema: z.ZodType<Prisma.userrolesFindUniqueArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  where: userrolesWhereUniqueInputSchema,
}).strict() ;

export const userrolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.userrolesFindUniqueOrThrowArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  where: userrolesWhereUniqueInputSchema,
}).strict() ;

export const busCreateArgsSchema: z.ZodType<Prisma.busCreateArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  data: z.union([ busCreateInputSchema,busUncheckedCreateInputSchema ]),
}).strict() ;

export const busUpsertArgsSchema: z.ZodType<Prisma.busUpsertArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  where: busWhereUniqueInputSchema,
  create: z.union([ busCreateInputSchema,busUncheckedCreateInputSchema ]),
  update: z.union([ busUpdateInputSchema,busUncheckedUpdateInputSchema ]),
}).strict() ;

export const busCreateManyArgsSchema: z.ZodType<Prisma.busCreateManyArgs> = z.object({
  data: z.union([ busCreateManyInputSchema,busCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const busDeleteArgsSchema: z.ZodType<Prisma.busDeleteArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  where: busWhereUniqueInputSchema,
}).strict() ;

export const busUpdateArgsSchema: z.ZodType<Prisma.busUpdateArgs> = z.object({
  select: busSelectSchema.optional(),
  include: busIncludeSchema.optional(),
  data: z.union([ busUpdateInputSchema,busUncheckedUpdateInputSchema ]),
  where: busWhereUniqueInputSchema,
}).strict() ;

export const busUpdateManyArgsSchema: z.ZodType<Prisma.busUpdateManyArgs> = z.object({
  data: z.union([ busUpdateManyMutationInputSchema,busUncheckedUpdateManyInputSchema ]),
  where: busWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const busDeleteManyArgsSchema: z.ZodType<Prisma.busDeleteManyArgs> = z.object({
  where: busWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const permissionCreateArgsSchema: z.ZodType<Prisma.permissionCreateArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  data: z.union([ permissionCreateInputSchema,permissionUncheckedCreateInputSchema ]),
}).strict() ;

export const permissionUpsertArgsSchema: z.ZodType<Prisma.permissionUpsertArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  where: permissionWhereUniqueInputSchema,
  create: z.union([ permissionCreateInputSchema,permissionUncheckedCreateInputSchema ]),
  update: z.union([ permissionUpdateInputSchema,permissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const permissionCreateManyArgsSchema: z.ZodType<Prisma.permissionCreateManyArgs> = z.object({
  data: z.union([ permissionCreateManyInputSchema,permissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const permissionDeleteArgsSchema: z.ZodType<Prisma.permissionDeleteArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  where: permissionWhereUniqueInputSchema,
}).strict() ;

export const permissionUpdateArgsSchema: z.ZodType<Prisma.permissionUpdateArgs> = z.object({
  select: permissionSelectSchema.optional(),
  include: permissionIncludeSchema.optional(),
  data: z.union([ permissionUpdateInputSchema,permissionUncheckedUpdateInputSchema ]),
  where: permissionWhereUniqueInputSchema,
}).strict() ;

export const permissionUpdateManyArgsSchema: z.ZodType<Prisma.permissionUpdateManyArgs> = z.object({
  data: z.union([ permissionUpdateManyMutationInputSchema,permissionUncheckedUpdateManyInputSchema ]),
  where: permissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const permissionDeleteManyArgsSchema: z.ZodType<Prisma.permissionDeleteManyArgs> = z.object({
  where: permissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const reportCreateArgsSchema: z.ZodType<Prisma.reportCreateArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  data: z.union([ reportCreateInputSchema,reportUncheckedCreateInputSchema ]),
}).strict() ;

export const reportUpsertArgsSchema: z.ZodType<Prisma.reportUpsertArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  where: reportWhereUniqueInputSchema,
  create: z.union([ reportCreateInputSchema,reportUncheckedCreateInputSchema ]),
  update: z.union([ reportUpdateInputSchema,reportUncheckedUpdateInputSchema ]),
}).strict() ;

export const reportCreateManyArgsSchema: z.ZodType<Prisma.reportCreateManyArgs> = z.object({
  data: z.union([ reportCreateManyInputSchema,reportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const reportDeleteArgsSchema: z.ZodType<Prisma.reportDeleteArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  where: reportWhereUniqueInputSchema,
}).strict() ;

export const reportUpdateArgsSchema: z.ZodType<Prisma.reportUpdateArgs> = z.object({
  select: reportSelectSchema.optional(),
  include: reportIncludeSchema.optional(),
  data: z.union([ reportUpdateInputSchema,reportUncheckedUpdateInputSchema ]),
  where: reportWhereUniqueInputSchema,
}).strict() ;

export const reportUpdateManyArgsSchema: z.ZodType<Prisma.reportUpdateManyArgs> = z.object({
  data: z.union([ reportUpdateManyMutationInputSchema,reportUncheckedUpdateManyInputSchema ]),
  where: reportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const reportDeleteManyArgsSchema: z.ZodType<Prisma.reportDeleteManyArgs> = z.object({
  where: reportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const rolepermissionsCreateArgsSchema: z.ZodType<Prisma.rolepermissionsCreateArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  data: z.union([ rolepermissionsCreateInputSchema,rolepermissionsUncheckedCreateInputSchema ]),
}).strict() ;

export const rolepermissionsUpsertArgsSchema: z.ZodType<Prisma.rolepermissionsUpsertArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  where: rolepermissionsWhereUniqueInputSchema,
  create: z.union([ rolepermissionsCreateInputSchema,rolepermissionsUncheckedCreateInputSchema ]),
  update: z.union([ rolepermissionsUpdateInputSchema,rolepermissionsUncheckedUpdateInputSchema ]),
}).strict() ;

export const rolepermissionsCreateManyArgsSchema: z.ZodType<Prisma.rolepermissionsCreateManyArgs> = z.object({
  data: z.union([ rolepermissionsCreateManyInputSchema,rolepermissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const rolepermissionsDeleteArgsSchema: z.ZodType<Prisma.rolepermissionsDeleteArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  where: rolepermissionsWhereUniqueInputSchema,
}).strict() ;

export const rolepermissionsUpdateArgsSchema: z.ZodType<Prisma.rolepermissionsUpdateArgs> = z.object({
  select: rolepermissionsSelectSchema.optional(),
  include: rolepermissionsIncludeSchema.optional(),
  data: z.union([ rolepermissionsUpdateInputSchema,rolepermissionsUncheckedUpdateInputSchema ]),
  where: rolepermissionsWhereUniqueInputSchema,
}).strict() ;

export const rolepermissionsUpdateManyArgsSchema: z.ZodType<Prisma.rolepermissionsUpdateManyArgs> = z.object({
  data: z.union([ rolepermissionsUpdateManyMutationInputSchema,rolepermissionsUncheckedUpdateManyInputSchema ]),
  where: rolepermissionsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const rolepermissionsDeleteManyArgsSchema: z.ZodType<Prisma.rolepermissionsDeleteManyArgs> = z.object({
  where: rolepermissionsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const rolesCreateArgsSchema: z.ZodType<Prisma.rolesCreateArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  data: z.union([ rolesCreateInputSchema,rolesUncheckedCreateInputSchema ]),
}).strict() ;

export const rolesUpsertArgsSchema: z.ZodType<Prisma.rolesUpsertArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereUniqueInputSchema,
  create: z.union([ rolesCreateInputSchema,rolesUncheckedCreateInputSchema ]),
  update: z.union([ rolesUpdateInputSchema,rolesUncheckedUpdateInputSchema ]),
}).strict() ;

export const rolesCreateManyArgsSchema: z.ZodType<Prisma.rolesCreateManyArgs> = z.object({
  data: z.union([ rolesCreateManyInputSchema,rolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const rolesDeleteArgsSchema: z.ZodType<Prisma.rolesDeleteArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereUniqueInputSchema,
}).strict() ;

export const rolesUpdateArgsSchema: z.ZodType<Prisma.rolesUpdateArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  data: z.union([ rolesUpdateInputSchema,rolesUncheckedUpdateInputSchema ]),
  where: rolesWhereUniqueInputSchema,
}).strict() ;

export const rolesUpdateManyArgsSchema: z.ZodType<Prisma.rolesUpdateManyArgs> = z.object({
  data: z.union([ rolesUpdateManyMutationInputSchema,rolesUncheckedUpdateManyInputSchema ]),
  where: rolesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const rolesDeleteManyArgsSchema: z.ZodType<Prisma.rolesDeleteManyArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const routeCreateArgsSchema: z.ZodType<Prisma.routeCreateArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  data: z.union([ routeCreateInputSchema,routeUncheckedCreateInputSchema ]),
}).strict() ;

export const routeUpsertArgsSchema: z.ZodType<Prisma.routeUpsertArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  where: routeWhereUniqueInputSchema,
  create: z.union([ routeCreateInputSchema,routeUncheckedCreateInputSchema ]),
  update: z.union([ routeUpdateInputSchema,routeUncheckedUpdateInputSchema ]),
}).strict() ;

export const routeCreateManyArgsSchema: z.ZodType<Prisma.routeCreateManyArgs> = z.object({
  data: z.union([ routeCreateManyInputSchema,routeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const routeDeleteArgsSchema: z.ZodType<Prisma.routeDeleteArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  where: routeWhereUniqueInputSchema,
}).strict() ;

export const routeUpdateArgsSchema: z.ZodType<Prisma.routeUpdateArgs> = z.object({
  select: routeSelectSchema.optional(),
  include: routeIncludeSchema.optional(),
  data: z.union([ routeUpdateInputSchema,routeUncheckedUpdateInputSchema ]),
  where: routeWhereUniqueInputSchema,
}).strict() ;

export const routeUpdateManyArgsSchema: z.ZodType<Prisma.routeUpdateManyArgs> = z.object({
  data: z.union([ routeUpdateManyMutationInputSchema,routeUncheckedUpdateManyInputSchema ]),
  where: routeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const routeDeleteManyArgsSchema: z.ZodType<Prisma.routeDeleteManyArgs> = z.object({
  where: routeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const routestoppointCreateArgsSchema: z.ZodType<Prisma.routestoppointCreateArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  data: z.union([ routestoppointCreateInputSchema,routestoppointUncheckedCreateInputSchema ]),
}).strict() ;

export const routestoppointUpsertArgsSchema: z.ZodType<Prisma.routestoppointUpsertArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  where: routestoppointWhereUniqueInputSchema,
  create: z.union([ routestoppointCreateInputSchema,routestoppointUncheckedCreateInputSchema ]),
  update: z.union([ routestoppointUpdateInputSchema,routestoppointUncheckedUpdateInputSchema ]),
}).strict() ;

export const routestoppointCreateManyArgsSchema: z.ZodType<Prisma.routestoppointCreateManyArgs> = z.object({
  data: z.union([ routestoppointCreateManyInputSchema,routestoppointCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const routestoppointDeleteArgsSchema: z.ZodType<Prisma.routestoppointDeleteArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  where: routestoppointWhereUniqueInputSchema,
}).strict() ;

export const routestoppointUpdateArgsSchema: z.ZodType<Prisma.routestoppointUpdateArgs> = z.object({
  select: routestoppointSelectSchema.optional(),
  include: routestoppointIncludeSchema.optional(),
  data: z.union([ routestoppointUpdateInputSchema,routestoppointUncheckedUpdateInputSchema ]),
  where: routestoppointWhereUniqueInputSchema,
}).strict() ;

export const routestoppointUpdateManyArgsSchema: z.ZodType<Prisma.routestoppointUpdateManyArgs> = z.object({
  data: z.union([ routestoppointUpdateManyMutationInputSchema,routestoppointUncheckedUpdateManyInputSchema ]),
  where: routestoppointWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const routestoppointDeleteManyArgsSchema: z.ZodType<Prisma.routestoppointDeleteManyArgs> = z.object({
  where: routestoppointWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const scheduleCreateArgsSchema: z.ZodType<Prisma.scheduleCreateArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  data: z.union([ scheduleCreateInputSchema,scheduleUncheckedCreateInputSchema ]),
}).strict() ;

export const scheduleUpsertArgsSchema: z.ZodType<Prisma.scheduleUpsertArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  where: scheduleWhereUniqueInputSchema,
  create: z.union([ scheduleCreateInputSchema,scheduleUncheckedCreateInputSchema ]),
  update: z.union([ scheduleUpdateInputSchema,scheduleUncheckedUpdateInputSchema ]),
}).strict() ;

export const scheduleCreateManyArgsSchema: z.ZodType<Prisma.scheduleCreateManyArgs> = z.object({
  data: z.union([ scheduleCreateManyInputSchema,scheduleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const scheduleDeleteArgsSchema: z.ZodType<Prisma.scheduleDeleteArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  where: scheduleWhereUniqueInputSchema,
}).strict() ;

export const scheduleUpdateArgsSchema: z.ZodType<Prisma.scheduleUpdateArgs> = z.object({
  select: scheduleSelectSchema.optional(),
  include: scheduleIncludeSchema.optional(),
  data: z.union([ scheduleUpdateInputSchema,scheduleUncheckedUpdateInputSchema ]),
  where: scheduleWhereUniqueInputSchema,
}).strict() ;

export const scheduleUpdateManyArgsSchema: z.ZodType<Prisma.scheduleUpdateManyArgs> = z.object({
  data: z.union([ scheduleUpdateManyMutationInputSchema,scheduleUncheckedUpdateManyInputSchema ]),
  where: scheduleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const scheduleDeleteManyArgsSchema: z.ZodType<Prisma.scheduleDeleteManyArgs> = z.object({
  where: scheduleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const stoppointCreateArgsSchema: z.ZodType<Prisma.stoppointCreateArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  data: z.union([ stoppointCreateInputSchema,stoppointUncheckedCreateInputSchema ]),
}).strict() ;

export const stoppointUpsertArgsSchema: z.ZodType<Prisma.stoppointUpsertArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  where: stoppointWhereUniqueInputSchema,
  create: z.union([ stoppointCreateInputSchema,stoppointUncheckedCreateInputSchema ]),
  update: z.union([ stoppointUpdateInputSchema,stoppointUncheckedUpdateInputSchema ]),
}).strict() ;

export const stoppointCreateManyArgsSchema: z.ZodType<Prisma.stoppointCreateManyArgs> = z.object({
  data: z.union([ stoppointCreateManyInputSchema,stoppointCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const stoppointDeleteArgsSchema: z.ZodType<Prisma.stoppointDeleteArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  where: stoppointWhereUniqueInputSchema,
}).strict() ;

export const stoppointUpdateArgsSchema: z.ZodType<Prisma.stoppointUpdateArgs> = z.object({
  select: stoppointSelectSchema.optional(),
  include: stoppointIncludeSchema.optional(),
  data: z.union([ stoppointUpdateInputSchema,stoppointUncheckedUpdateInputSchema ]),
  where: stoppointWhereUniqueInputSchema,
}).strict() ;

export const stoppointUpdateManyArgsSchema: z.ZodType<Prisma.stoppointUpdateManyArgs> = z.object({
  data: z.union([ stoppointUpdateManyMutationInputSchema,stoppointUncheckedUpdateManyInputSchema ]),
  where: stoppointWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const stoppointDeleteManyArgsSchema: z.ZodType<Prisma.stoppointDeleteManyArgs> = z.object({
  where: stoppointWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const studentCreateArgsSchema: z.ZodType<Prisma.studentCreateArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  data: z.union([ studentCreateInputSchema,studentUncheckedCreateInputSchema ]),
}).strict() ;

export const studentUpsertArgsSchema: z.ZodType<Prisma.studentUpsertArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  where: studentWhereUniqueInputSchema,
  create: z.union([ studentCreateInputSchema,studentUncheckedCreateInputSchema ]),
  update: z.union([ studentUpdateInputSchema,studentUncheckedUpdateInputSchema ]),
}).strict() ;

export const studentCreateManyArgsSchema: z.ZodType<Prisma.studentCreateManyArgs> = z.object({
  data: z.union([ studentCreateManyInputSchema,studentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const studentDeleteArgsSchema: z.ZodType<Prisma.studentDeleteArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  where: studentWhereUniqueInputSchema,
}).strict() ;

export const studentUpdateArgsSchema: z.ZodType<Prisma.studentUpdateArgs> = z.object({
  select: studentSelectSchema.optional(),
  include: studentIncludeSchema.optional(),
  data: z.union([ studentUpdateInputSchema,studentUncheckedUpdateInputSchema ]),
  where: studentWhereUniqueInputSchema,
}).strict() ;

export const studentUpdateManyArgsSchema: z.ZodType<Prisma.studentUpdateManyArgs> = z.object({
  data: z.union([ studentUpdateManyMutationInputSchema,studentUncheckedUpdateManyInputSchema ]),
  where: studentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const studentDeleteManyArgsSchema: z.ZodType<Prisma.studentDeleteManyArgs> = z.object({
  where: studentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const studentassignmentCreateArgsSchema: z.ZodType<Prisma.studentassignmentCreateArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  data: z.union([ studentassignmentCreateInputSchema,studentassignmentUncheckedCreateInputSchema ]),
}).strict() ;

export const studentassignmentUpsertArgsSchema: z.ZodType<Prisma.studentassignmentUpsertArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  where: studentassignmentWhereUniqueInputSchema,
  create: z.union([ studentassignmentCreateInputSchema,studentassignmentUncheckedCreateInputSchema ]),
  update: z.union([ studentassignmentUpdateInputSchema,studentassignmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const studentassignmentCreateManyArgsSchema: z.ZodType<Prisma.studentassignmentCreateManyArgs> = z.object({
  data: z.union([ studentassignmentCreateManyInputSchema,studentassignmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const studentassignmentDeleteArgsSchema: z.ZodType<Prisma.studentassignmentDeleteArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  where: studentassignmentWhereUniqueInputSchema,
}).strict() ;

export const studentassignmentUpdateArgsSchema: z.ZodType<Prisma.studentassignmentUpdateArgs> = z.object({
  select: studentassignmentSelectSchema.optional(),
  include: studentassignmentIncludeSchema.optional(),
  data: z.union([ studentassignmentUpdateInputSchema,studentassignmentUncheckedUpdateInputSchema ]),
  where: studentassignmentWhereUniqueInputSchema,
}).strict() ;

export const studentassignmentUpdateManyArgsSchema: z.ZodType<Prisma.studentassignmentUpdateManyArgs> = z.object({
  data: z.union([ studentassignmentUpdateManyMutationInputSchema,studentassignmentUncheckedUpdateManyInputSchema ]),
  where: studentassignmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const studentassignmentDeleteManyArgsSchema: z.ZodType<Prisma.studentassignmentDeleteManyArgs> = z.object({
  where: studentassignmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const studentattendanceCreateArgsSchema: z.ZodType<Prisma.studentattendanceCreateArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  data: z.union([ studentattendanceCreateInputSchema,studentattendanceUncheckedCreateInputSchema ]),
}).strict() ;

export const studentattendanceUpsertArgsSchema: z.ZodType<Prisma.studentattendanceUpsertArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  where: studentattendanceWhereUniqueInputSchema,
  create: z.union([ studentattendanceCreateInputSchema,studentattendanceUncheckedCreateInputSchema ]),
  update: z.union([ studentattendanceUpdateInputSchema,studentattendanceUncheckedUpdateInputSchema ]),
}).strict() ;

export const studentattendanceCreateManyArgsSchema: z.ZodType<Prisma.studentattendanceCreateManyArgs> = z.object({
  data: z.union([ studentattendanceCreateManyInputSchema,studentattendanceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const studentattendanceDeleteArgsSchema: z.ZodType<Prisma.studentattendanceDeleteArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  where: studentattendanceWhereUniqueInputSchema,
}).strict() ;

export const studentattendanceUpdateArgsSchema: z.ZodType<Prisma.studentattendanceUpdateArgs> = z.object({
  select: studentattendanceSelectSchema.optional(),
  include: studentattendanceIncludeSchema.optional(),
  data: z.union([ studentattendanceUpdateInputSchema,studentattendanceUncheckedUpdateInputSchema ]),
  where: studentattendanceWhereUniqueInputSchema,
}).strict() ;

export const studentattendanceUpdateManyArgsSchema: z.ZodType<Prisma.studentattendanceUpdateManyArgs> = z.object({
  data: z.union([ studentattendanceUpdateManyMutationInputSchema,studentattendanceUncheckedUpdateManyInputSchema ]),
  where: studentattendanceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const studentattendanceDeleteManyArgsSchema: z.ZodType<Prisma.studentattendanceDeleteManyArgs> = z.object({
  where: studentattendanceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const trackingbushistoryCreateArgsSchema: z.ZodType<Prisma.trackingbushistoryCreateArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  data: z.union([ trackingbushistoryCreateInputSchema,trackingbushistoryUncheckedCreateInputSchema ]),
}).strict() ;

export const trackingbushistoryUpsertArgsSchema: z.ZodType<Prisma.trackingbushistoryUpsertArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  where: trackingbushistoryWhereUniqueInputSchema,
  create: z.union([ trackingbushistoryCreateInputSchema,trackingbushistoryUncheckedCreateInputSchema ]),
  update: z.union([ trackingbushistoryUpdateInputSchema,trackingbushistoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const trackingbushistoryCreateManyArgsSchema: z.ZodType<Prisma.trackingbushistoryCreateManyArgs> = z.object({
  data: z.union([ trackingbushistoryCreateManyInputSchema,trackingbushistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const trackingbushistoryDeleteArgsSchema: z.ZodType<Prisma.trackingbushistoryDeleteArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  where: trackingbushistoryWhereUniqueInputSchema,
}).strict() ;

export const trackingbushistoryUpdateArgsSchema: z.ZodType<Prisma.trackingbushistoryUpdateArgs> = z.object({
  select: trackingbushistorySelectSchema.optional(),
  include: trackingbushistoryIncludeSchema.optional(),
  data: z.union([ trackingbushistoryUpdateInputSchema,trackingbushistoryUncheckedUpdateInputSchema ]),
  where: trackingbushistoryWhereUniqueInputSchema,
}).strict() ;

export const trackingbushistoryUpdateManyArgsSchema: z.ZodType<Prisma.trackingbushistoryUpdateManyArgs> = z.object({
  data: z.union([ trackingbushistoryUpdateManyMutationInputSchema,trackingbushistoryUncheckedUpdateManyInputSchema ]),
  where: trackingbushistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const trackingbushistoryDeleteManyArgsSchema: z.ZodType<Prisma.trackingbushistoryDeleteManyArgs> = z.object({
  where: trackingbushistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const tripCreateArgsSchema: z.ZodType<Prisma.tripCreateArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  data: z.union([ tripCreateInputSchema,tripUncheckedCreateInputSchema ]),
}).strict() ;

export const tripUpsertArgsSchema: z.ZodType<Prisma.tripUpsertArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  where: tripWhereUniqueInputSchema,
  create: z.union([ tripCreateInputSchema,tripUncheckedCreateInputSchema ]),
  update: z.union([ tripUpdateInputSchema,tripUncheckedUpdateInputSchema ]),
}).strict() ;

export const tripCreateManyArgsSchema: z.ZodType<Prisma.tripCreateManyArgs> = z.object({
  data: z.union([ tripCreateManyInputSchema,tripCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const tripDeleteArgsSchema: z.ZodType<Prisma.tripDeleteArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  where: tripWhereUniqueInputSchema,
}).strict() ;

export const tripUpdateArgsSchema: z.ZodType<Prisma.tripUpdateArgs> = z.object({
  select: tripSelectSchema.optional(),
  include: tripIncludeSchema.optional(),
  data: z.union([ tripUpdateInputSchema,tripUncheckedUpdateInputSchema ]),
  where: tripWhereUniqueInputSchema,
}).strict() ;

export const tripUpdateManyArgsSchema: z.ZodType<Prisma.tripUpdateManyArgs> = z.object({
  data: z.union([ tripUpdateManyMutationInputSchema,tripUncheckedUpdateManyInputSchema ]),
  where: tripWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const tripDeleteManyArgsSchema: z.ZodType<Prisma.tripDeleteManyArgs> = z.object({
  where: tripWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const tripstopCreateArgsSchema: z.ZodType<Prisma.tripstopCreateArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  data: z.union([ tripstopCreateInputSchema,tripstopUncheckedCreateInputSchema ]),
}).strict() ;

export const tripstopUpsertArgsSchema: z.ZodType<Prisma.tripstopUpsertArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  where: tripstopWhereUniqueInputSchema,
  create: z.union([ tripstopCreateInputSchema,tripstopUncheckedCreateInputSchema ]),
  update: z.union([ tripstopUpdateInputSchema,tripstopUncheckedUpdateInputSchema ]),
}).strict() ;

export const tripstopCreateManyArgsSchema: z.ZodType<Prisma.tripstopCreateManyArgs> = z.object({
  data: z.union([ tripstopCreateManyInputSchema,tripstopCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const tripstopDeleteArgsSchema: z.ZodType<Prisma.tripstopDeleteArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  where: tripstopWhereUniqueInputSchema,
}).strict() ;

export const tripstopUpdateArgsSchema: z.ZodType<Prisma.tripstopUpdateArgs> = z.object({
  select: tripstopSelectSchema.optional(),
  include: tripstopIncludeSchema.optional(),
  data: z.union([ tripstopUpdateInputSchema,tripstopUncheckedUpdateInputSchema ]),
  where: tripstopWhereUniqueInputSchema,
}).strict() ;

export const tripstopUpdateManyArgsSchema: z.ZodType<Prisma.tripstopUpdateManyArgs> = z.object({
  data: z.union([ tripstopUpdateManyMutationInputSchema,tripstopUncheckedUpdateManyInputSchema ]),
  where: tripstopWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const tripstopDeleteManyArgsSchema: z.ZodType<Prisma.tripstopDeleteManyArgs> = z.object({
  where: tripstopWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const userCreateArgsSchema: z.ZodType<Prisma.userCreateArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  data: z.union([ userCreateInputSchema,userUncheckedCreateInputSchema ]),
}).strict() ;

export const userUpsertArgsSchema: z.ZodType<Prisma.userUpsertArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereUniqueInputSchema,
  create: z.union([ userCreateInputSchema,userUncheckedCreateInputSchema ]),
  update: z.union([ userUpdateInputSchema,userUncheckedUpdateInputSchema ]),
}).strict() ;

export const userCreateManyArgsSchema: z.ZodType<Prisma.userCreateManyArgs> = z.object({
  data: z.union([ userCreateManyInputSchema,userCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const userDeleteArgsSchema: z.ZodType<Prisma.userDeleteArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereUniqueInputSchema,
}).strict() ;

export const userUpdateArgsSchema: z.ZodType<Prisma.userUpdateArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  data: z.union([ userUpdateInputSchema,userUncheckedUpdateInputSchema ]),
  where: userWhereUniqueInputSchema,
}).strict() ;

export const userUpdateManyArgsSchema: z.ZodType<Prisma.userUpdateManyArgs> = z.object({
  data: z.union([ userUpdateManyMutationInputSchema,userUncheckedUpdateManyInputSchema ]),
  where: userWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const userDeleteManyArgsSchema: z.ZodType<Prisma.userDeleteManyArgs> = z.object({
  where: userWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const userrolesCreateArgsSchema: z.ZodType<Prisma.userrolesCreateArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  data: z.union([ userrolesCreateInputSchema,userrolesUncheckedCreateInputSchema ]),
}).strict() ;

export const userrolesUpsertArgsSchema: z.ZodType<Prisma.userrolesUpsertArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  where: userrolesWhereUniqueInputSchema,
  create: z.union([ userrolesCreateInputSchema,userrolesUncheckedCreateInputSchema ]),
  update: z.union([ userrolesUpdateInputSchema,userrolesUncheckedUpdateInputSchema ]),
}).strict() ;

export const userrolesCreateManyArgsSchema: z.ZodType<Prisma.userrolesCreateManyArgs> = z.object({
  data: z.union([ userrolesCreateManyInputSchema,userrolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const userrolesDeleteArgsSchema: z.ZodType<Prisma.userrolesDeleteArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  where: userrolesWhereUniqueInputSchema,
}).strict() ;

export const userrolesUpdateArgsSchema: z.ZodType<Prisma.userrolesUpdateArgs> = z.object({
  select: userrolesSelectSchema.optional(),
  include: userrolesIncludeSchema.optional(),
  data: z.union([ userrolesUpdateInputSchema,userrolesUncheckedUpdateInputSchema ]),
  where: userrolesWhereUniqueInputSchema,
}).strict() ;

export const userrolesUpdateManyArgsSchema: z.ZodType<Prisma.userrolesUpdateManyArgs> = z.object({
  data: z.union([ userrolesUpdateManyMutationInputSchema,userrolesUncheckedUpdateManyInputSchema ]),
  where: userrolesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const userrolesDeleteManyArgsSchema: z.ZodType<Prisma.userrolesDeleteManyArgs> = z.object({
  where: userrolesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;