"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import type { City, Vehicle } from "@/types/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin, CheckCircle } from "lucide-react"

interface CopSelectionFormProps {
  copId: number
  cities: City[]
  vehicles: Vehicle[]
  selectedCities: number[]
  selectedVehicles: number[]
  onSelect: (copId: number, cityId: number, vehicleId: number) => void
}

export default function CopSelectionForm({
  copId,
  cities,
  vehicles,
  selectedCities,
  selectedVehicles,
  onSelect,
}: CopSelectionFormProps) {
  const [cityId, setCityId] = useState<number | null>(null)
  const [vehicleId, setVehicleId] = useState<number | null>(null)

  // Filter available vehicles based on the selected city's distance
  const availableVehicles = cityId
    ? vehicles.filter((vehicle) => {
        const city = cities.find((city) => city.id === cityId)
        return city && vehicle.range >= city.distance * 2 && vehicle.count > 0
      })
    : []

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cityId && vehicleId) {
      onSelect(copId, cityId, vehicleId)
    }
  }

  // Get cop image based on copId
  const getCopImage = () => {
    switch (copId) {
      case 1:
        return "/cop1.png" // Replace with your actual image paths
      case 2:
        return "/cop2.png"
      case 3:
        return "/cop3.png"
      default:
        return "/placeholder.svg?height=200&width=200"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cop Image */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[200px] overflow-hidden rounded-lg border-2 border-slate-600 shadow-md mb-3">
            <Image src={getCopImage() || "/placeholder.svg"} alt={`Officer ${copId}`} fill className="object-cover" />
          </div>
          <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-800">
            OFFICER {copId}
          </Badge>
        </div>

        {/* Selection Options */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* City Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-blue-400" />
              <h3 className="font-medium text-slate-200">Select City to Search:</h3>
            </div>

            <RadioGroup value={cityId?.toString()} onValueChange={(value) => setCityId(Number.parseInt(value))}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cities.map((city) => {
                  const isDisabled = selectedCities.includes(city.id)
                  return (
                    <div key={city.id} className="relative">
                      <Card
                        className={`border border-slate-700 transition-all ${
                          isDisabled
                            ? "opacity-50 bg-slate-800/30"
                            : cityId === city.id
                              ? "bg-slate-700/50 border-blue-500"
                              : "bg-slate-800/50 hover:bg-slate-700/30"
                        }`}
                      >
                        <CardContent className="p-3">
                          <Label
                            htmlFor={`city-${copId}-${city.id}`}
                            className={`flex items-start gap-3 cursor-pointer ${isDisabled ? "cursor-not-allowed" : ""}`}
                          >
                            <RadioGroupItem
                              id={`city-${copId}-${city.id}`}
                              value={city.id.toString()}
                              disabled={isDisabled}
                              className="mt-1"
                            />
                            <div>
                              <div className="font-medium">{city.name}</div>
                              <div className="text-sm text-slate-400">Distance: {city.distance} KM</div>
                            </div>
                          </Label>
                        </CardContent>
                      </Card>
                      {isDisabled && (
                        <Badge className="absolute top-2 right-2 bg-red-900/60 text-red-200 border-red-800">
                          Assigned
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Vehicle Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Car className="h-4 w-4 text-blue-400" />
              <h3 className="font-medium text-slate-200">Select Vehicle:</h3>
            </div>

            {cityId ? (
              availableVehicles.length > 0 ? (
                <RadioGroup
                  value={vehicleId?.toString()}
                  onValueChange={(value) => setVehicleId(Number.parseInt(value))}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableVehicles.map((vehicle) => {
                      const isDisabled = selectedVehicles.includes(vehicle.id)
                      return (
                        <div key={vehicle.id} className="relative">
                          <Card
                            className={`border border-slate-700 transition-all ${
                              isDisabled
                                ? "opacity-50 bg-slate-800/30"
                                : vehicleId === vehicle.id
                                  ? "bg-slate-700/50 border-blue-500"
                                  : "bg-slate-800/50 hover:bg-slate-700/30"
                            }`}
                          >
                            <CardContent className="p-3">
                              <Label
                                htmlFor={`vehicle-${copId}-${vehicle.id}`}
                                className={`flex items-start gap-3 cursor-pointer ${isDisabled ? "cursor-not-allowed" : ""}`}
                              >
                                <RadioGroupItem
                                  id={`vehicle-${copId}-${vehicle.id}`}
                                  value={vehicle.id.toString()}
                                  disabled={isDisabled}
                                  className="mt-1"
                                />
                                <div>
                                  <div className="font-medium">{vehicle.kind}</div>
                                  <div className="text-sm text-slate-400">Range: {vehicle.range} KM</div>
                                  <div className="text-sm text-slate-400">Available: {vehicle.count}</div>
                                </div>
                              </Label>
                            </CardContent>
                          </Card>
                          {isDisabled && (
                            <Badge className="absolute top-2 right-2 bg-red-900/60 text-red-200 border-red-800">
                              In Use
                            </Badge>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </RadioGroup>
              ) : (
                <div className="bg-slate-800/30 border border-slate-700 rounded-md p-4 text-center text-slate-400">
                  No vehicles available with sufficient range for the selected city.
                </div>
              )
            ) : (
              <div className="bg-slate-800/30 border border-slate-700 rounded-md p-4 text-center text-slate-400">
                Please select a city first to see available vehicles.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className={`${
            !cityId || !vehicleId ? "bg-slate-700 text-slate-300" : "bg-green-600 hover:bg-green-700 text-white"
          } px-6 py-2 rounded-md transition-all`}
          disabled={!cityId || !vehicleId}
        >
          {cityId && vehicleId && <CheckCircle className="mr-2 h-4 w-4" />}
          Deploy Officer {copId}
        </Button>
      </div>
    </form>
  )
}

