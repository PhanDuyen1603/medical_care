import { Request } from "express";
import { Specialist } from '@prisma/client'
import prisma from "../../../shared/prisma";

const create = async (req: Request): Promise<Specialist> => {
  let data = req.body.data
  if (typeof data === 'string') data = JSON.parse(data)
  return await prisma.specialist.create({ data });
}

const getAll = async () => {
  return await prisma.specialist.findMany();
}

const deleteSpecialist = async (id: string): Promise<Specialist | null> => {
  return await prisma.specialist.delete({ where: { id } });
}

const updateSpecialist = async (req: Request): Promise<Specialist | null> => {
  let data = req.body;
  data = typeof data === 'string' ? JSON.parse(data) : data;
  const id = req.params.id as string;
  const result = await prisma.specialist.update({
    where: { id },
    data
  });
  return result;
}


export const SpecialistService = {
  create,
  getAll,
  deleteSpecialist,
  updateSpecialist
}