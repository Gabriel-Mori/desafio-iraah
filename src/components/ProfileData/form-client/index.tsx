import React, { useEffect, useState } from "react";
import Input from "../../input";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import http from "../../../http";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdWarning } from "react-icons/md";
import { OrganizationService } from "../../../services/organizations-service";
import Select from "../../Select";

interface Props {
  initialData?: any;
}

const ClientForm: React.FC<Props> = ({ initialData }: any) => {
  const [customer, setCustomer] = useState<any>(initialData || {});
  const router = useRouter();

  const handleSubmitChange = async () => {
    await toast.promise(OrganizationService.ClientForm({ ...customer }), {
      pending: "Verificando dados",

      success: {
        render() {
          return "Salvo com sucesso";
        },
        icon: <IoCheckmarkDoneSharp size={22} className="text-green-900" />,
        theme: "colored",
      },
      error: {
        render() {
          return "Falha ao salvar";
        },
        icon: <MdWarning size={22} className="text-yellow-200" />,
        theme: "colored",
      },
    });
    setTimeout(() => {
      router.push("/clients/list");
    }, 1000);
  };

  const handleInputValue = (e: any, name: string) => {
    const value = e.target.value;
    const firstLetter = value.charAt(0).toUpperCase();
    const restWord = value.slice(1);
    setCustomer({
      ...customer,
      [name]: firstLetter + restWord,
    });
  };

  const getCompany = (searchTerm: any = "") => {
    return http.get(`/company?searchTerm=${searchTerm}`).then((resp) => {
      return resp.data;
    });
  };

  return (
    <>
      <form>
        <Input
          label="Nome"
          value={customer.name}
          className="border border-slate-400  mb-5  shadow-xl "
          placeholder="João"
          onChange={(e: any) => handleInputValue(e, "name")}
        />

        <Input
          label="Email"
          type="email"
          value={customer.email}
          className="border border-slate-400  mb-5 shadow-xl"
          placeholder="Email@gmail.com"
          onChange={(e: any) => handleInputValue(e, "email")}
        />
        <div className=" mb-5">
          <Select
            label="Selecione a empresa"
            placeholder="Tflow..."
            onChange={(_, value) => {
              setCustomer({ ...customer, company: value });
            }}
            value={customer.company}
            fetch={getCompany}
            fieldLabel="companyName"
          />
        </div>
      </form>
      <div className="flex justify-center mt-16">
        <button
          disabled={!customer.name}
          className={`w-96  ${
            customer.name ? " bg-[#0cbcbe] hover:bg-[#53aeb0]" : "bg-[#507879]"
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
