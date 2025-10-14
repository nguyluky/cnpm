
Insert into Permission (id, name) values 
(1, 'update:user'),
(2, 'read:profile'),
(3, 'read:public_profile'),
(4, 'delete:user'),
(5, 'create:bus'),
(6, 'update:bus'),
(7, 'delete:bus'),
(8, 'read:bus'),
(9, 'read:bus_detail'),
(10, 'role:read'),
(11, 'role:create'),
(12, 'role:update'),
(13, 'role:delete'),
(14, 'permission:read'),
(15, 'read:driver_schedule'),
(16, 'read:parent_students'),
(17, 'read:routes'),
(18, 'read:route'),
(19, 'read:route_detail'),
(20, 'create:route'),
(21, 'update:route'),
(22, 'delete:route'),
(23, 'read:schedule'),
(24, 'read:schedule_detail'),
(25, 'create:schedule'),
(26, 'update:schedule'),
(27, 'delete:schedule'),
(28, 'read:stoppoints'),
(29, 'read:stoppoints_detail'),
(30, 'create:stoppoints'),
(31, 'update:stoppoints'),
(32, 'delete:stoppoints');


-- Roles: 'admin' | 'driver' | 'parent'
Insert into Roles (name) values ('admin'), ('driver'), ('parent');

-- Assign all permissions to admin role
Insert into RolePermission (roleId, permissionId)
Select r.id, p.id
From Roles r, Permission p
Where r.name = 'admin';

