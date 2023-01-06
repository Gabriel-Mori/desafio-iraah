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

interface Props {
  initialData?: any;
}

const CollaboratorForm: React.FC<Props> = ({ initialData }: any) => {
  const [collaborator, setCollaborator] = useState<any>(initialData || {});
  const router = useRouter();

  const handleSubmitChange = async () => {
    await toast.promise(
      OrganizationService.CollaboratorForm({ ...collaborator }),
      {
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
            return "Salvo com sucesso";
          },
          icon: <MdWarning size={22} className="text-yellow-200" />,
          theme: "colored",
        },
      }
    );
    setTimeout(() => {
      router.push("/collaborator/list");
    }, 1000);
  };

  const handleInputValue = (e: any, name: string) => {
    setCollaborator({
      ...collaborator,
      [name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
    });
  };

  return (
    <>
      <form>
        <Input
          label="Nome"
          value={collaborator.name}
          className="border border-slate-400  mb-5 shadow-xl "
          placeholder="Nome"
          onChange={(e: any) => handleInputValue(e, "name")}
        />
        {/* <Input
          label="Empresa"
          value={collaborator.companyName}
          className="border border-slate-400  mb-5 shadow-xl "
          placeholder="Netflix..."
          onChange={(e: any) => handleInputValue(e, "companyName")}
        /> */}
        <Input
          label="Email"
          type="email"
          value={collaborator.email}
          className="border border-slate-400  mb-5 shadow-xl"
          placeholder="Email@gmail.com"
          onChange={(e: any) => handleInputValue(e, "email")}
        />
      </form>
      <div className="flex justify-center mt-16">
        <button
          disabled={!collaborator.name}
          className={`w-96  ${
            collaborator.name
              ? " bg-[#0cbcbe] hover:bg-[#53aeb0]"
              : "bg-[#507879]"
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

export default CollaboratorForm;
