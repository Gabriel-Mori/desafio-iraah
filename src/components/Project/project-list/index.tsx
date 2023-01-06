import React, { useEffect, useState } from "react";
import List from "../../List";
import ListColumn from "../../List/ListColumn";
import { FiEdit } from "react-icons/fi";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import http from "../../../http";
import moment from "moment";
import { OrganizationService } from "../../../services/organizations-service";

const ProjectsList: React.FC = () => {
  const [listProjects, setListProjects] = useState([]);
  const router = useRouter();

  const getListProjects = (searchTerm: any = "") => {
    OrganizationService.getProject(searchTerm).then((res) =>
      setListProjects(res.data)
    );
  };

  useEffect(() => {
    getListProjects();
  }, []);

  const deleteProjectFromList = async (id: any) => {
    await http.delete(`/project/${id}`);
    getListProjects();
  };

  const handleInputSearch = (e: any) => {
    const { value } = e.target;
    getListProjects(value);
  };

  const edit = (id: any) => {
    router.push(`/projects/edit/${id}`);
  };

  return (
    <div>
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full">
            <h2 className="mb-2">Pesquise por nome do projeto</h2>
            <input
              style={{ borderRadius: "14px" }}
              className={`bg-transparent h-14 outline-none flex-1 w-full pl-5 border border-solid border-slate-400`}
              placeholder="João..."
              onChange={(e: any) => handleInputSearch(e)}
            />
          </div>
          <button
            className={` text-white dark:text-white text-1xl rounded-full px-6 py-2 w-60 h-14 ml-5 mt-8 hover:bg-orange-500 bg-orange-400`}
            onClick={() => {
              router.push("/projects/form");
            }}
          >
            <div className="flex items-center ">
              <HiPlus size={22} />
              <h3 className="ml-3 text-1xl"> Cadastrar novo</h3>
            </div>
          </button>
        </div>
        <div className=" bg-slate-100 mt-4"></div>
      </div>
      {listProjects && (
        <div className="shadow-2xl border rounded bg-slate-100">
          <div className="p-4">
            <List data={listProjects ? listProjects : []} minWidth={1000}>
              <ListColumn
                name="projectName"
                label="Nome"
                align="center"
                render={(row) => (
                  <div className="flex items-center justify-center w-8 h-8 ml-20 text-gray-500 ">
                    <label className="text-gray-900">
                      {row.projectName ? row.projectName : "----"}
                    </label>
                  </div>
                )}
              />
              <ListColumn
                name="client"
                label="Cliente"
                render={(row) => (
                  <div className="flex items-center justify-center w-8 h-8 ml-20 text-gray-500 ">
                    <label className="text-gray-900">
                      {row.customer?.name ? row.customer?.name : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="employee"
                label="Colaborador"
                render={(row) => (
                  <div className="flex items-center justify-center w-8 h-8 ml-20 text-gray-500 ">
                    <Tooltip
                      style={{ color: "#9E9E9E" }}
                      title={
                        <div>
                          {row.employees.map((item: any, i: any) => {
                            return (
                              <span key={i}>
                                {item.name ? item.name : "----"} <br />
                              </span>
                            );
                          })}
                        </div>
                      }
                      placement="bottom"
                      arrow
                      enterDelay={400}
                      leaveDelay={400}
                    >
                      <label className="cursor-pointer">
                        <span className="text-gray-900">
                          {row.employees?.length
                            ? row.employees?.length
                            : "----"}
                        </span>
                      </label>
                    </Tooltip>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="startDate"
                label="Data inicio"
                render={(row) => (
                  <div className="flex items-center justify-center w-8 h-8 ml-20 text-gray-500 ">
                    <label className="text-gray-900">
                      {row.startDate
                        ? moment(row.startDate).format("DD/MM/YYYY")
                        : "Sem data início"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="endDate"
                label="Data Final"
                render={(row) => (
                  <div className="flex items-center justify-center w-8 h-8 ml-20 text-gray-500 ">
                    <label className="text-gray-900">
                      {row.endDate
                        ? moment(row.endDate).format("DD/MM/YYYY")
                        : "aguardando finalização..."}
                    </label>
                  </div>
                )}
                align="center"
              />

              <ListColumn
                name="edit"
                label="Editar"
                render={(row) => (
                  <div className="flex items-center justify-center w-8 h-8 ml-20 text-gray-500 ">
                    <label className="cursor-pointer">
                      <FiEdit
                        size={22}
                        onClick={() => {
                          edit(row.id);
                        }}
                      />
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="delete"
                label="Deletar"
                render={(row) => (
                  <div className="w-8 h-8 ml-20 text-gray-500 flex items-center justify-center ">
                    <label className="cursor-pointer">
                      <HiTrash
                        size={22}
                        onClick={() => {
                          deleteProjectFromList(row.id);
                        }}
                        style={{ color: "#ff0000" }}
                      />
                    </label>
                  </div>
                )}
                align="center"
              />
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
