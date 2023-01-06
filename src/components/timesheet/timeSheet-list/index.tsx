import React, { useEffect, useState } from "react";
import List from "../../List";
import ListColumn from "../../List/ListColumn";
import { FiEdit } from "react-icons/fi";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import http from "../../../http";
import { OrganizationService } from "../../../services/organizations-service";
import { Tooltip, dividerClasses } from "@mui/material";
import moment from "moment";

const TimeSheetList: React.FC = () => {
  const [timeSheetRes, setTimeSheetRes] = useState([]);
  const router = useRouter();

  const getTimeSheet = () => {
    OrganizationService.getTimeSheet().then((response) =>
      setTimeSheetRes(response.data)
    );
  };

  const deleteFromList = async (id: any) => {
    await http.delete(`/timesheet/${id}`);
    getTimeSheet();
  };

  useEffect(() => {
    getTimeSheet();
  }, []);

  const edit = (id: any) => {
    router.push(`/timesheet/edit/${id}`);
  };

  return (
    <div>
      <div className="">
        <div className="flex justify-end items-center mb-6">
          {/* <div className="w-full">
            <h2 className="mb-2">Pesquise por nome do colaborador</h2>
            <input
              style={{ borderRadius: "14px" }}
              className={`bg-transparent h-14 outline-none flex-1 w-full pl-5 border border-solid border-slate-400`}
              placeholder="João..."
              onChange={(e: any) => handleInputSearch(e)}
            />
          </div> */}
          <button
            className={`text-white dark:text-white text-1xl rounded-full px-6 py-2 w-60 h-14 ml-5  hover:bg-orange-500 bg-orange-400`}
            onClick={() => {
              router.push("/timesheet/form");
            }}
          >
            <div className="flex items-center ">
              <HiPlus size={22} className="ml-3" />
              <h3 className="ml-5 text-1xl"> Cadastrar novo</h3>
            </div>
          </button>
        </div>
      </div>
      {timeSheetRes && (
        <div className="shadow-2xl border rounded  bg-slate-100">
          <div className="p-4  ">
            <List data={timeSheetRes ? timeSheetRes : []} minWidth={1000}>
              <ListColumn
                name="employee"
                label="Colaborador"
                render={(row) => (
                  <div className="h-16">
                    <label className="text-gray-900  ">
                      {row.employee ? row.employee.name : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="description"
                label="Descrição"
                render={(row) => (
                  <div>
                    <Tooltip
                      style={{ color: "#9E9E9E" }}
                      title={
                        <div className="">
                          {
                            <label className="text-white">
                              {row.description ? row.description : "----"}
                            </label>
                          }
                        </div>
                      }
                      placement="bottom"
                      arrow
                      enterDelay={400}
                      leaveDelay={400}
                    >
                      <div className=" whitespace-pre-line  h-16">
                        {
                          <p className="text-gray-900 break-all whitespace-pre-line">
                            {row.description ? row.description : "----"}
                          </p>
                        }
                      </div>
                    </Tooltip>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="date"
                label="Data"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {moment().format("DD/MM/yyyy")}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="hoursWorked"
                label="Horas"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.hoursWorked ? row.hoursWorked : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="edit"
                label="Editar"
                render={(row) => (
                  <div className="flex  justify-end  text-gray-500 ">
                    <label className="cursor-pointer mr-1">
                      <FiEdit
                        size={22}
                        onClick={() => {
                          edit(row.id);
                        }}
                      />
                    </label>
                  </div>
                )}
                align="right"
              />
              <ListColumn
                name="delete"
                label="Deletar"
                render={(row) => (
                  <div className="flex  justify-end  text-gray-500">
                    <label className="cursor-pointer mr-2">
                      <HiTrash
                        size={22}
                        style={{ color: "#ff0000" }}
                        onClick={() => {
                          deleteFromList(row.id);
                        }}
                      />
                    </label>
                  </div>
                )}
                align="right"
              />
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSheetList;
