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

export const RolePermissionsScalarFieldEnumSchema = z.enum(['roleId','permissionId']);

export const RolesScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const RouteScalarFieldEnumSchema = z.enum(['id','name','estimatedDuration','startLocation','endLocation','isActive','meta','createdAt','updatedAt']);

export const RouteStopPointScalarFieldEnumSchema = z.enum(['id','routeId','stopPointId','sequence','direction']);

export const ScheduleScalarFieldEnumSchema = z.enum(['id','routeId','busId','driverId','type','daysOfWeek','startTime','startDate','endDate','status','meta','createdAt','updatedAt']);

export const StopPointScalarFieldEnumSchema = z.enum(['id','name','location','meta','createdAt','updatedAt']);

export const StudentScalarFieldEnumSchema = z.enum(['id','name','meta','userId','createdAt','updatedAt']);

export const StudentAssignmentScalarFieldEnumSchema = z.enum(['id','studentId','routeId','stopId','direction','effectiveFrom','effectiveTo','createdAt','updatedAt']);

export const StudentAttendanceScalarFieldEnumSchema = z.enum(['id','tripId','studentId','pickupTime','dropoffTime','status']);

export const TrackingBusHistoryScalarFieldEnumSchema = z.enum(['id','tripId','timestamp','location']);

export const TripScalarFieldEnumSchema = z.enum(['id','scheduleId','date','actualStartTime','actualEndTime','status','currentStopId','location','createdAt','updatedAt','type']);

