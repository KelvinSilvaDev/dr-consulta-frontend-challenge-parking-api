/* eslint-disable @typescript-eslint/no-explicit-any */
import ParkingChart from "@/components/ParkingChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";
import { useEffect, useState } from "react";
import { Check } from 'lucide-react'
import { Summary } from "@/types/Summary";
import { axiosPrivate } from "@/services/api";
import { useNavigate } from "react-router-dom";
import CreateEntry from "@/components/CreateEntry";
import { Vehicle } from "@/types/Vehicle";
import { Establishment } from "@/types/Establihsment";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const newVehicleSchema = z.object({
  brand: z.string(),
  model: z.string(),
  color: z.string(),
  type: z.string(),
  licensePlate: z.string(),
  cnh: z.string(),
})

type FormValuesForNewVehicle = z.infer<typeof newVehicleSchema>;

export default function EstablishmentPage() {
  const [establishments, setEstablishments] = useState<any>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [parkingRecords, setParkingRecords] = useState<any>([])
  const [selectedEstablishment, setSelectedEstablishment] = useState<any>(null);
  const [vehicleReport, setVehicleReport] = useState<any>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [open, setOpen] = React.useState(false)
  const [opened, setOpened] = React.useState(false)
  const [value, setValue] = React.useState("")



  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await axiosPrivate.get("/vehicles");
        const { data } = await response.data;
        setVehicles(data);
      } catch (error) {
        console.error(error);
      }
    }
    getVehicles();
  }, []);


  const getParkingRecords = async () => {
    try {
      const response = await axiosPrivate.get("/parking-records");
      const { data } = response;
      setParkingRecords(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getParkingRecords();
  }, [parkingRecords.length])

  const handleRegisterExit = async (id: number) => {
    try {
      const response = await axiosPrivate.put(`/parking-records/${id}/`);
      const { data } = response;
      console.log(data);
      getParkingRecords();
      toast.success('Saída registrada com sucesso');
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    const getStablishments = async () => {
      try {
        const response = await axiosPrivate.get("/establishment");
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
          const response = await axiosPrivate.get(`/summary/${selectedEstablishment.id}`);
          const { entryExitSummary } = await response.data;
          setSummary(entryExitSummary);
        } catch (error) {
          console.error(error);
        }
      }
      getSummary();
    }
  }, [selectedEstablishment]);

  useEffect(() => {
    if (selectedEstablishment) {
      const getVehicleReport = async () => {
        try {
          const response = await axiosPrivate.get(`/report/establishment/${selectedEstablishment.id}`);
          const { data } = await response.data;
          setVehicleReport(data);
        } catch (error) {
          console.error(error);
        }
      }
      getVehicleReport();
    }
  }, [selectedEstablishment])

  const handleRedirect = () => {
    navigate("/establishment/new", { replace: true });
  }


  const form = useForm<FormValuesForNewVehicle>({
    resolver: zodResolver(newVehicleSchema),
  });


  const registerNewVehicle = async (vehicle: FormValuesForNewVehicle) => {
    try {
      const response = await axiosPrivate.post('vehicles', vehicle);
      const { data } = await response.data;
      toast.success('Veículo registrado na base de dados');
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (data: FormValuesForNewVehicle) => {

    const newVehicle = {
      brand: data.brand,
      model: data.model,
      color: data.color,
      type: data.type,
      licensePlate: data.licensePlate,
      cnh: data.cnh
    }

    const vehicle = await registerNewVehicle(newVehicle);

    await axiosPrivate.post('parking-records', {
      vehicle: { id: vehicle.id },
      establishment: { id: selectedEstablishment.id },
    })
    form.reset
    toast.success('Entrada registrada com sucesso');
    getParkingRecords();

  }


  return (
    <section className="w-full px-4 space-y-6">
      <div className="w-full flex flex-col lg:flex-row justify-between align-middle items-center px-4">
        <h1 className="my-4">Estabelecimentos</h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Button variant="outline" className="w-full md:w-auto" onClick={handleRedirect}>Novo Estabelecimento</Button>
          {selectedEstablishment && <Popover open={opened} onOpenChange={setOpened}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                aria-expanded={opened}
                className="w-200 justify-between text-elipsis w-full md:w-auto"
              >
                Registrar nova entrada
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4 flex-col">
              <CreateEntry selectedEstablishment={selectedEstablishment} vehicles={vehicles} establishments={establishments} />
              <h1>Novo veiculo</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 grid-cols-2">
                  <div className="col-span-2">
                    <Input placeholder="Marca" {...form.register('brand')} />
                  </div>
                  <div className="col-span-2">
                    <Input placeholder="Modelo" {...form.register('model')} />
                  </div>
                  <div className="col-span-2">
                    <Input placeholder="Cor" {...form.register('color')} />
                  </div>
                  <FormControl>
                    <Select onValueChange={
                      (value) => {
                        form.setValue('type', value);
                      }
                    } >
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Car">Carro</SelectItem>
                          <SelectItem value="Motorcycle">Moto</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <div className="col-span-2">
                    <Input placeholder="Placa" {...form.register('licensePlate')} />
                  </div>
                  <div className="col-span-2">
                    <Input placeholder="CNH" {...form.register('cnh')} />
                  </div>
                  <div className="col-span-2">
                    <Button type="submit">Registrar</Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>}
          {establishments.length > 0 && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between text-ellipsis"
                >
                  {value ? establishments.find((establishment: { id: string, name: string }) => establishment.id === value)?.name : "Selecione..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Pesquisar..." className="h-9" />
                  <CommandEmpty>Estabelecimento não encontrado.</CommandEmpty>
                  <CommandGroup>
                    {establishments.map((establishment: Establishment) => (
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
      </div>
      <header className="flex flex-col xl:flex-row gap-6 px-4 justify-evenly">
        <Card className="w-full">
          <CardHeader className="text-center text-2xl font-bold flex" >Visão Geral</CardHeader>
          <CardContent className="flex flex-col gap-2">
            {summary && <p>
              Entradas: {summary.totalEntries} <br />
              Saídas: {summary.totalExits} <br />
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
      <div className="flex flex-col md:flex-row justify-start w-full gap-4 px-4">
        <div className="flex-1">
          <ParkingChart entryExitSummary={summary} vehicleReport={vehicleReport} />
        </div>
        <div className="flex-1 flex flex-col items-start gap-4">
          <Card className="w-full">
            {selectedEstablishment ? (
              <CardHeader className="text-center text-2xl font-bold flex">
                {parkingRecords.filter((record: any) => record.establishment.id === selectedEstablishment?.id && record.exitTime === null).length > 0 ? 'Últimas entradas' : 'Sem Registros'}
              </CardHeader>
            ) : (
              <CardHeader className="text-center text-2xl font-bold flex">
                Selecione um estabelecimento
              </CardHeader>
            )}
            <CardContent className="p-0 flex flex-col gap-2 overflow-y-auto  max-h-40 ">
              {
                parkingRecords.filter((record: any) => record.establishment.id === selectedEstablishment?.id && record.exitTime === null).map((record: any) => (
                  <div key={record.id} className="w-full flex lg justify-between items-center hover:bg-slate-800 p-4 gap-2">
                    <p className="text-md">{record.vehicle.licensePlate} - {record.vehicle.brand} {record.vehicle.model} </p>
                    <Button size="sm" onClick={() => handleRegisterExit(record.id)}>Registrar Saída</Button>
                  </div>
                ))
              }

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}