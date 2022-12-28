import React, { useEffect, useState } from "react";
import { ClientService } from "../../../services/client-service";
import Label from "../../Label";
import List from "../../List";
import ListColumn from "../../List/ListColumn";
import { FiEdit } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import http from "../../../http";

const ClientList: React.FC = () => {
  const [response, setResponse] = useState([]);
  const [customer, setCustomer] = useState([]);
  const router = useRouter();

  const getBestClients = () => {
    ClientService.getClient().then((res) => setResponse(res.data));
  };

  const deleteClientFromList = async (id: any) => {
    await http.delete(`/clients/list/${id}`);
    const userDelete = customer.filter((user) => {
      console.log(user);
      return user !== id;
    });

    setCustomer(userDelete);
    console.log(id);
  };

  useEffect(() => {
    getBestClients();
  }, []);

  const edit = (id: any) => {
    router.push(`/clients/edit/${id}`);
  };

  return (
    <>
      {response && (
        <div className="max-w-max flex  ml-3 mr-3">
          <div className="p-4">
            <List data={response ? response : []} minWidth={1000}>
              <ListColumn name="name" label="Nome" />
              <ListColumn name="companyName" label="Empresa" />
              <ListColumn name="email" label="Email" />
              <ListColumn
                name="edit"
                label="Editar"
                render={(row) => (
                  <div className="flex items-center justify-center w-8 h-8 ml-32 text-gray-500 ">
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
                align="right"
              />
              <ListColumn
                name="delete"
                label="Deletar"
                render={(row) => (
                  <div className="w-8 h-8 ml-32 text-gray-500 flex items-center justify-center ">
                    <label className="cursor-pointer">
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
    </>
  );
};

export default ClientList;
