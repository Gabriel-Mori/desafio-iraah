import React, { useEffect, useState } from "react";
import Input from "../../input";
import Select from "../../Select";
import Label from "../../Label";
import { useRouter } from "next/router";
import http from "../../../http";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import KgDatePicker from "../../KgDatePicker";
import { toast } from "react-toastify";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdWarning } from "react-icons/md";
import { background } from "@chakra-ui/react";
import { OrganizationService } from "../../../services/organizations-service";

interface Props {
  initialData?: any;
}

const FormProject: React.FC<Props> = ({ initialData }: any) => {
  const [project, setProject] = useState<any>(initialData || {});
  const [client, setClient] = useState<any>([]);
  const [search, setSearch] = useState<any>([]);
  const router = useRouter();

  const submitForm = async () => {
    if (project.startDate > project?.endDate) {
      toast.error("Falha ao salvar, data de início é maior que final", {
        icon: <MdWarning size={22} className="text-yellow-400" />,
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    await toast.promise(OrganizationService.formProjectSubmit({ ...project }), {
      pending: "Verificando dados",
      success: {
        render() {
          return "Salvo com sucesso";
        },
        icon: <IoCheckmarkDoneSharp size={22} className="text-green-900 ml" />,
        theme: "colored",
      },
      error: {
        render() {
          return "Falha ao Salvar";
        },
        icon: <MdWarning size={22} className="text-yellow-200" />,
        theme: "colored",
      },
    });
    setTimeout(() => {
      router.push("/projects/list");
    }, 1000);
  };

  const getClientSelect = (searchTerm: any = "") => {
    return http.get(`/customer?searchTerm=${searchTerm}`).then((resp) => {
      return resp.data.content;
    });
  };

  const getEmployee = (searchTerm: any = "") => {
    return http.get(`/employee?searchTerm=${searchTerm}`).then((resp) => {
      return resp.data;
    });
  };

  const handleInputValue = (e: any, name: string) => {
    setProject({
      ...project,
      [name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
    });
  };

  return (
    <>
      <form>
        <Input
          label="Projeto"
          value={project.projectName}
          className={`border border-slate-400  mb-5 shadow-xl`}
          placeholder="Tflow"
          onChange={(e: any) => handleInputValue(e, "projectName")}
        />

        <div className="w-full mr-4 ">
          <Label label="Cliente" />
          <Select
            placeholder="Selecione o Cliente"
            onChange={(_, value) => {
              setProject({ ...project, customer: value });
            }}
            fetch={getClientSelect}
            value={project.customer}
            fieldLabel="name"
          />
        </div>

        <div className="w-full mr-4  mt-4">
          <Label label="Colaborador" />
          <Select
            isClearable={false}
            placeholder="Selecione o Colaborador"
            onChange={(_, value) => {
              setProject({ ...project, employees: value });
            }}
            fetch={getEmployee}
            value={project.employees}
            fieldLabel="name"
            isMulti={true}
          />
        </div>

        <div className="flex flex-col mt-5">
          <Label label="Datas" />
        </div>
        <div className="flex   justify-start mb-3 ">
          <div className=" flex items-center">
            <label className="mr-2 dark:text-white text-4xl sm:text-base font-semibold text-font-color-light-gray">
              De:
            </label>
            <KgDatePicker
              onChange={(e: any, value: any) => {
                setProject({ ...project, startDate: value });
              }}
              value={project.startDate}
            />
          </div>

          <div className=" flex items-center">
            <label className="mr-2  ml-5 dark:text-white text-4xl sm:text-base font-semibold text-font-color-light-gray">
              Até:
            </label>
            <KgDatePicker
              disabled={!project.startDate}
              onChange={(e: any, value: any) => {
                setProject({ ...project, endDate: value });
              }}
              value={project.endDate}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-center mt-16">
        <button
          disabled={!project.projectName}
          className={`w-96  ${
            project.projectName
              ? " bg-[#0cbcbe] hover:bg-[#53aeb0]"
              : "bg-[#507879]"
          } outline-none transition ease-in-out delay-100 text-white font-bold py-4 border-none rounded-full`}
          type="button"
          onClick={submitForm}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default FormProject;
