import { Admin, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { CloudinaryHelper } from "../../../helpers/uploadHelper";
import { IUpload } from "../../../interfaces/file";
import { Request } from "express";
import calculatePagination, { IOption } from "../../../shared/paginationHelper";

const create = async (payload: any): Promise<any> => {
  const data = await prisma.$transaction(async (tx) => {
    const { password, ...othersData } = payload;
    const { email } = othersData
    const existEmail = await tx.auth.findUnique({ where: { email } });
    if (existEmail) {
      throw new Error("Email Already Exist !!")
    }
    const admin = tx.admin.create({ data: othersData })
    await tx.auth.create({
      data: {
          email: email,
          password: password && await bcrypt.hashSync(password, 12),
          role: UserRole.admin,
          userId: admin.id
      },
    }); 
    return admin
  })
  return data;
}

const remove = async (id: string): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const admin = await tx.admin.delete({
      where: {
        id: id
      }
    });
    await tx.auth.delete({
      where: {
          email: admin.email
      }
    })
    return admin
  })
  return result;
}

const update = async (req: Request): Promise<any> => {
  const file = req.file as IUpload;
  const id = req.params.id as string;
  const user = JSON.parse(req.body.data);
  
  if(file) {
    const uploadImage = await CloudinaryHelper.uploadFile(file);
    if (uploadImage) {
      user.img = uploadImage.secure_url
    } else {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to updateImage!!')
    }
  }
  const res = await prisma.admin.update({
    where: { id },
    data: user
  })
  return res
}

const getAllUserAdmins = async (filters: any, options: IOption ) => {
  const { limit, page, skip } = calculatePagination(options);
  const { searchTerm, max, min, specialist, ...filterData } = filters;
  const result = await prisma.admin.findMany();
  const total = await prisma.admin.count();
  return {
    meta: {
        page,
        limit,
        total,
    },
    data: result
  }
}

const getAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id
    }
  });
  return result;
}

export const AdminService = {
  create,
  remove,
  update,
  getAdmin,
  getAllUserAdmins
}