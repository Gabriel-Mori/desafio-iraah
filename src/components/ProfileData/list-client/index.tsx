import React, { useEffect, useState } from "react";
import List from "../../List";
import ListColumn from "../../List/ListColumn";
import { FiEdit } from "react-icons/fi";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import http from "../../../http";
import { OrganizationService } from "../../../services/organizations-service";
import Pagination from "react-js-pagination";
import { VscChromeClose } from "react-icons/vsc";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import Input from "../../input";
import { toast } from "react-toastify";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdWarning } from "react-icons/md";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  content: [];
  pageable?: any;
  searchTerm?: string;
}

const ClientList: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState<any>({});
  const [inputValue, setInputValue] = useState("");
  const [messageError, setMessageError] = useState("");
  const [pagination, setPagination] = useState<PaginationProps>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 1,
    content: [],
    pageable: {},
    searchTerm: "",
  });

  const searchClients = (
    searchTerm: any = "",
    pageNumber = 1,
    pageSize = 10
  ) => {
    OrganizationService.getClient(searchTerm, pageSize, pageNumber).then(
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

  const handleInputSearch = (e: any) => {
    const { value } = e.target;
    searchClients(value);
  };

  const deleteClientFromList = async () => {
    const value = inputValue.toUpperCase();
    if (value === "CONFIRMAR") {
      await http.delete(`/customer/${deletedItem.id}`);
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
      searchClients();
      setShowModal(false);
    } else {
      setMessageError("Digite 'Confirmar' para deletar item");
    }
  };

  useEffect(() => {
    searchClients();
  }, []);

  const edit = (id: any) => {
    router.push(`/clients/edit/${id}`);
  };

  return (
    <div>
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full">
            <h2 className="mb-2">Pesquise por nome do cliente</h2>
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
              router.push("/clients/form");
            }}
          >
            <div className="flex items-center ">
              <HiPlus size={22} />
              <h3 className="ml-3 text-1xl"> Cadastrar novo</h3>
            </div>
          </button>
        </div>
      </div>

      {pagination.content && (
        <div className="shadow-2xl border bg-slate-100 rounded ">
          <div className="p-2 ">
            <List
              data={pagination.content ? pagination.content : []}
              minWidth={1000}
            >
              <ListColumn
                name="name"
                label="Nome"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.name ? row.name : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="company"
                label="Empresa"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.company?.companyName
                        ? row.company.companyName
                        : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="email"
                label="Email"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.email ? row.email : "----"}
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
                  <div className="flex  justify-end  text-gray-500 ">
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
            searchClients(
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
              deleteClientFromList();
            }}
          >
            Deletar
          </button>
        </div>
      </PureModal>
    </div>
  );
};

export default ClientList;
