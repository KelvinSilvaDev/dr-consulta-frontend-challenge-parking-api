/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosPrivate } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const createEstablishmentSchema = z.object({
  name: z.string(),
  cnpj: z.string(),
  address: z.string(),
  phone: z.string(),
  motorcycleSpaces: z.coerce.number(),
  carSpaces: z.coerce.number(),
});

type FormValues = z.infer<typeof createEstablishmentSchema>;

export default function CreateEstablishment() {
  const form = useForm<FormValues>({
    resolver: zodResolver(createEstablishmentSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    await axiosPrivate.post("/establishment", data);
    toast.success("Estabelecimento criado com sucesso");
    navigate("/");
  };

  return (

    <div className=" max-w-screen-md mx-auto mt-8 p-4 lg:p-8 rounded-md shadow-md">
      <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-2 mb-6">
        <Link to="/" className="hover:underline m-0 text-md"> {"< "}Voltar </Link>
        <h1 className="text-2xl font-bold">Cadastrar Estabelecimento</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 md:grid mdgap-4 grid-cols-4">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 col-span-4">
                <FormLabel className="my-2" >Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} className="p-2 border rounded-md" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 col-span-2">
                <FormLabel className="my-2" >CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="CNPJ" {...field} className="p-2 border rounded-md" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 col-span-2">
                <FormLabel className="my-2" >Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço" {...field} className="p-2 border rounded-md" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 col-span-1">
                <FormLabel className="my-2" >Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="Telefone" {...field} className="p-2 border rounded-md" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motorcycleSpaces"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 col-span-1">
                <FormLabel className="my-2" >Vagas para motos</FormLabel>
                <FormControl>
                  <Input placeholder="Vagas para motos" type="number" {...field} className="p-2 border rounded-md" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carSpaces"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 col-span-1">
                <FormLabel className="my-2" >Vagas para carros</FormLabel>
                <FormControl>
                  <Input placeholder="Vagas para carros" type="number" {...field} className="p-2 border rounded-md" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-stretch justify-end space-y-2 col-span-1 pb-2">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
