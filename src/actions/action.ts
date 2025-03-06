"use server";

// src/lib/gameLogic.ts
import prisma from "../lib/client";
import { City, CopSelection } from "../types/types";

/**
 * Returns the random city to hide
 *
 */

export async function simulateFugitiveLocation() {
  const cities = await prisma.city.findMany();
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex]; // [1 yapdhkanagar 60]
}

/**
 * Returns the vehicle and city for the cop
 * @param copId
 * @param selectedCityIds
 * @param availableVehicles
 * @returns
 */
export async function selectCityAndVehicle(
    copId: number,
    cityId: number,
    vehicleId: number
  ) {
    const city = await prisma.city.findUnique({ where: { id: cityId } });
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
  
    if (!city || !vehicle) {
      throw new Error('Invalid city or vehicle selection');
    }
  
    return {
      copId,
      city,
      vehicle,
    };
  }

// Determine capture result
export async function determineCaptureResult(
  copSelections: CopSelection[],
  fugitiveLocation: City
) {
  for (const selection of copSelections) {
    if (selection.city.id === fugitiveLocation.id) {
      return `Cop ${selection.copId} successfully captured the fugitive in ${selection.city.name}!`;
    }
  }
  return "The fugitive escaped! No cop was able to capture them.";
}
