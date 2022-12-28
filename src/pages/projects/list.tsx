import type { NextPage } from "next";

import { useEffect, useState } from "react";
import Base from "../../components/Base";
import ProfileData from "../../components/ProfileData/list-client";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi2";
import ClientList from "../../components/ProfileData/list-client";

const ListPage: NextPage = () => {
  const router = useRouter();

  return (
    <Base>
      <div className="mt-24 ">
        <div className="flex justify-start items-center mt-2 mb-6">
          <button
            className={` text-white dark:text-white text-1xl rounded-full px-6 py-2  hover:bg-orange-500 bg-orange-400`}
            onClick={() => {
              router.push("/clients/form");
            }}
          >
            <div className="flex items-center ">
              <HiPlus />
              <h3 className="ml-3 text-1xl"> Cadastrar novo</h3>
            </div>
          </button>
        </div>
        <div className="max-w-max bg-slate-100 mt-4">
          <ClientList />
        </div>
      </div>
    </Base>
  );
};

export default ListPage;
