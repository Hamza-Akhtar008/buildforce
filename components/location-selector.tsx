import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Country, State } from "country-state-city";
import React, { useEffect, useMemo, useState, useCallback } from "react";

// Importing the county library
const countyLibrary = require("county");

export type LocationValue = {
  region?: string;
  state?: string;
  county?: string;
};

type LocationSelectorProps = {
  value: LocationValue;
  onChange: (next: LocationValue) => void;
  required?: boolean;
  className?: string;
  label?: string;
};

export function LocationSelector({
  value,
  onChange,
  required = false,
  className,
  label = "Location",
}: LocationSelectorProps) {
  // Filter only the United States
  const regions = useMemo(() => {
    const usa = Country.getAllCountries().find((r) => r.name === "United States");
    return usa ? [usa] : [];
  }, []);

  const states = useMemo(() => (value.region ? State.getStatesOfCountry(value.region) : []), [value.region]);

  const [counties, setCounties] = useState<string[]>([]); // Local state for counties

  const fetchCounties = useCallback(async (state: string) => {
    const selectedState = states.find((s) => s.isoCode === state);
    const stateName = selectedState?.name;
    if (stateName) {
      const countiesData = countyLibrary.getCountiesByState(stateName) ?? [];
      setCounties(countiesData);
    }
  }, [states]);

  useEffect(() => {
    if (value.state) {
      fetchCounties(value.state);
    } else {
      setCounties([]);
    }
  }, [value.state, fetchCounties]); // Re-run only when value.state changes

  const handleRegionChange = (region: string) => {
    onChange({ region, state: undefined, county: undefined });
  };

  const handleStateChange = (state: string) => {
    onChange({
      region: value.region,
      state,
      county: undefined,
    });
  };

  const handleCountyChange = (county: string) => {
    onChange({ ...value, county });
  };

  const isComplete = !!value.region && !!value.state && !!value.county;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
        <label className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {/* Region Dropdown */}
        <Select value={value.region} onValueChange={handleRegionChange}>
          <SelectTrigger className="bg-card h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Region</SelectLabel>
              {regions.map((r) => (
                <SelectItem key={r.isoCode} value={r.isoCode}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* State Dropdown */}
        <Select
          value={value.state}
          onValueChange={handleStateChange}
          disabled={!value.region}
        >
          <SelectTrigger className="bg-card h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>State</SelectLabel>
              {states.map((s) => (
                <SelectItem key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* County Dropdown */}
        <Select
          value={value.county}
          onValueChange={handleCountyChange}
          disabled={!value.state}
        >
          <SelectTrigger className="bg-card h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary">
            <SelectValue placeholder="Select County" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>County</SelectLabel>
              {counties.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Hidden inputs so FormData picks these up */}
      <input type="hidden" name="region" value={value.region ?? ""} />
      <input type="hidden" name="state" value={value.state ?? ""} />
      <input type="hidden" name="county" value={value.county ?? ""} aria-required={required} />

      {/* Optional note if required */}
      {required && !isComplete && (
        <p className="text-xs text-muted-foreground mt-2">Please select region, state, and county.</p>
      )}
    </div>
  );
}
