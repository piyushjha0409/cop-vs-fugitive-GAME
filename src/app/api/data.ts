'use server'
import prisma from "@/lib/client";

export async function getCities() {
  return await prisma.city.findMany();
}

export async function getVehicles() {
  return await prisma.vehicle.findMany();
}
