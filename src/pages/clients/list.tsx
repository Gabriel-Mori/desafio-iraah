import type { NextPage } from "next";
import Base from "../../components/Base";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi2";
import ClientList from "../../components/ProfileData/list-client";
import http from "../../http";
import { ClientService } from "../../services/client-service";

const ListPage: NextPage = () => {
  const router = useRouter();

  return (
    <Base>
      <div className="mt-8">
        <label className="text-3xl mt-5 mb-5">Listagem de Clientes</label>
        <ClientList />
      </div>
    </Base>
  );
};

export default ListPage;
