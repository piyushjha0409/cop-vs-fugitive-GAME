// src/app/CopSelectionButtons.tsx
"use client";

import { useState } from "react";
import {
  simulateFugitiveLocation,
  selectCityAndVehicle,
} from "../../actions/action";
import { City, CopSelection } from "@/types/types";
import prisma from "@/lib/client";

export default function CopSelectionButtons() {
  const [fugitiveLocation, setFugitiveLocation] = useState<City | null>(null);
  const [copSelections, setCopSelections] = useState<CopSelection[]>([]);

  // Simulate fugitive location
  const handleSimulateFugitive = async () => {
    const location = await simulateFugitiveLocation();
    setFugitiveLocation(location);
  };

  console.log(fugitiveLocation);

  // Handle cop selection
  const handleCopSelection = async (copId: number) => {
    const selectedCityIds = copSelections.map((selection) => selection.city.id);
    const availableVehicles = await prisma.vehicle.findMany();

    const selection = await selectCityAndVehicle(
      copId,
      selectedCityIds,
      availableVehicles
    );
    const cop = await prisma.cop.findUniqueOrThrow({ where: { id: copId } });

    if (selection) {
      setCopSelections([
        ...copSelections,
        {
          cop,
          vehicle: selection.vehicle,
          city: selection.city,
        },
      ]);
    }
  };

  return (
    <div>
      {/* Simulate Fugitive Location */}
      <button
        onClick={handleSimulateFugitive}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Simulate Fugitive Location
      </button>

      {/* Cop Selection Buttons */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Cop Selections</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((copId) => (
            <button
              key={copId}
              onClick={() => handleCopSelection(copId)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Cop {copId} Select City & Vehicle
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
