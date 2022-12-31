import React, { useEffect, useState } from "react";
import { ClientService } from "../../../services/client-service";
import Input from "../../input";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import http from "../../../http";

interface Props {
  initialData?: any;
}

const ClientForm: React.FC<Props> = ({ initialData }: any) => {
  const [client, setClient] = useState<any>(initialData || {});
  const router = useRouter();

  const handleSubmitChange = async () => {
    await toast.promise(
      ClientService.ClientForm({
        name: client.name,
        companyName: client.companyName,
        email: client.email,
      }),
      {
        pending: "Verificando dados",
        success: "Salvo com sucesso 👌",
        error: "Erro ao salvar 🤯",
      }
    );
    setTimeout(() => {
      router.push("/clients/list");
    }, 1000);
  };

  const handleInputValue = (e: any, name: string) => {
    setClient({ ...client, [name]: e.target.value });
  };

  return (
    <>
      <form>
        <Input
          label="Nome"
          value={client.name}
          className="border border-solid border-slate-400 mb-5 focus:w-96 transition:w .4s ease-out"
          placeholder="Nome"
          onChange={(e: any) => handleInputValue(e, "name")}
        />
        <Input
          label="Empresa"
          value={client.companyName}
          className={`border border-solid border-slate-400  mb-5`}
          placeholder="Netflix..."
          onChange={(e: any) => handleInputValue(e, "companyName")}
        />
        <Input
          label="Email"
          type="email"
          value={client.email}
          className={`border border-solid border-slate-400  mb-5`}
          placeholder="Email@gmail.com"
          onChange={(e: any) => handleInputValue(e, "email")}
        />
      </form>
      <div className="flex justify-center mt-16">
        <button
          disabled={!client.name}
          className={`w-96  ${
            client.name ? " bg-[#0cbcbe] hover:bg-[#53aeb0]" : "bg-[#507879]"
          } outline-none transition ease-in-out delay-100 text-white font-bold py-4 border-none rounded-full`}
          type="button"
          onClick={handleSubmitChange}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default ClientForm;
