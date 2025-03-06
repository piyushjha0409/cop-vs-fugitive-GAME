"use client";

import { useEffect, useState } from "react";
import CopSelectionForm from "../components/forms/CopSelectionForms";
import { getCities, getVehicles } from "..//api/data";
import type { City, Vehicle, CopSelection } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  MapPin,
  Car,
  Shield,
  User,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function Game() {
  const [cities, setCities] = useState<City[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCities, setSelectedCities] = useState<number[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);
  const [copSelections, setCopSelections] = useState<CopSelection[]>([]);
  const [fugitiveLocation, setFugitiveLocation] = useState<City | null>(null);
  const [result, setResult] = useState<string>("");
  const [currentCop, setCurrentCop] = useState<number>(1); // Track the current cop (1, 2, or 3)
  const [gameStatus, setGameStatus] = useState<
    "idle" | "in-progress" | "success" | "failure"
  >("idle");

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

  /**
   * Function for handling the cop selection
   * @param copId
   * @param cityId
   * @param vehicleId
   * @returns
   */
  const handleCopSelection = async (
    copId: number,
    cityId: number,
    vehicleId: number
  ) => {
    // Check if the city has already been selected
    if (selectedCities.includes(cityId)) {
      alert("This city has already been selected by another cop.");
      return;
    }

    // Find the selected city and vehicle
    const selectedCity = cities.find((city) => city.id === cityId);
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleId
    );

    if (!selectedCity || !selectedVehicle) {
      alert("Invalid selection. Please try again.");
      return;
    }

    // Check if the vehicle has enough range for a round trip
    if (selectedVehicle.range < selectedCity.distance * 2) {
      alert(
        "The selected vehicle does not have enough range for a round trip."
      );
      return;
    }

    // Check if the vehicle is still available
    if (selectedVehicle.count <= 0) {
      alert("The selected vehicle is no longer available.");
      return;
    }

    // Update the selected city and vehicle lists
    setSelectedCities([...selectedCities, cityId]);
    setSelectedVehicles([...selectedVehicles, vehicleId]);

    // Decrease the vehicle count
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === vehicleId
        ? { ...vehicle, count: vehicle.count - 1 }
        : vehicle
    );
    setVehicles(updatedVehicles);

    // Add the selection to the copSelections list
    setCopSelections([
      ...copSelections,
      { copId, city: selectedCity, vehicle: selectedVehicle },
    ]);

    // Move to the next cop
    setCurrentCop((prev) => prev + 1);
  };

  // Simulate fugitive location
  const simulateFugitiveLocation = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const location = cities[randomIndex];
    setFugitiveLocation(location);
    setResult(""); // Reset result when fugitive location changes
    setCurrentCop(1); // Start with Cop 1
    setGameStatus("in-progress");
    setCopSelections([]);
    setSelectedCities([]);
    setSelectedVehicles([]);
  };

  // Reset the game
  const resetGame = () => {
    setFugitiveLocation(null);
    setResult("");
    setCurrentCop(1);
    setCopSelections([]);
    setSelectedCities([]);
    setSelectedVehicles([]);
    setGameStatus("idle");
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
        setGameStatus("success");
        return;
      }
    }

    setResult("The fugitive escaped! No cop was able to capture them.");
    setGameStatus("failure");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Criminal Capture Game
          </h1>
          <p className="text-slate-300 text-center max-w-2xl mb-6">
            A notorious criminal has escaped and is hiding in one of 5
            neighboring cities. Deploy your 3 cops strategically to capture the
            fugitive.
          </p>

          <Badge
            variant="outline"
            className="bg-red-900/30 text-red-400 border-red-800 mb-6"
          >
            WANTED FUGITIVE
          </Badge>
        </div>
        {/* Criminal Photo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-[3/2] overflow-hidden rounded-lg border-4 border-red-800 shadow-lg">
            <Image
              src="/criminal.png"
              alt="Wanted Criminal"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="bg-red-900/30 border border-red-800 rounded-md px-4 py-2 mt-4 text-center">
            <p className="text-red-200 font-mono text-sm">
              EXTREMELY DANGEROUS • APPROACH WITH CAUTION
            </p>
          </div>
        </div>

        {/* Game Controls */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              Fugitive Location
            </CardTitle>
            <CardDescription className="text-slate-300">
              First, determine where the fugitive is hiding
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!fugitiveLocation ? (
              <Button
                onClick={simulateFugitiveLocation}
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-6 rounded-md transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <AlertCircle className="mr-2 h-5 w-5" />
                Simulate Fugitive Location
              </Button>
            ) : (
              <div className="bg-slate-700/50 p-4 rounded-md border border-slate-600">
                <p className="text-center text-lg">
                  Fugitives location is hidden. Deploy your officers to find
                  them!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Cop Selection Forms */}
        {fugitiveLocation && gameStatus === "in-progress" && (
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Deploy Your Officers
            </h2>

            {/* Cop 1 Form */}
            {currentCop >= 1 && (
              <Card
                className={`bg-slate-800/50 border-slate-700 ${
                  currentCop === 1 ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <CardHeader className="bg-slate-700/30 border-b border-slate-700">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Officer 1
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CopSelectionForm
                    copId={1}
                    cities={cities}
                    vehicles={vehicles}
                    selectedCities={selectedCities}
                    selectedVehicles={selectedVehicles}
                    onSelect={handleCopSelection}
                  />
                </CardContent>
              </Card>
            )}

            {/* Cop 2 Form */}
            {currentCop >= 2 && (
              <Card
                className={`bg-slate-800/50 border-slate-700 ${
                  currentCop === 2 ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <CardHeader className="bg-slate-700/30 border-b border-slate-700">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Officer 2
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CopSelectionForm
                    copId={2}
                    cities={cities}
                    vehicles={vehicles}
                    selectedCities={selectedCities}
                    selectedVehicles={selectedVehicles}
                    onSelect={handleCopSelection}
                  />
                </CardContent>
              </Card>
            )}

            {/* Cop 3 Form */}
            {currentCop >= 3 && (
              <Card
                className={`bg-slate-800/50 border-slate-700 ${
                  currentCop === 3 ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <CardHeader className="bg-slate-700/30 border-b border-slate-700">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Officer 3
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CopSelectionForm
                    copId={3}
                    cities={cities}
                    vehicles={vehicles}
                    selectedCities={selectedCities}
                    selectedVehicles={selectedVehicles}
                    onSelect={handleCopSelection}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )}
        {/* Display Cop Selections */}
        {copSelections.length > 0 && (
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-400" />
                Deployment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {copSelections.map((selection, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-md border border-slate-700"
                  >
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="font-bold">
                        Officer {selection.copId}
                      </span>
                      <div className="flex items-center text-sm text-slate-300">
                        <span>Deployed to {selection.city.name}</span>
                        <ArrowRight className="h-3 w-3 mx-2" />
                        <span>Using {selection.vehicle.kind}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        {/* Evaluate Result Button */}
        {currentCop > 3 && gameStatus === "in-progress" && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={evaluateResult}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-md transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              Evaluate Result
            </Button>
          </div>
        )}
        {/* Display Result */}
        {result && (
          <Card
            className={`mb-8 ${
              gameStatus === "success"
                ? "bg-green-900/30 border-green-800"
                : "bg-red-900/30 border-red-800"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {gameStatus === "success" ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="text-green-400">Mission Successful!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-6 w-6 text-red-400" />
                    <span className="text-red-400">Mission Failed!</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-center">{result}</p>
              {fugitiveLocation && (
                <p className="text-center text-slate-300 mt-4">
                  The fugitive was hiding in:{" "}
                  <span className="font-bold text-yellow-400">
                    {fugitiveLocation.name}
                  </span>
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={resetGame}
                variant="outline"
                className="mt-4 border-slate-600 hover:bg-slate-700"
              >
                Play Again
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
