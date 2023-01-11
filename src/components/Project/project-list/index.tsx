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
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { VscChromeClose } from "react-icons/vsc";
import Input from "../../input";

interface ProjectProps {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  content: [];
  pageable?: any;
  searchTerm?: string;
}

const ProjectsList: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState<any>({});
  const [inputValue, setInputValue] = useState("");
  const [messageError, setMessageError] = useState("");
  const [pagination, setPagination] = useState<ProjectProps>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 1,
    content: [],
    pageable: {},
    searchTerm: "",
  });

  const getListProjects = (
    searchTerm: any = "",
    pageNumber = 1,
    pageSize = 10
  ) => {
    OrganizationService.getProject(searchTerm, pageSize, pageNumber).then(
      (response) => {
        console.log(response);
        setPagination({
          ...pagination,
          searchTerm,
          pageSize,
          pageNumber,
          ...response.data,
        });
      }
    );
  };

  useEffect(() => {
    getListProjects();
  }, []);

  const deleteProjectFromList = async () => {
    const value = inputValue.toUpperCase();
    if (value === "CONFIRMAR") {
      await http.delete(`/project/${deletedItem.id}`);
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
      getListProjects();
      setShowModal(false);
    } else {
      setMessageError("Digite 'Confirmar' para deletar item");
    }
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
      {pagination.content && (
        <div className="shadow-2xl border rounded bg-slate-100">
          <div className="p-4">
            <List
              data={pagination.content ? pagination.content : []}
              minWidth={1000}
            >
              <ListColumn
                name="projectName"
                label="Nome"
                align="center"
                render={(row) => (
                  <div className="flex items-center justify-center  text-gray-500 ">
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
                  <div className="flex items-center justify-center text-gray-500 ">
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
                  <div className="flex items-center justify-center  text-gray-500 ">
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
                name="supervisor"
                label="Supervisor"
                render={(row) => (
                  <div className="flex items-center justify-center  text-gray-500 ">
                    <Tooltip
                      style={{ color: "#9E9E9E" }}
                      title={
                        <div>
                          {row.supervisor.map((item: any, i: any) => {
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
                          {row.supervisor?.length}
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
                  <div className="flex items-center justify-center  text-gray-500 ">
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
                  <div className="flex items-center justify-center text-gray-500 ">
                    <label className="text-gray-900">
                      {row.endDate
                        ? moment(row.endDate).format("DD/MM/YYYY")
                        : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />

              <ListColumn
                name="edit"
                label="Editar"
                render={(row) => (
                  <div className="flex items-center justify-center  text-gray-500 ">
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
                  <div className=" text-gray-500 flex items-center justify-center ">
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
                align="center"
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
            getListProjects(
              pagination.searchTerm,
              pageNumber,
              pagination.pageSize
            );
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
              deleteProjectFromList();
            }}
          >
            Deletar
          </button>
        </div>
      </PureModal>
    </div>
  );
};

export default ProjectsList;
