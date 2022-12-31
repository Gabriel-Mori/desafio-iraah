import React, { useEffect, useState } from "react";
import List from "../../List";
import ListColumn from "../../List/ListColumn";
import { FiEdit } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import { ProjectService } from "../../../services/project-service";
import { Tooltip } from "@mui/material";
import http from "../../../http";

const ProjectsList: React.FC = () => {
  const [listProjects, setListProjects] = useState([]);
  const router = useRouter();

  const getListProjects = () => {
    ProjectService.getProject().then((res) => setListProjects(res.data));
  };

  useEffect(() => {
    getListProjects();
  }, []);

  const deleteProjectFromList = async (id: any) => {
    await http.delete(`/project/${id}`);
    getListProjects();
  };

  const edit = (id: any) => {
    router.push(`/projects/edit/${id}`);
  };

  console.log("listProjects", listProjects);
  return (
    <div>
      {listProjects && (
        <div className="shadow-2xl border rounded">
          <div className="p-4">
            <List data={listProjects ? listProjects : []} minWidth={1000}>
              <ListColumn name="projectName" label="Nome" align="center" />
              <ListColumn
                name="client"
                label="Cliente"
                render={(row) => (
                  <div className="flex items-center justify-center w-8 h-8 ml-20 text-gray-500 ">
                    <label className="text-gray-900">{row.client?.name}</label>
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
                          {row.employee.map((item: any, i: any) => {
                            return (
                              <span key={i}>
                                {item.name} <br />
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
                          {row.employee?.length}
                        </span>
                      </label>
                    </Tooltip>
                  </div>
                )}
                align="center"
              />
              <ListColumn name="startDate" label="Data inicio" align="center" />
              <ListColumn name="endDate" label="Data Final" align="center" />

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
