import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Establishment } from '@/types/Establihsment';
import { Vehicle } from '@/types/Vehicle';
import { axiosPrivate } from '@/services/api';
import { toast } from 'sonner';


interface CreateEntryProps {
  establishments: Establishment[];
  vehicles: Vehicle[];
  selectedEstablishment: Establishment;
}

export default function CreateEntry({ selectedEstablishment, vehicles }: CreateEntryProps) {
  const [vehicleId, setVehicleId] = useState('');

  const handleSubmit = async () => {
    await axiosPrivate.post('parking-records', {
      vehicle: { id: vehicleId },
      establishment: { id: selectedEstablishment.id },
    })
    toast.success('Entrada criada com sucesso');
  };

  return (
    <div className="w-full flex gap-4 items-center justify-center h-full">
      <Select onValueChange={setVehicleId}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Veículo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Veículos</SelectLabel>
            {vehicles.map((veh) => (
              <SelectItem key={veh.id} value={veh.id}>
                {veh.brand}
                {' - '}
                {veh.model}
                {' - '}
                {veh.licensePlate}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit}>Criar Entrada</Button>
    </div>
  );
}
