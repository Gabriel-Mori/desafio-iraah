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
import Pagination from "react-js-pagination";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { VscChromeClose } from "react-icons/vsc";
import Input from "../../input";

interface TimesheetProps {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  content: [];
  pageable?: any;
  employee?: number;
}

const TimeSheetList: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState<any>({});
  const [inputValue, setInputValue] = useState("");
  const [messageError, setMessageError] = useState("");
  const [pagination, setPagination] = useState<TimesheetProps>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 1,
    content: [],
    pageable: {},
  });

  const getTimeSheets = (pageNumber = 1, pageSize = 10) => {
    OrganizationService.getTimeSheet(pageSize, pageNumber).then((response) => {
      console.log(response);
      setPagination({
        ...pagination,
        pageSize,
        pageNumber,
        ...response.data,
      });
    });
  };

  const deleteFromList = async () => {
    const value = inputValue.toUpperCase();
    if (value === "CONFIRMAR") {
      await http.delete(`/timesheet/${deletedItem.id}`);
      toast.success("Item deletado", {
        position: "top-right",
        icon: <IoCheckmarkDoneSharp size={22} className="text-green-900" />,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getTimeSheets();
      setShowModal(false);
    } else {
      setMessageError("Digite 'Confirmar' para deletar item");
    }
  };

  useEffect(() => {
    getTimeSheets();
  }, []);

  const editFromList = (id: any) => {
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
      {pagination.content && (
        <div className="shadow-2xl border rounded  bg-slate-100">
          <div className="p-4  ">
            <List
              data={pagination.content ? pagination.content : []}
              minWidth={1000}
            >
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
              {/* <ListColumn
                name="approved"
                label="Status"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.approved ? "Aprovado" : "Pendente"}
                    </label>
                  </div>
                )}
                align="center"
              /> */}
              <ListColumn
                name="edit"
                label="Editar"
                render={(row) => (
                  <div className="flex  justify-end  text-gray-500 ">
                    <label className="cursor-pointer mr-1">
                      <FiEdit
                        size={22}
                        onClick={() => {
                          editFromList(row.id);
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
                    <button className="cursor-pointer mr-2">
                      <HiTrash
                        size={22}
                        style={{ color: "#ff0000" }}
                        onClick={() => {
                          setMessageError("");
                          setDeletedItem(row);
                          setShowModal(true);
                        }}
                      />
                    </button>
                  </div>
                )}
                align="right"
              />
            </List>
          </div>
        </div>
      )}
      <div className="flex items-center  justify-center">
        <Pagination
          activeLinkClass="bg-[#0cbcbe] p-3  rounded-full"
          itemClass="mx-3"
          innerClass="flex mt-4 p-3"
          totalItemsCount={pagination.totalElements}
          activePage={pagination.pageNumber}
          itemsCountPerPage={pagination.pageSize}
          onChange={(pageNumber) => {
            getTimeSheets(pageNumber, pagination.pageSize);
          }}
        />
      </div>
      <PureModal
        header="Deletar item"
        isOpen={showModal}
        closeButton={
          <VscChromeClose size={20} className="text-gray-700 mt-1" />
        }
        onClose={() => {
          setShowModal(false);
          setInputValue("");
        }}
      >
        <div className="flex flex-col " style={{ maxWidth: 300 }}>
          <p className="leading-5 mb-5 break-normal text-center">
            Deseja deletar este item?
          </p>
          <Input
            value={inputValue}
            onChange={(e: any) => {
              setInputValue(e.target.value);
              setMessageError("");
            }}
            placeholder='Digite "Confirmar" para deletar item'
            type="text"
            className="border border-solid border-gray-400 rounded-md py-3 px-4 mb-4"
          />
          {messageError && <p className="text-red-400 ">{messageError}</p>}
          <button
            className="bg-gray-800 rounded-full py-3 text-white outline-none"
            onClick={() => {
              deleteFromList();
            }}
          >
            Deletar
          </button>
        </div>
      </PureModal>
    </div>
  );
};

export default TimeSheetList;
