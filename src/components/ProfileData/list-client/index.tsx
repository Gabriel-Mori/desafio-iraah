import React, { useEffect, useState } from "react";
import { ClientService } from "../../../services/client-service";
import List from "../../List";
import ListColumn from "../../List/ListColumn";
import { FiEdit } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import http from "../../../http";

const ClientList: React.FC = () => {
  const [response, setResponse] = useState([]);
  const router = useRouter();

  const searchClients = () => {
    ClientService.getClient().then((response) => setResponse(response.data));
  };
  const deleteClientFromList = async (id: any) => {
    await http.delete(`/client/${id}`);
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
      {response && (
        <div className="shadow-2xl border rounded">
          <div className="p-2 ">
            <List data={response ? response : []} minWidth={1000}>
              <ListColumn name="name" label="Nome" align="center" />
              <ListColumn name="companyName" label="Empresa" align="center" />
              <ListColumn name="email" label="Email" align="center" />
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
