import type { NextPage } from "next";
import Base from "../../../components/Base";
import { useRouter } from "next/router";
import { RiArrowGoBackLine } from "react-icons/ri";
import http from "../../../http";
import CompanyForm from "../../../components/company/form-company";
import CompanyFormIsFrom from "../../../components/company/form-company";

const Edit: NextPage = ({ company }: any) => {
  const router = useRouter();

  return (
    <Base>
      <div>
        <div className="flex justify-between    mt-2 mb-6">
          <div>
            <h2 className="text-2xl mt-4">Editar empresa</h2>
          </div>
          <div className="flex  mt-2 mb-6">
            <button
              className={` text-gray-700 dark:text-white rounded-full px-6 py-1 ml-3`}
              onClick={() => {
                router.push("/company/list");
              }}
            >
              <div className="flex items-center mt-3 ">
                <RiArrowGoBackLine />
                <h3 className="ml-3 text-1xl "> Voltar</h3>
              </div>
            </button>
          </div>
        </div>

        <CompanyFormIsFrom initialData={company} />
      </div>
    </Base>
  );
};

export default Edit;

export const getServerSideProps = async (context: any) => {
  const company = await http
    .get(`/customer/${context.params.id}`)
    .then((resp) => resp.data);

  return {
    props: {
      company: company,
    },
  };
};
