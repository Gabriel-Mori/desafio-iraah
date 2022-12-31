import React, { useEffect, useState } from "react";
import Input from "../../input";
import { ProjectService } from "../../../services/project-service";
import Select from "../../Select";
import Label from "../../Label";
import { useRouter } from "next/router";
import http from "../../../http";
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import KgDatePicker from "../../KgDatePicker";

interface Props {
  initialData?: any;
}

const FormProject: React.FC<Props> = ({ initialData }: any) => {
  const [project, setProject] = useState<any>(initialData || {});
  const router = useRouter();

  const submitForm = async () => {
    await ProjectService.formProjectSubmit({
      startDate: Number(moment(project?.startDate)),
      endDate: Number(moment(project?.startDate)),
      client: project.client,
      projectName: project.projectName,
      employee: project.employee,
    });
    setTimeout(() => {
      router.push("/projects/list");
    }, 1000);
  };

  const getClientSelect = () => {
    http.get("/client").then((resp) => {
      const response = resp.data.content;
      const client = response.client;

      return client;
    });
  };

  useEffect(() => {
    getClientSelect();
  }, []);

  const handleInputValue = (e: any, name: string) => {
    setProject({ ...project, [name]: e.target.value });
  };

  console.log("projecta", project);

  return (
    <>
      <form>
        <Input
          label="Projeto"
          value={project.projectName}
          className={`border border-solid border-slate-400  mb-5`}
          placeholder="Tflow"
          onChange={(e: any) => handleInputValue(e, "Projeto")}
        />
        <div className="w-full mr-4 ">
          <Label label="Cliente" />
          <Select
            isClearable={false}
            placeholder="Selecione o Cliente"
            onChange={(_, e) => handleInputValue(e, "Cliente")}
            value={project.client}
            fetch={getClientSelect}
            fieldLabel={"name"}
          />
        </div>
        <div className="w-full mr-4  mt-4">
          <Label label="Colaborador" />
          <Select
            isClearable={false}
            placeholder="Selecione o Colaborador"
            onChange={(_, e) => handleInputValue(e, "Colaborador")}
            value={project.employee}
            fetch={project}
            fieldLabel={"name"}
          />
        </div>
        <div className="flex flex-col mt-5">
          <Label label="Data" />
        </div>
        <div className="flex   justify-start mb-3 ">
          <div className=" flex items-center">
            <label className="mr-2 text-gray-700 dark:text-white">De:</label>
            <KgDatePicker
              className=" rounded-md h-15 p-2 outline-none"
              onChange={(e: any, value: any) => {
                const objFilter = {
                  ...project,
                  startDate: value ? Number(moment(value)) : null,
                };
                setProject(objFilter);
              }}
              value={project.startDate}
            />
          </div>
          <div className=" flex items-center">
            <label className="mr-2 text-gray-700 ml-10 dark:text-white">
              Até:
            </label>
            <KgDatePicker
              className="rounded-md h-15 p-2 outline-none"
              onChange={(e: any, value: any) => {
                const objFilter = {
                  ...project,
                  endDate: value ? Number(moment(value)) : null,
                };
                setProject(objFilter);
              }}
              value={project.endDate}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-center mt-16">
        <button
          className="w-96 bg-[#0cbcbe] outline-none text-white font-bold py-4 border-none rounded-full"
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
