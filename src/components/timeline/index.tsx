import React, { useEffect, useState } from "react";
import employess from "../../mock/employee.json";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoIosConstruct } from "react-icons/io";

const TimelinePage = () => {
  const router = useRouter();

  let finishStyles = { background: "#06D6A0" };
  let iconEditStyles = { background: "#f9c74f" };
  let timelineElements = [
    {
      id: 1,
      nome: "alan",
      data: "21/01/2023",
      type: "entrou na sessão",
      description: "trocou label cdastro de projeto",
    },
    {
      id: 2,
      nome: "alan",
      data: "22/01/2023",
      type: "saiu da dessão",
      description: "trocou label cdastro de projeto",
    },
    {
      id: 3,
      nome: "alan",
      data: "23/01/2023",
      type: "finalizou a tarefa",
      description: "trocou label cdastro de projeto",
    },
  ];

  let iconEdit = <IoIosConstruct />;
  let finish = <IoCheckmarkDoneSharp />;

  return (
    <div className="flex flex-col  md:flex-row  bg-[#0cbcbe] w-screen">
      <div className="md:px-0 md:w-1/2  md:my-0">
        <div className="flex flex-col  md:p-32">
          <button
            className={` text-gray-700 dark:text-white `}
            onClick={() => {
              router.push("/collaborator/list");
            }}
          >
            <div className="flex items-center ml-96 ">
              <RiArrowGoBackLine />
              <h3 className="ml-3 text-1xl "> Voltar</h3>
            </div>
          </button>
          <div className="flex justify-between">
            <img
              className="w-24 mr-12"
              src="/img/user-default.png"
              alt="logo"
            />
          </div>
          <label className="mb-3 mt-4">
            Nome:<span className="text-white ml-4">Gabriel</span>
          </label>
          <h2 className="mb-8 text-gray-600">Entre com seus dados de acesso</h2>
        </div>
      </div>
      <div className="bg-[#F5F3EE]   py-10 md:py-0 md:w-10/12 flex justify-center items-center h-screen">
        <div className="w-11/12 lg:w-2/3 xl:w-2/5 text-white">
          <VerticalTimeline>
            {timelineElements.map((element: any) => {
              let isWorkIcon = element.icon === iconEdit;
              return (
                <VerticalTimelineElement
                  key={element.id}
                  date={element.data}
                  dateClassName="date text-gray-500 ml-5 mr-5"
                  iconStyle={isWorkIcon ? iconEditStyles : finishStyles}
                  icon={
                    isWorkIcon ? <IoIosConstruct /> : <IoCheckmarkDoneSharp />
                  }
                >
                  <h1 className="text-gray-900">{element.nome}</h1>
                  <h3 className="text-gray-500">{element.type}</h3>
                  <p className="text-gray-500">{element.description}</p>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};
export default TimelinePage;
