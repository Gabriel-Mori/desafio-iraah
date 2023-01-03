import React, { useEffect, useState } from "react";
import Input from "../../input";
import { ProjectService } from "../../../services/project-service";
import Select from "../../Select";
import Label from "../../Label";
import { useRouter } from "next/router";
import http from "../../../http";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import KgDatePicker from "../../KgDatePicker";

interface Props {
  initialData?: any;
}

const FormProject: React.FC<Props> = ({ initialData }: any) => {
  const [project, setProject] = useState<any>(initialData || {});
  const [client, setClient] = useState<any>("");
  const [search, setSearch] = useState<any>([]);

  const router = useRouter();
  const submitForm = async () => {
    await ProjectService.formProjectSubmit({
      startDate: Number(moment(project?.startDate)),
      endDate: Number(moment(project?.endDate)),
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
      const data = resp.data;
      setSearch(data);
    });
  };
  console.log(client);
  useEffect(() => {
    getClientSelect();
  }, []);

  console.log("searchClient", search);

  const handleInputValue = (e: any, name: string) => {
    setProject({ ...project, [name]: e.target.value });
  };

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
            placeholder="Selecione o Cliente"
            onChange={(_, value) => {
              const data = { ...search, client: value };
              setSearch(data);

              // if (value) {
              //   handleInputValue(value, "cliente");
              // }
            }}
            fetch={search}
            value={search.map((item: any) => item.name)}
            fieldLabel="name"
            // isMulti={true}
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
