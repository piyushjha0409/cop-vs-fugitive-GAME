// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import CopSelectionForm from "../app/components/forms/CopSelectionForms";
import { getCities, getVehicles } from "../app/api/data";
import { City, Vehicle, CopSelection } from "@/types/types";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCities, setSelectedCities] = useState<number[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);
  const [copSelections, setCopSelections] = useState<CopSelection[]>([]);
  const [fugitiveLocation, setFugitiveLocation] = useState<City | null>(null);
  const [result, setResult] = useState<string>("");

  // Fetch cities and vehicles on component mount
  useEffect(() => {
    async function fetchData() {
      const citiesData = await getCities();
      const vehiclesData = await getVehicles();
      setCities(citiesData);
      setVehicles(vehiclesData);
    }
    fetchData();
  }, []);

  // Handle cop selection
  const handleCopSelection = async (
    copId: number,
    cityId: number,
    vehicleId: number
  ) => {
    // Add the selected city and vehicle to the lists
    setSelectedCities([...selectedCities, cityId]);
    setSelectedVehicles([...selectedVehicles, vehicleId]);

    // Add the selection to the copSelections list
    const selectedCity = cities.find((city) => city.id === cityId);
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleId
    );
    if (selectedCity && selectedVehicle) {
      setCopSelections([
        ...copSelections,
        { copId, city: selectedCity, vehicle: selectedVehicle },
      ]);
    }
  };

  // Simulate fugitive location
  const simulateFugitiveLocation = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const location = cities[randomIndex];
    setFugitiveLocation(location);
    setResult(""); // Reset result when fugitive location changes
  };

  // Evaluate the result
  const evaluateResult = () => {
    if (!fugitiveLocation) {
      alert("Please simulate the fugitive's location first.");
      return;
    }

    for (const selection of copSelections) {
      if (selection.city.id === fugitiveLocation.id) {
        setResult(
          `Cop ${selection.copId} successfully captured the fugitive in ${selection.city.name}!`
        );
        return;
      }
    }

    setResult("The fugitive escaped! No cop was able to capture them.");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criminal Capture Game</h1>

      {/* Simulate Fugitive Location */}
      <button
        onClick={simulateFugitiveLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Simulate Fugitive Location
      </button>

      {/* Display Fugitive Location */}
      {/* {fugitiveLocation && (
        <p className="mb-4">
          Fugitive is hiding in: <strong>{fugitiveLocation.name}</strong>
        </p>
      )} */}

      {/* Cop Selection Forms */}
      <div className="space-y-4">
        {/* Cop 1 Form */}
        <CopSelectionForm
          copId={1}
          cities={cities}
          vehicles={vehicles}
          selectedCities={selectedCities}
          selectedVehicles={selectedVehicles}
          onSelect={handleCopSelection}
        />

        {/* Cop 2 Form */}
        <CopSelectionForm
          copId={2}
          cities={cities}
          vehicles={vehicles}
          selectedCities={selectedCities}
          selectedVehicles={selectedVehicles}
          onSelect={handleCopSelection}
        />

        {/* Cop 3 Form */}
        <CopSelectionForm
          copId={3}
          cities={cities}
          vehicles={vehicles}
          selectedCities={selectedCities}
          selectedVehicles={selectedVehicles}
          onSelect={handleCopSelection}
        />
      </div>

      {/* Display Cop Selections */}
      {copSelections.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Selected Cities & Vehicles
          </h2>
          <ul>
            {copSelections.map((selection, index) => (
              <li key={index} className="mb-2">
                Cop {selection.copId} selected {selection.city.name} with{" "}
                {selection.vehicle.kind}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Evaluate Result Button */}
      <button
        onClick={evaluateResult}
        className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
      >
        Evaluate Result
      </button>

      {/* Display Result */}
      {fugitiveLocation && result && (
        <p className="text-lg font-bold">
          {result}
          Fugitive is hiding in: <strong>{fugitiveLocation.name}</strong>
        </p>
      )}
    </div>
  );
}