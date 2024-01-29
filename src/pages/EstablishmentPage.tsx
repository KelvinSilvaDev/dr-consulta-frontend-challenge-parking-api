/* eslint-disable @typescript-eslint/no-explicit-any */
import ParkingChart from "@/components/ParkingChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import React from "react";
import { useEffect, useState } from "react";
import { Check } from 'lucide-react'
import { Summary } from "@/types/Summary";

export default function EstablishmentPage() {
  const [establishments, setEstablishments] = useState<any>([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState<any>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [periodSummary, setPeriodSummary] = useState<any>(null);

  useEffect(() => {
    const getStablishments = async () => {
      try {
        const response = await api.get("/establishment");
        const { data } = await response.data;
        setEstablishments(data);
      } catch (error) {
        console.error(error);
      }
    }
    getStablishments();
  }, []);

  useEffect(() => {
    if (establishments.length > 0) {
      setSelectedEstablishment(establishments[0]);
    }
  }, [establishments]);

  useEffect(() => {
    if (selectedEstablishment) {
      const getSummary = async () => {
        try {
          const response = await api.get(`/summary/${selectedEstablishment.id}`);
          const period = await response.data;
          setSummary(period);
        } catch (error) {
          console.error(error);
        }
      }
      getSummary();
    }
  }, [selectedEstablishment]);

  useEffect(() => {
    if (selectedEstablishment) {
      const getPeriodSummary = async () => {
        try {
          const response = await api.post(`/summary/period/${selectedEstablishment.id}`, { startDate: '2022-09-01', endDate: '2024-09-30' });
          const { entryExitSummary } = response.data;
          setPeriodSummary(entryExitSummary);
        } catch (error) {
          console.error(error);
        }
      }
      getPeriodSummary();
    }
  }, [selectedEstablishment]);

  console.log(establishments);
  console.log(summary)
  console.log(periodSummary)

  // const frameworks = [
  //   {
  //     value: "next.js",
  //     label: "Next.js",
  //   },
  //   {
  //     value: "sveltekit",
  //     label: "SvelteKit",
  //   },
  //   {
  //     value: "nuxt.js",
  //     label: "Nuxt.js",
  //   },
  //   {
  //     value: "remix",
  //     label: "Remix",
  //   },
  //   {
  //     value: "astro",
  //     label: "Astro",
  //   },
  // ]


  console.log('selectedEstablishment', selectedEstablishment)

  return (
    <section className="w-full px-4 space-y-6">
      <div className="w-full flex justify-between align-middle items-center pl-4 pr-8">
        <h1 className="my-4">Estabelecimentos</h1>
        {establishments.length > 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between text-ellipsis"
              >
                {value
                  ? establishments.find((establishment: { id: string; }) => establishment.id === value)?.name :
                  establishments[0].name ? establishments[0].name : "Selecione..."}
                {/* <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {establishments.map((establishment: any) => (
                    <CommandItem
                      key={establishment.id}
                      value={establishment.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setSelectedEstablishment(establishment)
                        setOpen(false)
                      }}
                    >
                      {establishment.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === establishment.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <header className="flex gap-6 px-4 justify-evenly">
        <Card className="w-full">
          <CardHeader className="text-center text-2xl font-bold flex" >Visão Geral</CardHeader>
          <CardContent className="flex flex-col gap-2">
            {summary && <p>
              Entradas: {summary.totalEntries} <br />
              Saídas: {summary.totalExits} <br />
              {/* Carros: {summary.totalCarEntries} X {summary.totalCarExits} <br /> */}
              {/* Motos: {summary.totalMotorcycleEntries} X {summary.totalMotorcycleExits} <br /> */}

            </p>}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="text-center text-2xl font-bold flex" >Vagas de Carros</CardHeader>
          <CardContent className="flex flex-col gap-2">
            {selectedEstablishment && <p className="text-center font-semibold">Total {selectedEstablishment.carSpaces}</p>}
            {selectedEstablishment && <p>Ocupadas {selectedEstablishment.occupiedCarSpaces}</p>}
            {selectedEstablishment && <p>Disponíveis {selectedEstablishment.carSpaces - selectedEstablishment.occupiedCarSpaces}</p>}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="text-center text-2xl font-bold flex" >Vagas de Motos</CardHeader>
          <CardContent className="flex flex-col gap-2">
            {selectedEstablishment && <p className="text-center font-semibold">Total {selectedEstablishment.motorcycleSpaces}</p>}
            {selectedEstablishment && <p>Ocupadas {selectedEstablishment.occupiedMotorcycleSpaces}</p>}
            {selectedEstablishment && <p>Disponíveis {selectedEstablishment.motorcycleSpaces - selectedEstablishment.occupiedMotorcycleSpaces}</p>}
          </CardContent>
        </Card>
      </header>
      <div className="flex justify-start">
        <ParkingChart />
      </div>
      {/* {periodSummary && <ParkingChart periodSummary={periodSummary} entryExitSummary={summary} />} */}
    </section>
  )
}