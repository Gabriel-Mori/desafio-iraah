import React, { useEffect, useState } from "react";
import List from "../../List";
import ListColumn from "../../List/ListColumn";
import { FiEdit } from "react-icons/fi";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import http from "../../../http";
import { OrganizationService } from "../../../services/organizations-service";

const ClientList: React.FC = () => {
  const [response, setResponse] = useState([]);
  const router = useRouter();

  const searchClients = (searchTerm: any = "") => {
    OrganizationService.getClient(searchTerm).then((response) =>
      setResponse(response.data)
    );
  };

  const handleInputSearch = (e: any) => {
    const { value } = e.target;
    searchClients(value);
  };

  const deleteClientFromList = async (id: any) => {
    await http.delete(`/customer/${id}`);
    searchClients();
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

      {response && (
        <div className="shadow-2xl border bg-slate-100 rounded">
          <div className="p-2 ">
            <List data={response ? response : []} minWidth={1000}>
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
                      {row.company ? row.company.companyName : "----"}
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
                  <div className="flex  justify-end  text-gray-500">
                    <label className="cursor-pointer mr-2">
                      <HiTrash
                        size={22}
                        style={{ color: "#ff0000" }}
                        onClick={() => {
                          deleteClientFromList(row.id);
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

export default ClientList;