export const TripStopScalarFieldEnumSchema = z.enum(['id','tripId','stopId','actualArrival','actualDeparture','status']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','email','passwordHash','createdAt','updatedAt']);

export const UserRolesScalarFieldEnumSchema = z.enum(['userId','roleId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const BusOrderByRelevanceFieldEnumSchema = z.enum(['id','licensePlate']);

export const PermissionOrderByRelevanceFieldEnumSchema = z.enum(['name']);

export const ReportOrderByRelevanceFieldEnumSchema = z.enum(['id','reportType','description','reporterId','tripId']);

export const RolesOrderByRelevanceFieldEnumSchema = z.enum(['name']);

export const RouteOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const RouteStopPointOrderByRelevanceFieldEnumSchema = z.enum(['routeId','stopPointId']);

export const ScheduleOrderByRelevanceFieldEnumSchema = z.enum(['id','routeId','busId','driverId']);

export const StopPointOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const StudentOrderByRelevanceFieldEnumSchema = z.enum(['id','name','userId']);

export const StudentAssignmentOrderByRelevanceFieldEnumSchema = z.enum(['id','studentId','routeId','stopId']);

export const StudentAttendanceOrderByRelevanceFieldEnumSchema = z.enum(['id','tripId','studentId']);

export const TrackingBusHistoryOrderByRelevanceFieldEnumSchema = z.enum(['id','tripId']);

export const TripOrderByRelevanceFieldEnumSchema = z.enum(['id','scheduleId','currentStopId']);

export const TripStopOrderByRelevanceFieldEnumSchema = z.enum(['id','tripId','stopId']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','username','email','passwordHash']);

export const UserRolesOrderByRelevanceFieldEnumSchema = z.enum(['userId']);

export const Bus_statusSchema = z.enum(['ACTIVE','MAINTENANCE']);

export type Bus_statusType = `${z.infer<typeof Bus_statusSchema>}`

export const RouteStopPoint_directionSchema = z.enum(['PICKUP','DROPOFF']);

export type RouteStopPoint_directionType = `${z.infer<typeof RouteStopPoint_directionSchema>}`

export const Schedule_typeSchema = z.enum(['MORNING','AFTERNOON']);

export type Schedule_typeType = `${z.infer<typeof Schedule_typeSchema>}`

export const StudentAssignment_directionSchema = z.enum(['PICKUP','DROPOFF']);

export type StudentAssignment_directionType = `${z.infer<typeof StudentAssignment_directionSchema>}`

export const StudentAttendance_statusSchema = z.enum(['PENDING','PICKED_UP','DROPPED_OFF','MISSED']);

export type StudentAttendance_statusType = `${z.infer<typeof StudentAttendance_statusSchema>}`

export const Trip_statusSchema = z.enum(['PLANNED','ONGOING','COMPLETED','CANCELLED']);

export type Trip_statusType = `${z.infer<typeof Trip_statusSchema>}`

export const TripStop_statusSchema = z.enum(['PENDING','ARRIVED','DONE','SKIPPED']);

export type TripStop_statusType = `${z.infer<typeof TripStop_statusSchema>}`

export const Schedule_statusSchema = z.enum(['ACTIVE','INACTIVE']);

export type Schedule_statusType = `${z.infer<typeof Schedule_statusSchema>}`

export const Trip_typeSchema = z.enum(['DISPATCH','RETURN']);

export type Trip_typeType = `${z.infer<typeof Trip_typeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BUS SCHEMA
/////////////////////////////////////////

export const BusSchema = z.object({
  status: Bus_statusSchema.nullable(),
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  meta: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Bus = z.infer<typeof BusSchema>

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const PermissionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Permission = z.infer<typeof PermissionSchema>

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z.object({
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

export type Report = z.infer<typeof ReportSchema>

/////////////////////////////////////////
// ROLE PERMISSIONS SCHEMA
/////////////////////////////////////////

export const RolePermissionsSchema = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int(),
})

export type RolePermissions = z.infer<typeof RolePermissionsSchema>

/////////////////////////////////////////
// ROLES SCHEMA
/////////////////////////////////////////

export const RolesSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Roles = z.infer<typeof RolesSchema>

/////////////////////////////////////////
// ROUTE SCHEMA
/////////////////////////////////////////

export const RouteSchema = z.object({
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

export type Route = z.infer<typeof RouteSchema>

/////////////////////////////////////////
// ROUTE STOP POINT SCHEMA
/////////////////////////////////////////

export const RouteStopPointSchema = z.object({
  direction: RouteStopPoint_directionSchema,
  id: z.number().int(),
  routeId: z.string(),
  stopPointId: z.string(),
  sequence: z.number().int(),
})

export type RouteStopPoint = z.infer<typeof RouteStopPointSchema>

/////////////////////////////////////////
// SCHEDULE SCHEMA
/////////////////////////////////////////

export const ScheduleSchema = z.object({
  type: Schedule_typeSchema,
  status: Schedule_statusSchema.nullable(),
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

export type Schedule = z.infer<typeof ScheduleSchema>

/////////////////////////////////////////
// STOP POINT SCHEMA
/////////////////////////////////////////

export const StopPointSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: JsonValueSchema,
  meta: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type StopPoint = z.infer<typeof StopPointSchema>

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
  meta: JsonValueSchema.nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Student = z.infer<typeof StudentSchema>

/////////////////////////////////////////
// STUDENT ASSIGNMENT SCHEMA
/////////////////////////////////////////

export const StudentAssignmentSchema = z.object({
  direction: StudentAssignment_directionSchema,
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type StudentAssignment = z.infer<typeof StudentAssignmentSchema>

/////////////////////////////////////////
// STUDENT ATTENDANCE SCHEMA
/////////////////////////////////////////

export const StudentAttendanceSchema = z.object({
  status: StudentAttendance_statusSchema.nullable(),
  id: z.string(),
  tripId: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().nullable(),
  dropoffTime: z.coerce.date().nullable(),
})

export type StudentAttendance = z.infer<typeof StudentAttendanceSchema>

/////////////////////////////////////////
// TRACKING BUS HISTORY SCHEMA
/////////////////////////////////////////

export const TrackingBusHistorySchema = z.object({
  id: z.string(),
  tripId: z.string(),
  timestamp: z.coerce.date(),
  location: JsonValueSchema,
})

export type TrackingBusHistory = z.infer<typeof TrackingBusHistorySchema>

/////////////////////////////////////////
// TRIP SCHEMA
/////////////////////////////////////////

export const TripSchema = z.object({
  status: Trip_statusSchema.nullable(),
  type: Trip_typeSchema,
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

export type Trip = z.infer<typeof TripSchema>

/////////////////////////////////////////
// TRIP STOP SCHEMA
/////////////////////////////////////////

export const TripStopSchema = z.object({
  status: TripStop_statusSchema.nullable(),
  id: z.string(),
  tripId: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().nullable(),
  actualDeparture: z.coerce.date().nullable(),
})

export type TripStop = z.infer<typeof TripStopSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER ROLES SCHEMA
/////////////////////////////////////////

export const UserRolesSchema = z.object({
  userId: z.string(),
  roleId: z.number().int(),
})

export type UserRoles = z.infer<typeof UserRolesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BUS
//------------------------------------------------------

export const BusIncludeSchema: z.ZodType<Prisma.BusInclude> = z.object({
  Schedule: z.union([z.boolean(),z.lazy(() => ScheduleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BusCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BusArgsSchema: z.ZodType<Prisma.BusDefaultArgs> = z.object({
  select: z.lazy(() => BusSelectSchema).optional(),
  include: z.lazy(() => BusIncludeSchema).optional(),
}).strict();

export const BusCountOutputTypeArgsSchema: z.ZodType<Prisma.BusCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BusCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BusCountOutputTypeSelectSchema: z.ZodType<Prisma.BusCountOutputTypeSelect> = z.object({
  Schedule: z.boolean().optional(),
}).strict();

export const BusSelectSchema: z.ZodType<Prisma.BusSelect> = z.object({
  id: z.boolean().optional(),
  licensePlate: z.boolean().optional(),
  capacity: z.boolean().optional(),
  status: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Schedule: z.union([z.boolean(),z.lazy(() => ScheduleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BusCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMISSION
//------------------------------------------------------

export const PermissionIncludeSchema: z.ZodType<Prisma.PermissionInclude> = z.object({
  RolePermissions: z.union([z.boolean(),z.lazy(() => RolePermissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PermissionArgsSchema: z.ZodType<Prisma.PermissionDefaultArgs> = z.object({
  select: z.lazy(() => PermissionSelectSchema).optional(),
  include: z.lazy(() => PermissionIncludeSchema).optional(),
}).strict();

export const PermissionCountOutputTypeArgsSchema: z.ZodType<Prisma.PermissionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PermissionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PermissionCountOutputTypeSelectSchema: z.ZodType<Prisma.PermissionCountOutputTypeSelect> = z.object({
  RolePermissions: z.boolean().optional(),
}).strict();

export const PermissionSelectSchema: z.ZodType<Prisma.PermissionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  RolePermissions: z.union([z.boolean(),z.lazy(() => RolePermissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const ReportIncludeSchema: z.ZodType<Prisma.ReportInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

export const ReportArgsSchema: z.ZodType<Prisma.ReportDefaultArgs> = z.object({
  select: z.lazy(() => ReportSelectSchema).optional(),
  include: z.lazy(() => ReportIncludeSchema).optional(),
}).strict();

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z.object({
  id: z.boolean().optional(),
  reportType: z.boolean().optional(),
  description: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  reporterId: z.boolean().optional(),
  tripId: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

// ROLE PERMISSIONS
//------------------------------------------------------

export const RolePermissionsIncludeSchema: z.ZodType<Prisma.RolePermissionsInclude> = z.object({
  Permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
  Roles: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
}).strict()

export const RolePermissionsArgsSchema: z.ZodType<Prisma.RolePermissionsDefaultArgs> = z.object({
  select: z.lazy(() => RolePermissionsSelectSchema).optional(),
  include: z.lazy(() => RolePermissionsIncludeSchema).optional(),
}).strict();

export const RolePermissionsSelectSchema: z.ZodType<Prisma.RolePermissionsSelect> = z.object({
  roleId: z.boolean().optional(),
  permissionId: z.boolean().optional(),
  Permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
  Roles: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
}).strict()

// ROLES
//------------------------------------------------------

export const RolesIncludeSchema: z.ZodType<Prisma.RolesInclude> = z.object({
  RolePermissions: z.union([z.boolean(),z.lazy(() => RolePermissionsFindManyArgsSchema)]).optional(),
  UserRoles: z.union([z.boolean(),z.lazy(() => UserRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RolesArgsSchema: z.ZodType<Prisma.RolesDefaultArgs> = z.object({
  select: z.lazy(() => RolesSelectSchema).optional(),
  include: z.lazy(() => RolesIncludeSchema).optional(),
}).strict();

export const RolesCountOutputTypeArgsSchema: z.ZodType<Prisma.RolesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RolesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RolesCountOutputTypeSelectSchema: z.ZodType<Prisma.RolesCountOutputTypeSelect> = z.object({
  RolePermissions: z.boolean().optional(),
  UserRoles: z.boolean().optional(),
}).strict();

export const RolesSelectSchema: z.ZodType<Prisma.RolesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  RolePermissions: z.union([z.boolean(),z.lazy(() => RolePermissionsFindManyArgsSchema)]).optional(),
  UserRoles: z.union([z.boolean(),z.lazy(() => UserRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROUTE
//------------------------------------------------------

export const RouteIncludeSchema: z.ZodType<Prisma.RouteInclude> = z.object({
  RouteStopPoint: z.union([z.boolean(),z.lazy(() => RouteStopPointFindManyArgsSchema)]).optional(),
  Schedule: z.union([z.boolean(),z.lazy(() => ScheduleFindManyArgsSchema)]).optional(),
  StudentAssignment: z.union([z.boolean(),z.lazy(() => StudentAssignmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RouteCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RouteArgsSchema: z.ZodType<Prisma.RouteDefaultArgs> = z.object({
  select: z.lazy(() => RouteSelectSchema).optional(),
  include: z.lazy(() => RouteIncludeSchema).optional(),
}).strict();

export const RouteCountOutputTypeArgsSchema: z.ZodType<Prisma.RouteCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RouteCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RouteCountOutputTypeSelectSchema: z.ZodType<Prisma.RouteCountOutputTypeSelect> = z.object({
  RouteStopPoint: z.boolean().optional(),
  Schedule: z.boolean().optional(),
  StudentAssignment: z.boolean().optional(),
}).strict();

export const RouteSelectSchema: z.ZodType<Prisma.RouteSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  estimatedDuration: z.boolean().optional(),
  startLocation: z.boolean().optional(),
  endLocation: z.boolean().optional(),
  isActive: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  RouteStopPoint: z.union([z.boolean(),z.lazy(() => RouteStopPointFindManyArgsSchema)]).optional(),
  Schedule: z.union([z.boolean(),z.lazy(() => ScheduleFindManyArgsSchema)]).optional(),
  StudentAssignment: z.union([z.boolean(),z.lazy(() => StudentAssignmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RouteCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROUTE STOP POINT
//------------------------------------------------------

export const RouteStopPointIncludeSchema: z.ZodType<Prisma.RouteStopPointInclude> = z.object({
  Route: z.union([z.boolean(),z.lazy(() => RouteArgsSchema)]).optional(),
  StopPoint: z.union([z.boolean(),z.lazy(() => StopPointArgsSchema)]).optional(),
}).strict()

export const RouteStopPointArgsSchema: z.ZodType<Prisma.RouteStopPointDefaultArgs> = z.object({
  select: z.lazy(() => RouteStopPointSelectSchema).optional(),
  include: z.lazy(() => RouteStopPointIncludeSchema).optional(),
}).strict();

export const RouteStopPointSelectSchema: z.ZodType<Prisma.RouteStopPointSelect> = z.object({
  id: z.boolean().optional(),
  routeId: z.boolean().optional(),
  stopPointId: z.boolean().optional(),
  sequence: z.boolean().optional(),
  direction: z.boolean().optional(),
  Route: z.union([z.boolean(),z.lazy(() => RouteArgsSchema)]).optional(),
  StopPoint: z.union([z.boolean(),z.lazy(() => StopPointArgsSchema)]).optional(),
}).strict()

// SCHEDULE
//------------------------------------------------------

export const ScheduleIncludeSchema: z.ZodType<Prisma.ScheduleInclude> = z.object({
  Bus: z.union([z.boolean(),z.lazy(() => BusArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Route: z.union([z.boolean(),z.lazy(() => RouteArgsSchema)]).optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ScheduleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ScheduleArgsSchema: z.ZodType<Prisma.ScheduleDefaultArgs> = z.object({
  select: z.lazy(() => ScheduleSelectSchema).optional(),
  include: z.lazy(() => ScheduleIncludeSchema).optional(),
}).strict();

export const ScheduleCountOutputTypeArgsSchema: z.ZodType<Prisma.ScheduleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ScheduleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ScheduleCountOutputTypeSelectSchema: z.ZodType<Prisma.ScheduleCountOutputTypeSelect> = z.object({
  Trip: z.boolean().optional(),
}).strict();

export const ScheduleSelectSchema: z.ZodType<Prisma.ScheduleSelect> = z.object({
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
  Bus: z.union([z.boolean(),z.lazy(() => BusArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Route: z.union([z.boolean(),z.lazy(() => RouteArgsSchema)]).optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ScheduleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STOP POINT
//------------------------------------------------------

export const StopPointIncludeSchema: z.ZodType<Prisma.StopPointInclude> = z.object({
  RouteStopPoint: z.union([z.boolean(),z.lazy(() => RouteStopPointFindManyArgsSchema)]).optional(),
  StudentAssignment: z.union([z.boolean(),z.lazy(() => StudentAssignmentFindManyArgsSchema)]).optional(),
  TripStop: z.union([z.boolean(),z.lazy(() => TripStopFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StopPointCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StopPointArgsSchema: z.ZodType<Prisma.StopPointDefaultArgs> = z.object({
  select: z.lazy(() => StopPointSelectSchema).optional(),
  include: z.lazy(() => StopPointIncludeSchema).optional(),
}).strict();

export const StopPointCountOutputTypeArgsSchema: z.ZodType<Prisma.StopPointCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StopPointCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StopPointCountOutputTypeSelectSchema: z.ZodType<Prisma.StopPointCountOutputTypeSelect> = z.object({
  RouteStopPoint: z.boolean().optional(),
  StudentAssignment: z.boolean().optional(),
  TripStop: z.boolean().optional(),
}).strict();

export const StopPointSelectSchema: z.ZodType<Prisma.StopPointSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  location: z.boolean().optional(),
  meta: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  RouteStopPoint: z.union([z.boolean(),z.lazy(() => RouteStopPointFindManyArgsSchema)]).optional(),
  StudentAssignment: z.union([z.boolean(),z.lazy(() => StudentAssignmentFindManyArgsSchema)]).optional(),
  TripStop: z.union([z.boolean(),z.lazy(() => TripStopFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StopPointCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STUDENT
//------------------------------------------------------

export const StudentIncludeSchema: z.ZodType<Prisma.StudentInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  StudentAssignment: z.union([z.boolean(),z.lazy(() => StudentAssignmentFindManyArgsSchema)]).optional(),
  StudentAttendance: z.union([z.boolean(),z.lazy(() => StudentAttendanceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StudentArgsSchema: z.ZodType<Prisma.StudentDefaultArgs> = z.object({
  select: z.lazy(() => StudentSelectSchema).optional(),
  include: z.lazy(() => StudentIncludeSchema).optional(),
}).strict();

export const StudentCountOutputTypeArgsSchema: z.ZodType<Prisma.StudentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StudentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StudentCountOutputTypeSelectSchema: z.ZodType<Prisma.StudentCountOutputTypeSelect> = z.object({
  StudentAssignment: z.boolean().optional(),
  StudentAttendance: z.boolean().optional(),
}).strict();

export const StudentSelectSchema: z.ZodType<Prisma.StudentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  meta: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  StudentAssignment: z.union([z.boolean(),z.lazy(() => StudentAssignmentFindManyArgsSchema)]).optional(),
  StudentAttendance: z.union([z.boolean(),z.lazy(() => StudentAttendanceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STUDENT ASSIGNMENT
//------------------------------------------------------

export const StudentAssignmentIncludeSchema: z.ZodType<Prisma.StudentAssignmentInclude> = z.object({
  Route: z.union([z.boolean(),z.lazy(() => RouteArgsSchema)]).optional(),
  StopPoint: z.union([z.boolean(),z.lazy(() => StopPointArgsSchema)]).optional(),
  Student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
}).strict()

export const StudentAssignmentArgsSchema: z.ZodType<Prisma.StudentAssignmentDefaultArgs> = z.object({
  select: z.lazy(() => StudentAssignmentSelectSchema).optional(),
  include: z.lazy(() => StudentAssignmentIncludeSchema).optional(),
}).strict();

export const StudentAssignmentSelectSchema: z.ZodType<Prisma.StudentAssignmentSelect> = z.object({
  id: z.boolean().optional(),
  studentId: z.boolean().optional(),
  routeId: z.boolean().optional(),
  stopId: z.boolean().optional(),
  direction: z.boolean().optional(),
  effectiveFrom: z.boolean().optional(),
  effectiveTo: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Route: z.union([z.boolean(),z.lazy(() => RouteArgsSchema)]).optional(),
  StopPoint: z.union([z.boolean(),z.lazy(() => StopPointArgsSchema)]).optional(),
  Student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
}).strict()

// STUDENT ATTENDANCE
//------------------------------------------------------

export const StudentAttendanceIncludeSchema: z.ZodType<Prisma.StudentAttendanceInclude> = z.object({
  Student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

export const StudentAttendanceArgsSchema: z.ZodType<Prisma.StudentAttendanceDefaultArgs> = z.object({
  select: z.lazy(() => StudentAttendanceSelectSchema).optional(),
  include: z.lazy(() => StudentAttendanceIncludeSchema).optional(),
}).strict();

export const StudentAttendanceSelectSchema: z.ZodType<Prisma.StudentAttendanceSelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  studentId: z.boolean().optional(),
  pickupTime: z.boolean().optional(),
  dropoffTime: z.boolean().optional(),
  status: z.boolean().optional(),
  Student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

// TRACKING BUS HISTORY
//------------------------------------------------------

export const TrackingBusHistoryIncludeSchema: z.ZodType<Prisma.TrackingBusHistoryInclude> = z.object({
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

export const TrackingBusHistoryArgsSchema: z.ZodType<Prisma.TrackingBusHistoryDefaultArgs> = z.object({
  select: z.lazy(() => TrackingBusHistorySelectSchema).optional(),
  include: z.lazy(() => TrackingBusHistoryIncludeSchema).optional(),
}).strict();

export const TrackingBusHistorySelectSchema: z.ZodType<Prisma.TrackingBusHistorySelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  location: z.boolean().optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

// TRIP
//------------------------------------------------------

export const TripIncludeSchema: z.ZodType<Prisma.TripInclude> = z.object({
  Report: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  StudentAttendance: z.union([z.boolean(),z.lazy(() => StudentAttendanceFindManyArgsSchema)]).optional(),
  TrackingBusHistory: z.union([z.boolean(),z.lazy(() => TrackingBusHistoryFindManyArgsSchema)]).optional(),
  Schedule: z.union([z.boolean(),z.lazy(() => ScheduleArgsSchema)]).optional(),
  TripStop: z.union([z.boolean(),z.lazy(() => TripStopFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TripArgsSchema: z.ZodType<Prisma.TripDefaultArgs> = z.object({
  select: z.lazy(() => TripSelectSchema).optional(),
  include: z.lazy(() => TripIncludeSchema).optional(),
}).strict();

export const TripCountOutputTypeArgsSchema: z.ZodType<Prisma.TripCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TripCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TripCountOutputTypeSelectSchema: z.ZodType<Prisma.TripCountOutputTypeSelect> = z.object({
  Report: z.boolean().optional(),
  StudentAttendance: z.boolean().optional(),
  TrackingBusHistory: z.boolean().optional(),
  TripStop: z.boolean().optional(),
}).strict();

export const TripSelectSchema: z.ZodType<Prisma.TripSelect> = z.object({
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
  Report: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  StudentAttendance: z.union([z.boolean(),z.lazy(() => StudentAttendanceFindManyArgsSchema)]).optional(),
  TrackingBusHistory: z.union([z.boolean(),z.lazy(() => TrackingBusHistoryFindManyArgsSchema)]).optional(),
  Schedule: z.union([z.boolean(),z.lazy(() => ScheduleArgsSchema)]).optional(),
  TripStop: z.union([z.boolean(),z.lazy(() => TripStopFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRIP STOP
//------------------------------------------------------

export const TripStopIncludeSchema: z.ZodType<Prisma.TripStopInclude> = z.object({
  StopPoint: z.union([z.boolean(),z.lazy(() => StopPointArgsSchema)]).optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

export const TripStopArgsSchema: z.ZodType<Prisma.TripStopDefaultArgs> = z.object({
  select: z.lazy(() => TripStopSelectSchema).optional(),
  include: z.lazy(() => TripStopIncludeSchema).optional(),
}).strict();

export const TripStopSelectSchema: z.ZodType<Prisma.TripStopSelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  stopId: z.boolean().optional(),
  actualArrival: z.boolean().optional(),
  actualDeparture: z.boolean().optional(),
  status: z.boolean().optional(),
  StopPoint: z.union([z.boolean(),z.lazy(() => StopPointArgsSchema)]).optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Report: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  Schedule: z.union([z.boolean(),z.lazy(() => ScheduleFindManyArgsSchema)]).optional(),
  Student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  UserRoles: z.union([z.boolean(),z.lazy(() => UserRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Report: z.boolean().optional(),
  Schedule: z.boolean().optional(),
  UserRoles: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  email: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Report: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  Schedule: z.union([z.boolean(),z.lazy(() => ScheduleFindManyArgsSchema)]).optional(),
  Student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  UserRoles: z.union([z.boolean(),z.lazy(() => UserRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER ROLES
//------------------------------------------------------

export const UserRolesIncludeSchema: z.ZodType<Prisma.UserRolesInclude> = z.object({
  Roles: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserRolesArgsSchema: z.ZodType<Prisma.UserRolesDefaultArgs> = z.object({
  select: z.lazy(() => UserRolesSelectSchema).optional(),
  include: z.lazy(() => UserRolesIncludeSchema).optional(),
}).strict();

export const UserRolesSelectSchema: z.ZodType<Prisma.UserRolesSelect> = z.object({
  userId: z.boolean().optional(),
  roleId: z.boolean().optional(),
  Roles: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const BusWhereInputSchema: z.ZodType<Prisma.BusWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BusWhereInputSchema),z.lazy(() => BusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusWhereInputSchema),z.lazy(() => BusWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  licensePlate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumBus_statusNullableFilterSchema),z.lazy(() => Bus_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional()
}).strict();

export const BusOrderByWithRelationInputSchema: z.ZodType<Prisma.BusOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Schedule: z.lazy(() => ScheduleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => BusOrderByRelevanceInputSchema).optional()
}).strict();

export const BusWhereUniqueInputSchema: z.ZodType<Prisma.BusWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => BusWhereInputSchema),z.lazy(() => BusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusWhereInputSchema),z.lazy(() => BusWhereInputSchema).array() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => EnumBus_statusNullableFilterSchema),z.lazy(() => Bus_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional()
}).strict());

export const BusOrderByWithAggregationInputSchema: z.ZodType<Prisma.BusOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BusCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BusAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BusMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BusMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BusSumOrderByAggregateInputSchema).optional()
}).strict();

export const BusScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BusScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BusScalarWhereWithAggregatesInputSchema),z.lazy(() => BusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusScalarWhereWithAggregatesInputSchema),z.lazy(() => BusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  licensePlate: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  capacity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumBus_statusNullableWithAggregatesFilterSchema),z.lazy(() => Bus_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionWhereInputSchema: z.ZodType<Prisma.PermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsListRelationFilterSchema).optional()
}).strict();

export const PermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  RolePermissions: z.lazy(() => RolePermissionsOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => PermissionOrderByRelevanceInputSchema).optional()
}).strict();

export const PermissionWhereUniqueInputSchema: z.ZodType<Prisma.PermissionWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsListRelationFilterSchema).optional()
}).strict());

export const PermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermissionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PermissionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermissionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PermissionSumOrderByAggregateInputSchema).optional()
}).strict();

export const PermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReportWhereInputSchema: z.ZodType<Prisma.ReportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Trip: z.union([ z.lazy(() => TripNullableScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ReportOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => ReportOrderByRelevanceInputSchema).optional()
}).strict();

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  reportType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Trip: z.union([ z.lazy(() => TripNullableScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
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

export const RolePermissionsWhereInputSchema: z.ZodType<Prisma.RolePermissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionsWhereInputSchema),z.lazy(() => RolePermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionsWhereInputSchema),z.lazy(() => RolePermissionsWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
  Roles: z.union([ z.lazy(() => RolesScalarRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
}).strict();

export const RolePermissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.RolePermissionsOrderByWithRelationInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  Permission: z.lazy(() => PermissionOrderByWithRelationInputSchema).optional(),
  Roles: z.lazy(() => RolesOrderByWithRelationInputSchema).optional()
}).strict();

export const RolePermissionsWhereUniqueInputSchema: z.ZodType<Prisma.RolePermissionsWhereUniqueInput> = z.object({
  roleId_permissionId: z.lazy(() => RolePermissionsRoleIdPermissionIdCompoundUniqueInputSchema)
})
.and(z.object({
  roleId_permissionId: z.lazy(() => RolePermissionsRoleIdPermissionIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RolePermissionsWhereInputSchema),z.lazy(() => RolePermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionsWhereInputSchema),z.lazy(() => RolePermissionsWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
  Roles: z.union([ z.lazy(() => RolesScalarRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
}).strict());

export const RolePermissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolePermissionsOrderByWithAggregationInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RolePermissionsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RolePermissionsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolePermissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolePermissionsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RolePermissionsSumOrderByAggregateInputSchema).optional()
}).strict();

export const RolePermissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolePermissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => RolePermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const RolesWhereInputSchema: z.ZodType<Prisma.RolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsListRelationFilterSchema).optional(),
  UserRoles: z.lazy(() => UserRolesListRelationFilterSchema).optional()
}).strict();

export const RolesOrderByWithRelationInputSchema: z.ZodType<Prisma.RolesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  RolePermissions: z.lazy(() => RolePermissionsOrderByRelationAggregateInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => RolesOrderByRelevanceInputSchema).optional()
}).strict();

export const RolesWhereUniqueInputSchema: z.ZodType<Prisma.RolesWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsListRelationFilterSchema).optional(),
  UserRoles: z.lazy(() => UserRolesListRelationFilterSchema).optional()
}).strict());

export const RolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RolesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RolesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RolesSumOrderByAggregateInputSchema).optional()
}).strict();

export const RolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolesScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RouteWhereInputSchema: z.ZodType<Prisma.RouteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RouteWhereInputSchema),z.lazy(() => RouteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RouteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RouteWhereInputSchema),z.lazy(() => RouteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedDuration: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  startLocation: z.lazy(() => JsonFilterSchema).optional(),
  endLocation: z.lazy(() => JsonFilterSchema).optional(),
  isActive: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointListRelationFilterSchema).optional(),
  Schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentListRelationFilterSchema).optional()
}).strict();

export const RouteOrderByWithRelationInputSchema: z.ZodType<Prisma.RouteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startLocation: z.lazy(() => SortOrderSchema).optional(),
  endLocation: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointOrderByRelationAggregateInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleOrderByRelationAggregateInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => RouteOrderByRelevanceInputSchema).optional()
}).strict();

export const RouteWhereUniqueInputSchema: z.ZodType<Prisma.RouteWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => RouteWhereInputSchema),z.lazy(() => RouteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RouteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RouteWhereInputSchema),z.lazy(() => RouteWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedDuration: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  startLocation: z.lazy(() => JsonFilterSchema).optional(),
  endLocation: z.lazy(() => JsonFilterSchema).optional(),
  isActive: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointListRelationFilterSchema).optional(),
  Schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentListRelationFilterSchema).optional()
}).strict());

export const RouteOrderByWithAggregationInputSchema: z.ZodType<Prisma.RouteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startLocation: z.lazy(() => SortOrderSchema).optional(),
  endLocation: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RouteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RouteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RouteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RouteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RouteSumOrderByAggregateInputSchema).optional()
}).strict();

export const RouteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RouteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RouteScalarWhereWithAggregatesInputSchema),z.lazy(() => RouteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RouteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RouteScalarWhereWithAggregatesInputSchema),z.lazy(() => RouteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
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

export const RouteStopPointWhereInputSchema: z.ZodType<Prisma.RouteStopPointWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RouteStopPointWhereInputSchema),z.lazy(() => RouteStopPointWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RouteStopPointWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RouteStopPointWhereInputSchema),z.lazy(() => RouteStopPointWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopPointId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sequence: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  direction: z.union([ z.lazy(() => EnumRouteStopPoint_directionFilterSchema),z.lazy(() => RouteStopPoint_directionSchema) ]).optional(),
  Route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => RouteWhereInputSchema) ]).optional(),
  StopPoint: z.union([ z.lazy(() => StopPointScalarRelationFilterSchema),z.lazy(() => StopPointWhereInputSchema) ]).optional(),
}).strict();

export const RouteStopPointOrderByWithRelationInputSchema: z.ZodType<Prisma.RouteStopPointOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  Route: z.lazy(() => RouteOrderByWithRelationInputSchema).optional(),
  StopPoint: z.lazy(() => StopPointOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => RouteStopPointOrderByRelevanceInputSchema).optional()
}).strict();

export const RouteStopPointWhereUniqueInputSchema: z.ZodType<Prisma.RouteStopPointWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RouteStopPointWhereInputSchema),z.lazy(() => RouteStopPointWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RouteStopPointWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RouteStopPointWhereInputSchema),z.lazy(() => RouteStopPointWhereInputSchema).array() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopPointId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sequence: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  direction: z.union([ z.lazy(() => EnumRouteStopPoint_directionFilterSchema),z.lazy(() => RouteStopPoint_directionSchema) ]).optional(),
  Route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => RouteWhereInputSchema) ]).optional(),
  StopPoint: z.union([ z.lazy(() => StopPointScalarRelationFilterSchema),z.lazy(() => StopPointWhereInputSchema) ]).optional(),
}).strict());

export const RouteStopPointOrderByWithAggregationInputSchema: z.ZodType<Prisma.RouteStopPointOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RouteStopPointCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RouteStopPointAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RouteStopPointMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RouteStopPointMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RouteStopPointSumOrderByAggregateInputSchema).optional()
}).strict();

export const RouteStopPointScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RouteStopPointScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RouteStopPointScalarWhereWithAggregatesInputSchema),z.lazy(() => RouteStopPointScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RouteStopPointScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RouteStopPointScalarWhereWithAggregatesInputSchema),z.lazy(() => RouteStopPointScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  routeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stopPointId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sequence: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  direction: z.union([ z.lazy(() => EnumRouteStopPoint_directionWithAggregatesFilterSchema),z.lazy(() => RouteStopPoint_directionSchema) ]).optional(),
}).strict();

export const ScheduleWhereInputSchema: z.ZodType<Prisma.ScheduleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScheduleWhereInputSchema),z.lazy(() => ScheduleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScheduleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScheduleWhereInputSchema),z.lazy(() => ScheduleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  busId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSchedule_typeFilterSchema),z.lazy(() => Schedule_typeSchema) ]).optional(),
  daysOfWeek: z.lazy(() => JsonFilterSchema).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumSchedule_statusNullableFilterSchema),z.lazy(() => Schedule_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Bus: z.union([ z.lazy(() => BusScalarRelationFilterSchema),z.lazy(() => BusWhereInputSchema) ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => RouteWhereInputSchema) ]).optional(),
  Trip: z.lazy(() => TripListRelationFilterSchema).optional()
}).strict();

export const ScheduleOrderByWithRelationInputSchema: z.ZodType<Prisma.ScheduleOrderByWithRelationInput> = z.object({
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
  Bus: z.lazy(() => BusOrderByWithRelationInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Route: z.lazy(() => RouteOrderByWithRelationInputSchema).optional(),
  Trip: z.lazy(() => TripOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => ScheduleOrderByRelevanceInputSchema).optional()
}).strict();

export const ScheduleWhereUniqueInputSchema: z.ZodType<Prisma.ScheduleWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ScheduleWhereInputSchema),z.lazy(() => ScheduleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScheduleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScheduleWhereInputSchema),z.lazy(() => ScheduleWhereInputSchema).array() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  busId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSchedule_typeFilterSchema),z.lazy(() => Schedule_typeSchema) ]).optional(),
  daysOfWeek: z.lazy(() => JsonFilterSchema).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumSchedule_statusNullableFilterSchema),z.lazy(() => Schedule_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Bus: z.union([ z.lazy(() => BusScalarRelationFilterSchema),z.lazy(() => BusWhereInputSchema) ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => RouteWhereInputSchema) ]).optional(),
  Trip: z.lazy(() => TripListRelationFilterSchema).optional()
}).strict());

export const ScheduleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScheduleOrderByWithAggregationInput> = z.object({
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
  _count: z.lazy(() => ScheduleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ScheduleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ScheduleMinOrderByAggregateInputSchema).optional()
}).strict();

export const ScheduleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScheduleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ScheduleScalarWhereWithAggregatesInputSchema),z.lazy(() => ScheduleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScheduleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScheduleScalarWhereWithAggregatesInputSchema),z.lazy(() => ScheduleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  busId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSchedule_typeWithAggregatesFilterSchema),z.lazy(() => Schedule_typeSchema) ]).optional(),
  daysOfWeek: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumSchedule_statusNullableWithAggregatesFilterSchema),z.lazy(() => Schedule_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const StopPointWhereInputSchema: z.ZodType<Prisma.StopPointWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StopPointWhereInputSchema),z.lazy(() => StopPointWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StopPointWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StopPointWhereInputSchema),z.lazy(() => StopPointWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointListRelationFilterSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentListRelationFilterSchema).optional(),
  TripStop: z.lazy(() => TripStopListRelationFilterSchema).optional()
}).strict();

export const StopPointOrderByWithRelationInputSchema: z.ZodType<Prisma.StopPointOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointOrderByRelationAggregateInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentOrderByRelationAggregateInputSchema).optional(),
  TripStop: z.lazy(() => TripStopOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => StopPointOrderByRelevanceInputSchema).optional()
}).strict();

export const StopPointWhereUniqueInputSchema: z.ZodType<Prisma.StopPointWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => StopPointWhereInputSchema),z.lazy(() => StopPointWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StopPointWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StopPointWhereInputSchema),z.lazy(() => StopPointWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointListRelationFilterSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentListRelationFilterSchema).optional(),
  TripStop: z.lazy(() => TripStopListRelationFilterSchema).optional()
}).strict());

export const StopPointOrderByWithAggregationInputSchema: z.ZodType<Prisma.StopPointOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StopPointCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StopPointMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StopPointMinOrderByAggregateInputSchema).optional()
}).strict();

export const StopPointScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StopPointScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StopPointScalarWhereWithAggregatesInputSchema),z.lazy(() => StopPointScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StopPointScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StopPointScalarWhereWithAggregatesInputSchema),z.lazy(() => StopPointScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  location: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const StudentWhereInputSchema: z.ZodType<Prisma.StudentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentListRelationFilterSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceListRelationFilterSchema).optional()
}).strict();

export const StudentOrderByWithRelationInputSchema: z.ZodType<Prisma.StudentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentOrderByRelationAggregateInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => StudentOrderByRelevanceInputSchema).optional()
}).strict();

export const StudentWhereUniqueInputSchema: z.ZodType<Prisma.StudentWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentListRelationFilterSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceListRelationFilterSchema).optional()
}).strict());

export const StudentOrderByWithAggregationInputSchema: z.ZodType<Prisma.StudentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  meta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StudentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StudentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StudentMinOrderByAggregateInputSchema).optional()
}).strict();

export const StudentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StudentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const StudentAssignmentWhereInputSchema: z.ZodType<Prisma.StudentAssignmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentAssignmentWhereInputSchema),z.lazy(() => StudentAssignmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentAssignmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentAssignmentWhereInputSchema),z.lazy(() => StudentAssignmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  direction: z.union([ z.lazy(() => EnumStudentAssignment_directionFilterSchema),z.lazy(() => StudentAssignment_directionSchema) ]).optional(),
  effectiveFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  effectiveTo: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => RouteWhereInputSchema) ]).optional(),
  StopPoint: z.union([ z.lazy(() => StopPointScalarRelationFilterSchema),z.lazy(() => StopPointWhereInputSchema) ]).optional(),
  Student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentOrderByWithRelationInputSchema: z.ZodType<Prisma.StudentAssignmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  effectiveFrom: z.lazy(() => SortOrderSchema).optional(),
  effectiveTo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Route: z.lazy(() => RouteOrderByWithRelationInputSchema).optional(),
  StopPoint: z.lazy(() => StopPointOrderByWithRelationInputSchema).optional(),
  Student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => StudentAssignmentOrderByRelevanceInputSchema).optional()
}).strict();

export const StudentAssignmentWhereUniqueInputSchema: z.ZodType<Prisma.StudentAssignmentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => StudentAssignmentWhereInputSchema),z.lazy(() => StudentAssignmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentAssignmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentAssignmentWhereInputSchema),z.lazy(() => StudentAssignmentWhereInputSchema).array() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  direction: z.union([ z.lazy(() => EnumStudentAssignment_directionFilterSchema),z.lazy(() => StudentAssignment_directionSchema) ]).optional(),
  effectiveFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  effectiveTo: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Route: z.union([ z.lazy(() => RouteScalarRelationFilterSchema),z.lazy(() => RouteWhereInputSchema) ]).optional(),
  StopPoint: z.union([ z.lazy(() => StopPointScalarRelationFilterSchema),z.lazy(() => StopPointWhereInputSchema) ]).optional(),
  Student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
}).strict());

export const StudentAssignmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.StudentAssignmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional(),
  effectiveFrom: z.lazy(() => SortOrderSchema).optional(),
  effectiveTo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StudentAssignmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StudentAssignmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StudentAssignmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const StudentAssignmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StudentAssignmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StudentAssignmentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentAssignmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentAssignmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentAssignmentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentAssignmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  direction: z.union([ z.lazy(() => EnumStudentAssignment_directionWithAggregatesFilterSchema),z.lazy(() => StudentAssignment_directionSchema) ]).optional(),
  effectiveFrom: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  effectiveTo: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const StudentAttendanceWhereInputSchema: z.ZodType<Prisma.StudentAttendanceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentAttendanceWhereInputSchema),z.lazy(() => StudentAttendanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentAttendanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentAttendanceWhereInputSchema),z.lazy(() => StudentAttendanceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dropoffTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStudentAttendance_statusNullableFilterSchema),z.lazy(() => StudentAttendance_statusSchema) ]).optional().nullable(),
  Student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  Trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict();

export const StudentAttendanceOrderByWithRelationInputSchema: z.ZodType<Prisma.StudentAttendanceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dropoffTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional(),
  Trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => StudentAttendanceOrderByRelevanceInputSchema).optional()
}).strict();

export const StudentAttendanceWhereUniqueInputSchema: z.ZodType<Prisma.StudentAttendanceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => StudentAttendanceWhereInputSchema),z.lazy(() => StudentAttendanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentAttendanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentAttendanceWhereInputSchema),z.lazy(() => StudentAttendanceWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dropoffTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStudentAttendance_statusNullableFilterSchema),z.lazy(() => StudentAttendance_statusSchema) ]).optional().nullable(),
  Student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  Trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict());

export const StudentAttendanceOrderByWithAggregationInputSchema: z.ZodType<Prisma.StudentAttendanceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dropoffTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => StudentAttendanceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StudentAttendanceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StudentAttendanceMinOrderByAggregateInputSchema).optional()
}).strict();

export const StudentAttendanceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StudentAttendanceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StudentAttendanceScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentAttendanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentAttendanceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentAttendanceScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentAttendanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  dropoffTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStudentAttendance_statusNullableWithAggregatesFilterSchema),z.lazy(() => StudentAttendance_statusSchema) ]).optional().nullable(),
}).strict();

export const TrackingBusHistoryWhereInputSchema: z.ZodType<Prisma.TrackingBusHistoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TrackingBusHistoryWhereInputSchema),z.lazy(() => TrackingBusHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrackingBusHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrackingBusHistoryWhereInputSchema),z.lazy(() => TrackingBusHistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional(),
  Trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict();

export const TrackingBusHistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.TrackingBusHistoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  Trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => TrackingBusHistoryOrderByRelevanceInputSchema).optional()
}).strict();

export const TrackingBusHistoryWhereUniqueInputSchema: z.ZodType<Prisma.TrackingBusHistoryWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TrackingBusHistoryWhereInputSchema),z.lazy(() => TrackingBusHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrackingBusHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrackingBusHistoryWhereInputSchema),z.lazy(() => TrackingBusHistoryWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional(),
  Trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict());

export const TrackingBusHistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.TrackingBusHistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TrackingBusHistoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TrackingBusHistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TrackingBusHistoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const TrackingBusHistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TrackingBusHistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TrackingBusHistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => TrackingBusHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrackingBusHistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrackingBusHistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => TrackingBusHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  location: z.lazy(() => JsonWithAggregatesFilterSchema).optional()
}).strict();

export const TripWhereInputSchema: z.ZodType<Prisma.TripWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  actualStartTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualEndTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTrip_statusNullableFilterSchema),z.lazy(() => Trip_statusSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTrip_typeFilterSchema),z.lazy(() => Trip_typeSchema) ]).optional(),
  Report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceListRelationFilterSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryListRelationFilterSchema).optional(),
  Schedule: z.union([ z.lazy(() => ScheduleScalarRelationFilterSchema),z.lazy(() => ScheduleWhereInputSchema) ]).optional(),
  TripStop: z.lazy(() => TripStopListRelationFilterSchema).optional()
}).strict();

export const TripOrderByWithRelationInputSchema: z.ZodType<Prisma.TripOrderByWithRelationInput> = z.object({
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
  Report: z.lazy(() => ReportOrderByRelationAggregateInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceOrderByRelationAggregateInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryOrderByRelationAggregateInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleOrderByWithRelationInputSchema).optional(),
  TripStop: z.lazy(() => TripStopOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => TripOrderByRelevanceInputSchema).optional()
}).strict();

export const TripWhereUniqueInputSchema: z.ZodType<Prisma.TripWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  actualStartTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualEndTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTrip_statusNullableFilterSchema),z.lazy(() => Trip_statusSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTrip_typeFilterSchema),z.lazy(() => Trip_typeSchema) ]).optional(),
  Report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceListRelationFilterSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryListRelationFilterSchema).optional(),
  Schedule: z.union([ z.lazy(() => ScheduleScalarRelationFilterSchema),z.lazy(() => ScheduleWhereInputSchema) ]).optional(),
  TripStop: z.lazy(() => TripStopListRelationFilterSchema).optional()
}).strict());

export const TripOrderByWithAggregationInputSchema: z.ZodType<Prisma.TripOrderByWithAggregationInput> = z.object({
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
  _count: z.lazy(() => TripCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TripMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TripMinOrderByAggregateInputSchema).optional()
}).strict();

export const TripScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TripScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TripScalarWhereWithAggregatesInputSchema),z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripScalarWhereWithAggregatesInputSchema),z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  actualStartTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualEndTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTrip_statusNullableWithAggregatesFilterSchema),z.lazy(() => Trip_statusSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  location: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTrip_typeWithAggregatesFilterSchema),z.lazy(() => Trip_typeSchema) ]).optional(),
}).strict();

export const TripStopWhereInputSchema: z.ZodType<Prisma.TripStopWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripStopWhereInputSchema),z.lazy(() => TripStopWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripStopWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripStopWhereInputSchema),z.lazy(() => TripStopWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actualArrival: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualDeparture: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTripStop_statusNullableFilterSchema),z.lazy(() => TripStop_statusSchema) ]).optional().nullable(),
  StopPoint: z.union([ z.lazy(() => StopPointScalarRelationFilterSchema),z.lazy(() => StopPointWhereInputSchema) ]).optional(),
  Trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict();

export const TripStopOrderByWithRelationInputSchema: z.ZodType<Prisma.TripStopOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualDeparture: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  StopPoint: z.lazy(() => StopPointOrderByWithRelationInputSchema).optional(),
  Trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => TripStopOrderByRelevanceInputSchema).optional()
}).strict();

export const TripStopWhereUniqueInputSchema: z.ZodType<Prisma.TripStopWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TripStopWhereInputSchema),z.lazy(() => TripStopWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripStopWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripStopWhereInputSchema),z.lazy(() => TripStopWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actualArrival: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualDeparture: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTripStop_statusNullableFilterSchema),z.lazy(() => TripStop_statusSchema) ]).optional().nullable(),
  StopPoint: z.union([ z.lazy(() => StopPointScalarRelationFilterSchema),z.lazy(() => StopPointWhereInputSchema) ]).optional(),
  Trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict());

export const TripStopOrderByWithAggregationInputSchema: z.ZodType<Prisma.TripStopOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualDeparture: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TripStopCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TripStopMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TripStopMinOrderByAggregateInputSchema).optional()
}).strict();

export const TripStopScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TripStopScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TripStopScalarWhereWithAggregatesInputSchema),z.lazy(() => TripStopScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripStopScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripStopScalarWhereWithAggregatesInputSchema),z.lazy(() => TripStopScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  actualArrival: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualDeparture: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTripStop_statusNullableWithAggregatesFilterSchema),z.lazy(() => TripStop_statusSchema) ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  Schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional(),
  Student: z.union([ z.lazy(() => StudentNullableScalarRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional().nullable(),
  UserRoles: z.lazy(() => UserRolesListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Report: z.lazy(() => ReportOrderByRelationAggregateInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleOrderByRelationAggregateInputSchema).optional(),
  Student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  Schedule: z.lazy(() => ScheduleListRelationFilterSchema).optional(),
  Student: z.union([ z.lazy(() => StudentNullableScalarRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional().nullable(),
  UserRoles: z.lazy(() => UserRolesListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserRolesWhereInputSchema: z.ZodType<Prisma.UserRolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserRolesWhereInputSchema),z.lazy(() => UserRolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRolesWhereInputSchema),z.lazy(() => UserRolesWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Roles: z.union([ z.lazy(() => RolesScalarRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserRolesOrderByWithRelationInputSchema: z.ZodType<Prisma.UserRolesOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  Roles: z.lazy(() => RolesOrderByWithRelationInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => UserRolesOrderByRelevanceInputSchema).optional()
}).strict();

export const UserRolesWhereUniqueInputSchema: z.ZodType<Prisma.UserRolesWhereUniqueInput> = z.object({
  userId_roleId: z.lazy(() => UserRolesUserIdRoleIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_roleId: z.lazy(() => UserRolesUserIdRoleIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserRolesWhereInputSchema),z.lazy(() => UserRolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRolesWhereInputSchema),z.lazy(() => UserRolesWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Roles: z.union([ z.lazy(() => RolesScalarRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserRolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserRolesOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserRolesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserRolesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserRolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserRolesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserRolesSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserRolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserRolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema),z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema),z.lazy(() => UserRolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const BusCreateInputSchema: z.ZodType<Prisma.BusCreateInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => Bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedManyWithoutBusInputSchema).optional()
}).strict();

export const BusUncheckedCreateInputSchema: z.ZodType<Prisma.BusUncheckedCreateInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => Bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Schedule: z.lazy(() => ScheduleUncheckedCreateNestedManyWithoutBusInputSchema).optional()
}).strict();

export const BusUpdateInputSchema: z.ZodType<Prisma.BusUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NullableEnumBus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Schedule: z.lazy(() => ScheduleUpdateManyWithoutBusNestedInputSchema).optional()
}).strict();

export const BusUncheckedUpdateInputSchema: z.ZodType<Prisma.BusUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NullableEnumBus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedUpdateManyWithoutBusNestedInputSchema).optional()
}).strict();

export const BusCreateManyInputSchema: z.ZodType<Prisma.BusCreateManyInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => Bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BusUpdateManyMutationInputSchema: z.ZodType<Prisma.BusUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NullableEnumBus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BusUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BusUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NullableEnumBus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionCreateInputSchema: z.ZodType<Prisma.PermissionCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RolePermissions: z.lazy(() => RolePermissionsCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RolePermissions: z.lazy(() => RolePermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUpdateInputSchema: z.ZodType<Prisma.PermissionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionCreateManyInputSchema: z.ZodType<Prisma.PermissionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateInputSchema: z.ZodType<Prisma.ReportCreateInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema),
  Trip: z.lazy(() => TripCreateNestedOneWithoutReportInputSchema).optional()
}).strict();

export const ReportUncheckedCreateInputSchema: z.ZodType<Prisma.ReportUncheckedCreateInput> = z.object({
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

export const ReportUpdateInputSchema: z.ZodType<Prisma.ReportUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional(),
  Trip: z.lazy(() => TripUpdateOneWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateInput> = z.object({
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

export const ReportCreateManyInputSchema: z.ZodType<Prisma.ReportCreateManyInput> = z.object({
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

export const ReportUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyInput> = z.object({
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

export const RolePermissionsCreateInputSchema: z.ZodType<Prisma.RolePermissionsCreateInput> = z.object({
  Permission: z.lazy(() => PermissionCreateNestedOneWithoutRolePermissionsInputSchema),
  Roles: z.lazy(() => RolesCreateNestedOneWithoutRolePermissionsInputSchema)
}).strict();

export const RolePermissionsUncheckedCreateInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateInput> = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int()
}).strict();

export const RolePermissionsUpdateInputSchema: z.ZodType<Prisma.RolePermissionsUpdateInput> = z.object({
  Permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRolePermissionsNestedInputSchema).optional(),
  Roles: z.lazy(() => RolesUpdateOneRequiredWithoutRolePermissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateManyInputSchema: z.ZodType<Prisma.RolePermissionsCreateManyInput> = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int()
}).strict();

export const RolePermissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyMutationInput> = z.object({
}).strict();

export const RolePermissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesCreateInputSchema: z.ZodType<Prisma.RolesCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RolePermissions: z.lazy(() => RolePermissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUncheckedCreateInputSchema: z.ZodType<Prisma.RolesUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RolePermissions: z.lazy(() => RolePermissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUpdateInputSchema: z.ZodType<Prisma.RolesUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsUpdateManyWithoutRolesNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesCreateManyInputSchema: z.ZodType<Prisma.RolesCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RolesUpdateManyMutationInputSchema: z.ZodType<Prisma.RolesUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RouteCreateInputSchema: z.ZodType<Prisma.RouteCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointCreateNestedManyWithoutRouteInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedManyWithoutRouteInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const RouteUncheckedCreateInputSchema: z.ZodType<Prisma.RouteUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const RouteUpdateInputSchema: z.ZodType<Prisma.RouteUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUpdateManyWithoutRouteNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateManyWithoutRouteNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const RouteUncheckedUpdateInputSchema: z.ZodType<Prisma.RouteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const RouteCreateManyInputSchema: z.ZodType<Prisma.RouteCreateManyInput> = z.object({
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

export const RouteUpdateManyMutationInputSchema: z.ZodType<Prisma.RouteUpdateManyMutationInput> = z.object({
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

export const RouteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RouteUncheckedUpdateManyInput> = z.object({
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

export const RouteStopPointCreateInputSchema: z.ZodType<Prisma.RouteStopPointCreateInput> = z.object({
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema),
  Route: z.lazy(() => RouteCreateNestedOneWithoutRouteStopPointInputSchema),
  StopPoint: z.lazy(() => StopPointCreateNestedOneWithoutRouteStopPointInputSchema)
}).strict();

export const RouteStopPointUncheckedCreateInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  routeId: z.string(),
  stopPointId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema)
}).strict();

export const RouteStopPointUpdateInputSchema: z.ZodType<Prisma.RouteStopPointUpdateInput> = z.object({
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutRouteStopPointNestedInputSchema).optional(),
  StopPoint: z.lazy(() => StopPointUpdateOneRequiredWithoutRouteStopPointNestedInputSchema).optional()
}).strict();

export const RouteStopPointUncheckedUpdateInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopPointId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RouteStopPointCreateManyInputSchema: z.ZodType<Prisma.RouteStopPointCreateManyInput> = z.object({
  id: z.number().int().optional(),
  routeId: z.string(),
  stopPointId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema)
}).strict();

export const RouteStopPointUpdateManyMutationInputSchema: z.ZodType<Prisma.RouteStopPointUpdateManyMutationInput> = z.object({
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RouteStopPointUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopPointId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScheduleCreateInputSchema: z.ZodType<Prisma.ScheduleCreateInput> = z.object({
  id: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Bus: z.lazy(() => BusCreateNestedOneWithoutScheduleInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutScheduleInputSchema),
  Route: z.lazy(() => RouteCreateNestedOneWithoutScheduleInputSchema),
  Trip: z.lazy(() => TripCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const ScheduleUncheckedCreateInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Trip: z.lazy(() => TripUncheckedCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const ScheduleUpdateInputSchema: z.ZodType<Prisma.ScheduleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Bus: z.lazy(() => BusUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  Trip: z.lazy(() => TripUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleUncheckedUpdateInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Trip: z.lazy(() => TripUncheckedUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleCreateManyInputSchema: z.ZodType<Prisma.ScheduleCreateManyInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ScheduleUpdateManyMutationInputSchema: z.ZodType<Prisma.ScheduleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScheduleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StopPointCreateInputSchema: z.ZodType<Prisma.StopPointCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointCreateNestedManyWithoutStopPointInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutStopPointInputSchema).optional(),
  TripStop: z.lazy(() => TripStopCreateNestedManyWithoutStopPointInputSchema).optional()
}).strict();

export const StopPointUncheckedCreateInputSchema: z.ZodType<Prisma.StopPointUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedCreateNestedManyWithoutStopPointInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutStopPointInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedCreateNestedManyWithoutStopPointInputSchema).optional()
}).strict();

export const StopPointUpdateInputSchema: z.ZodType<Prisma.StopPointUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUpdateManyWithoutStopPointNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutStopPointNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUpdateManyWithoutStopPointNestedInputSchema).optional()
}).strict();

export const StopPointUncheckedUpdateInputSchema: z.ZodType<Prisma.StopPointUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional()
}).strict();

export const StopPointCreateManyInputSchema: z.ZodType<Prisma.StopPointCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StopPointUpdateManyMutationInputSchema: z.ZodType<Prisma.StopPointUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StopPointUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StopPointUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentCreateInputSchema: z.ZodType<Prisma.StudentCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutStudentInputSchema),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutStudentInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateInputSchema: z.ZodType<Prisma.StudentUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUpdateInputSchema: z.ZodType<Prisma.StudentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutStudentNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentCreateManyInputSchema: z.ZodType<Prisma.StudentCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentUpdateManyMutationInputSchema: z.ZodType<Prisma.StudentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentCreateInputSchema: z.ZodType<Prisma.StudentAssignmentCreateInput> = z.object({
  id: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Route: z.lazy(() => RouteCreateNestedOneWithoutStudentAssignmentInputSchema),
  StopPoint: z.lazy(() => StopPointCreateNestedOneWithoutStudentAssignmentInputSchema),
  Student: z.lazy(() => StudentCreateNestedOneWithoutStudentAssignmentInputSchema)
}).strict();

export const StudentAssignmentUncheckedCreateInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedCreateInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentAssignmentUpdateInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional(),
  StopPoint: z.lazy(() => StopPointUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional()
}).strict();

export const StudentAssignmentUncheckedUpdateInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentCreateManyInputSchema: z.ZodType<Prisma.StudentAssignmentCreateManyInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentAssignmentUpdateManyMutationInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAttendanceCreateInputSchema: z.ZodType<Prisma.StudentAttendanceCreateInput> = z.object({
  id: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable(),
  Student: z.lazy(() => StudentCreateNestedOneWithoutStudentAttendanceInputSchema),
  Trip: z.lazy(() => TripCreateNestedOneWithoutStudentAttendanceInputSchema)
}).strict();

export const StudentAttendanceUncheckedCreateInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedCreateInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable()
}).strict();

export const StudentAttendanceUpdateInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Student: z.lazy(() => StudentUpdateOneRequiredWithoutStudentAttendanceNestedInputSchema).optional(),
  Trip: z.lazy(() => TripUpdateOneRequiredWithoutStudentAttendanceNestedInputSchema).optional()
}).strict();

export const StudentAttendanceUncheckedUpdateInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StudentAttendanceCreateManyInputSchema: z.ZodType<Prisma.StudentAttendanceCreateManyInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable()
}).strict();

export const StudentAttendanceUpdateManyMutationInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StudentAttendanceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TrackingBusHistoryCreateInputSchema: z.ZodType<Prisma.TrackingBusHistoryCreateInput> = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  Trip: z.lazy(() => TripCreateNestedOneWithoutTrackingBusHistoryInputSchema)
}).strict();

export const TrackingBusHistoryUncheckedCreateInputSchema: z.ZodType<Prisma.TrackingBusHistoryUncheckedCreateInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const TrackingBusHistoryUpdateInputSchema: z.ZodType<Prisma.TrackingBusHistoryUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  Trip: z.lazy(() => TripUpdateOneRequiredWithoutTrackingBusHistoryNestedInputSchema).optional()
}).strict();

export const TrackingBusHistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.TrackingBusHistoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TrackingBusHistoryCreateManyInputSchema: z.ZodType<Prisma.TrackingBusHistoryCreateManyInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const TrackingBusHistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.TrackingBusHistoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TrackingBusHistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TrackingBusHistoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TripCreateInputSchema: z.ZodType<Prisma.TripCreateInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportCreateNestedManyWithoutTripInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryCreateNestedManyWithoutTripInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedOneWithoutTripInputSchema),
  TripStop: z.lazy(() => TripStopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateInputSchema: z.ZodType<Prisma.TripUncheckedCreateInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUpdateInputSchema: z.ZodType<Prisma.TripUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutTripNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateInputSchema: z.ZodType<Prisma.TripUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripCreateManyInputSchema: z.ZodType<Prisma.TripCreateManyInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema)
}).strict();

export const TripUpdateManyMutationInputSchema: z.ZodType<Prisma.TripUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripStopCreateInputSchema: z.ZodType<Prisma.TripStopCreateInput> = z.object({
  id: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable(),
  StopPoint: z.lazy(() => StopPointCreateNestedOneWithoutTripStopInputSchema),
  Trip: z.lazy(() => TripCreateNestedOneWithoutTripStopInputSchema)
}).strict();

export const TripStopUncheckedCreateInputSchema: z.ZodType<Prisma.TripStopUncheckedCreateInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable()
}).strict();

export const TripStopUpdateInputSchema: z.ZodType<Prisma.TripStopUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  StopPoint: z.lazy(() => StopPointUpdateOneRequiredWithoutTripStopNestedInputSchema).optional(),
  Trip: z.lazy(() => TripUpdateOneRequiredWithoutTripStopNestedInputSchema).optional()
}).strict();

export const TripStopUncheckedUpdateInputSchema: z.ZodType<Prisma.TripStopUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TripStopCreateManyInputSchema: z.ZodType<Prisma.TripStopCreateManyInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable()
}).strict();

export const TripStopUpdateManyMutationInputSchema: z.ZodType<Prisma.TripStopUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TripStopUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TripStopUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedManyWithoutUserInputSchema).optional(),
  Student: z.lazy(() => StudentCreateNestedOneWithoutUserInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Student: z.lazy(() => StudentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateManyWithoutUserNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUpdateOneWithoutUserNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesCreateInputSchema: z.ZodType<Prisma.UserRolesCreateInput> = z.object({
  Roles: z.lazy(() => RolesCreateNestedOneWithoutUserRolesInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutUserRolesInputSchema)
}).strict();

export const UserRolesUncheckedCreateInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateInput> = z.object({
  userId: z.string(),
  roleId: z.number().int()
}).strict();

export const UserRolesUpdateInputSchema: z.ZodType<Prisma.UserRolesUpdateInput> = z.object({
  Roles: z.lazy(() => RolesUpdateOneRequiredWithoutUserRolesNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutUserRolesNestedInputSchema).optional()
}).strict();

export const UserRolesUncheckedUpdateInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesCreateManyInputSchema: z.ZodType<Prisma.UserRolesCreateManyInput> = z.object({
  userId: z.string(),
  roleId: z.number().int()
}).strict();

export const UserRolesUpdateManyMutationInputSchema: z.ZodType<Prisma.UserRolesUpdateManyMutationInput> = z.object({
}).strict();

export const UserRolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyInput> = z.object({
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

export const EnumBus_statusNullableFilterSchema: z.ZodType<Prisma.EnumBus_statusNullableFilter> = z.object({
  equals: z.lazy(() => Bus_statusSchema).optional().nullable(),
  in: z.lazy(() => Bus_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Bus_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NestedEnumBus_statusNullableFilterSchema) ]).optional().nullable(),
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
  every: z.lazy(() => ScheduleWhereInputSchema).optional(),
  some: z.lazy(() => ScheduleWhereInputSchema).optional(),
  none: z.lazy(() => ScheduleWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ScheduleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ScheduleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BusOrderByRelevanceInputSchema: z.ZodType<Prisma.BusOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => BusOrderByRelevanceFieldEnumSchema),z.lazy(() => BusOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const BusCountOrderByAggregateInputSchema: z.ZodType<Prisma.BusCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BusAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BusAvgOrderByAggregateInput> = z.object({
  capacity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BusMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BusMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BusMinOrderByAggregateInputSchema: z.ZodType<Prisma.BusMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  licensePlate: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BusSumOrderByAggregateInputSchema: z.ZodType<Prisma.BusSumOrderByAggregateInput> = z.object({
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

export const EnumBus_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBus_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Bus_statusSchema).optional().nullable(),
  in: z.lazy(() => Bus_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Bus_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NestedEnumBus_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBus_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBus_statusNullableFilterSchema).optional()
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

export const RolePermissionsListRelationFilterSchema: z.ZodType<Prisma.RolePermissionsListRelationFilter> = z.object({
  every: z.lazy(() => RolePermissionsWhereInputSchema).optional(),
  some: z.lazy(() => RolePermissionsWhereInputSchema).optional(),
  none: z.lazy(() => RolePermissionsWhereInputSchema).optional()
}).strict();

export const RolePermissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RolePermissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionOrderByRelevanceInputSchema: z.ZodType<Prisma.PermissionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => PermissionOrderByRelevanceFieldEnumSchema),z.lazy(() => PermissionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const PermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionSumOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionSumOrderByAggregateInput> = z.object({
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
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const TripNullableScalarRelationFilterSchema: z.ZodType<Prisma.TripNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => TripWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TripWhereInputSchema).optional().nullable()
}).strict();

export const ReportOrderByRelevanceInputSchema: z.ZodType<Prisma.ReportOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ReportOrderByRelevanceFieldEnumSchema),z.lazy(() => ReportOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportCountOrderByAggregateInput> = z.object({
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

export const ReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMinOrderByAggregateInput> = z.object({
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
  is: z.lazy(() => PermissionWhereInputSchema).optional(),
  isNot: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const RolesScalarRelationFilterSchema: z.ZodType<Prisma.RolesScalarRelationFilter> = z.object({
  is: z.lazy(() => RolesWhereInputSchema).optional(),
  isNot: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const RolePermissionsRoleIdPermissionIdCompoundUniqueInputSchema: z.ZodType<Prisma.RolePermissionsRoleIdPermissionIdCompoundUniqueInput> = z.object({
  roleId: z.number(),
  permissionId: z.number()
}).strict();

export const RolePermissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionsCountOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionsAvgOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionsMaxOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionsMinOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionsSumOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesListRelationFilterSchema: z.ZodType<Prisma.UserRolesListRelationFilter> = z.object({
  every: z.lazy(() => UserRolesWhereInputSchema).optional(),
  some: z.lazy(() => UserRolesWhereInputSchema).optional(),
  none: z.lazy(() => UserRolesWhereInputSchema).optional()
}).strict();

export const UserRolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserRolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesOrderByRelevanceInputSchema: z.ZodType<Prisma.RolesOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => RolesOrderByRelevanceFieldEnumSchema),z.lazy(() => RolesOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const RolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RolesAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesSumOrderByAggregateInputSchema: z.ZodType<Prisma.RolesSumOrderByAggregateInput> = z.object({
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

export const RouteStopPointListRelationFilterSchema: z.ZodType<Prisma.RouteStopPointListRelationFilter> = z.object({
  every: z.lazy(() => RouteStopPointWhereInputSchema).optional(),
  some: z.lazy(() => RouteStopPointWhereInputSchema).optional(),
  none: z.lazy(() => RouteStopPointWhereInputSchema).optional()
}).strict();

export const StudentAssignmentListRelationFilterSchema: z.ZodType<Prisma.StudentAssignmentListRelationFilter> = z.object({
  every: z.lazy(() => StudentAssignmentWhereInputSchema).optional(),
  some: z.lazy(() => StudentAssignmentWhereInputSchema).optional(),
  none: z.lazy(() => StudentAssignmentWhereInputSchema).optional()
}).strict();

export const RouteStopPointOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RouteStopPointOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentAssignmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StudentAssignmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RouteOrderByRelevanceInputSchema: z.ZodType<Prisma.RouteOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => RouteOrderByRelevanceFieldEnumSchema),z.lazy(() => RouteOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const RouteCountOrderByAggregateInputSchema: z.ZodType<Prisma.RouteCountOrderByAggregateInput> = z.object({
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

export const RouteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RouteAvgOrderByAggregateInput> = z.object({
  estimatedDuration: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RouteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RouteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RouteMinOrderByAggregateInputSchema: z.ZodType<Prisma.RouteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  estimatedDuration: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RouteSumOrderByAggregateInputSchema: z.ZodType<Prisma.RouteSumOrderByAggregateInput> = z.object({
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

export const EnumRouteStopPoint_directionFilterSchema: z.ZodType<Prisma.EnumRouteStopPoint_directionFilter> = z.object({
  equals: z.lazy(() => RouteStopPoint_directionSchema).optional(),
  in: z.lazy(() => RouteStopPoint_directionSchema).array().optional(),
  notIn: z.lazy(() => RouteStopPoint_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => NestedEnumRouteStopPoint_directionFilterSchema) ]).optional(),
}).strict();

export const RouteScalarRelationFilterSchema: z.ZodType<Prisma.RouteScalarRelationFilter> = z.object({
  is: z.lazy(() => RouteWhereInputSchema).optional(),
  isNot: z.lazy(() => RouteWhereInputSchema).optional()
}).strict();

export const StopPointScalarRelationFilterSchema: z.ZodType<Prisma.StopPointScalarRelationFilter> = z.object({
  is: z.lazy(() => StopPointWhereInputSchema).optional(),
  isNot: z.lazy(() => StopPointWhereInputSchema).optional()
}).strict();

export const RouteStopPointOrderByRelevanceInputSchema: z.ZodType<Prisma.RouteStopPointOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => RouteStopPointOrderByRelevanceFieldEnumSchema),z.lazy(() => RouteStopPointOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const RouteStopPointCountOrderByAggregateInputSchema: z.ZodType<Prisma.RouteStopPointCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RouteStopPointAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RouteStopPointAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RouteStopPointMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RouteStopPointMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RouteStopPointMinOrderByAggregateInputSchema: z.ZodType<Prisma.RouteStopPointMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  routeId: z.lazy(() => SortOrderSchema).optional(),
  stopPointId: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional(),
  direction: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RouteStopPointSumOrderByAggregateInputSchema: z.ZodType<Prisma.RouteStopPointSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sequence: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRouteStopPoint_directionWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRouteStopPoint_directionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RouteStopPoint_directionSchema).optional(),
  in: z.lazy(() => RouteStopPoint_directionSchema).array().optional(),
  notIn: z.lazy(() => RouteStopPoint_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => NestedEnumRouteStopPoint_directionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRouteStopPoint_directionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRouteStopPoint_directionFilterSchema).optional()
}).strict();

export const EnumSchedule_typeFilterSchema: z.ZodType<Prisma.EnumSchedule_typeFilter> = z.object({
  equals: z.lazy(() => Schedule_typeSchema).optional(),
  in: z.lazy(() => Schedule_typeSchema).array().optional(),
  notIn: z.lazy(() => Schedule_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => NestedEnumSchedule_typeFilterSchema) ]).optional(),
}).strict();

export const EnumSchedule_statusNullableFilterSchema: z.ZodType<Prisma.EnumSchedule_statusNullableFilter> = z.object({
  equals: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  in: z.lazy(() => Schedule_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Schedule_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NestedEnumSchedule_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BusScalarRelationFilterSchema: z.ZodType<Prisma.BusScalarRelationFilter> = z.object({
  is: z.lazy(() => BusWhereInputSchema).optional(),
  isNot: z.lazy(() => BusWhereInputSchema).optional()
}).strict();

export const TripListRelationFilterSchema: z.ZodType<Prisma.TripListRelationFilter> = z.object({
  every: z.lazy(() => TripWhereInputSchema).optional(),
  some: z.lazy(() => TripWhereInputSchema).optional(),
  none: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TripOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScheduleOrderByRelevanceInputSchema: z.ZodType<Prisma.ScheduleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ScheduleOrderByRelevanceFieldEnumSchema),z.lazy(() => ScheduleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ScheduleCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduleCountOrderByAggregateInput> = z.object({
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

export const ScheduleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduleMaxOrderByAggregateInput> = z.object({
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

export const ScheduleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduleMinOrderByAggregateInput> = z.object({
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

export const EnumSchedule_typeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSchedule_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Schedule_typeSchema).optional(),
  in: z.lazy(() => Schedule_typeSchema).array().optional(),
  notIn: z.lazy(() => Schedule_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => NestedEnumSchedule_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSchedule_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSchedule_typeFilterSchema).optional()
}).strict();

export const EnumSchedule_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSchedule_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  in: z.lazy(() => Schedule_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Schedule_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NestedEnumSchedule_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSchedule_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSchedule_statusNullableFilterSchema).optional()
}).strict();

export const TripStopListRelationFilterSchema: z.ZodType<Prisma.TripStopListRelationFilter> = z.object({
  every: z.lazy(() => TripStopWhereInputSchema).optional(),
  some: z.lazy(() => TripStopWhereInputSchema).optional(),
  none: z.lazy(() => TripStopWhereInputSchema).optional()
}).strict();

export const TripStopOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TripStopOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StopPointOrderByRelevanceInputSchema: z.ZodType<Prisma.StopPointOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => StopPointOrderByRelevanceFieldEnumSchema),z.lazy(() => StopPointOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const StopPointCountOrderByAggregateInputSchema: z.ZodType<Prisma.StopPointCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StopPointMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StopPointMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StopPointMinOrderByAggregateInputSchema: z.ZodType<Prisma.StopPointMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentAttendanceListRelationFilterSchema: z.ZodType<Prisma.StudentAttendanceListRelationFilter> = z.object({
  every: z.lazy(() => StudentAttendanceWhereInputSchema).optional(),
  some: z.lazy(() => StudentAttendanceWhereInputSchema).optional(),
  none: z.lazy(() => StudentAttendanceWhereInputSchema).optional()
}).strict();

export const StudentAttendanceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StudentAttendanceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentOrderByRelevanceInputSchema: z.ZodType<Prisma.StudentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => StudentOrderByRelevanceFieldEnumSchema),z.lazy(() => StudentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const StudentCountOrderByAggregateInputSchema: z.ZodType<Prisma.StudentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentMinOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStudentAssignment_directionFilterSchema: z.ZodType<Prisma.EnumStudentAssignment_directionFilter> = z.object({
  equals: z.lazy(() => StudentAssignment_directionSchema).optional(),
  in: z.lazy(() => StudentAssignment_directionSchema).array().optional(),
  notIn: z.lazy(() => StudentAssignment_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => NestedEnumStudentAssignment_directionFilterSchema) ]).optional(),
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
  is: z.lazy(() => StudentWhereInputSchema).optional(),
  isNot: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentAssignmentOrderByRelevanceInputSchema: z.ZodType<Prisma.StudentAssignmentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => StudentAssignmentOrderByRelevanceFieldEnumSchema),z.lazy(() => StudentAssignmentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const StudentAssignmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAssignmentCountOrderByAggregateInput> = z.object({
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

export const StudentAssignmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAssignmentMaxOrderByAggregateInput> = z.object({
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

export const StudentAssignmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAssignmentMinOrderByAggregateInput> = z.object({
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

export const EnumStudentAssignment_directionWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStudentAssignment_directionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StudentAssignment_directionSchema).optional(),
  in: z.lazy(() => StudentAssignment_directionSchema).array().optional(),
  notIn: z.lazy(() => StudentAssignment_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => NestedEnumStudentAssignment_directionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStudentAssignment_directionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStudentAssignment_directionFilterSchema).optional()
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

export const EnumStudentAttendance_statusNullableFilterSchema: z.ZodType<Prisma.EnumStudentAttendance_statusNullableFilter> = z.object({
  equals: z.lazy(() => StudentAttendance_statusSchema).optional().nullable(),
  in: z.lazy(() => StudentAttendance_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => StudentAttendance_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NestedEnumStudentAttendance_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TripScalarRelationFilterSchema: z.ZodType<Prisma.TripScalarRelationFilter> = z.object({
  is: z.lazy(() => TripWhereInputSchema).optional(),
  isNot: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const StudentAttendanceOrderByRelevanceInputSchema: z.ZodType<Prisma.StudentAttendanceOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => StudentAttendanceOrderByRelevanceFieldEnumSchema),z.lazy(() => StudentAttendanceOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const StudentAttendanceCountOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAttendanceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional(),
  dropoffTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentAttendanceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAttendanceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional(),
  dropoffTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentAttendanceMinOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAttendanceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  pickupTime: z.lazy(() => SortOrderSchema).optional(),
  dropoffTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStudentAttendance_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStudentAttendance_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StudentAttendance_statusSchema).optional().nullable(),
  in: z.lazy(() => StudentAttendance_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => StudentAttendance_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NestedEnumStudentAttendance_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStudentAttendance_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStudentAttendance_statusNullableFilterSchema).optional()
}).strict();

export const TrackingBusHistoryOrderByRelevanceInputSchema: z.ZodType<Prisma.TrackingBusHistoryOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => TrackingBusHistoryOrderByRelevanceFieldEnumSchema),z.lazy(() => TrackingBusHistoryOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const TrackingBusHistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.TrackingBusHistoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrackingBusHistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TrackingBusHistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrackingBusHistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.TrackingBusHistoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTrip_statusNullableFilterSchema: z.ZodType<Prisma.EnumTrip_statusNullableFilter> = z.object({
  equals: z.lazy(() => Trip_statusSchema).optional().nullable(),
  in: z.lazy(() => Trip_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Trip_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NestedEnumTrip_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumTrip_typeFilterSchema: z.ZodType<Prisma.EnumTrip_typeFilter> = z.object({
  equals: z.lazy(() => Trip_typeSchema).optional(),
  in: z.lazy(() => Trip_typeSchema).array().optional(),
  notIn: z.lazy(() => Trip_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => NestedEnumTrip_typeFilterSchema) ]).optional(),
}).strict();

export const ReportListRelationFilterSchema: z.ZodType<Prisma.ReportListRelationFilter> = z.object({
  every: z.lazy(() => ReportWhereInputSchema).optional(),
  some: z.lazy(() => ReportWhereInputSchema).optional(),
  none: z.lazy(() => ReportWhereInputSchema).optional()
}).strict();

export const TrackingBusHistoryListRelationFilterSchema: z.ZodType<Prisma.TrackingBusHistoryListRelationFilter> = z.object({
  every: z.lazy(() => TrackingBusHistoryWhereInputSchema).optional(),
  some: z.lazy(() => TrackingBusHistoryWhereInputSchema).optional(),
  none: z.lazy(() => TrackingBusHistoryWhereInputSchema).optional()
}).strict();

export const ScheduleScalarRelationFilterSchema: z.ZodType<Prisma.ScheduleScalarRelationFilter> = z.object({
  is: z.lazy(() => ScheduleWhereInputSchema).optional(),
  isNot: z.lazy(() => ScheduleWhereInputSchema).optional()
}).strict();

export const ReportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReportOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrackingBusHistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TrackingBusHistoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripOrderByRelevanceInputSchema: z.ZodType<Prisma.TripOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => TripOrderByRelevanceFieldEnumSchema),z.lazy(() => TripOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const TripCountOrderByAggregateInputSchema: z.ZodType<Prisma.TripCountOrderByAggregateInput> = z.object({
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

export const TripMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TripMaxOrderByAggregateInput> = z.object({
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

export const TripMinOrderByAggregateInputSchema: z.ZodType<Prisma.TripMinOrderByAggregateInput> = z.object({
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

export const EnumTrip_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTrip_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Trip_statusSchema).optional().nullable(),
  in: z.lazy(() => Trip_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Trip_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NestedEnumTrip_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTrip_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTrip_statusNullableFilterSchema).optional()
}).strict();

export const EnumTrip_typeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTrip_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Trip_typeSchema).optional(),
  in: z.lazy(() => Trip_typeSchema).array().optional(),
  notIn: z.lazy(() => Trip_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => NestedEnumTrip_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTrip_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTrip_typeFilterSchema).optional()
}).strict();

export const EnumTripStop_statusNullableFilterSchema: z.ZodType<Prisma.EnumTripStop_statusNullableFilter> = z.object({
  equals: z.lazy(() => TripStop_statusSchema).optional().nullable(),
  in: z.lazy(() => TripStop_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => TripStop_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NestedEnumTripStop_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TripStopOrderByRelevanceInputSchema: z.ZodType<Prisma.TripStopOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => TripStopOrderByRelevanceFieldEnumSchema),z.lazy(() => TripStopOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const TripStopCountOrderByAggregateInputSchema: z.ZodType<Prisma.TripStopCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.lazy(() => SortOrderSchema).optional(),
  actualDeparture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripStopMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TripStopMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.lazy(() => SortOrderSchema).optional(),
  actualDeparture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripStopMinOrderByAggregateInputSchema: z.ZodType<Prisma.TripStopMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  stopId: z.lazy(() => SortOrderSchema).optional(),
  actualArrival: z.lazy(() => SortOrderSchema).optional(),
  actualDeparture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTripStop_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTripStop_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TripStop_statusSchema).optional().nullable(),
  in: z.lazy(() => TripStop_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => TripStop_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NestedEnumTripStop_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTripStop_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTripStop_statusNullableFilterSchema).optional()
}).strict();

export const StudentNullableScalarRelationFilterSchema: z.ZodType<Prisma.StudentNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => StudentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => StudentWhereInputSchema).optional().nullable()
}).strict();

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UserOrderByRelevanceFieldEnumSchema),z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesOrderByRelevanceInputSchema: z.ZodType<Prisma.UserRolesOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UserRolesOrderByRelevanceFieldEnumSchema),z.lazy(() => UserRolesOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UserRolesUserIdRoleIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserRolesUserIdRoleIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  roleId: z.number()
}).strict();

export const UserRolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserRolesCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserRolesAvgOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserRolesMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserRolesMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRolesSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserRolesSumOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScheduleCreateNestedManyWithoutBusInputSchema: z.ZodType<Prisma.ScheduleCreateNestedManyWithoutBusInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutBusInputSchema),z.lazy(() => ScheduleCreateWithoutBusInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutBusInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutBusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyBusInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUncheckedCreateNestedManyWithoutBusInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateNestedManyWithoutBusInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutBusInputSchema),z.lazy(() => ScheduleCreateWithoutBusInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutBusInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutBusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyBusInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
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

export const NullableEnumBus_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumBus_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => Bus_statusSchema).optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ScheduleUpdateManyWithoutBusNestedInputSchema: z.ZodType<Prisma.ScheduleUpdateManyWithoutBusNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutBusInputSchema),z.lazy(() => ScheduleCreateWithoutBusInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutBusInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutBusInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutBusInputSchema),z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutBusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyBusInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutBusInputSchema),z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutBusInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScheduleUpdateManyWithWhereWithoutBusInputSchema),z.lazy(() => ScheduleUpdateManyWithWhereWithoutBusInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScheduleScalarWhereInputSchema),z.lazy(() => ScheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUncheckedUpdateManyWithoutBusNestedInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyWithoutBusNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutBusInputSchema),z.lazy(() => ScheduleCreateWithoutBusInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutBusInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutBusInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutBusInputSchema),z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutBusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyBusInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutBusInputSchema),z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutBusInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScheduleUpdateManyWithWhereWithoutBusInputSchema),z.lazy(() => ScheduleUpdateManyWithWhereWithoutBusInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScheduleScalarWhereInputSchema),z.lazy(() => ScheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReportInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TripCreateNestedOneWithoutReportInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutReportInputSchema),z.lazy(() => TripUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutReportInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutReportNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReportInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReportInputSchema),z.lazy(() => UserUpdateWithoutReportInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportInputSchema) ]).optional(),
}).strict();

export const TripUpdateOneWithoutReportNestedInputSchema: z.ZodType<Prisma.TripUpdateOneWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutReportInputSchema),z.lazy(() => TripUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutReportInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutReportInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TripWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TripWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateToOneWithWhereWithoutReportInputSchema),z.lazy(() => TripUpdateWithoutReportInputSchema),z.lazy(() => TripUncheckedUpdateWithoutReportInputSchema) ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const PermissionCreateNestedOneWithoutRolePermissionsInputSchema: z.ZodType<Prisma.PermissionCreateNestedOneWithoutRolePermissionsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolePermissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolePermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRolePermissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional()
}).strict();

export const RolesCreateNestedOneWithoutRolePermissionsInputSchema: z.ZodType<Prisma.RolesCreateNestedOneWithoutRolePermissionsInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutRolePermissionsInputSchema),z.lazy(() => RolesUncheckedCreateWithoutRolePermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutRolePermissionsInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional()
}).strict();

export const PermissionUpdateOneRequiredWithoutRolePermissionsNestedInputSchema: z.ZodType<Prisma.PermissionUpdateOneRequiredWithoutRolePermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolePermissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolePermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRolePermissionsInputSchema).optional(),
  upsert: z.lazy(() => PermissionUpsertWithoutRolePermissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateToOneWithWhereWithoutRolePermissionsInputSchema),z.lazy(() => PermissionUpdateWithoutRolePermissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolePermissionsInputSchema) ]).optional(),
}).strict();

export const RolesUpdateOneRequiredWithoutRolePermissionsNestedInputSchema: z.ZodType<Prisma.RolesUpdateOneRequiredWithoutRolePermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutRolePermissionsInputSchema),z.lazy(() => RolesUncheckedCreateWithoutRolePermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutRolePermissionsInputSchema).optional(),
  upsert: z.lazy(() => RolesUpsertWithoutRolePermissionsInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RolesUpdateToOneWithWhereWithoutRolePermissionsInputSchema),z.lazy(() => RolesUpdateWithoutRolePermissionsInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutRolePermissionsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRolesCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRolesInputSchema),z.lazy(() => UserRolesCreateWithoutRolesInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRolesInputSchema),z.lazy(() => UserRolesCreateWithoutRolesInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.UserRolesUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRolesInputSchema),z.lazy(() => UserRolesCreateWithoutRolesInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => UserRolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => RolePermissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => RolePermissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionsWhereUniqueInputSchema),z.lazy(() => RolePermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => RolePermissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => RolePermissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRolesInputSchema),z.lazy(() => UserRolesCreateWithoutRolesInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => UserRolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RouteStopPointCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema).array(),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RouteStopPointCreateOrConnectWithoutRouteInputSchema),z.lazy(() => RouteStopPointCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RouteStopPointCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScheduleCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutRouteInputSchema),z.lazy(() => ScheduleCreateWithoutRouteInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutRouteInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutRouteInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RouteStopPointUncheckedCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema).array(),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RouteStopPointCreateOrConnectWithoutRouteInputSchema),z.lazy(() => RouteStopPointCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RouteStopPointCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUncheckedCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutRouteInputSchema),z.lazy(() => ScheduleCreateWithoutRouteInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutRouteInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentUncheckedCreateNestedManyWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedCreateNestedManyWithoutRouteInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutRouteInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyRouteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
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

export const RouteStopPointUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.RouteStopPointUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema).array(),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RouteStopPointCreateOrConnectWithoutRouteInputSchema),z.lazy(() => RouteStopPointCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RouteStopPointUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => RouteStopPointUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RouteStopPointCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RouteStopPointUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => RouteStopPointUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RouteStopPointUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => RouteStopPointUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RouteStopPointScalarWhereInputSchema),z.lazy(() => RouteStopPointScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.ScheduleUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutRouteInputSchema),z.lazy(() => ScheduleCreateWithoutRouteInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutRouteInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScheduleUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => ScheduleUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScheduleScalarWhereInputSchema),z.lazy(() => ScheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutRouteInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAssignmentScalarWhereInputSchema),z.lazy(() => StudentAssignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RouteStopPointUncheckedUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema).array(),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RouteStopPointCreateOrConnectWithoutRouteInputSchema),z.lazy(() => RouteStopPointCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RouteStopPointUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => RouteStopPointUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RouteStopPointCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RouteStopPointUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => RouteStopPointUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RouteStopPointUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => RouteStopPointUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RouteStopPointScalarWhereInputSchema),z.lazy(() => RouteStopPointScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUncheckedUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutRouteInputSchema),z.lazy(() => ScheduleCreateWithoutRouteInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutRouteInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScheduleUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => ScheduleUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScheduleScalarWhereInputSchema),z.lazy(() => ScheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentUncheckedUpdateManyWithoutRouteNestedInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateManyWithoutRouteNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutRouteInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutRouteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyRouteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutRouteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutRouteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAssignmentScalarWhereInputSchema),z.lazy(() => StudentAssignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RouteCreateNestedOneWithoutRouteStopPointInputSchema: z.ZodType<Prisma.RouteCreateNestedOneWithoutRouteStopPointInput> = z.object({
  create: z.union([ z.lazy(() => RouteCreateWithoutRouteStopPointInputSchema),z.lazy(() => RouteUncheckedCreateWithoutRouteStopPointInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RouteCreateOrConnectWithoutRouteStopPointInputSchema).optional(),
  connect: z.lazy(() => RouteWhereUniqueInputSchema).optional()
}).strict();

export const StopPointCreateNestedOneWithoutRouteStopPointInputSchema: z.ZodType<Prisma.StopPointCreateNestedOneWithoutRouteStopPointInput> = z.object({
  create: z.union([ z.lazy(() => StopPointCreateWithoutRouteStopPointInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutRouteStopPointInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StopPointCreateOrConnectWithoutRouteStopPointInputSchema).optional(),
  connect: z.lazy(() => StopPointWhereUniqueInputSchema).optional()
}).strict();

export const EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRouteStopPoint_directionFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RouteStopPoint_directionSchema).optional()
}).strict();

export const RouteUpdateOneRequiredWithoutRouteStopPointNestedInputSchema: z.ZodType<Prisma.RouteUpdateOneRequiredWithoutRouteStopPointNestedInput> = z.object({
  create: z.union([ z.lazy(() => RouteCreateWithoutRouteStopPointInputSchema),z.lazy(() => RouteUncheckedCreateWithoutRouteStopPointInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RouteCreateOrConnectWithoutRouteStopPointInputSchema).optional(),
  upsert: z.lazy(() => RouteUpsertWithoutRouteStopPointInputSchema).optional(),
  connect: z.lazy(() => RouteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RouteUpdateToOneWithWhereWithoutRouteStopPointInputSchema),z.lazy(() => RouteUpdateWithoutRouteStopPointInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutRouteStopPointInputSchema) ]).optional(),
}).strict();

export const StopPointUpdateOneRequiredWithoutRouteStopPointNestedInputSchema: z.ZodType<Prisma.StopPointUpdateOneRequiredWithoutRouteStopPointNestedInput> = z.object({
  create: z.union([ z.lazy(() => StopPointCreateWithoutRouteStopPointInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutRouteStopPointInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StopPointCreateOrConnectWithoutRouteStopPointInputSchema).optional(),
  upsert: z.lazy(() => StopPointUpsertWithoutRouteStopPointInputSchema).optional(),
  connect: z.lazy(() => StopPointWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StopPointUpdateToOneWithWhereWithoutRouteStopPointInputSchema),z.lazy(() => StopPointUpdateWithoutRouteStopPointInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutRouteStopPointInputSchema) ]).optional(),
}).strict();

export const BusCreateNestedOneWithoutScheduleInputSchema: z.ZodType<Prisma.BusCreateNestedOneWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => BusCreateWithoutScheduleInputSchema),z.lazy(() => BusUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusCreateOrConnectWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => BusWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutScheduleInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutScheduleInputSchema),z.lazy(() => UserUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RouteCreateNestedOneWithoutScheduleInputSchema: z.ZodType<Prisma.RouteCreateNestedOneWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => RouteCreateWithoutScheduleInputSchema),z.lazy(() => RouteUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RouteCreateOrConnectWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => RouteWhereUniqueInputSchema).optional()
}).strict();

export const TripCreateNestedManyWithoutScheduleInputSchema: z.ZodType<Prisma.TripCreateNestedManyWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutScheduleInputSchema),z.lazy(() => TripCreateWithoutScheduleInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => TripCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyScheduleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripUncheckedCreateNestedManyWithoutScheduleInputSchema: z.ZodType<Prisma.TripUncheckedCreateNestedManyWithoutScheduleInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutScheduleInputSchema),z.lazy(() => TripCreateWithoutScheduleInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => TripCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyScheduleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumSchedule_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSchedule_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => Schedule_typeSchema).optional()
}).strict();

export const NullableEnumSchedule_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumSchedule_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => Schedule_statusSchema).optional().nullable()
}).strict();

export const BusUpdateOneRequiredWithoutScheduleNestedInputSchema: z.ZodType<Prisma.BusUpdateOneRequiredWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => BusCreateWithoutScheduleInputSchema),z.lazy(() => BusUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusCreateOrConnectWithoutScheduleInputSchema).optional(),
  upsert: z.lazy(() => BusUpsertWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => BusWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BusUpdateToOneWithWhereWithoutScheduleInputSchema),z.lazy(() => BusUpdateWithoutScheduleInputSchema),z.lazy(() => BusUncheckedUpdateWithoutScheduleInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutScheduleNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutScheduleInputSchema),z.lazy(() => UserUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutScheduleInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutScheduleInputSchema),z.lazy(() => UserUpdateWithoutScheduleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutScheduleInputSchema) ]).optional(),
}).strict();

export const RouteUpdateOneRequiredWithoutScheduleNestedInputSchema: z.ZodType<Prisma.RouteUpdateOneRequiredWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RouteCreateWithoutScheduleInputSchema),z.lazy(() => RouteUncheckedCreateWithoutScheduleInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RouteCreateOrConnectWithoutScheduleInputSchema).optional(),
  upsert: z.lazy(() => RouteUpsertWithoutScheduleInputSchema).optional(),
  connect: z.lazy(() => RouteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RouteUpdateToOneWithWhereWithoutScheduleInputSchema),z.lazy(() => RouteUpdateWithoutScheduleInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutScheduleInputSchema) ]).optional(),
}).strict();

export const TripUpdateManyWithoutScheduleNestedInputSchema: z.ZodType<Prisma.TripUpdateManyWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutScheduleInputSchema),z.lazy(() => TripCreateWithoutScheduleInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => TripCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripUpsertWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => TripUpsertWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyScheduleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => TripUpdateWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripUpdateManyWithWhereWithoutScheduleInputSchema),z.lazy(() => TripUpdateManyWithWhereWithoutScheduleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripUncheckedUpdateManyWithoutScheduleNestedInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyWithoutScheduleNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutScheduleInputSchema),z.lazy(() => TripCreateWithoutScheduleInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutScheduleInputSchema),z.lazy(() => TripCreateOrConnectWithoutScheduleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripUpsertWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => TripUpsertWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyScheduleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithWhereUniqueWithoutScheduleInputSchema),z.lazy(() => TripUpdateWithWhereUniqueWithoutScheduleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripUpdateManyWithWhereWithoutScheduleInputSchema),z.lazy(() => TripUpdateManyWithWhereWithoutScheduleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RouteStopPointCreateNestedManyWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointCreateNestedManyWithoutStopPointInput> = z.object({
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema).array(),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RouteStopPointCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => RouteStopPointCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RouteStopPointCreateManyStopPointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentCreateNestedManyWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentCreateNestedManyWithoutStopPointInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyStopPointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripStopCreateNestedManyWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopCreateNestedManyWithoutStopPointInput> = z.object({
  create: z.union([ z.lazy(() => TripStopCreateWithoutStopPointInputSchema),z.lazy(() => TripStopCreateWithoutStopPointInputSchema).array(),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripStopCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => TripStopCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripStopCreateManyStopPointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RouteStopPointUncheckedCreateNestedManyWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedCreateNestedManyWithoutStopPointInput> = z.object({
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema).array(),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RouteStopPointCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => RouteStopPointCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RouteStopPointCreateManyStopPointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentUncheckedCreateNestedManyWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedCreateNestedManyWithoutStopPointInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyStopPointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripStopUncheckedCreateNestedManyWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopUncheckedCreateNestedManyWithoutStopPointInput> = z.object({
  create: z.union([ z.lazy(() => TripStopCreateWithoutStopPointInputSchema),z.lazy(() => TripStopCreateWithoutStopPointInputSchema).array(),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripStopCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => TripStopCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripStopCreateManyStopPointInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RouteStopPointUpdateManyWithoutStopPointNestedInputSchema: z.ZodType<Prisma.RouteStopPointUpdateManyWithoutStopPointNestedInput> = z.object({
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema).array(),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RouteStopPointCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => RouteStopPointCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RouteStopPointUpsertWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUpsertWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RouteStopPointCreateManyStopPointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RouteStopPointUpdateWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUpdateWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RouteStopPointUpdateManyWithWhereWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUpdateManyWithWhereWithoutStopPointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RouteStopPointScalarWhereInputSchema),z.lazy(() => RouteStopPointScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentUpdateManyWithoutStopPointNestedInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateManyWithoutStopPointNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyStopPointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutStopPointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAssignmentScalarWhereInputSchema),z.lazy(() => StudentAssignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripStopUpdateManyWithoutStopPointNestedInputSchema: z.ZodType<Prisma.TripStopUpdateManyWithoutStopPointNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripStopCreateWithoutStopPointInputSchema),z.lazy(() => TripStopCreateWithoutStopPointInputSchema).array(),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripStopCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => TripStopCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripStopUpsertWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => TripStopUpsertWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripStopCreateManyStopPointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripStopUpdateWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => TripStopUpdateWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripStopUpdateManyWithWhereWithoutStopPointInputSchema),z.lazy(() => TripStopUpdateManyWithWhereWithoutStopPointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripStopScalarWhereInputSchema),z.lazy(() => TripStopScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RouteStopPointUncheckedUpdateManyWithoutStopPointNestedInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedUpdateManyWithoutStopPointNestedInput> = z.object({
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema).array(),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RouteStopPointCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => RouteStopPointCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RouteStopPointUpsertWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUpsertWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RouteStopPointCreateManyStopPointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RouteStopPointWhereUniqueInputSchema),z.lazy(() => RouteStopPointWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RouteStopPointUpdateWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUpdateWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RouteStopPointUpdateManyWithWhereWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUpdateManyWithWhereWithoutStopPointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RouteStopPointScalarWhereInputSchema),z.lazy(() => RouteStopPointScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentUncheckedUpdateManyWithoutStopPointNestedInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateManyWithoutStopPointNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyStopPointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutStopPointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAssignmentScalarWhereInputSchema),z.lazy(() => StudentAssignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripStopUncheckedUpdateManyWithoutStopPointNestedInputSchema: z.ZodType<Prisma.TripStopUncheckedUpdateManyWithoutStopPointNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripStopCreateWithoutStopPointInputSchema),z.lazy(() => TripStopCreateWithoutStopPointInputSchema).array(),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripStopCreateOrConnectWithoutStopPointInputSchema),z.lazy(() => TripStopCreateOrConnectWithoutStopPointInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripStopUpsertWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => TripStopUpsertWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripStopCreateManyStopPointInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripStopUpdateWithWhereUniqueWithoutStopPointInputSchema),z.lazy(() => TripStopUpdateWithWhereUniqueWithoutStopPointInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripStopUpdateManyWithWhereWithoutStopPointInputSchema),z.lazy(() => TripStopUpdateManyWithWhereWithoutStopPointInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripStopScalarWhereInputSchema),z.lazy(() => TripStopScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutStudentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStudentInputSchema),z.lazy(() => UserUncheckedCreateWithoutStudentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStudentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StudentAssignmentCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAttendanceCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema).array(),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAttendanceCreateOrConnectWithoutStudentInputSchema),z.lazy(() => StudentAttendanceCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAttendanceCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAttendanceUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema).array(),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAttendanceCreateOrConnectWithoutStudentInputSchema),z.lazy(() => StudentAttendanceCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAttendanceCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutStudentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStudentInputSchema),z.lazy(() => UserUncheckedCreateWithoutStudentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStudentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStudentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutStudentInputSchema),z.lazy(() => UserUpdateWithoutStudentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStudentInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAssignmentScalarWhereInputSchema),z.lazy(() => StudentAssignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAttendanceUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema).array(),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAttendanceCreateOrConnectWithoutStudentInputSchema),z.lazy(() => StudentAttendanceCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAttendanceUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAttendanceCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAttendanceUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAttendanceUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAttendanceScalarWhereInputSchema),z.lazy(() => StudentAttendanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAssignmentUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema).array(),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAssignmentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => StudentAssignmentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAssignmentCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAssignmentWhereUniqueInputSchema),z.lazy(() => StudentAssignmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAssignmentScalarWhereInputSchema),z.lazy(() => StudentAssignmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAttendanceUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema).array(),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAttendanceCreateOrConnectWithoutStudentInputSchema),z.lazy(() => StudentAttendanceCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAttendanceUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAttendanceCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAttendanceUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAttendanceUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAttendanceScalarWhereInputSchema),z.lazy(() => StudentAttendanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RouteCreateNestedOneWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.RouteCreateNestedOneWithoutStudentAssignmentInput> = z.object({
  create: z.union([ z.lazy(() => RouteCreateWithoutStudentAssignmentInputSchema),z.lazy(() => RouteUncheckedCreateWithoutStudentAssignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RouteCreateOrConnectWithoutStudentAssignmentInputSchema).optional(),
  connect: z.lazy(() => RouteWhereUniqueInputSchema).optional()
}).strict();

export const StopPointCreateNestedOneWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StopPointCreateNestedOneWithoutStudentAssignmentInput> = z.object({
  create: z.union([ z.lazy(() => StopPointCreateWithoutStudentAssignmentInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutStudentAssignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StopPointCreateOrConnectWithoutStudentAssignmentInputSchema).optional(),
  connect: z.lazy(() => StopPointWhereUniqueInputSchema).optional()
}).strict();

export const StudentCreateNestedOneWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutStudentAssignmentInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutStudentAssignmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutStudentAssignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutStudentAssignmentInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const EnumStudentAssignment_directionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStudentAssignment_directionFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StudentAssignment_directionSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const RouteUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema: z.ZodType<Prisma.RouteUpdateOneRequiredWithoutStudentAssignmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => RouteCreateWithoutStudentAssignmentInputSchema),z.lazy(() => RouteUncheckedCreateWithoutStudentAssignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RouteCreateOrConnectWithoutStudentAssignmentInputSchema).optional(),
  upsert: z.lazy(() => RouteUpsertWithoutStudentAssignmentInputSchema).optional(),
  connect: z.lazy(() => RouteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RouteUpdateToOneWithWhereWithoutStudentAssignmentInputSchema),z.lazy(() => RouteUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutStudentAssignmentInputSchema) ]).optional(),
}).strict();

export const StopPointUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema: z.ZodType<Prisma.StopPointUpdateOneRequiredWithoutStudentAssignmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StopPointCreateWithoutStudentAssignmentInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutStudentAssignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StopPointCreateOrConnectWithoutStudentAssignmentInputSchema).optional(),
  upsert: z.lazy(() => StopPointUpsertWithoutStudentAssignmentInputSchema).optional(),
  connect: z.lazy(() => StopPointWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StopPointUpdateToOneWithWhereWithoutStudentAssignmentInputSchema),z.lazy(() => StopPointUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutStudentAssignmentInputSchema) ]).optional(),
}).strict();

export const StudentUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneRequiredWithoutStudentAssignmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutStudentAssignmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutStudentAssignmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutStudentAssignmentInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutStudentAssignmentInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutStudentAssignmentInputSchema),z.lazy(() => StudentUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutStudentAssignmentInputSchema) ]).optional(),
}).strict();

export const StudentCreateNestedOneWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutStudentAttendanceInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutStudentAttendanceInputSchema),z.lazy(() => StudentUncheckedCreateWithoutStudentAttendanceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutStudentAttendanceInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const TripCreateNestedOneWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutStudentAttendanceInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutStudentAttendanceInputSchema),z.lazy(() => TripUncheckedCreateWithoutStudentAttendanceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutStudentAttendanceInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumStudentAttendance_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StudentAttendance_statusSchema).optional().nullable()
}).strict();

export const StudentUpdateOneRequiredWithoutStudentAttendanceNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneRequiredWithoutStudentAttendanceNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutStudentAttendanceInputSchema),z.lazy(() => StudentUncheckedCreateWithoutStudentAttendanceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutStudentAttendanceInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutStudentAttendanceInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutStudentAttendanceInputSchema),z.lazy(() => StudentUpdateWithoutStudentAttendanceInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutStudentAttendanceInputSchema) ]).optional(),
}).strict();

export const TripUpdateOneRequiredWithoutStudentAttendanceNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutStudentAttendanceNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutStudentAttendanceInputSchema),z.lazy(() => TripUncheckedCreateWithoutStudentAttendanceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutStudentAttendanceInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutStudentAttendanceInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateToOneWithWhereWithoutStudentAttendanceInputSchema),z.lazy(() => TripUpdateWithoutStudentAttendanceInputSchema),z.lazy(() => TripUncheckedUpdateWithoutStudentAttendanceInputSchema) ]).optional(),
}).strict();

export const TripCreateNestedOneWithoutTrackingBusHistoryInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutTrackingBusHistoryInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutTrackingBusHistoryInputSchema),z.lazy(() => TripUncheckedCreateWithoutTrackingBusHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutTrackingBusHistoryInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const TripUpdateOneRequiredWithoutTrackingBusHistoryNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutTrackingBusHistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutTrackingBusHistoryInputSchema),z.lazy(() => TripUncheckedCreateWithoutTrackingBusHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutTrackingBusHistoryInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutTrackingBusHistoryInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateToOneWithWhereWithoutTrackingBusHistoryInputSchema),z.lazy(() => TripUpdateWithoutTrackingBusHistoryInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTrackingBusHistoryInputSchema) ]).optional(),
}).strict();

export const ReportCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.ReportCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutTripInputSchema),z.lazy(() => ReportCreateWithoutTripInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutTripInputSchema),z.lazy(() => ReportCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAttendanceCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema).array(),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAttendanceCreateOrConnectWithoutTripInputSchema),z.lazy(() => StudentAttendanceCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAttendanceCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TrackingBusHistoryCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema).array(),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TrackingBusHistoryCreateOrConnectWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TrackingBusHistoryCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScheduleCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.ScheduleCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutTripInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ScheduleCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => ScheduleWhereUniqueInputSchema).optional()
}).strict();

export const TripStopCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.TripStopCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => TripStopCreateWithoutTripInputSchema),z.lazy(() => TripStopCreateWithoutTripInputSchema).array(),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripStopCreateOrConnectWithoutTripInputSchema),z.lazy(() => TripStopCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripStopCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.ReportUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutTripInputSchema),z.lazy(() => ReportCreateWithoutTripInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutTripInputSchema),z.lazy(() => ReportCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentAttendanceUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema).array(),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAttendanceCreateOrConnectWithoutTripInputSchema),z.lazy(() => StudentAttendanceCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAttendanceCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TrackingBusHistoryUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema).array(),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TrackingBusHistoryCreateOrConnectWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TrackingBusHistoryCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripStopUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.TripStopUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => TripStopCreateWithoutTripInputSchema),z.lazy(() => TripStopCreateWithoutTripInputSchema).array(),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripStopCreateOrConnectWithoutTripInputSchema),z.lazy(() => TripStopCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripStopCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumTrip_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumTrip_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => Trip_statusSchema).optional().nullable()
}).strict();

export const EnumTrip_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTrip_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => Trip_typeSchema).optional()
}).strict();

export const ReportUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.ReportUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutTripInputSchema),z.lazy(() => ReportCreateWithoutTripInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutTripInputSchema),z.lazy(() => ReportCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAttendanceUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema).array(),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAttendanceCreateOrConnectWithoutTripInputSchema),z.lazy(() => StudentAttendanceCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAttendanceUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => StudentAttendanceUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAttendanceCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAttendanceUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => StudentAttendanceUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAttendanceUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => StudentAttendanceUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAttendanceScalarWhereInputSchema),z.lazy(() => StudentAttendanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TrackingBusHistoryUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.TrackingBusHistoryUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema).array(),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TrackingBusHistoryCreateOrConnectWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TrackingBusHistoryUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TrackingBusHistoryCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TrackingBusHistoryUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TrackingBusHistoryUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TrackingBusHistoryScalarWhereInputSchema),z.lazy(() => TrackingBusHistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUpdateOneRequiredWithoutTripNestedInputSchema: z.ZodType<Prisma.ScheduleUpdateOneRequiredWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutTripInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ScheduleCreateOrConnectWithoutTripInputSchema).optional(),
  upsert: z.lazy(() => ScheduleUpsertWithoutTripInputSchema).optional(),
  connect: z.lazy(() => ScheduleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ScheduleUpdateToOneWithWhereWithoutTripInputSchema),z.lazy(() => ScheduleUpdateWithoutTripInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutTripInputSchema) ]).optional(),
}).strict();

export const TripStopUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.TripStopUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripStopCreateWithoutTripInputSchema),z.lazy(() => TripStopCreateWithoutTripInputSchema).array(),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripStopCreateOrConnectWithoutTripInputSchema),z.lazy(() => TripStopCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripStopUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TripStopUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripStopCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripStopUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TripStopUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripStopUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => TripStopUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripStopScalarWhereInputSchema),z.lazy(() => TripStopScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutTripInputSchema),z.lazy(() => ReportCreateWithoutTripInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutTripInputSchema),z.lazy(() => ReportCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentAttendanceUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema).array(),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentAttendanceCreateOrConnectWithoutTripInputSchema),z.lazy(() => StudentAttendanceCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentAttendanceUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => StudentAttendanceUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentAttendanceCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentAttendanceWhereUniqueInputSchema),z.lazy(() => StudentAttendanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentAttendanceUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => StudentAttendanceUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentAttendanceUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => StudentAttendanceUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentAttendanceScalarWhereInputSchema),z.lazy(() => StudentAttendanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TrackingBusHistoryUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.TrackingBusHistoryUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema).array(),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TrackingBusHistoryCreateOrConnectWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TrackingBusHistoryUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TrackingBusHistoryCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TrackingBusHistoryUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TrackingBusHistoryUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TrackingBusHistoryScalarWhereInputSchema),z.lazy(() => TrackingBusHistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripStopUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.TripStopUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripStopCreateWithoutTripInputSchema),z.lazy(() => TripStopCreateWithoutTripInputSchema).array(),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripStopCreateOrConnectWithoutTripInputSchema),z.lazy(() => TripStopCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripStopUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TripStopUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripStopCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripStopWhereUniqueInputSchema),z.lazy(() => TripStopWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripStopUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TripStopUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripStopUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => TripStopUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripStopScalarWhereInputSchema),z.lazy(() => TripStopScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StopPointCreateNestedOneWithoutTripStopInputSchema: z.ZodType<Prisma.StopPointCreateNestedOneWithoutTripStopInput> = z.object({
  create: z.union([ z.lazy(() => StopPointCreateWithoutTripStopInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutTripStopInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StopPointCreateOrConnectWithoutTripStopInputSchema).optional(),
  connect: z.lazy(() => StopPointWhereUniqueInputSchema).optional()
}).strict();

export const TripCreateNestedOneWithoutTripStopInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutTripStopInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutTripStopInputSchema),z.lazy(() => TripUncheckedCreateWithoutTripStopInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutTripStopInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const NullableEnumTripStop_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumTripStop_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TripStop_statusSchema).optional().nullable()
}).strict();

export const StopPointUpdateOneRequiredWithoutTripStopNestedInputSchema: z.ZodType<Prisma.StopPointUpdateOneRequiredWithoutTripStopNestedInput> = z.object({
  create: z.union([ z.lazy(() => StopPointCreateWithoutTripStopInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutTripStopInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StopPointCreateOrConnectWithoutTripStopInputSchema).optional(),
  upsert: z.lazy(() => StopPointUpsertWithoutTripStopInputSchema).optional(),
  connect: z.lazy(() => StopPointWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StopPointUpdateToOneWithWhereWithoutTripStopInputSchema),z.lazy(() => StopPointUpdateWithoutTripStopInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutTripStopInputSchema) ]).optional(),
}).strict();

export const TripUpdateOneRequiredWithoutTripStopNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutTripStopNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutTripStopInputSchema),z.lazy(() => TripUncheckedCreateWithoutTripStopInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutTripStopInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutTripStopInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateToOneWithWhereWithoutTripStopInputSchema),z.lazy(() => TripUpdateWithoutTripStopInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTripStopInputSchema) ]).optional(),
}).strict();

export const ReportCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScheduleCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ScheduleCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutUserInputSchema),z.lazy(() => ScheduleCreateWithoutUserInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutUserInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const UserRolesCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserRolesCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutUserInputSchema),z.lazy(() => ScheduleCreateWithoutUserInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutUserInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StudentUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const UserRolesUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReportUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ScheduleUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutUserInputSchema),z.lazy(() => ScheduleCreateWithoutUserInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutUserInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScheduleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ScheduleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScheduleScalarWhereInputSchema),z.lazy(() => ScheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => StudentUpdateWithoutUserInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserRolesUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserRolesUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRolesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserRolesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScheduleUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScheduleCreateWithoutUserInputSchema),z.lazy(() => ScheduleCreateWithoutUserInputSchema).array(),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScheduleCreateOrConnectWithoutUserInputSchema),z.lazy(() => ScheduleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ScheduleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScheduleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScheduleWhereUniqueInputSchema),z.lazy(() => ScheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ScheduleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScheduleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ScheduleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScheduleScalarWhereInputSchema),z.lazy(() => ScheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => StudentUpdateWithoutUserInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRolesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRolesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRolesWhereUniqueInputSchema),z.lazy(() => UserRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRolesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRolesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserRolesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolesCreateNestedOneWithoutUserRolesInputSchema: z.ZodType<Prisma.RolesCreateNestedOneWithoutUserRolesInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUserRolesInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutUserRolesInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutUserRolesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserRolesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserRolesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RolesUpdateOneRequiredWithoutUserRolesNestedInputSchema: z.ZodType<Prisma.RolesUpdateOneRequiredWithoutUserRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUserRolesInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutUserRolesInputSchema).optional(),
  upsert: z.lazy(() => RolesUpsertWithoutUserRolesInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RolesUpdateToOneWithWhereWithoutUserRolesInputSchema),z.lazy(() => RolesUpdateWithoutUserRolesInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserRolesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutUserRolesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserRolesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserRolesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUserRolesInputSchema),z.lazy(() => UserUpdateWithoutUserRolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserRolesInputSchema) ]).optional(),
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

export const NestedEnumBus_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumBus_statusNullableFilter> = z.object({
  equals: z.lazy(() => Bus_statusSchema).optional().nullable(),
  in: z.lazy(() => Bus_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Bus_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NestedEnumBus_statusNullableFilterSchema) ]).optional().nullable(),
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

export const NestedEnumBus_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBus_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Bus_statusSchema).optional().nullable(),
  in: z.lazy(() => Bus_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Bus_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NestedEnumBus_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBus_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBus_statusNullableFilterSchema).optional()
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

export const NestedEnumRouteStopPoint_directionFilterSchema: z.ZodType<Prisma.NestedEnumRouteStopPoint_directionFilter> = z.object({
  equals: z.lazy(() => RouteStopPoint_directionSchema).optional(),
  in: z.lazy(() => RouteStopPoint_directionSchema).array().optional(),
  notIn: z.lazy(() => RouteStopPoint_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => NestedEnumRouteStopPoint_directionFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRouteStopPoint_directionWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRouteStopPoint_directionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RouteStopPoint_directionSchema).optional(),
  in: z.lazy(() => RouteStopPoint_directionSchema).array().optional(),
  notIn: z.lazy(() => RouteStopPoint_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => NestedEnumRouteStopPoint_directionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRouteStopPoint_directionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRouteStopPoint_directionFilterSchema).optional()
}).strict();

export const NestedEnumSchedule_typeFilterSchema: z.ZodType<Prisma.NestedEnumSchedule_typeFilter> = z.object({
  equals: z.lazy(() => Schedule_typeSchema).optional(),
  in: z.lazy(() => Schedule_typeSchema).array().optional(),
  notIn: z.lazy(() => Schedule_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => NestedEnumSchedule_typeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSchedule_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumSchedule_statusNullableFilter> = z.object({
  equals: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  in: z.lazy(() => Schedule_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Schedule_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NestedEnumSchedule_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumSchedule_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSchedule_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Schedule_typeSchema).optional(),
  in: z.lazy(() => Schedule_typeSchema).array().optional(),
  notIn: z.lazy(() => Schedule_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => NestedEnumSchedule_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSchedule_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSchedule_typeFilterSchema).optional()
}).strict();

export const NestedEnumSchedule_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSchedule_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  in: z.lazy(() => Schedule_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Schedule_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NestedEnumSchedule_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSchedule_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSchedule_statusNullableFilterSchema).optional()
}).strict();

export const NestedEnumStudentAssignment_directionFilterSchema: z.ZodType<Prisma.NestedEnumStudentAssignment_directionFilter> = z.object({
  equals: z.lazy(() => StudentAssignment_directionSchema).optional(),
  in: z.lazy(() => StudentAssignment_directionSchema).array().optional(),
  notIn: z.lazy(() => StudentAssignment_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => NestedEnumStudentAssignment_directionFilterSchema) ]).optional(),
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

export const NestedEnumStudentAssignment_directionWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStudentAssignment_directionWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StudentAssignment_directionSchema).optional(),
  in: z.lazy(() => StudentAssignment_directionSchema).array().optional(),
  notIn: z.lazy(() => StudentAssignment_directionSchema).array().optional(),
  not: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => NestedEnumStudentAssignment_directionWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStudentAssignment_directionFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStudentAssignment_directionFilterSchema).optional()
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

export const NestedEnumStudentAttendance_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumStudentAttendance_statusNullableFilter> = z.object({
  equals: z.lazy(() => StudentAttendance_statusSchema).optional().nullable(),
  in: z.lazy(() => StudentAttendance_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => StudentAttendance_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NestedEnumStudentAttendance_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumStudentAttendance_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStudentAttendance_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StudentAttendance_statusSchema).optional().nullable(),
  in: z.lazy(() => StudentAttendance_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => StudentAttendance_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NestedEnumStudentAttendance_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStudentAttendance_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStudentAttendance_statusNullableFilterSchema).optional()
}).strict();

export const NestedEnumTrip_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumTrip_statusNullableFilter> = z.object({
  equals: z.lazy(() => Trip_statusSchema).optional().nullable(),
  in: z.lazy(() => Trip_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Trip_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NestedEnumTrip_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumTrip_typeFilterSchema: z.ZodType<Prisma.NestedEnumTrip_typeFilter> = z.object({
  equals: z.lazy(() => Trip_typeSchema).optional(),
  in: z.lazy(() => Trip_typeSchema).array().optional(),
  notIn: z.lazy(() => Trip_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => NestedEnumTrip_typeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTrip_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTrip_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Trip_statusSchema).optional().nullable(),
  in: z.lazy(() => Trip_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => Trip_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NestedEnumTrip_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTrip_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTrip_statusNullableFilterSchema).optional()
}).strict();

export const NestedEnumTrip_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTrip_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Trip_typeSchema).optional(),
  in: z.lazy(() => Trip_typeSchema).array().optional(),
  notIn: z.lazy(() => Trip_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => NestedEnumTrip_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTrip_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTrip_typeFilterSchema).optional()
}).strict();

export const NestedEnumTripStop_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumTripStop_statusNullableFilter> = z.object({
  equals: z.lazy(() => TripStop_statusSchema).optional().nullable(),
  in: z.lazy(() => TripStop_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => TripStop_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NestedEnumTripStop_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumTripStop_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTripStop_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TripStop_statusSchema).optional().nullable(),
  in: z.lazy(() => TripStop_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => TripStop_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NestedEnumTripStop_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTripStop_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTripStop_statusNullableFilterSchema).optional()
}).strict();

export const ScheduleCreateWithoutBusInputSchema: z.ZodType<Prisma.ScheduleCreateWithoutBusInput> = z.object({
  id: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutScheduleInputSchema),
  Route: z.lazy(() => RouteCreateNestedOneWithoutScheduleInputSchema),
  Trip: z.lazy(() => TripCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const ScheduleUncheckedCreateWithoutBusInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateWithoutBusInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Trip: z.lazy(() => TripUncheckedCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const ScheduleCreateOrConnectWithoutBusInputSchema: z.ZodType<Prisma.ScheduleCreateOrConnectWithoutBusInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScheduleCreateWithoutBusInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema) ]),
}).strict();

export const ScheduleCreateManyBusInputEnvelopeSchema: z.ZodType<Prisma.ScheduleCreateManyBusInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ScheduleCreateManyBusInputSchema),z.lazy(() => ScheduleCreateManyBusInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ScheduleUpsertWithWhereUniqueWithoutBusInputSchema: z.ZodType<Prisma.ScheduleUpsertWithWhereUniqueWithoutBusInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ScheduleUpdateWithoutBusInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutBusInputSchema) ]),
  create: z.union([ z.lazy(() => ScheduleCreateWithoutBusInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutBusInputSchema) ]),
}).strict();

export const ScheduleUpdateWithWhereUniqueWithoutBusInputSchema: z.ZodType<Prisma.ScheduleUpdateWithWhereUniqueWithoutBusInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ScheduleUpdateWithoutBusInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutBusInputSchema) ]),
}).strict();

export const ScheduleUpdateManyWithWhereWithoutBusInputSchema: z.ZodType<Prisma.ScheduleUpdateManyWithWhereWithoutBusInput> = z.object({
  where: z.lazy(() => ScheduleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ScheduleUpdateManyMutationInputSchema),z.lazy(() => ScheduleUncheckedUpdateManyWithoutBusInputSchema) ]),
}).strict();

export const ScheduleScalarWhereInputSchema: z.ZodType<Prisma.ScheduleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScheduleScalarWhereInputSchema),z.lazy(() => ScheduleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScheduleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScheduleScalarWhereInputSchema),z.lazy(() => ScheduleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  busId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  driverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSchedule_typeFilterSchema),z.lazy(() => Schedule_typeSchema) ]).optional(),
  daysOfWeek: z.lazy(() => JsonFilterSchema).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumSchedule_statusNullableFilterSchema),z.lazy(() => Schedule_statusSchema) ]).optional().nullable(),
  meta: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RolePermissionsCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsCreateWithoutPermissionInput> = z.object({
  Roles: z.lazy(() => RolesCreateNestedOneWithoutRolePermissionsInputSchema)
}).strict();

export const RolePermissionsUncheckedCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateWithoutPermissionInput> = z.object({
  roleId: z.number().int()
}).strict();

export const RolePermissionsCreateOrConnectWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsCreateOrConnectWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionsCreateManyPermissionInputEnvelopeSchema: z.ZodType<Prisma.RolePermissionsCreateManyPermissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolePermissionsCreateManyPermissionInputSchema),z.lazy(() => RolePermissionsCreateManyPermissionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RolePermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUpsertWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUpdateWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolePermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionsUpdateManyWithWhereWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyWithWhereWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolePermissionsUpdateManyMutationInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionsScalarWhereInputSchema: z.ZodType<Prisma.RolePermissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionsScalarWhereInputSchema),z.lazy(() => RolePermissionsScalarWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutReportInputSchema: z.ZodType<Prisma.UserCreateWithoutReportInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedManyWithoutUserInputSchema).optional(),
  Student: z.lazy(() => StudentCreateNestedOneWithoutUserInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Schedule: z.lazy(() => ScheduleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Student: z.lazy(() => StudentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const TripCreateWithoutReportInputSchema: z.ZodType<Prisma.TripCreateWithoutReportInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  StudentAttendance: z.lazy(() => StudentAttendanceCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryCreateNestedManyWithoutTripInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedOneWithoutTripInputSchema),
  TripStop: z.lazy(() => TripStopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutReportInputSchema),z.lazy(() => TripUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const UserUpsertWithoutReportInputSchema: z.ZodType<Prisma.UserUpsertWithoutReportInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReportInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReportInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReportInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const UserUpdateWithoutReportInputSchema: z.ZodType<Prisma.UserUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Schedule: z.lazy(() => ScheduleUpdateManyWithoutUserNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUpdateOneWithoutUserNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TripUpsertWithoutReportInputSchema: z.ZodType<Prisma.TripUpsertWithoutReportInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutReportInputSchema),z.lazy(() => TripUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutReportInputSchema),z.lazy(() => TripUncheckedCreateWithoutReportInputSchema) ]),
  where: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripUpdateToOneWithWhereWithoutReportInputSchema: z.ZodType<Prisma.TripUpdateToOneWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => TripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TripUpdateWithoutReportInputSchema),z.lazy(() => TripUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const TripUpdateWithoutReportInputSchema: z.ZodType<Prisma.TripUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const PermissionCreateWithoutRolePermissionsInputSchema: z.ZodType<Prisma.PermissionCreateWithoutRolePermissionsInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionUncheckedCreateWithoutRolePermissionsInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutRolePermissionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionCreateOrConnectWithoutRolePermissionsInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutRolePermissionsInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolePermissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolePermissionsInputSchema) ]),
}).strict();

export const RolesCreateWithoutRolePermissionsInputSchema: z.ZodType<Prisma.RolesCreateWithoutRolePermissionsInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  UserRoles: z.lazy(() => UserRolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUncheckedCreateWithoutRolePermissionsInputSchema: z.ZodType<Prisma.RolesUncheckedCreateWithoutRolePermissionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesCreateOrConnectWithoutRolePermissionsInputSchema: z.ZodType<Prisma.RolesCreateOrConnectWithoutRolePermissionsInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesCreateWithoutRolePermissionsInputSchema),z.lazy(() => RolesUncheckedCreateWithoutRolePermissionsInputSchema) ]),
}).strict();

export const PermissionUpsertWithoutRolePermissionsInputSchema: z.ZodType<Prisma.PermissionUpsertWithoutRolePermissionsInput> = z.object({
  update: z.union([ z.lazy(() => PermissionUpdateWithoutRolePermissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolePermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolePermissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolePermissionsInputSchema) ]),
  where: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionUpdateToOneWithWhereWithoutRolePermissionsInputSchema: z.ZodType<Prisma.PermissionUpdateToOneWithWhereWithoutRolePermissionsInput> = z.object({
  where: z.lazy(() => PermissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutRolePermissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolePermissionsInputSchema) ]),
}).strict();

export const PermissionUpdateWithoutRolePermissionsInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutRolePermissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateWithoutRolePermissionsInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutRolePermissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesUpsertWithoutRolePermissionsInputSchema: z.ZodType<Prisma.RolesUpsertWithoutRolePermissionsInput> = z.object({
  update: z.union([ z.lazy(() => RolesUpdateWithoutRolePermissionsInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutRolePermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => RolesCreateWithoutRolePermissionsInputSchema),z.lazy(() => RolesUncheckedCreateWithoutRolePermissionsInputSchema) ]),
  where: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const RolesUpdateToOneWithWhereWithoutRolePermissionsInputSchema: z.ZodType<Prisma.RolesUpdateToOneWithWhereWithoutRolePermissionsInput> = z.object({
  where: z.lazy(() => RolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RolesUpdateWithoutRolePermissionsInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutRolePermissionsInputSchema) ]),
}).strict();

export const RolesUpdateWithoutRolePermissionsInputSchema: z.ZodType<Prisma.RolesUpdateWithoutRolePermissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  UserRoles: z.lazy(() => UserRolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateWithoutRolePermissionsInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateWithoutRolePermissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolePermissionsCreateWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsCreateWithoutRolesInput> = z.object({
  Permission: z.lazy(() => PermissionCreateNestedOneWithoutRolePermissionsInputSchema)
}).strict();

export const RolePermissionsUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedCreateWithoutRolesInput> = z.object({
  permissionId: z.number().int()
}).strict();

export const RolePermissionsCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const RolePermissionsCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.RolePermissionsCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolePermissionsCreateManyRolesInputSchema),z.lazy(() => RolePermissionsCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserRolesCreateWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesCreateWithoutRolesInput> = z.object({
  User: z.lazy(() => UserCreateNestedOneWithoutUserRolesInputSchema)
}).strict();

export const UserRolesUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateWithoutRolesInput> = z.object({
  userId: z.string()
}).strict();

export const UserRolesCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRolesInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const UserRolesCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.UserRolesCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserRolesCreateManyRolesInputSchema),z.lazy(() => UserRolesCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RolePermissionsUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolePermissionsUpdateWithoutRolesInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => RolePermissionsCreateWithoutRolesInputSchema),z.lazy(() => RolePermissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const RolePermissionsUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => RolePermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolePermissionsUpdateWithoutRolesInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const RolePermissionsUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => RolePermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolePermissionsUpdateManyMutationInputSchema),z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const UserRolesUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserRolesUpdateWithoutRolesInputSchema),z.lazy(() => UserRolesUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => UserRolesCreateWithoutRolesInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const UserRolesUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserRolesUpdateWithoutRolesInputSchema),z.lazy(() => UserRolesUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const UserRolesUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => UserRolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserRolesUpdateManyMutationInputSchema),z.lazy(() => UserRolesUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const UserRolesScalarWhereInputSchema: z.ZodType<Prisma.UserRolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRolesScalarWhereInputSchema),z.lazy(() => UserRolesScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const RouteStopPointCreateWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointCreateWithoutRouteInput> = z.object({
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema),
  StopPoint: z.lazy(() => StopPointCreateNestedOneWithoutRouteStopPointInputSchema)
}).strict();

export const RouteStopPointUncheckedCreateWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedCreateWithoutRouteInput> = z.object({
  id: z.number().int().optional(),
  stopPointId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema)
}).strict();

export const RouteStopPointCreateOrConnectWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointCreateOrConnectWithoutRouteInput> = z.object({
  where: z.lazy(() => RouteStopPointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const RouteStopPointCreateManyRouteInputEnvelopeSchema: z.ZodType<Prisma.RouteStopPointCreateManyRouteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RouteStopPointCreateManyRouteInputSchema),z.lazy(() => RouteStopPointCreateManyRouteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ScheduleCreateWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleCreateWithoutRouteInput> = z.object({
  id: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Bus: z.lazy(() => BusCreateNestedOneWithoutScheduleInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutScheduleInputSchema),
  Trip: z.lazy(() => TripCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const ScheduleUncheckedCreateWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateWithoutRouteInput> = z.object({
  id: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Trip: z.lazy(() => TripUncheckedCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const ScheduleCreateOrConnectWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleCreateOrConnectWithoutRouteInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScheduleCreateWithoutRouteInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const ScheduleCreateManyRouteInputEnvelopeSchema: z.ZodType<Prisma.ScheduleCreateManyRouteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ScheduleCreateManyRouteInputSchema),z.lazy(() => ScheduleCreateManyRouteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StudentAssignmentCreateWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentCreateWithoutRouteInput> = z.object({
  id: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  StopPoint: z.lazy(() => StopPointCreateNestedOneWithoutStudentAssignmentInputSchema),
  Student: z.lazy(() => StudentCreateNestedOneWithoutStudentAssignmentInputSchema)
}).strict();

export const StudentAssignmentUncheckedCreateWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedCreateWithoutRouteInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentAssignmentCreateOrConnectWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentCreateOrConnectWithoutRouteInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const StudentAssignmentCreateManyRouteInputEnvelopeSchema: z.ZodType<Prisma.StudentAssignmentCreateManyRouteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StudentAssignmentCreateManyRouteInputSchema),z.lazy(() => StudentAssignmentCreateManyRouteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RouteStopPointUpsertWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointUpsertWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => RouteStopPointWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RouteStopPointUpdateWithoutRouteInputSchema),z.lazy(() => RouteStopPointUncheckedUpdateWithoutRouteInputSchema) ]),
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutRouteInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const RouteStopPointUpdateWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointUpdateWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => RouteStopPointWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RouteStopPointUpdateWithoutRouteInputSchema),z.lazy(() => RouteStopPointUncheckedUpdateWithoutRouteInputSchema) ]),
}).strict();

export const RouteStopPointUpdateManyWithWhereWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointUpdateManyWithWhereWithoutRouteInput> = z.object({
  where: z.lazy(() => RouteStopPointScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RouteStopPointUpdateManyMutationInputSchema),z.lazy(() => RouteStopPointUncheckedUpdateManyWithoutRouteInputSchema) ]),
}).strict();

export const RouteStopPointScalarWhereInputSchema: z.ZodType<Prisma.RouteStopPointScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RouteStopPointScalarWhereInputSchema),z.lazy(() => RouteStopPointScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RouteStopPointScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RouteStopPointScalarWhereInputSchema),z.lazy(() => RouteStopPointScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopPointId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sequence: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  direction: z.union([ z.lazy(() => EnumRouteStopPoint_directionFilterSchema),z.lazy(() => RouteStopPoint_directionSchema) ]).optional(),
}).strict();

export const ScheduleUpsertWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleUpsertWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ScheduleUpdateWithoutRouteInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutRouteInputSchema) ]),
  create: z.union([ z.lazy(() => ScheduleCreateWithoutRouteInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const ScheduleUpdateWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleUpdateWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ScheduleUpdateWithoutRouteInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutRouteInputSchema) ]),
}).strict();

export const ScheduleUpdateManyWithWhereWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleUpdateManyWithWhereWithoutRouteInput> = z.object({
  where: z.lazy(() => ScheduleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ScheduleUpdateManyMutationInputSchema),z.lazy(() => ScheduleUncheckedUpdateManyWithoutRouteInputSchema) ]),
}).strict();

export const StudentAssignmentUpsertWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentUpsertWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateWithoutRouteInputSchema) ]),
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutRouteInputSchema) ]),
}).strict();

export const StudentAssignmentUpdateWithWhereUniqueWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateWithWhereUniqueWithoutRouteInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StudentAssignmentUpdateWithoutRouteInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateWithoutRouteInputSchema) ]),
}).strict();

export const StudentAssignmentUpdateManyWithWhereWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateManyWithWhereWithoutRouteInput> = z.object({
  where: z.lazy(() => StudentAssignmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StudentAssignmentUpdateManyMutationInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutRouteInputSchema) ]),
}).strict();

export const StudentAssignmentScalarWhereInputSchema: z.ZodType<Prisma.StudentAssignmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentAssignmentScalarWhereInputSchema),z.lazy(() => StudentAssignmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentAssignmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentAssignmentScalarWhereInputSchema),z.lazy(() => StudentAssignmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  routeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  direction: z.union([ z.lazy(() => EnumStudentAssignment_directionFilterSchema),z.lazy(() => StudentAssignment_directionSchema) ]).optional(),
  effectiveFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  effectiveTo: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RouteCreateWithoutRouteStopPointInputSchema: z.ZodType<Prisma.RouteCreateWithoutRouteStopPointInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedManyWithoutRouteInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const RouteUncheckedCreateWithoutRouteStopPointInputSchema: z.ZodType<Prisma.RouteUncheckedCreateWithoutRouteStopPointInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Schedule: z.lazy(() => ScheduleUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const RouteCreateOrConnectWithoutRouteStopPointInputSchema: z.ZodType<Prisma.RouteCreateOrConnectWithoutRouteStopPointInput> = z.object({
  where: z.lazy(() => RouteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RouteCreateWithoutRouteStopPointInputSchema),z.lazy(() => RouteUncheckedCreateWithoutRouteStopPointInputSchema) ]),
}).strict();

export const StopPointCreateWithoutRouteStopPointInputSchema: z.ZodType<Prisma.StopPointCreateWithoutRouteStopPointInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutStopPointInputSchema).optional(),
  TripStop: z.lazy(() => TripStopCreateNestedManyWithoutStopPointInputSchema).optional()
}).strict();

export const StopPointUncheckedCreateWithoutRouteStopPointInputSchema: z.ZodType<Prisma.StopPointUncheckedCreateWithoutRouteStopPointInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutStopPointInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedCreateNestedManyWithoutStopPointInputSchema).optional()
}).strict();

export const StopPointCreateOrConnectWithoutRouteStopPointInputSchema: z.ZodType<Prisma.StopPointCreateOrConnectWithoutRouteStopPointInput> = z.object({
  where: z.lazy(() => StopPointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StopPointCreateWithoutRouteStopPointInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutRouteStopPointInputSchema) ]),
}).strict();

export const RouteUpsertWithoutRouteStopPointInputSchema: z.ZodType<Prisma.RouteUpsertWithoutRouteStopPointInput> = z.object({
  update: z.union([ z.lazy(() => RouteUpdateWithoutRouteStopPointInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutRouteStopPointInputSchema) ]),
  create: z.union([ z.lazy(() => RouteCreateWithoutRouteStopPointInputSchema),z.lazy(() => RouteUncheckedCreateWithoutRouteStopPointInputSchema) ]),
  where: z.lazy(() => RouteWhereInputSchema).optional()
}).strict();

export const RouteUpdateToOneWithWhereWithoutRouteStopPointInputSchema: z.ZodType<Prisma.RouteUpdateToOneWithWhereWithoutRouteStopPointInput> = z.object({
  where: z.lazy(() => RouteWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RouteUpdateWithoutRouteStopPointInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutRouteStopPointInputSchema) ]),
}).strict();

export const RouteUpdateWithoutRouteStopPointInputSchema: z.ZodType<Prisma.RouteUpdateWithoutRouteStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Schedule: z.lazy(() => ScheduleUpdateManyWithoutRouteNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const RouteUncheckedUpdateWithoutRouteStopPointInputSchema: z.ZodType<Prisma.RouteUncheckedUpdateWithoutRouteStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const StopPointUpsertWithoutRouteStopPointInputSchema: z.ZodType<Prisma.StopPointUpsertWithoutRouteStopPointInput> = z.object({
  update: z.union([ z.lazy(() => StopPointUpdateWithoutRouteStopPointInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutRouteStopPointInputSchema) ]),
  create: z.union([ z.lazy(() => StopPointCreateWithoutRouteStopPointInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutRouteStopPointInputSchema) ]),
  where: z.lazy(() => StopPointWhereInputSchema).optional()
}).strict();

export const StopPointUpdateToOneWithWhereWithoutRouteStopPointInputSchema: z.ZodType<Prisma.StopPointUpdateToOneWithWhereWithoutRouteStopPointInput> = z.object({
  where: z.lazy(() => StopPointWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StopPointUpdateWithoutRouteStopPointInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutRouteStopPointInputSchema) ]),
}).strict();

export const StopPointUpdateWithoutRouteStopPointInputSchema: z.ZodType<Prisma.StopPointUpdateWithoutRouteStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutStopPointNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUpdateManyWithoutStopPointNestedInputSchema).optional()
}).strict();

export const StopPointUncheckedUpdateWithoutRouteStopPointInputSchema: z.ZodType<Prisma.StopPointUncheckedUpdateWithoutRouteStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional()
}).strict();

export const BusCreateWithoutScheduleInputSchema: z.ZodType<Prisma.BusCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => Bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BusUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.BusUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  licensePlate: z.string(),
  capacity: z.number().int(),
  status: z.lazy(() => Bus_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BusCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.BusCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => BusWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusCreateWithoutScheduleInputSchema),z.lazy(() => BusUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const UserCreateWithoutScheduleInputSchema: z.ZodType<Prisma.UserCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional(),
  Student: z.lazy(() => StudentCreateNestedOneWithoutUserInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Student: z.lazy(() => StudentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutScheduleInputSchema),z.lazy(() => UserUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const RouteCreateWithoutScheduleInputSchema: z.ZodType<Prisma.RouteCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointCreateNestedManyWithoutRouteInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const RouteUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.RouteUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const RouteCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.RouteCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => RouteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RouteCreateWithoutScheduleInputSchema),z.lazy(() => RouteUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const TripCreateWithoutScheduleInputSchema: z.ZodType<Prisma.TripCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportCreateNestedManyWithoutTripInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryCreateNestedManyWithoutTripInputSchema).optional(),
  TripStop: z.lazy(() => TripStopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutScheduleInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutScheduleInputSchema),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const TripCreateManyScheduleInputEnvelopeSchema: z.ZodType<Prisma.TripCreateManyScheduleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TripCreateManyScheduleInputSchema),z.lazy(() => TripCreateManyScheduleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BusUpsertWithoutScheduleInputSchema: z.ZodType<Prisma.BusUpsertWithoutScheduleInput> = z.object({
  update: z.union([ z.lazy(() => BusUpdateWithoutScheduleInputSchema),z.lazy(() => BusUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => BusCreateWithoutScheduleInputSchema),z.lazy(() => BusUncheckedCreateWithoutScheduleInputSchema) ]),
  where: z.lazy(() => BusWhereInputSchema).optional()
}).strict();

export const BusUpdateToOneWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.BusUpdateToOneWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => BusWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BusUpdateWithoutScheduleInputSchema),z.lazy(() => BusUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export const BusUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.BusUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NullableEnumBus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BusUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.BusUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licensePlate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Bus_statusSchema),z.lazy(() => NullableEnumBus_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutScheduleInputSchema: z.ZodType<Prisma.UserUpsertWithoutScheduleInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutScheduleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutScheduleInputSchema),z.lazy(() => UserUncheckedCreateWithoutScheduleInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutScheduleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export const UserUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.UserUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUpdateOneWithoutUserNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RouteUpsertWithoutScheduleInputSchema: z.ZodType<Prisma.RouteUpsertWithoutScheduleInput> = z.object({
  update: z.union([ z.lazy(() => RouteUpdateWithoutScheduleInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => RouteCreateWithoutScheduleInputSchema),z.lazy(() => RouteUncheckedCreateWithoutScheduleInputSchema) ]),
  where: z.lazy(() => RouteWhereInputSchema).optional()
}).strict();

export const RouteUpdateToOneWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.RouteUpdateToOneWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => RouteWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RouteUpdateWithoutScheduleInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export const RouteUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.RouteUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUpdateManyWithoutRouteNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const RouteUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.RouteUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const TripUpsertWithWhereUniqueWithoutScheduleInputSchema: z.ZodType<Prisma.TripUpsertWithWhereUniqueWithoutScheduleInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TripUpdateWithoutScheduleInputSchema),z.lazy(() => TripUncheckedUpdateWithoutScheduleInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutScheduleInputSchema),z.lazy(() => TripUncheckedCreateWithoutScheduleInputSchema) ]),
}).strict();

export const TripUpdateWithWhereUniqueWithoutScheduleInputSchema: z.ZodType<Prisma.TripUpdateWithWhereUniqueWithoutScheduleInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TripUpdateWithoutScheduleInputSchema),z.lazy(() => TripUncheckedUpdateWithoutScheduleInputSchema) ]),
}).strict();

export const TripUpdateManyWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.TripUpdateManyWithWhereWithoutScheduleInput> = z.object({
  where: z.lazy(() => TripScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TripUpdateManyMutationInputSchema),z.lazy(() => TripUncheckedUpdateManyWithoutScheduleInputSchema) ]),
}).strict();

export const TripScalarWhereInputSchema: z.ZodType<Prisma.TripScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  actualStartTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualEndTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTrip_statusNullableFilterSchema),z.lazy(() => Trip_statusSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTrip_typeFilterSchema),z.lazy(() => Trip_typeSchema) ]).optional(),
}).strict();

export const RouteStopPointCreateWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointCreateWithoutStopPointInput> = z.object({
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema),
  Route: z.lazy(() => RouteCreateNestedOneWithoutRouteStopPointInputSchema)
}).strict();

export const RouteStopPointUncheckedCreateWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedCreateWithoutStopPointInput> = z.object({
  id: z.number().int().optional(),
  routeId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema)
}).strict();

export const RouteStopPointCreateOrConnectWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointCreateOrConnectWithoutStopPointInput> = z.object({
  where: z.lazy(() => RouteStopPointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema) ]),
}).strict();

export const RouteStopPointCreateManyStopPointInputEnvelopeSchema: z.ZodType<Prisma.RouteStopPointCreateManyStopPointInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RouteStopPointCreateManyStopPointInputSchema),z.lazy(() => RouteStopPointCreateManyStopPointInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StudentAssignmentCreateWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentCreateWithoutStopPointInput> = z.object({
  id: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Route: z.lazy(() => RouteCreateNestedOneWithoutStudentAssignmentInputSchema),
  Student: z.lazy(() => StudentCreateNestedOneWithoutStudentAssignmentInputSchema)
}).strict();

export const StudentAssignmentUncheckedCreateWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedCreateWithoutStopPointInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentAssignmentCreateOrConnectWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentCreateOrConnectWithoutStopPointInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema) ]),
}).strict();

export const StudentAssignmentCreateManyStopPointInputEnvelopeSchema: z.ZodType<Prisma.StudentAssignmentCreateManyStopPointInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StudentAssignmentCreateManyStopPointInputSchema),z.lazy(() => StudentAssignmentCreateManyStopPointInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TripStopCreateWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopCreateWithoutStopPointInput> = z.object({
  id: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable(),
  Trip: z.lazy(() => TripCreateNestedOneWithoutTripStopInputSchema)
}).strict();

export const TripStopUncheckedCreateWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopUncheckedCreateWithoutStopPointInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable()
}).strict();

export const TripStopCreateOrConnectWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopCreateOrConnectWithoutStopPointInput> = z.object({
  where: z.lazy(() => TripStopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripStopCreateWithoutStopPointInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema) ]),
}).strict();

export const TripStopCreateManyStopPointInputEnvelopeSchema: z.ZodType<Prisma.TripStopCreateManyStopPointInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TripStopCreateManyStopPointInputSchema),z.lazy(() => TripStopCreateManyStopPointInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RouteStopPointUpsertWithWhereUniqueWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointUpsertWithWhereUniqueWithoutStopPointInput> = z.object({
  where: z.lazy(() => RouteStopPointWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RouteStopPointUpdateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUncheckedUpdateWithoutStopPointInputSchema) ]),
  create: z.union([ z.lazy(() => RouteStopPointCreateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUncheckedCreateWithoutStopPointInputSchema) ]),
}).strict();

export const RouteStopPointUpdateWithWhereUniqueWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointUpdateWithWhereUniqueWithoutStopPointInput> = z.object({
  where: z.lazy(() => RouteStopPointWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RouteStopPointUpdateWithoutStopPointInputSchema),z.lazy(() => RouteStopPointUncheckedUpdateWithoutStopPointInputSchema) ]),
}).strict();

export const RouteStopPointUpdateManyWithWhereWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointUpdateManyWithWhereWithoutStopPointInput> = z.object({
  where: z.lazy(() => RouteStopPointScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RouteStopPointUpdateManyMutationInputSchema),z.lazy(() => RouteStopPointUncheckedUpdateManyWithoutStopPointInputSchema) ]),
}).strict();

export const StudentAssignmentUpsertWithWhereUniqueWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentUpsertWithWhereUniqueWithoutStopPointInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateWithoutStopPointInputSchema) ]),
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStopPointInputSchema) ]),
}).strict();

export const StudentAssignmentUpdateWithWhereUniqueWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateWithWhereUniqueWithoutStopPointInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StudentAssignmentUpdateWithoutStopPointInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateWithoutStopPointInputSchema) ]),
}).strict();

export const StudentAssignmentUpdateManyWithWhereWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateManyWithWhereWithoutStopPointInput> = z.object({
  where: z.lazy(() => StudentAssignmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StudentAssignmentUpdateManyMutationInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutStopPointInputSchema) ]),
}).strict();

export const TripStopUpsertWithWhereUniqueWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopUpsertWithWhereUniqueWithoutStopPointInput> = z.object({
  where: z.lazy(() => TripStopWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TripStopUpdateWithoutStopPointInputSchema),z.lazy(() => TripStopUncheckedUpdateWithoutStopPointInputSchema) ]),
  create: z.union([ z.lazy(() => TripStopCreateWithoutStopPointInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutStopPointInputSchema) ]),
}).strict();

export const TripStopUpdateWithWhereUniqueWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopUpdateWithWhereUniqueWithoutStopPointInput> = z.object({
  where: z.lazy(() => TripStopWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TripStopUpdateWithoutStopPointInputSchema),z.lazy(() => TripStopUncheckedUpdateWithoutStopPointInputSchema) ]),
}).strict();

export const TripStopUpdateManyWithWhereWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopUpdateManyWithWhereWithoutStopPointInput> = z.object({
  where: z.lazy(() => TripStopScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TripStopUpdateManyMutationInputSchema),z.lazy(() => TripStopUncheckedUpdateManyWithoutStopPointInputSchema) ]),
}).strict();

export const TripStopScalarWhereInputSchema: z.ZodType<Prisma.TripStopScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripStopScalarWhereInputSchema),z.lazy(() => TripStopScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripStopScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripStopScalarWhereInputSchema),z.lazy(() => TripStopScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actualArrival: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  actualDeparture: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTripStop_statusNullableFilterSchema),z.lazy(() => TripStop_statusSchema) ]).optional().nullable(),
}).strict();

export const UserCreateWithoutStudentInputSchema: z.ZodType<Prisma.UserCreateWithoutStudentInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedManyWithoutUserInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStudentInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStudentInputSchema),z.lazy(() => UserUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const StudentAssignmentCreateWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentCreateWithoutStudentInput> = z.object({
  id: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Route: z.lazy(() => RouteCreateNestedOneWithoutStudentAssignmentInputSchema),
  StopPoint: z.lazy(() => StopPointCreateNestedOneWithoutStudentAssignmentInputSchema)
}).strict();

export const StudentAssignmentUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedCreateWithoutStudentInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentAssignmentCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const StudentAssignmentCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.StudentAssignmentCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StudentAssignmentCreateManyStudentInputSchema),z.lazy(() => StudentAssignmentCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StudentAttendanceCreateWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceCreateWithoutStudentInput> = z.object({
  id: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable(),
  Trip: z.lazy(() => TripCreateNestedOneWithoutStudentAttendanceInputSchema)
}).strict();

export const StudentAttendanceUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedCreateWithoutStudentInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable()
}).strict();

export const StudentAttendanceCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => StudentAttendanceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const StudentAttendanceCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.StudentAttendanceCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StudentAttendanceCreateManyStudentInputSchema),z.lazy(() => StudentAttendanceCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutStudentInputSchema: z.ZodType<Prisma.UserUpsertWithoutStudentInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutStudentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStudentInputSchema),z.lazy(() => UserUncheckedCreateWithoutStudentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutStudentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const UserUpdateWithoutStudentInputSchema: z.ZodType<Prisma.UserUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateManyWithoutUserNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserRoles: z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const StudentAssignmentUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StudentAssignmentUpdateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => StudentAssignmentCreateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const StudentAssignmentUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => StudentAssignmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StudentAssignmentUpdateWithoutStudentInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const StudentAssignmentUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => StudentAssignmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StudentAssignmentUpdateManyMutationInputSchema),z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const StudentAttendanceUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => StudentAttendanceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StudentAttendanceUpdateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const StudentAttendanceUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => StudentAttendanceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StudentAttendanceUpdateWithoutStudentInputSchema),z.lazy(() => StudentAttendanceUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const StudentAttendanceUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => StudentAttendanceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StudentAttendanceUpdateManyMutationInputSchema),z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const StudentAttendanceScalarWhereInputSchema: z.ZodType<Prisma.StudentAttendanceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentAttendanceScalarWhereInputSchema),z.lazy(() => StudentAttendanceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentAttendanceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentAttendanceScalarWhereInputSchema),z.lazy(() => StudentAttendanceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pickupTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dropoffTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStudentAttendance_statusNullableFilterSchema),z.lazy(() => StudentAttendance_statusSchema) ]).optional().nullable(),
}).strict();

export const RouteCreateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.RouteCreateWithoutStudentAssignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointCreateNestedManyWithoutRouteInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const RouteUncheckedCreateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.RouteUncheckedCreateWithoutStudentAssignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  estimatedDuration: z.number().int().optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  isActive: z.boolean().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedCreateNestedManyWithoutRouteInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedCreateNestedManyWithoutRouteInputSchema).optional()
}).strict();

export const RouteCreateOrConnectWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.RouteCreateOrConnectWithoutStudentAssignmentInput> = z.object({
  where: z.lazy(() => RouteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RouteCreateWithoutStudentAssignmentInputSchema),z.lazy(() => RouteUncheckedCreateWithoutStudentAssignmentInputSchema) ]),
}).strict();

export const StopPointCreateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StopPointCreateWithoutStudentAssignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointCreateNestedManyWithoutStopPointInputSchema).optional(),
  TripStop: z.lazy(() => TripStopCreateNestedManyWithoutStopPointInputSchema).optional()
}).strict();

export const StopPointUncheckedCreateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StopPointUncheckedCreateWithoutStudentAssignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedCreateNestedManyWithoutStopPointInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedCreateNestedManyWithoutStopPointInputSchema).optional()
}).strict();

export const StopPointCreateOrConnectWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StopPointCreateOrConnectWithoutStudentAssignmentInput> = z.object({
  where: z.lazy(() => StopPointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StopPointCreateWithoutStudentAssignmentInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutStudentAssignmentInputSchema) ]),
}).strict();

export const StudentCreateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StudentCreateWithoutStudentAssignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutStudentInputSchema),
  StudentAttendance: z.lazy(() => StudentAttendanceCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutStudentAssignmentInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutStudentAssignmentInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutStudentAssignmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutStudentAssignmentInputSchema) ]),
}).strict();

export const RouteUpsertWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.RouteUpsertWithoutStudentAssignmentInput> = z.object({
  update: z.union([ z.lazy(() => RouteUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutStudentAssignmentInputSchema) ]),
  create: z.union([ z.lazy(() => RouteCreateWithoutStudentAssignmentInputSchema),z.lazy(() => RouteUncheckedCreateWithoutStudentAssignmentInputSchema) ]),
  where: z.lazy(() => RouteWhereInputSchema).optional()
}).strict();

export const RouteUpdateToOneWithWhereWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.RouteUpdateToOneWithWhereWithoutStudentAssignmentInput> = z.object({
  where: z.lazy(() => RouteWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RouteUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => RouteUncheckedUpdateWithoutStudentAssignmentInputSchema) ]),
}).strict();

export const RouteUpdateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.RouteUpdateWithoutStudentAssignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUpdateManyWithoutRouteNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const RouteUncheckedUpdateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.RouteUncheckedUpdateWithoutStudentAssignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedDuration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  endLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedUpdateManyWithoutRouteNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedUpdateManyWithoutRouteNestedInputSchema).optional()
}).strict();

export const StopPointUpsertWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StopPointUpsertWithoutStudentAssignmentInput> = z.object({
  update: z.union([ z.lazy(() => StopPointUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutStudentAssignmentInputSchema) ]),
  create: z.union([ z.lazy(() => StopPointCreateWithoutStudentAssignmentInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutStudentAssignmentInputSchema) ]),
  where: z.lazy(() => StopPointWhereInputSchema).optional()
}).strict();

export const StopPointUpdateToOneWithWhereWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StopPointUpdateToOneWithWhereWithoutStudentAssignmentInput> = z.object({
  where: z.lazy(() => StopPointWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StopPointUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutStudentAssignmentInputSchema) ]),
}).strict();

export const StopPointUpdateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StopPointUpdateWithoutStudentAssignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUpdateManyWithoutStopPointNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUpdateManyWithoutStopPointNestedInputSchema).optional()
}).strict();

export const StopPointUncheckedUpdateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StopPointUncheckedUpdateWithoutStudentAssignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional()
}).strict();

export const StudentUpsertWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StudentUpsertWithoutStudentAssignmentInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutStudentAssignmentInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutStudentAssignmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutStudentAssignmentInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutStudentAssignmentInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutStudentAssignmentInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutStudentAssignmentInputSchema) ]),
}).strict();

export const StudentUpdateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StudentUpdateWithoutStudentAssignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutStudentAssignmentInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutStudentAssignmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentCreateWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.StudentCreateWithoutStudentAttendanceInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutStudentInputSchema),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutStudentAttendanceInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutStudentAttendanceInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutStudentAttendanceInputSchema),z.lazy(() => StudentUncheckedCreateWithoutStudentAttendanceInputSchema) ]),
}).strict();

export const TripCreateWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.TripCreateWithoutStudentAttendanceInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryCreateNestedManyWithoutTripInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedOneWithoutTripInputSchema),
  TripStop: z.lazy(() => TripStopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutStudentAttendanceInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutStudentAttendanceInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutStudentAttendanceInputSchema),z.lazy(() => TripUncheckedCreateWithoutStudentAttendanceInputSchema) ]),
}).strict();

export const StudentUpsertWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.StudentUpsertWithoutStudentAttendanceInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutStudentAttendanceInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutStudentAttendanceInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutStudentAttendanceInputSchema),z.lazy(() => StudentUncheckedCreateWithoutStudentAttendanceInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutStudentAttendanceInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutStudentAttendanceInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutStudentAttendanceInputSchema) ]),
}).strict();

export const StudentUpdateWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.StudentUpdateWithoutStudentAttendanceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutStudentAttendanceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const TripUpsertWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.TripUpsertWithoutStudentAttendanceInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutStudentAttendanceInputSchema),z.lazy(() => TripUncheckedUpdateWithoutStudentAttendanceInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutStudentAttendanceInputSchema),z.lazy(() => TripUncheckedCreateWithoutStudentAttendanceInputSchema) ]),
  where: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripUpdateToOneWithWhereWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.TripUpdateToOneWithWhereWithoutStudentAttendanceInput> = z.object({
  where: z.lazy(() => TripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TripUpdateWithoutStudentAttendanceInputSchema),z.lazy(() => TripUncheckedUpdateWithoutStudentAttendanceInputSchema) ]),
}).strict();

export const TripUpdateWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.TripUpdateWithoutStudentAttendanceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutStudentAttendanceInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutStudentAttendanceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripCreateWithoutTrackingBusHistoryInputSchema: z.ZodType<Prisma.TripCreateWithoutTrackingBusHistoryInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportCreateNestedManyWithoutTripInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceCreateNestedManyWithoutTripInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedOneWithoutTripInputSchema),
  TripStop: z.lazy(() => TripStopCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutTrackingBusHistoryInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutTrackingBusHistoryInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutTrackingBusHistoryInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutTrackingBusHistoryInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutTrackingBusHistoryInputSchema),z.lazy(() => TripUncheckedCreateWithoutTrackingBusHistoryInputSchema) ]),
}).strict();

export const TripUpsertWithoutTrackingBusHistoryInputSchema: z.ZodType<Prisma.TripUpsertWithoutTrackingBusHistoryInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutTrackingBusHistoryInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTrackingBusHistoryInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutTrackingBusHistoryInputSchema),z.lazy(() => TripUncheckedCreateWithoutTrackingBusHistoryInputSchema) ]),
  where: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripUpdateToOneWithWhereWithoutTrackingBusHistoryInputSchema: z.ZodType<Prisma.TripUpdateToOneWithWhereWithoutTrackingBusHistoryInput> = z.object({
  where: z.lazy(() => TripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TripUpdateWithoutTrackingBusHistoryInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTrackingBusHistoryInputSchema) ]),
}).strict();

export const TripUpdateWithoutTrackingBusHistoryInputSchema: z.ZodType<Prisma.TripUpdateWithoutTrackingBusHistoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutTripNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutTrackingBusHistoryInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutTrackingBusHistoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const ReportCreateWithoutTripInputSchema: z.ZodType<Prisma.ReportCreateWithoutTripInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema)
}).strict();

export const ReportUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  reporterId: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutTripInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const ReportCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReportCreateManyTripInputSchema),z.lazy(() => ReportCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StudentAttendanceCreateWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceCreateWithoutTripInput> = z.object({
  id: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable(),
  Student: z.lazy(() => StudentCreateNestedOneWithoutStudentAttendanceInputSchema)
}).strict();

export const StudentAttendanceUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable()
}).strict();

export const StudentAttendanceCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => StudentAttendanceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const StudentAttendanceCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.StudentAttendanceCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StudentAttendanceCreateManyTripInputSchema),z.lazy(() => StudentAttendanceCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TrackingBusHistoryCreateWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryCreateWithoutTripInput> = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const TrackingBusHistoryUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const TrackingBusHistoryCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const TrackingBusHistoryCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.TrackingBusHistoryCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TrackingBusHistoryCreateManyTripInputSchema),z.lazy(() => TrackingBusHistoryCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ScheduleCreateWithoutTripInputSchema: z.ZodType<Prisma.ScheduleCreateWithoutTripInput> = z.object({
  id: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Bus: z.lazy(() => BusCreateNestedOneWithoutScheduleInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutScheduleInputSchema),
  Route: z.lazy(() => RouteCreateNestedOneWithoutScheduleInputSchema)
}).strict();

export const ScheduleUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ScheduleCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.ScheduleCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScheduleCreateWithoutTripInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const TripStopCreateWithoutTripInputSchema: z.ZodType<Prisma.TripStopCreateWithoutTripInput> = z.object({
  id: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable(),
  StopPoint: z.lazy(() => StopPointCreateNestedOneWithoutTripStopInputSchema)
}).strict();

export const TripStopUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.TripStopUncheckedCreateWithoutTripInput> = z.object({
  id: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable()
}).strict();

export const TripStopCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.TripStopCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => TripStopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripStopCreateWithoutTripInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const TripStopCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.TripStopCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TripStopCreateManyTripInputSchema),z.lazy(() => TripStopCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReportUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.ReportUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportUpdateWithoutTripInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutTripInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const ReportUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.ReportUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateWithoutTripInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const ReportUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.ReportUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => ReportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateManyMutationInputSchema),z.lazy(() => ReportUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const ReportScalarWhereInputSchema: z.ZodType<Prisma.ReportScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
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

export const StudentAttendanceUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => StudentAttendanceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StudentAttendanceUpdateWithoutTripInputSchema),z.lazy(() => StudentAttendanceUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => StudentAttendanceCreateWithoutTripInputSchema),z.lazy(() => StudentAttendanceUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const StudentAttendanceUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => StudentAttendanceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StudentAttendanceUpdateWithoutTripInputSchema),z.lazy(() => StudentAttendanceUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const StudentAttendanceUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => StudentAttendanceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StudentAttendanceUpdateManyMutationInputSchema),z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const TrackingBusHistoryUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TrackingBusHistoryUpdateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => TrackingBusHistoryCreateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const TrackingBusHistoryUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => TrackingBusHistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TrackingBusHistoryUpdateWithoutTripInputSchema),z.lazy(() => TrackingBusHistoryUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const TrackingBusHistoryUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => TrackingBusHistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TrackingBusHistoryUpdateManyMutationInputSchema),z.lazy(() => TrackingBusHistoryUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const TrackingBusHistoryScalarWhereInputSchema: z.ZodType<Prisma.TrackingBusHistoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TrackingBusHistoryScalarWhereInputSchema),z.lazy(() => TrackingBusHistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrackingBusHistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrackingBusHistoryScalarWhereInputSchema),z.lazy(() => TrackingBusHistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  location: z.lazy(() => JsonFilterSchema).optional()
}).strict();

export const ScheduleUpsertWithoutTripInputSchema: z.ZodType<Prisma.ScheduleUpsertWithoutTripInput> = z.object({
  update: z.union([ z.lazy(() => ScheduleUpdateWithoutTripInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => ScheduleCreateWithoutTripInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutTripInputSchema) ]),
  where: z.lazy(() => ScheduleWhereInputSchema).optional()
}).strict();

export const ScheduleUpdateToOneWithWhereWithoutTripInputSchema: z.ZodType<Prisma.ScheduleUpdateToOneWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => ScheduleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ScheduleUpdateWithoutTripInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const ScheduleUpdateWithoutTripInputSchema: z.ZodType<Prisma.ScheduleUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Bus: z.lazy(() => BusUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripStopUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.TripStopUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => TripStopWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TripStopUpdateWithoutTripInputSchema),z.lazy(() => TripStopUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => TripStopCreateWithoutTripInputSchema),z.lazy(() => TripStopUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const TripStopUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.TripStopUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => TripStopWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TripStopUpdateWithoutTripInputSchema),z.lazy(() => TripStopUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const TripStopUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.TripStopUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => TripStopScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TripStopUpdateManyMutationInputSchema),z.lazy(() => TripStopUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const StopPointCreateWithoutTripStopInputSchema: z.ZodType<Prisma.StopPointCreateWithoutTripStopInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointCreateNestedManyWithoutStopPointInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutStopPointInputSchema).optional()
}).strict();

export const StopPointUncheckedCreateWithoutTripStopInputSchema: z.ZodType<Prisma.StopPointUncheckedCreateWithoutTripStopInput> = z.object({
  id: z.string(),
  name: z.string(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedCreateNestedManyWithoutStopPointInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutStopPointInputSchema).optional()
}).strict();

export const StopPointCreateOrConnectWithoutTripStopInputSchema: z.ZodType<Prisma.StopPointCreateOrConnectWithoutTripStopInput> = z.object({
  where: z.lazy(() => StopPointWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StopPointCreateWithoutTripStopInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutTripStopInputSchema) ]),
}).strict();

export const TripCreateWithoutTripStopInputSchema: z.ZodType<Prisma.TripCreateWithoutTripStopInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportCreateNestedManyWithoutTripInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryCreateNestedManyWithoutTripInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedOneWithoutTripInputSchema)
}).strict();

export const TripUncheckedCreateWithoutTripStopInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutTripStopInput> = z.object({
  id: z.string(),
  scheduleId: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutTripStopInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutTripStopInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutTripStopInputSchema),z.lazy(() => TripUncheckedCreateWithoutTripStopInputSchema) ]),
}).strict();

export const StopPointUpsertWithoutTripStopInputSchema: z.ZodType<Prisma.StopPointUpsertWithoutTripStopInput> = z.object({
  update: z.union([ z.lazy(() => StopPointUpdateWithoutTripStopInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutTripStopInputSchema) ]),
  create: z.union([ z.lazy(() => StopPointCreateWithoutTripStopInputSchema),z.lazy(() => StopPointUncheckedCreateWithoutTripStopInputSchema) ]),
  where: z.lazy(() => StopPointWhereInputSchema).optional()
}).strict();

export const StopPointUpdateToOneWithWhereWithoutTripStopInputSchema: z.ZodType<Prisma.StopPointUpdateToOneWithWhereWithoutTripStopInput> = z.object({
  where: z.lazy(() => StopPointWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StopPointUpdateWithoutTripStopInputSchema),z.lazy(() => StopPointUncheckedUpdateWithoutTripStopInputSchema) ]),
}).strict();

export const StopPointUpdateWithoutTripStopInputSchema: z.ZodType<Prisma.StopPointUpdateWithoutTripStopInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUpdateManyWithoutStopPointNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutStopPointNestedInputSchema).optional()
}).strict();

export const StopPointUncheckedUpdateWithoutTripStopInputSchema: z.ZodType<Prisma.StopPointUncheckedUpdateWithoutTripStopInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RouteStopPoint: z.lazy(() => RouteStopPointUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutStopPointNestedInputSchema).optional()
}).strict();

export const TripUpsertWithoutTripStopInputSchema: z.ZodType<Prisma.TripUpsertWithoutTripStopInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutTripStopInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTripStopInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutTripStopInputSchema),z.lazy(() => TripUncheckedCreateWithoutTripStopInputSchema) ]),
  where: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripUpdateToOneWithWhereWithoutTripStopInputSchema: z.ZodType<Prisma.TripUpdateToOneWithWhereWithoutTripStopInput> = z.object({
  where: z.lazy(() => TripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TripUpdateWithoutTripStopInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTripStopInputSchema) ]),
}).strict();

export const TripUpdateWithoutTripStopInputSchema: z.ZodType<Prisma.TripUpdateWithoutTripStopInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutTripNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateOneRequiredWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutTripStopInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutTripStopInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const ReportCreateWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateWithoutUserInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Trip: z.lazy(() => TripCreateNestedOneWithoutReportInputSchema).optional()
}).strict();

export const ReportUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  tripId: z.string().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReportCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReportCreateManyUserInputSchema),z.lazy(() => ReportCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ScheduleCreateWithoutUserInputSchema: z.ZodType<Prisma.ScheduleCreateWithoutUserInput> = z.object({
  id: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Bus: z.lazy(() => BusCreateNestedOneWithoutScheduleInputSchema),
  Route: z.lazy(() => RouteCreateNestedOneWithoutScheduleInputSchema),
  Trip: z.lazy(() => TripCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const ScheduleUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Trip: z.lazy(() => TripUncheckedCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export const ScheduleCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ScheduleCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScheduleCreateWithoutUserInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ScheduleCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ScheduleCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ScheduleCreateManyUserInputSchema),z.lazy(() => ScheduleCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StudentCreateWithoutUserInputSchema: z.ZodType<Prisma.StudentCreateWithoutUserInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentCreateNestedManyWithoutStudentInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  name: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserRolesCreateWithoutUserInputSchema: z.ZodType<Prisma.UserRolesCreateWithoutUserInput> = z.object({
  Roles: z.lazy(() => RolesCreateNestedOneWithoutUserRolesInputSchema)
}).strict();

export const UserRolesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUncheckedCreateWithoutUserInput> = z.object({
  roleId: z.number().int()
}).strict();

export const UserRolesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserRolesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserRolesCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserRolesCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserRolesCreateManyUserInputSchema),z.lazy(() => UserRolesCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReportUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReportUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportUpdateWithoutUserInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReportUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReportUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateWithoutUserInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReportUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReportUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateManyMutationInputSchema),z.lazy(() => ReportUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ScheduleUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ScheduleUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ScheduleUpdateWithoutUserInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ScheduleCreateWithoutUserInputSchema),z.lazy(() => ScheduleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ScheduleUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ScheduleUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ScheduleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ScheduleUpdateWithoutUserInputSchema),z.lazy(() => ScheduleUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ScheduleUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ScheduleUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ScheduleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ScheduleUpdateManyMutationInputSchema),z.lazy(() => ScheduleUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const StudentUpsertWithoutUserInputSchema: z.ZodType<Prisma.StudentUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutUserInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutUserInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const StudentUpdateWithoutUserInputSchema: z.ZodType<Prisma.StudentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUpdateManyWithoutStudentNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  StudentAssignment: z.lazy(() => StudentAssignmentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const UserRolesUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserRolesUpdateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserRolesCreateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserRolesUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserRolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserRolesUpdateWithoutUserInputSchema),z.lazy(() => UserRolesUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserRolesUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserRolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserRolesUpdateManyMutationInputSchema),z.lazy(() => UserRolesUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RolesCreateWithoutUserRolesInputSchema: z.ZodType<Prisma.RolesCreateWithoutUserRolesInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RolePermissions: z.lazy(() => RolePermissionsCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUncheckedCreateWithoutUserRolesInputSchema: z.ZodType<Prisma.RolesUncheckedCreateWithoutUserRolesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  RolePermissions: z.lazy(() => RolePermissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesCreateOrConnectWithoutUserRolesInputSchema: z.ZodType<Prisma.RolesCreateOrConnectWithoutUserRolesInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesCreateWithoutUserRolesInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserRolesInputSchema) ]),
}).strict();

export const UserCreateWithoutUserRolesInputSchema: z.ZodType<Prisma.UserCreateWithoutUserRolesInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleCreateNestedManyWithoutUserInputSchema).optional(),
  Student: z.lazy(() => StudentCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUserRolesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserRolesInput> = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Student: z.lazy(() => StudentUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUserRolesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserRolesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserRolesInputSchema) ]),
}).strict();

export const RolesUpsertWithoutUserRolesInputSchema: z.ZodType<Prisma.RolesUpsertWithoutUserRolesInput> = z.object({
  update: z.union([ z.lazy(() => RolesUpdateWithoutUserRolesInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserRolesInputSchema) ]),
  create: z.union([ z.lazy(() => RolesCreateWithoutUserRolesInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUserRolesInputSchema) ]),
  where: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const RolesUpdateToOneWithWhereWithoutUserRolesInputSchema: z.ZodType<Prisma.RolesUpdateToOneWithWhereWithoutUserRolesInput> = z.object({
  where: z.lazy(() => RolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RolesUpdateWithoutUserRolesInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUserRolesInputSchema) ]),
}).strict();

export const RolesUpdateWithoutUserRolesInputSchema: z.ZodType<Prisma.RolesUpdateWithoutUserRolesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateWithoutUserRolesInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateWithoutUserRolesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  RolePermissions: z.lazy(() => RolePermissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutUserRolesInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserRolesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserRolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserRolesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserRolesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUserRolesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUserRolesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUserRolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserRolesInputSchema) ]),
}).strict();

export const UserUpdateWithoutUserRolesInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserRolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUpdateManyWithoutUserNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUserRolesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserRolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Schedule: z.lazy(() => ScheduleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const ScheduleCreateManyBusInputSchema: z.ZodType<Prisma.ScheduleCreateManyBusInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ScheduleUpdateWithoutBusInputSchema: z.ZodType<Prisma.ScheduleUpdateWithoutBusInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  Trip: z.lazy(() => TripUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleUncheckedUpdateWithoutBusInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateWithoutBusInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Trip: z.lazy(() => TripUncheckedUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleUncheckedUpdateManyWithoutBusInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyWithoutBusInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateManyPermissionInputSchema: z.ZodType<Prisma.RolePermissionsCreateManyPermissionInput> = z.object({
  roleId: z.number().int()
}).strict();

export const RolePermissionsUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUpdateWithoutPermissionInput> = z.object({
  Roles: z.lazy(() => RolesUpdateOneRequiredWithoutRolePermissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionsUncheckedUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateWithoutPermissionInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyWithoutPermissionInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsCreateManyRolesInputSchema: z.ZodType<Prisma.RolePermissionsCreateManyRolesInput> = z.object({
  permissionId: z.number().int()
}).strict();

export const UserRolesCreateManyRolesInputSchema: z.ZodType<Prisma.UserRolesCreateManyRolesInput> = z.object({
  userId: z.string()
}).strict();

export const RolePermissionsUpdateWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsUpdateWithoutRolesInput> = z.object({
  Permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRolePermissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionsUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateWithoutRolesInput> = z.object({
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionsUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.RolePermissionsUncheckedUpdateManyWithoutRolesInput> = z.object({
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUpdateWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesUpdateWithoutRolesInput> = z.object({
  User: z.lazy(() => UserUpdateOneRequiredWithoutUserRolesNestedInputSchema).optional()
}).strict();

export const UserRolesUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateWithoutRolesInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyWithoutRolesInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RouteStopPointCreateManyRouteInputSchema: z.ZodType<Prisma.RouteStopPointCreateManyRouteInput> = z.object({
  id: z.number().int().optional(),
  stopPointId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema)
}).strict();

export const ScheduleCreateManyRouteInputSchema: z.ZodType<Prisma.ScheduleCreateManyRouteInput> = z.object({
  id: z.string(),
  busId: z.string(),
  driverId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentAssignmentCreateManyRouteInputSchema: z.ZodType<Prisma.StudentAssignmentCreateManyRouteInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RouteStopPointUpdateWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointUpdateWithoutRouteInput> = z.object({
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
  StopPoint: z.lazy(() => StopPointUpdateOneRequiredWithoutRouteStopPointNestedInputSchema).optional()
}).strict();

export const RouteStopPointUncheckedUpdateWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stopPointId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RouteStopPointUncheckedUpdateManyWithoutRouteInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedUpdateManyWithoutRouteInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stopPointId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScheduleUpdateWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Bus: z.lazy(() => BusUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  Trip: z.lazy(() => TripUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleUncheckedUpdateWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Trip: z.lazy(() => TripUncheckedUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleUncheckedUpdateManyWithoutRouteInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  driverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentUpdateWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  StopPoint: z.lazy(() => StopPointUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional()
}).strict();

export const StudentAssignmentUncheckedUpdateWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentUncheckedUpdateManyWithoutRouteInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateManyWithoutRouteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripCreateManyScheduleInputSchema: z.ZodType<Prisma.TripCreateManyScheduleInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  actualStartTime: z.coerce.date().optional().nullable(),
  actualEndTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => Trip_statusSchema).optional().nullable(),
  currentStopId: z.string().optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => Trip_typeSchema)
}).strict();

export const TripUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.TripUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutTripNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUpdateManyWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  StudentAttendance: z.lazy(() => StudentAttendanceUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TrackingBusHistory: z.lazy(() => TrackingBusHistoryUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  TripStop: z.lazy(() => TripStopUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateManyWithoutScheduleInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyWithoutScheduleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actualStartTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualEndTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => Trip_statusSchema),z.lazy(() => NullableEnumTrip_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currentStopId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Trip_typeSchema),z.lazy(() => EnumTrip_typeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RouteStopPointCreateManyStopPointInputSchema: z.ZodType<Prisma.RouteStopPointCreateManyStopPointInput> = z.object({
  id: z.number().int().optional(),
  routeId: z.string(),
  sequence: z.number().int(),
  direction: z.lazy(() => RouteStopPoint_directionSchema)
}).strict();

export const StudentAssignmentCreateManyStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentCreateManyStopPointInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  routeId: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TripStopCreateManyStopPointInputSchema: z.ZodType<Prisma.TripStopCreateManyStopPointInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable()
}).strict();

export const RouteStopPointUpdateWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointUpdateWithoutStopPointInput> = z.object({
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutRouteStopPointNestedInputSchema).optional()
}).strict();

export const RouteStopPointUncheckedUpdateWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedUpdateWithoutStopPointInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RouteStopPointUncheckedUpdateManyWithoutStopPointInputSchema: z.ZodType<Prisma.RouteStopPointUncheckedUpdateManyWithoutStopPointInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sequence: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => RouteStopPoint_directionSchema),z.lazy(() => EnumRouteStopPoint_directionFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentUpdateWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateWithoutStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional(),
  Student: z.lazy(() => StudentUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional()
}).strict();

export const StudentAssignmentUncheckedUpdateWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateWithoutStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentUncheckedUpdateManyWithoutStopPointInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateManyWithoutStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripStopUpdateWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopUpdateWithoutStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Trip: z.lazy(() => TripUpdateOneRequiredWithoutTripStopNestedInputSchema).optional()
}).strict();

export const TripStopUncheckedUpdateWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopUncheckedUpdateWithoutStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TripStopUncheckedUpdateManyWithoutStopPointInputSchema: z.ZodType<Prisma.TripStopUncheckedUpdateManyWithoutStopPointInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StudentAssignmentCreateManyStudentInputSchema: z.ZodType<Prisma.StudentAssignmentCreateManyStudentInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  stopId: z.string(),
  direction: z.lazy(() => StudentAssignment_directionSchema),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentAttendanceCreateManyStudentInputSchema: z.ZodType<Prisma.StudentAttendanceCreateManyStudentInput> = z.object({
  id: z.string(),
  tripId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable()
}).strict();

export const StudentAssignmentUpdateWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional(),
  StopPoint: z.lazy(() => StopPointUpdateOneRequiredWithoutStudentAssignmentNestedInputSchema).optional()
}).strict();

export const StudentAssignmentUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAssignmentUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.StudentAssignmentUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  direction: z.union([ z.lazy(() => StudentAssignment_directionSchema),z.lazy(() => EnumStudentAssignment_directionFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  effectiveTo: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAttendanceUpdateWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Trip: z.lazy(() => TripUpdateOneRequiredWithoutStudentAttendanceNestedInputSchema).optional()
}).strict();

export const StudentAttendanceUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StudentAttendanceUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReportCreateManyTripInputSchema: z.ZodType<Prisma.ReportCreateManyTripInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  reporterId: z.string(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentAttendanceCreateManyTripInputSchema: z.ZodType<Prisma.StudentAttendanceCreateManyTripInput> = z.object({
  id: z.string(),
  studentId: z.string(),
  pickupTime: z.coerce.date().optional().nullable(),
  dropoffTime: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StudentAttendance_statusSchema).optional().nullable()
}).strict();

export const TrackingBusHistoryCreateManyTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryCreateManyTripInput> = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const TripStopCreateManyTripInputSchema: z.ZodType<Prisma.TripStopCreateManyTripInput> = z.object({
  id: z.string(),
  stopId: z.string(),
  actualArrival: z.coerce.date().optional().nullable(),
  actualDeparture: z.coerce.date().optional().nullable(),
  status: z.lazy(() => TripStop_statusSchema).optional().nullable()
}).strict();

export const ReportUpdateWithoutTripInputSchema: z.ZodType<Prisma.ReportUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentAttendanceUpdateWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Student: z.lazy(() => StudentUpdateOneRequiredWithoutStudentAttendanceNestedInputSchema).optional()
}).strict();

export const StudentAttendanceUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StudentAttendanceUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.StudentAttendanceUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pickupTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dropoffTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StudentAttendance_statusSchema),z.lazy(() => NullableEnumStudentAttendance_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TrackingBusHistoryUpdateWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TrackingBusHistoryUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TrackingBusHistoryUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.TrackingBusHistoryUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const TripStopUpdateWithoutTripInputSchema: z.ZodType<Prisma.TripStopUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  StopPoint: z.lazy(() => StopPointUpdateOneRequiredWithoutTripStopNestedInputSchema).optional()
}).strict();

export const TripStopUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.TripStopUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TripStopUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.TripStopUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actualArrival: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actualDeparture: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TripStop_statusSchema),z.lazy(() => NullableEnumTripStop_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReportCreateManyUserInputSchema: z.ZodType<Prisma.ReportCreateManyUserInput> = z.object({
  id: z.string(),
  reportType: z.string(),
  description: z.string(),
  timestamp: z.coerce.date(),
  tripId: z.string().optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ScheduleCreateManyUserInputSchema: z.ZodType<Prisma.ScheduleCreateManyUserInput> = z.object({
  id: z.string(),
  routeId: z.string(),
  busId: z.string(),
  type: z.lazy(() => Schedule_typeSchema),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startTime: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => Schedule_statusSchema).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserRolesCreateManyUserInputSchema: z.ZodType<Prisma.UserRolesCreateManyUserInput> = z.object({
  roleId: z.number().int()
}).strict();

export const ReportUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReportUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Trip: z.lazy(() => TripUpdateOneWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScheduleUpdateWithoutUserInputSchema: z.ZodType<Prisma.ScheduleUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Bus: z.lazy(() => BusUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  Route: z.lazy(() => RouteUpdateOneRequiredWithoutScheduleNestedInputSchema).optional(),
  Trip: z.lazy(() => TripUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Trip: z.lazy(() => TripUncheckedUpdateManyWithoutScheduleNestedInputSchema).optional()
}).strict();

export const ScheduleUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  routeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  busId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Schedule_typeSchema),z.lazy(() => EnumSchedule_typeFieldUpdateOperationsInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => Schedule_statusSchema),z.lazy(() => NullableEnumSchedule_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUpdateWithoutUserInput> = z.object({
  Roles: z.lazy(() => RolesUpdateOneRequiredWithoutUserRolesNestedInputSchema).optional()
}).strict();

export const UserRolesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateWithoutUserInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRolesUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserRolesUncheckedUpdateManyWithoutUserInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const BusFindFirstArgsSchema: z.ZodType<Prisma.BusFindFirstArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  where: BusWhereInputSchema.optional(),
  orderBy: z.union([ BusOrderByWithRelationInputSchema.array(),BusOrderByWithRelationInputSchema ]).optional(),
  cursor: BusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusScalarFieldEnumSchema,BusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BusFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BusFindFirstOrThrowArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  where: BusWhereInputSchema.optional(),
  orderBy: z.union([ BusOrderByWithRelationInputSchema.array(),BusOrderByWithRelationInputSchema ]).optional(),
  cursor: BusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusScalarFieldEnumSchema,BusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BusFindManyArgsSchema: z.ZodType<Prisma.BusFindManyArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  where: BusWhereInputSchema.optional(),
  orderBy: z.union([ BusOrderByWithRelationInputSchema.array(),BusOrderByWithRelationInputSchema ]).optional(),
  cursor: BusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusScalarFieldEnumSchema,BusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BusAggregateArgsSchema: z.ZodType<Prisma.BusAggregateArgs> = z.object({
  where: BusWhereInputSchema.optional(),
  orderBy: z.union([ BusOrderByWithRelationInputSchema.array(),BusOrderByWithRelationInputSchema ]).optional(),
  cursor: BusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BusGroupByArgsSchema: z.ZodType<Prisma.BusGroupByArgs> = z.object({
  where: BusWhereInputSchema.optional(),
  orderBy: z.union([ BusOrderByWithAggregationInputSchema.array(),BusOrderByWithAggregationInputSchema ]).optional(),
  by: BusScalarFieldEnumSchema.array(),
  having: BusScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BusFindUniqueArgsSchema: z.ZodType<Prisma.BusFindUniqueArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  where: BusWhereUniqueInputSchema,
}).strict() ;

export const BusFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BusFindUniqueOrThrowArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  where: BusWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindFirstArgsSchema: z.ZodType<Prisma.PermissionFindFirstArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindFirstOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindManyArgsSchema: z.ZodType<Prisma.PermissionFindManyArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionAggregateArgsSchema: z.ZodType<Prisma.PermissionAggregateArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionGroupByArgsSchema: z.ZodType<Prisma.PermissionGroupByArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithAggregationInputSchema.array(),PermissionOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionScalarFieldEnumSchema.array(),
  having: PermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionFindUniqueArgsSchema: z.ZodType<Prisma.PermissionFindUniqueArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindUniqueOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const ReportFindFirstArgsSchema: z.ZodType<Prisma.ReportFindFirstArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportFindFirstOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportFindManyArgsSchema: z.ZodType<Prisma.ReportFindManyArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportAggregateArgsSchema: z.ZodType<Prisma.ReportAggregateArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportGroupByArgsSchema: z.ZodType<Prisma.ReportGroupByArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithAggregationInputSchema.array(),ReportOrderByWithAggregationInputSchema ]).optional(),
  by: ReportScalarFieldEnumSchema.array(),
  having: ReportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportFindUniqueArgsSchema: z.ZodType<Prisma.ReportFindUniqueArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportFindUniqueOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionsFindFirstArgsSchema: z.ZodType<Prisma.RolePermissionsFindFirstArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithRelationInputSchema.array(),RolePermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionsScalarFieldEnumSchema,RolePermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolePermissionsFindFirstOrThrowArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithRelationInputSchema.array(),RolePermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionsScalarFieldEnumSchema,RolePermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionsFindManyArgsSchema: z.ZodType<Prisma.RolePermissionsFindManyArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithRelationInputSchema.array(),RolePermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionsScalarFieldEnumSchema,RolePermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionsAggregateArgsSchema: z.ZodType<Prisma.RolePermissionsAggregateArgs> = z.object({
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithRelationInputSchema.array(),RolePermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolePermissionsGroupByArgsSchema: z.ZodType<Prisma.RolePermissionsGroupByArgs> = z.object({
  where: RolePermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionsOrderByWithAggregationInputSchema.array(),RolePermissionsOrderByWithAggregationInputSchema ]).optional(),
  by: RolePermissionsScalarFieldEnumSchema.array(),
  having: RolePermissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolePermissionsFindUniqueArgsSchema: z.ZodType<Prisma.RolePermissionsFindUniqueArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolePermissionsFindUniqueOrThrowArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereUniqueInputSchema,
}).strict() ;

export const RolesFindFirstArgsSchema: z.ZodType<Prisma.RolesFindFirstArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolesFindFirstOrThrowArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolesFindManyArgsSchema: z.ZodType<Prisma.RolesFindManyArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolesAggregateArgsSchema: z.ZodType<Prisma.RolesAggregateArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolesGroupByArgsSchema: z.ZodType<Prisma.RolesGroupByArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithAggregationInputSchema.array(),RolesOrderByWithAggregationInputSchema ]).optional(),
  by: RolesScalarFieldEnumSchema.array(),
  having: RolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolesFindUniqueArgsSchema: z.ZodType<Prisma.RolesFindUniqueArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() ;

export const RolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolesFindUniqueOrThrowArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() ;

export const RouteFindFirstArgsSchema: z.ZodType<Prisma.RouteFindFirstArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  where: RouteWhereInputSchema.optional(),
  orderBy: z.union([ RouteOrderByWithRelationInputSchema.array(),RouteOrderByWithRelationInputSchema ]).optional(),
  cursor: RouteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteScalarFieldEnumSchema,RouteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RouteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RouteFindFirstOrThrowArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  where: RouteWhereInputSchema.optional(),
  orderBy: z.union([ RouteOrderByWithRelationInputSchema.array(),RouteOrderByWithRelationInputSchema ]).optional(),
  cursor: RouteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteScalarFieldEnumSchema,RouteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RouteFindManyArgsSchema: z.ZodType<Prisma.RouteFindManyArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  where: RouteWhereInputSchema.optional(),
  orderBy: z.union([ RouteOrderByWithRelationInputSchema.array(),RouteOrderByWithRelationInputSchema ]).optional(),
  cursor: RouteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteScalarFieldEnumSchema,RouteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RouteAggregateArgsSchema: z.ZodType<Prisma.RouteAggregateArgs> = z.object({
  where: RouteWhereInputSchema.optional(),
  orderBy: z.union([ RouteOrderByWithRelationInputSchema.array(),RouteOrderByWithRelationInputSchema ]).optional(),
  cursor: RouteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RouteGroupByArgsSchema: z.ZodType<Prisma.RouteGroupByArgs> = z.object({
  where: RouteWhereInputSchema.optional(),
  orderBy: z.union([ RouteOrderByWithAggregationInputSchema.array(),RouteOrderByWithAggregationInputSchema ]).optional(),
  by: RouteScalarFieldEnumSchema.array(),
  having: RouteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RouteFindUniqueArgsSchema: z.ZodType<Prisma.RouteFindUniqueArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  where: RouteWhereUniqueInputSchema,
}).strict() ;

export const RouteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RouteFindUniqueOrThrowArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  where: RouteWhereUniqueInputSchema,
}).strict() ;

export const RouteStopPointFindFirstArgsSchema: z.ZodType<Prisma.RouteStopPointFindFirstArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  where: RouteStopPointWhereInputSchema.optional(),
  orderBy: z.union([ RouteStopPointOrderByWithRelationInputSchema.array(),RouteStopPointOrderByWithRelationInputSchema ]).optional(),
  cursor: RouteStopPointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteStopPointScalarFieldEnumSchema,RouteStopPointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RouteStopPointFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RouteStopPointFindFirstOrThrowArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  where: RouteStopPointWhereInputSchema.optional(),
  orderBy: z.union([ RouteStopPointOrderByWithRelationInputSchema.array(),RouteStopPointOrderByWithRelationInputSchema ]).optional(),
  cursor: RouteStopPointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteStopPointScalarFieldEnumSchema,RouteStopPointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RouteStopPointFindManyArgsSchema: z.ZodType<Prisma.RouteStopPointFindManyArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  where: RouteStopPointWhereInputSchema.optional(),
  orderBy: z.union([ RouteStopPointOrderByWithRelationInputSchema.array(),RouteStopPointOrderByWithRelationInputSchema ]).optional(),
  cursor: RouteStopPointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RouteStopPointScalarFieldEnumSchema,RouteStopPointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RouteStopPointAggregateArgsSchema: z.ZodType<Prisma.RouteStopPointAggregateArgs> = z.object({
  where: RouteStopPointWhereInputSchema.optional(),
  orderBy: z.union([ RouteStopPointOrderByWithRelationInputSchema.array(),RouteStopPointOrderByWithRelationInputSchema ]).optional(),
  cursor: RouteStopPointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RouteStopPointGroupByArgsSchema: z.ZodType<Prisma.RouteStopPointGroupByArgs> = z.object({
  where: RouteStopPointWhereInputSchema.optional(),
  orderBy: z.union([ RouteStopPointOrderByWithAggregationInputSchema.array(),RouteStopPointOrderByWithAggregationInputSchema ]).optional(),
  by: RouteStopPointScalarFieldEnumSchema.array(),
  having: RouteStopPointScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RouteStopPointFindUniqueArgsSchema: z.ZodType<Prisma.RouteStopPointFindUniqueArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  where: RouteStopPointWhereUniqueInputSchema,
}).strict() ;

export const RouteStopPointFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RouteStopPointFindUniqueOrThrowArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  where: RouteStopPointWhereUniqueInputSchema,
}).strict() ;

export const ScheduleFindFirstArgsSchema: z.ZodType<Prisma.ScheduleFindFirstArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  where: ScheduleWhereInputSchema.optional(),
  orderBy: z.union([ ScheduleOrderByWithRelationInputSchema.array(),ScheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: ScheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScheduleScalarFieldEnumSchema,ScheduleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScheduleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScheduleFindFirstOrThrowArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  where: ScheduleWhereInputSchema.optional(),
  orderBy: z.union([ ScheduleOrderByWithRelationInputSchema.array(),ScheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: ScheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScheduleScalarFieldEnumSchema,ScheduleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScheduleFindManyArgsSchema: z.ZodType<Prisma.ScheduleFindManyArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  where: ScheduleWhereInputSchema.optional(),
  orderBy: z.union([ ScheduleOrderByWithRelationInputSchema.array(),ScheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: ScheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScheduleScalarFieldEnumSchema,ScheduleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScheduleAggregateArgsSchema: z.ZodType<Prisma.ScheduleAggregateArgs> = z.object({
  where: ScheduleWhereInputSchema.optional(),
  orderBy: z.union([ ScheduleOrderByWithRelationInputSchema.array(),ScheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: ScheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScheduleGroupByArgsSchema: z.ZodType<Prisma.ScheduleGroupByArgs> = z.object({
  where: ScheduleWhereInputSchema.optional(),
  orderBy: z.union([ ScheduleOrderByWithAggregationInputSchema.array(),ScheduleOrderByWithAggregationInputSchema ]).optional(),
  by: ScheduleScalarFieldEnumSchema.array(),
  having: ScheduleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScheduleFindUniqueArgsSchema: z.ZodType<Prisma.ScheduleFindUniqueArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  where: ScheduleWhereUniqueInputSchema,
}).strict() ;

export const ScheduleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScheduleFindUniqueOrThrowArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  where: ScheduleWhereUniqueInputSchema,
}).strict() ;

export const StopPointFindFirstArgsSchema: z.ZodType<Prisma.StopPointFindFirstArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  where: StopPointWhereInputSchema.optional(),
  orderBy: z.union([ StopPointOrderByWithRelationInputSchema.array(),StopPointOrderByWithRelationInputSchema ]).optional(),
  cursor: StopPointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StopPointScalarFieldEnumSchema,StopPointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StopPointFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StopPointFindFirstOrThrowArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  where: StopPointWhereInputSchema.optional(),
  orderBy: z.union([ StopPointOrderByWithRelationInputSchema.array(),StopPointOrderByWithRelationInputSchema ]).optional(),
  cursor: StopPointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StopPointScalarFieldEnumSchema,StopPointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StopPointFindManyArgsSchema: z.ZodType<Prisma.StopPointFindManyArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  where: StopPointWhereInputSchema.optional(),
  orderBy: z.union([ StopPointOrderByWithRelationInputSchema.array(),StopPointOrderByWithRelationInputSchema ]).optional(),
  cursor: StopPointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StopPointScalarFieldEnumSchema,StopPointScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StopPointAggregateArgsSchema: z.ZodType<Prisma.StopPointAggregateArgs> = z.object({
  where: StopPointWhereInputSchema.optional(),
  orderBy: z.union([ StopPointOrderByWithRelationInputSchema.array(),StopPointOrderByWithRelationInputSchema ]).optional(),
  cursor: StopPointWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StopPointGroupByArgsSchema: z.ZodType<Prisma.StopPointGroupByArgs> = z.object({
  where: StopPointWhereInputSchema.optional(),
  orderBy: z.union([ StopPointOrderByWithAggregationInputSchema.array(),StopPointOrderByWithAggregationInputSchema ]).optional(),
  by: StopPointScalarFieldEnumSchema.array(),
  having: StopPointScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StopPointFindUniqueArgsSchema: z.ZodType<Prisma.StopPointFindUniqueArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  where: StopPointWhereUniqueInputSchema,
}).strict() ;

export const StopPointFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StopPointFindUniqueOrThrowArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  where: StopPointWhereUniqueInputSchema,
}).strict() ;

export const StudentFindFirstArgsSchema: z.ZodType<Prisma.StudentFindFirstArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StudentFindFirstOrThrowArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentFindManyArgsSchema: z.ZodType<Prisma.StudentFindManyArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAggregateArgsSchema: z.ZodType<Prisma.StudentAggregateArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentGroupByArgsSchema: z.ZodType<Prisma.StudentGroupByArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithAggregationInputSchema.array(),StudentOrderByWithAggregationInputSchema ]).optional(),
  by: StudentScalarFieldEnumSchema.array(),
  having: StudentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentFindUniqueArgsSchema: z.ZodType<Prisma.StudentFindUniqueArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StudentFindUniqueOrThrowArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentAssignmentFindFirstArgsSchema: z.ZodType<Prisma.StudentAssignmentFindFirstArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  where: StudentAssignmentWhereInputSchema.optional(),
  orderBy: z.union([ StudentAssignmentOrderByWithRelationInputSchema.array(),StudentAssignmentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentAssignmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentAssignmentScalarFieldEnumSchema,StudentAssignmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAssignmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StudentAssignmentFindFirstOrThrowArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  where: StudentAssignmentWhereInputSchema.optional(),
  orderBy: z.union([ StudentAssignmentOrderByWithRelationInputSchema.array(),StudentAssignmentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentAssignmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentAssignmentScalarFieldEnumSchema,StudentAssignmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAssignmentFindManyArgsSchema: z.ZodType<Prisma.StudentAssignmentFindManyArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  where: StudentAssignmentWhereInputSchema.optional(),
  orderBy: z.union([ StudentAssignmentOrderByWithRelationInputSchema.array(),StudentAssignmentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentAssignmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentAssignmentScalarFieldEnumSchema,StudentAssignmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAssignmentAggregateArgsSchema: z.ZodType<Prisma.StudentAssignmentAggregateArgs> = z.object({
  where: StudentAssignmentWhereInputSchema.optional(),
  orderBy: z.union([ StudentAssignmentOrderByWithRelationInputSchema.array(),StudentAssignmentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentAssignmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentAssignmentGroupByArgsSchema: z.ZodType<Prisma.StudentAssignmentGroupByArgs> = z.object({
  where: StudentAssignmentWhereInputSchema.optional(),
  orderBy: z.union([ StudentAssignmentOrderByWithAggregationInputSchema.array(),StudentAssignmentOrderByWithAggregationInputSchema ]).optional(),
  by: StudentAssignmentScalarFieldEnumSchema.array(),
  having: StudentAssignmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentAssignmentFindUniqueArgsSchema: z.ZodType<Prisma.StudentAssignmentFindUniqueArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  where: StudentAssignmentWhereUniqueInputSchema,
}).strict() ;

export const StudentAssignmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StudentAssignmentFindUniqueOrThrowArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  where: StudentAssignmentWhereUniqueInputSchema,
}).strict() ;

export const StudentAttendanceFindFirstArgsSchema: z.ZodType<Prisma.StudentAttendanceFindFirstArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  where: StudentAttendanceWhereInputSchema.optional(),
  orderBy: z.union([ StudentAttendanceOrderByWithRelationInputSchema.array(),StudentAttendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentAttendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentAttendanceScalarFieldEnumSchema,StudentAttendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAttendanceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StudentAttendanceFindFirstOrThrowArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  where: StudentAttendanceWhereInputSchema.optional(),
  orderBy: z.union([ StudentAttendanceOrderByWithRelationInputSchema.array(),StudentAttendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentAttendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentAttendanceScalarFieldEnumSchema,StudentAttendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAttendanceFindManyArgsSchema: z.ZodType<Prisma.StudentAttendanceFindManyArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  where: StudentAttendanceWhereInputSchema.optional(),
  orderBy: z.union([ StudentAttendanceOrderByWithRelationInputSchema.array(),StudentAttendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentAttendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentAttendanceScalarFieldEnumSchema,StudentAttendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAttendanceAggregateArgsSchema: z.ZodType<Prisma.StudentAttendanceAggregateArgs> = z.object({
  where: StudentAttendanceWhereInputSchema.optional(),
  orderBy: z.union([ StudentAttendanceOrderByWithRelationInputSchema.array(),StudentAttendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentAttendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentAttendanceGroupByArgsSchema: z.ZodType<Prisma.StudentAttendanceGroupByArgs> = z.object({
  where: StudentAttendanceWhereInputSchema.optional(),
  orderBy: z.union([ StudentAttendanceOrderByWithAggregationInputSchema.array(),StudentAttendanceOrderByWithAggregationInputSchema ]).optional(),
  by: StudentAttendanceScalarFieldEnumSchema.array(),
  having: StudentAttendanceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentAttendanceFindUniqueArgsSchema: z.ZodType<Prisma.StudentAttendanceFindUniqueArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  where: StudentAttendanceWhereUniqueInputSchema,
}).strict() ;

export const StudentAttendanceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StudentAttendanceFindUniqueOrThrowArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  where: StudentAttendanceWhereUniqueInputSchema,
}).strict() ;

export const TrackingBusHistoryFindFirstArgsSchema: z.ZodType<Prisma.TrackingBusHistoryFindFirstArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  where: TrackingBusHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TrackingBusHistoryOrderByWithRelationInputSchema.array(),TrackingBusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: TrackingBusHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrackingBusHistoryScalarFieldEnumSchema,TrackingBusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TrackingBusHistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TrackingBusHistoryFindFirstOrThrowArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  where: TrackingBusHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TrackingBusHistoryOrderByWithRelationInputSchema.array(),TrackingBusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: TrackingBusHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrackingBusHistoryScalarFieldEnumSchema,TrackingBusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TrackingBusHistoryFindManyArgsSchema: z.ZodType<Prisma.TrackingBusHistoryFindManyArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  where: TrackingBusHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TrackingBusHistoryOrderByWithRelationInputSchema.array(),TrackingBusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: TrackingBusHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrackingBusHistoryScalarFieldEnumSchema,TrackingBusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TrackingBusHistoryAggregateArgsSchema: z.ZodType<Prisma.TrackingBusHistoryAggregateArgs> = z.object({
  where: TrackingBusHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TrackingBusHistoryOrderByWithRelationInputSchema.array(),TrackingBusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: TrackingBusHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TrackingBusHistoryGroupByArgsSchema: z.ZodType<Prisma.TrackingBusHistoryGroupByArgs> = z.object({
  where: TrackingBusHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TrackingBusHistoryOrderByWithAggregationInputSchema.array(),TrackingBusHistoryOrderByWithAggregationInputSchema ]).optional(),
  by: TrackingBusHistoryScalarFieldEnumSchema.array(),
  having: TrackingBusHistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TrackingBusHistoryFindUniqueArgsSchema: z.ZodType<Prisma.TrackingBusHistoryFindUniqueArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  where: TrackingBusHistoryWhereUniqueInputSchema,
}).strict() ;

export const TrackingBusHistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TrackingBusHistoryFindUniqueOrThrowArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  where: TrackingBusHistoryWhereUniqueInputSchema,
}).strict() ;

export const TripFindFirstArgsSchema: z.ZodType<Prisma.TripFindFirstArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TripFindFirstOrThrowArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripFindManyArgsSchema: z.ZodType<Prisma.TripFindManyArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripAggregateArgsSchema: z.ZodType<Prisma.TripAggregateArgs> = z.object({
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TripGroupByArgsSchema: z.ZodType<Prisma.TripGroupByArgs> = z.object({
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithAggregationInputSchema.array(),TripOrderByWithAggregationInputSchema ]).optional(),
  by: TripScalarFieldEnumSchema.array(),
  having: TripScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TripFindUniqueArgsSchema: z.ZodType<Prisma.TripFindUniqueArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict() ;

export const TripFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TripFindUniqueOrThrowArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict() ;

export const TripStopFindFirstArgsSchema: z.ZodType<Prisma.TripStopFindFirstArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  where: TripStopWhereInputSchema.optional(),
  orderBy: z.union([ TripStopOrderByWithRelationInputSchema.array(),TripStopOrderByWithRelationInputSchema ]).optional(),
  cursor: TripStopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripStopScalarFieldEnumSchema,TripStopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripStopFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TripStopFindFirstOrThrowArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  where: TripStopWhereInputSchema.optional(),
  orderBy: z.union([ TripStopOrderByWithRelationInputSchema.array(),TripStopOrderByWithRelationInputSchema ]).optional(),
  cursor: TripStopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripStopScalarFieldEnumSchema,TripStopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripStopFindManyArgsSchema: z.ZodType<Prisma.TripStopFindManyArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  where: TripStopWhereInputSchema.optional(),
  orderBy: z.union([ TripStopOrderByWithRelationInputSchema.array(),TripStopOrderByWithRelationInputSchema ]).optional(),
  cursor: TripStopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripStopScalarFieldEnumSchema,TripStopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripStopAggregateArgsSchema: z.ZodType<Prisma.TripStopAggregateArgs> = z.object({
  where: TripStopWhereInputSchema.optional(),
  orderBy: z.union([ TripStopOrderByWithRelationInputSchema.array(),TripStopOrderByWithRelationInputSchema ]).optional(),
  cursor: TripStopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TripStopGroupByArgsSchema: z.ZodType<Prisma.TripStopGroupByArgs> = z.object({
  where: TripStopWhereInputSchema.optional(),
  orderBy: z.union([ TripStopOrderByWithAggregationInputSchema.array(),TripStopOrderByWithAggregationInputSchema ]).optional(),
  by: TripStopScalarFieldEnumSchema.array(),
  having: TripStopScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TripStopFindUniqueArgsSchema: z.ZodType<Prisma.TripStopFindUniqueArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  where: TripStopWhereUniqueInputSchema,
}).strict() ;

export const TripStopFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TripStopFindUniqueOrThrowArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  where: TripStopWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserRolesFindFirstArgsSchema: z.ZodType<Prisma.UserRolesFindFirstArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithRelationInputSchema.array(),UserRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRolesScalarFieldEnumSchema,UserRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserRolesFindFirstOrThrowArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithRelationInputSchema.array(),UserRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRolesScalarFieldEnumSchema,UserRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRolesFindManyArgsSchema: z.ZodType<Prisma.UserRolesFindManyArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithRelationInputSchema.array(),UserRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRolesScalarFieldEnumSchema,UserRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRolesAggregateArgsSchema: z.ZodType<Prisma.UserRolesAggregateArgs> = z.object({
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithRelationInputSchema.array(),UserRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserRolesGroupByArgsSchema: z.ZodType<Prisma.UserRolesGroupByArgs> = z.object({
  where: UserRolesWhereInputSchema.optional(),
  orderBy: z.union([ UserRolesOrderByWithAggregationInputSchema.array(),UserRolesOrderByWithAggregationInputSchema ]).optional(),
  by: UserRolesScalarFieldEnumSchema.array(),
  having: UserRolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserRolesFindUniqueArgsSchema: z.ZodType<Prisma.UserRolesFindUniqueArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereUniqueInputSchema,
}).strict() ;

export const UserRolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserRolesFindUniqueOrThrowArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereUniqueInputSchema,
}).strict() ;

export const BusCreateArgsSchema: z.ZodType<Prisma.BusCreateArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  data: z.union([ BusCreateInputSchema,BusUncheckedCreateInputSchema ]),
}).strict() ;

export const BusUpsertArgsSchema: z.ZodType<Prisma.BusUpsertArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  where: BusWhereUniqueInputSchema,
  create: z.union([ BusCreateInputSchema,BusUncheckedCreateInputSchema ]),
  update: z.union([ BusUpdateInputSchema,BusUncheckedUpdateInputSchema ]),
}).strict() ;

export const BusCreateManyArgsSchema: z.ZodType<Prisma.BusCreateManyArgs> = z.object({
  data: z.union([ BusCreateManyInputSchema,BusCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BusDeleteArgsSchema: z.ZodType<Prisma.BusDeleteArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  where: BusWhereUniqueInputSchema,
}).strict() ;

export const BusUpdateArgsSchema: z.ZodType<Prisma.BusUpdateArgs> = z.object({
  select: BusSelectSchema.optional(),
  include: BusIncludeSchema.optional(),
  data: z.union([ BusUpdateInputSchema,BusUncheckedUpdateInputSchema ]),
  where: BusWhereUniqueInputSchema,
}).strict() ;

export const BusUpdateManyArgsSchema: z.ZodType<Prisma.BusUpdateManyArgs> = z.object({
  data: z.union([ BusUpdateManyMutationInputSchema,BusUncheckedUpdateManyInputSchema ]),
  where: BusWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BusDeleteManyArgsSchema: z.ZodType<Prisma.BusDeleteManyArgs> = z.object({
  where: BusWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermissionCreateArgsSchema: z.ZodType<Prisma.PermissionCreateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
}).strict() ;

export const PermissionUpsertArgsSchema: z.ZodType<Prisma.PermissionUpsertArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
  create: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
  update: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PermissionCreateManyArgsSchema: z.ZodType<Prisma.PermissionCreateManyArgs> = z.object({
  data: z.union([ PermissionCreateManyInputSchema,PermissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PermissionDeleteArgsSchema: z.ZodType<Prisma.PermissionDeleteArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateArgsSchema: z.ZodType<Prisma.PermissionUpdateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateManyArgsSchema: z.ZodType<Prisma.PermissionUpdateManyArgs> = z.object({
  data: z.union([ PermissionUpdateManyMutationInputSchema,PermissionUncheckedUpdateManyInputSchema ]),
  where: PermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermissionDeleteManyArgsSchema: z.ZodType<Prisma.PermissionDeleteManyArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReportCreateArgsSchema: z.ZodType<Prisma.ReportCreateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  data: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
}).strict() ;

export const ReportUpsertArgsSchema: z.ZodType<Prisma.ReportUpsertArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
  create: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
  update: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReportCreateManyArgsSchema: z.ZodType<Prisma.ReportCreateManyArgs> = z.object({
  data: z.union([ ReportCreateManyInputSchema,ReportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReportDeleteArgsSchema: z.ZodType<Prisma.ReportDeleteArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportUpdateArgsSchema: z.ZodType<Prisma.ReportUpdateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  data: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportUpdateManyArgsSchema: z.ZodType<Prisma.ReportUpdateManyArgs> = z.object({
  data: z.union([ ReportUpdateManyMutationInputSchema,ReportUncheckedUpdateManyInputSchema ]),
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReportDeleteManyArgsSchema: z.ZodType<Prisma.ReportDeleteManyArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolePermissionsCreateArgsSchema: z.ZodType<Prisma.RolePermissionsCreateArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  data: z.union([ RolePermissionsCreateInputSchema,RolePermissionsUncheckedCreateInputSchema ]),
}).strict() ;

export const RolePermissionsUpsertArgsSchema: z.ZodType<Prisma.RolePermissionsUpsertArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereUniqueInputSchema,
  create: z.union([ RolePermissionsCreateInputSchema,RolePermissionsUncheckedCreateInputSchema ]),
  update: z.union([ RolePermissionsUpdateInputSchema,RolePermissionsUncheckedUpdateInputSchema ]),
}).strict() ;

export const RolePermissionsCreateManyArgsSchema: z.ZodType<Prisma.RolePermissionsCreateManyArgs> = z.object({
  data: z.union([ RolePermissionsCreateManyInputSchema,RolePermissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RolePermissionsDeleteArgsSchema: z.ZodType<Prisma.RolePermissionsDeleteArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  where: RolePermissionsWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionsUpdateArgsSchema: z.ZodType<Prisma.RolePermissionsUpdateArgs> = z.object({
  select: RolePermissionsSelectSchema.optional(),
  include: RolePermissionsIncludeSchema.optional(),
  data: z.union([ RolePermissionsUpdateInputSchema,RolePermissionsUncheckedUpdateInputSchema ]),
  where: RolePermissionsWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionsUpdateManyArgsSchema: z.ZodType<Prisma.RolePermissionsUpdateManyArgs> = z.object({
  data: z.union([ RolePermissionsUpdateManyMutationInputSchema,RolePermissionsUncheckedUpdateManyInputSchema ]),
  where: RolePermissionsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolePermissionsDeleteManyArgsSchema: z.ZodType<Prisma.RolePermissionsDeleteManyArgs> = z.object({
  where: RolePermissionsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolesCreateArgsSchema: z.ZodType<Prisma.RolesCreateArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  data: z.union([ RolesCreateInputSchema,RolesUncheckedCreateInputSchema ]),
}).strict() ;

export const RolesUpsertArgsSchema: z.ZodType<Prisma.RolesUpsertArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
  create: z.union([ RolesCreateInputSchema,RolesUncheckedCreateInputSchema ]),
  update: z.union([ RolesUpdateInputSchema,RolesUncheckedUpdateInputSchema ]),
}).strict() ;

export const RolesCreateManyArgsSchema: z.ZodType<Prisma.RolesCreateManyArgs> = z.object({
  data: z.union([ RolesCreateManyInputSchema,RolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RolesDeleteArgsSchema: z.ZodType<Prisma.RolesDeleteArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict() ;

export const RolesUpdateArgsSchema: z.ZodType<Prisma.RolesUpdateArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  data: z.union([ RolesUpdateInputSchema,RolesUncheckedUpdateInputSchema ]),
  where: RolesWhereUniqueInputSchema,
}).strict() ;

export const RolesUpdateManyArgsSchema: z.ZodType<Prisma.RolesUpdateManyArgs> = z.object({
  data: z.union([ RolesUpdateManyMutationInputSchema,RolesUncheckedUpdateManyInputSchema ]),
  where: RolesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolesDeleteManyArgsSchema: z.ZodType<Prisma.RolesDeleteManyArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RouteCreateArgsSchema: z.ZodType<Prisma.RouteCreateArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  data: z.union([ RouteCreateInputSchema,RouteUncheckedCreateInputSchema ]),
}).strict() ;

export const RouteUpsertArgsSchema: z.ZodType<Prisma.RouteUpsertArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  where: RouteWhereUniqueInputSchema,
  create: z.union([ RouteCreateInputSchema,RouteUncheckedCreateInputSchema ]),
  update: z.union([ RouteUpdateInputSchema,RouteUncheckedUpdateInputSchema ]),
}).strict() ;

export const RouteCreateManyArgsSchema: z.ZodType<Prisma.RouteCreateManyArgs> = z.object({
  data: z.union([ RouteCreateManyInputSchema,RouteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RouteDeleteArgsSchema: z.ZodType<Prisma.RouteDeleteArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  where: RouteWhereUniqueInputSchema,
}).strict() ;

export const RouteUpdateArgsSchema: z.ZodType<Prisma.RouteUpdateArgs> = z.object({
  select: RouteSelectSchema.optional(),
  include: RouteIncludeSchema.optional(),
  data: z.union([ RouteUpdateInputSchema,RouteUncheckedUpdateInputSchema ]),
  where: RouteWhereUniqueInputSchema,
}).strict() ;

export const RouteUpdateManyArgsSchema: z.ZodType<Prisma.RouteUpdateManyArgs> = z.object({
  data: z.union([ RouteUpdateManyMutationInputSchema,RouteUncheckedUpdateManyInputSchema ]),
  where: RouteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RouteDeleteManyArgsSchema: z.ZodType<Prisma.RouteDeleteManyArgs> = z.object({
  where: RouteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RouteStopPointCreateArgsSchema: z.ZodType<Prisma.RouteStopPointCreateArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  data: z.union([ RouteStopPointCreateInputSchema,RouteStopPointUncheckedCreateInputSchema ]),
}).strict() ;

export const RouteStopPointUpsertArgsSchema: z.ZodType<Prisma.RouteStopPointUpsertArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  where: RouteStopPointWhereUniqueInputSchema,
  create: z.union([ RouteStopPointCreateInputSchema,RouteStopPointUncheckedCreateInputSchema ]),
  update: z.union([ RouteStopPointUpdateInputSchema,RouteStopPointUncheckedUpdateInputSchema ]),
}).strict() ;

export const RouteStopPointCreateManyArgsSchema: z.ZodType<Prisma.RouteStopPointCreateManyArgs> = z.object({
  data: z.union([ RouteStopPointCreateManyInputSchema,RouteStopPointCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RouteStopPointDeleteArgsSchema: z.ZodType<Prisma.RouteStopPointDeleteArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  where: RouteStopPointWhereUniqueInputSchema,
}).strict() ;

export const RouteStopPointUpdateArgsSchema: z.ZodType<Prisma.RouteStopPointUpdateArgs> = z.object({
  select: RouteStopPointSelectSchema.optional(),
  include: RouteStopPointIncludeSchema.optional(),
  data: z.union([ RouteStopPointUpdateInputSchema,RouteStopPointUncheckedUpdateInputSchema ]),
  where: RouteStopPointWhereUniqueInputSchema,
}).strict() ;

export const RouteStopPointUpdateManyArgsSchema: z.ZodType<Prisma.RouteStopPointUpdateManyArgs> = z.object({
  data: z.union([ RouteStopPointUpdateManyMutationInputSchema,RouteStopPointUncheckedUpdateManyInputSchema ]),
  where: RouteStopPointWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RouteStopPointDeleteManyArgsSchema: z.ZodType<Prisma.RouteStopPointDeleteManyArgs> = z.object({
  where: RouteStopPointWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ScheduleCreateArgsSchema: z.ZodType<Prisma.ScheduleCreateArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  data: z.union([ ScheduleCreateInputSchema,ScheduleUncheckedCreateInputSchema ]),
}).strict() ;

export const ScheduleUpsertArgsSchema: z.ZodType<Prisma.ScheduleUpsertArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  where: ScheduleWhereUniqueInputSchema,
  create: z.union([ ScheduleCreateInputSchema,ScheduleUncheckedCreateInputSchema ]),
  update: z.union([ ScheduleUpdateInputSchema,ScheduleUncheckedUpdateInputSchema ]),
}).strict() ;

export const ScheduleCreateManyArgsSchema: z.ZodType<Prisma.ScheduleCreateManyArgs> = z.object({
  data: z.union([ ScheduleCreateManyInputSchema,ScheduleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ScheduleDeleteArgsSchema: z.ZodType<Prisma.ScheduleDeleteArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  where: ScheduleWhereUniqueInputSchema,
}).strict() ;

export const ScheduleUpdateArgsSchema: z.ZodType<Prisma.ScheduleUpdateArgs> = z.object({
  select: ScheduleSelectSchema.optional(),
  include: ScheduleIncludeSchema.optional(),
  data: z.union([ ScheduleUpdateInputSchema,ScheduleUncheckedUpdateInputSchema ]),
  where: ScheduleWhereUniqueInputSchema,
}).strict() ;

export const ScheduleUpdateManyArgsSchema: z.ZodType<Prisma.ScheduleUpdateManyArgs> = z.object({
  data: z.union([ ScheduleUpdateManyMutationInputSchema,ScheduleUncheckedUpdateManyInputSchema ]),
  where: ScheduleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ScheduleDeleteManyArgsSchema: z.ZodType<Prisma.ScheduleDeleteManyArgs> = z.object({
  where: ScheduleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StopPointCreateArgsSchema: z.ZodType<Prisma.StopPointCreateArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  data: z.union([ StopPointCreateInputSchema,StopPointUncheckedCreateInputSchema ]),
}).strict() ;

export const StopPointUpsertArgsSchema: z.ZodType<Prisma.StopPointUpsertArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  where: StopPointWhereUniqueInputSchema,
  create: z.union([ StopPointCreateInputSchema,StopPointUncheckedCreateInputSchema ]),
  update: z.union([ StopPointUpdateInputSchema,StopPointUncheckedUpdateInputSchema ]),
}).strict() ;

export const StopPointCreateManyArgsSchema: z.ZodType<Prisma.StopPointCreateManyArgs> = z.object({
  data: z.union([ StopPointCreateManyInputSchema,StopPointCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StopPointDeleteArgsSchema: z.ZodType<Prisma.StopPointDeleteArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  where: StopPointWhereUniqueInputSchema,
}).strict() ;

export const StopPointUpdateArgsSchema: z.ZodType<Prisma.StopPointUpdateArgs> = z.object({
  select: StopPointSelectSchema.optional(),
  include: StopPointIncludeSchema.optional(),
  data: z.union([ StopPointUpdateInputSchema,StopPointUncheckedUpdateInputSchema ]),
  where: StopPointWhereUniqueInputSchema,
}).strict() ;

export const StopPointUpdateManyArgsSchema: z.ZodType<Prisma.StopPointUpdateManyArgs> = z.object({
  data: z.union([ StopPointUpdateManyMutationInputSchema,StopPointUncheckedUpdateManyInputSchema ]),
  where: StopPointWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StopPointDeleteManyArgsSchema: z.ZodType<Prisma.StopPointDeleteManyArgs> = z.object({
  where: StopPointWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentCreateArgsSchema: z.ZodType<Prisma.StudentCreateArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  data: z.union([ StudentCreateInputSchema,StudentUncheckedCreateInputSchema ]),
}).strict() ;

export const StudentUpsertArgsSchema: z.ZodType<Prisma.StudentUpsertArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
  create: z.union([ StudentCreateInputSchema,StudentUncheckedCreateInputSchema ]),
  update: z.union([ StudentUpdateInputSchema,StudentUncheckedUpdateInputSchema ]),
}).strict() ;

export const StudentCreateManyArgsSchema: z.ZodType<Prisma.StudentCreateManyArgs> = z.object({
  data: z.union([ StudentCreateManyInputSchema,StudentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StudentDeleteArgsSchema: z.ZodType<Prisma.StudentDeleteArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentUpdateArgsSchema: z.ZodType<Prisma.StudentUpdateArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  data: z.union([ StudentUpdateInputSchema,StudentUncheckedUpdateInputSchema ]),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentUpdateManyArgsSchema: z.ZodType<Prisma.StudentUpdateManyArgs> = z.object({
  data: z.union([ StudentUpdateManyMutationInputSchema,StudentUncheckedUpdateManyInputSchema ]),
  where: StudentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentDeleteManyArgsSchema: z.ZodType<Prisma.StudentDeleteManyArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentAssignmentCreateArgsSchema: z.ZodType<Prisma.StudentAssignmentCreateArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  data: z.union([ StudentAssignmentCreateInputSchema,StudentAssignmentUncheckedCreateInputSchema ]),
}).strict() ;

export const StudentAssignmentUpsertArgsSchema: z.ZodType<Prisma.StudentAssignmentUpsertArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  where: StudentAssignmentWhereUniqueInputSchema,
  create: z.union([ StudentAssignmentCreateInputSchema,StudentAssignmentUncheckedCreateInputSchema ]),
  update: z.union([ StudentAssignmentUpdateInputSchema,StudentAssignmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const StudentAssignmentCreateManyArgsSchema: z.ZodType<Prisma.StudentAssignmentCreateManyArgs> = z.object({
  data: z.union([ StudentAssignmentCreateManyInputSchema,StudentAssignmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StudentAssignmentDeleteArgsSchema: z.ZodType<Prisma.StudentAssignmentDeleteArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  where: StudentAssignmentWhereUniqueInputSchema,
}).strict() ;

export const StudentAssignmentUpdateArgsSchema: z.ZodType<Prisma.StudentAssignmentUpdateArgs> = z.object({
  select: StudentAssignmentSelectSchema.optional(),
  include: StudentAssignmentIncludeSchema.optional(),
  data: z.union([ StudentAssignmentUpdateInputSchema,StudentAssignmentUncheckedUpdateInputSchema ]),
  where: StudentAssignmentWhereUniqueInputSchema,
}).strict() ;

export const StudentAssignmentUpdateManyArgsSchema: z.ZodType<Prisma.StudentAssignmentUpdateManyArgs> = z.object({
  data: z.union([ StudentAssignmentUpdateManyMutationInputSchema,StudentAssignmentUncheckedUpdateManyInputSchema ]),
  where: StudentAssignmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentAssignmentDeleteManyArgsSchema: z.ZodType<Prisma.StudentAssignmentDeleteManyArgs> = z.object({
  where: StudentAssignmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentAttendanceCreateArgsSchema: z.ZodType<Prisma.StudentAttendanceCreateArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  data: z.union([ StudentAttendanceCreateInputSchema,StudentAttendanceUncheckedCreateInputSchema ]),
}).strict() ;

export const StudentAttendanceUpsertArgsSchema: z.ZodType<Prisma.StudentAttendanceUpsertArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  where: StudentAttendanceWhereUniqueInputSchema,
  create: z.union([ StudentAttendanceCreateInputSchema,StudentAttendanceUncheckedCreateInputSchema ]),
  update: z.union([ StudentAttendanceUpdateInputSchema,StudentAttendanceUncheckedUpdateInputSchema ]),
}).strict() ;

export const StudentAttendanceCreateManyArgsSchema: z.ZodType<Prisma.StudentAttendanceCreateManyArgs> = z.object({
  data: z.union([ StudentAttendanceCreateManyInputSchema,StudentAttendanceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StudentAttendanceDeleteArgsSchema: z.ZodType<Prisma.StudentAttendanceDeleteArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  where: StudentAttendanceWhereUniqueInputSchema,
}).strict() ;

export const StudentAttendanceUpdateArgsSchema: z.ZodType<Prisma.StudentAttendanceUpdateArgs> = z.object({
  select: StudentAttendanceSelectSchema.optional(),
  include: StudentAttendanceIncludeSchema.optional(),
  data: z.union([ StudentAttendanceUpdateInputSchema,StudentAttendanceUncheckedUpdateInputSchema ]),
  where: StudentAttendanceWhereUniqueInputSchema,
}).strict() ;

export const StudentAttendanceUpdateManyArgsSchema: z.ZodType<Prisma.StudentAttendanceUpdateManyArgs> = z.object({
  data: z.union([ StudentAttendanceUpdateManyMutationInputSchema,StudentAttendanceUncheckedUpdateManyInputSchema ]),
  where: StudentAttendanceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentAttendanceDeleteManyArgsSchema: z.ZodType<Prisma.StudentAttendanceDeleteManyArgs> = z.object({
  where: StudentAttendanceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TrackingBusHistoryCreateArgsSchema: z.ZodType<Prisma.TrackingBusHistoryCreateArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  data: z.union([ TrackingBusHistoryCreateInputSchema,TrackingBusHistoryUncheckedCreateInputSchema ]),
}).strict() ;

export const TrackingBusHistoryUpsertArgsSchema: z.ZodType<Prisma.TrackingBusHistoryUpsertArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  where: TrackingBusHistoryWhereUniqueInputSchema,
  create: z.union([ TrackingBusHistoryCreateInputSchema,TrackingBusHistoryUncheckedCreateInputSchema ]),
  update: z.union([ TrackingBusHistoryUpdateInputSchema,TrackingBusHistoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const TrackingBusHistoryCreateManyArgsSchema: z.ZodType<Prisma.TrackingBusHistoryCreateManyArgs> = z.object({
  data: z.union([ TrackingBusHistoryCreateManyInputSchema,TrackingBusHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TrackingBusHistoryDeleteArgsSchema: z.ZodType<Prisma.TrackingBusHistoryDeleteArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  where: TrackingBusHistoryWhereUniqueInputSchema,
}).strict() ;

export const TrackingBusHistoryUpdateArgsSchema: z.ZodType<Prisma.TrackingBusHistoryUpdateArgs> = z.object({
  select: TrackingBusHistorySelectSchema.optional(),
  include: TrackingBusHistoryIncludeSchema.optional(),
  data: z.union([ TrackingBusHistoryUpdateInputSchema,TrackingBusHistoryUncheckedUpdateInputSchema ]),
  where: TrackingBusHistoryWhereUniqueInputSchema,
}).strict() ;

export const TrackingBusHistoryUpdateManyArgsSchema: z.ZodType<Prisma.TrackingBusHistoryUpdateManyArgs> = z.object({
  data: z.union([ TrackingBusHistoryUpdateManyMutationInputSchema,TrackingBusHistoryUncheckedUpdateManyInputSchema ]),
  where: TrackingBusHistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TrackingBusHistoryDeleteManyArgsSchema: z.ZodType<Prisma.TrackingBusHistoryDeleteManyArgs> = z.object({
  where: TrackingBusHistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripCreateArgsSchema: z.ZodType<Prisma.TripCreateArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  data: z.union([ TripCreateInputSchema,TripUncheckedCreateInputSchema ]),
}).strict() ;

export const TripUpsertArgsSchema: z.ZodType<Prisma.TripUpsertArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
  create: z.union([ TripCreateInputSchema,TripUncheckedCreateInputSchema ]),
  update: z.union([ TripUpdateInputSchema,TripUncheckedUpdateInputSchema ]),
}).strict() ;

export const TripCreateManyArgsSchema: z.ZodType<Prisma.TripCreateManyArgs> = z.object({
  data: z.union([ TripCreateManyInputSchema,TripCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TripDeleteArgsSchema: z.ZodType<Prisma.TripDeleteArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict() ;

export const TripUpdateArgsSchema: z.ZodType<Prisma.TripUpdateArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  data: z.union([ TripUpdateInputSchema,TripUncheckedUpdateInputSchema ]),
  where: TripWhereUniqueInputSchema,
}).strict() ;

export const TripUpdateManyArgsSchema: z.ZodType<Prisma.TripUpdateManyArgs> = z.object({
  data: z.union([ TripUpdateManyMutationInputSchema,TripUncheckedUpdateManyInputSchema ]),
  where: TripWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripDeleteManyArgsSchema: z.ZodType<Prisma.TripDeleteManyArgs> = z.object({
  where: TripWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripStopCreateArgsSchema: z.ZodType<Prisma.TripStopCreateArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  data: z.union([ TripStopCreateInputSchema,TripStopUncheckedCreateInputSchema ]),
}).strict() ;

export const TripStopUpsertArgsSchema: z.ZodType<Prisma.TripStopUpsertArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  where: TripStopWhereUniqueInputSchema,
  create: z.union([ TripStopCreateInputSchema,TripStopUncheckedCreateInputSchema ]),
  update: z.union([ TripStopUpdateInputSchema,TripStopUncheckedUpdateInputSchema ]),
}).strict() ;

export const TripStopCreateManyArgsSchema: z.ZodType<Prisma.TripStopCreateManyArgs> = z.object({
  data: z.union([ TripStopCreateManyInputSchema,TripStopCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TripStopDeleteArgsSchema: z.ZodType<Prisma.TripStopDeleteArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  where: TripStopWhereUniqueInputSchema,
}).strict() ;

export const TripStopUpdateArgsSchema: z.ZodType<Prisma.TripStopUpdateArgs> = z.object({
  select: TripStopSelectSchema.optional(),
  include: TripStopIncludeSchema.optional(),
  data: z.union([ TripStopUpdateInputSchema,TripStopUncheckedUpdateInputSchema ]),
  where: TripStopWhereUniqueInputSchema,
}).strict() ;

export const TripStopUpdateManyArgsSchema: z.ZodType<Prisma.TripStopUpdateManyArgs> = z.object({
  data: z.union([ TripStopUpdateManyMutationInputSchema,TripStopUncheckedUpdateManyInputSchema ]),
  where: TripStopWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripStopDeleteManyArgsSchema: z.ZodType<Prisma.TripStopDeleteManyArgs> = z.object({
  where: TripStopWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserRolesCreateArgsSchema: z.ZodType<Prisma.UserRolesCreateArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  data: z.union([ UserRolesCreateInputSchema,UserRolesUncheckedCreateInputSchema ]),
}).strict() ;

export const UserRolesUpsertArgsSchema: z.ZodType<Prisma.UserRolesUpsertArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereUniqueInputSchema,
  create: z.union([ UserRolesCreateInputSchema,UserRolesUncheckedCreateInputSchema ]),
  update: z.union([ UserRolesUpdateInputSchema,UserRolesUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserRolesCreateManyArgsSchema: z.ZodType<Prisma.UserRolesCreateManyArgs> = z.object({
  data: z.union([ UserRolesCreateManyInputSchema,UserRolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserRolesDeleteArgsSchema: z.ZodType<Prisma.UserRolesDeleteArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  where: UserRolesWhereUniqueInputSchema,
}).strict() ;

export const UserRolesUpdateArgsSchema: z.ZodType<Prisma.UserRolesUpdateArgs> = z.object({
  select: UserRolesSelectSchema.optional(),
  include: UserRolesIncludeSchema.optional(),
  data: z.union([ UserRolesUpdateInputSchema,UserRolesUncheckedUpdateInputSchema ]),
  where: UserRolesWhereUniqueInputSchema,
}).strict() ;

export const UserRolesUpdateManyArgsSchema: z.ZodType<Prisma.UserRolesUpdateManyArgs> = z.object({
  data: z.union([ UserRolesUpdateManyMutationInputSchema,UserRolesUncheckedUpdateManyInputSchema ]),
  where: UserRolesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserRolesDeleteManyArgsSchema: z.ZodType<Prisma.UserRolesDeleteManyArgs> = z.object({
  where: UserRolesWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;