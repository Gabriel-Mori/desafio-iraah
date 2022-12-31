import type { NextPage } from "next";
import Base from "../../../components/Base";
import { useRouter } from "next/router";
import { RiArrowGoBackLine } from "react-icons/ri";
import ClientForm from "../../../components/ProfileData/form-client";
import http from "../../../http";
import FormProject from "../../../components/Project/project-form";

const Edit: NextPage = ({ projects }: any) => {
  const router = useRouter();

  return (
    <Base>
      <div>
        <div className="flex justify-between    mt-2 mb-6">
          <div>
            <h2 className="text-2xl mt-4">Editar Projeto</h2>
          </div>
          <div className="flex  mt-2 mb-6">
            <button
              className={` text-gray-700 dark:text-white rounded-full px-6 py-1 ml-3`}
              onClick={() => {
                router.push("/clients/list");
              }}
            >
              <div className="flex items-center mt-3 ">
                <RiArrowGoBackLine />
                <h3 className="ml-3 text-1xl "> Voltar</h3>
              </div>
            </button>
          </div>
        </div>

        <FormProject initialData={projects} />
      </div>
    </Base>
  );
};

export default Edit;

export const getServerSideProps = async (context: any) => {
  const projectsEdit = await http
    .get(`/project/${context.params.id}`)
    .then((resp) => resp.data);

  return {
    props: {
      projects: projectsEdit,
    },
  };
};
