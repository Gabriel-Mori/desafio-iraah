import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Base from "../../components/Base";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi2";
import ClientList from "../../components/ProfileData/list-client";
import http from "../../http";

const ListPage: NextPage = () => {
  const [clientFiltered, setClientFiltered] = useState([]);

  const router = useRouter();

  const handleInputSearch = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    if (!value) return;
    http
      .get(`/client/findby/${value}`)
      .then((response) => setClientFiltered(response.data.content));
  };

  return (
    <Base>
      <div className="mt-8">
        <label className="text-3xl mt-5 mb-5">Listagem de Clientes</label>
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
          <div className=" bg-slate-100 mt-4">
            <ClientList />
          </div>
        </div>
        <div className="mt-6"></div>
      </div>
    </Base>
  );
};

export default ListPage;
