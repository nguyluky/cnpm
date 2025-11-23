import { ConflictError, NotFoundError } from "@lib/exception";
import { Delete, Get, Post, Put, Summary, useAuth } from "@lib/httpMethod";
import { Validate } from "@lib/validate";
import prisma from "@src/config/prisma.config";
import { StudentData, StudentMetadata } from "@src/types/share.type";
import { JWT_AUTH, usePremisstion } from "@src/utils/jwt";
import { v4 as uuidv4 } from "uuid";
import * as createType from "./types/create.type";
import * as deleteType from "./types/delete.type";
import * as getAllType from "./types/getAll.type";
import * as getByIdType from "./types/getById.type";
import * as updateType from "./types/update.type";

export default class StudentsController {
  @Summary("Get all students")
  @Get("/")
  @Validate(getAllType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["read:student"])
  async getAll(req: getAllType.Req): Promise<getAllType.RerturnType> {
    const { page, limit, search } = req.query;
    const where = search
      ? {
          OR: [{ name: { contains: search, mode: "insensitive" } }],
        }
      : {};

    const [total, students] = await Promise.all([
      prisma.student.count({ where }),
      prisma.student.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return getAllType.getAllRes.parse({
      data: students.map((student) =>
        StudentData.parse({
          id: student.id,
          name: student.name,
          createdAt: student.createdAt.toISOString(),
          updatedAt: student.updatedAt.toISOString(),
          metadata: StudentMetadata.parse(student.meta || {}),
        })
      ),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }

  @Summary("Get student by ID")
  @Get("/:id")
  @Validate(getByIdType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["read:student_detail"])
  async getById(req: getByIdType.Req): Promise<getByIdType.RerturnType> {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundError("Student not found");
    }

    return getByIdType.getByIdRes.parse({
      id: student.id,
      name: student.name,
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
      metadata: StudentMetadata.parse(student.meta || {}),
    });
  }

  @Summary("Create a new student")
  @Post("/")
  @Validate(createType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["create:student"])
  async create(req: createType.Req): Promise<createType.RerturnType> {
    const { name, userId, metadata } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError(`User not found with id: ${userId}`);
    }

    // Check if student already exists for this user
    const existingStudent = await prisma.student.findUnique({
      where: { userId },
    });

    if (existingStudent) {
      throw new ConflictError("Student already exists for this user");
    }

    const student = await prisma.student.create({
      data: {
        id: uuidv4(),
        name,
        userId,
        meta: metadata as any,
      },
    });

    return createType.createRes.parse({
      id: student.id,
      name: student.name,
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
      metadata: StudentMetadata.parse(student.meta || {}),
    });
  }

  @Summary("Update a student")
  @Put("/:id")
  @Validate(updateType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["update:student"])
  async update(req: updateType.Req): Promise<updateType.RerturnType> {
    const { id } = req.params;
    const { name, metadata } = req.body;

    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new NotFoundError("Student not found");
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        name,
        meta: metadata as any,
      },
    });

    return updateType.updateRes.parse({
      id: updatedStudent.id,
      name: updatedStudent.name,
      createdAt: updatedStudent.createdAt.toISOString(),
      updatedAt: updatedStudent.updatedAt.toISOString(),
      metadata: StudentMetadata.parse(updatedStudent.meta || {}),
    });
  }

  @Summary("Delete a student")
  @Delete("/:id")
  @Validate(deleteType.schema)
  @useAuth(JWT_AUTH)
  @usePremisstion(["delete:student"])
  async delete(req: deleteType.Req): Promise<deleteType.RerturnType> {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundError("Student not found");
    }

    await prisma.student.delete({
      where: { id },
    });

    return deleteType.deleteRes.parse({});
  }
}
