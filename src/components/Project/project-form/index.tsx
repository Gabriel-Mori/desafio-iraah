// import React, { useState } from "react";
// import Input from "../../input";

// const ClientForm: React.FC = () => {
//   const [client, setclient] = useState<any>({});

//   const handleSubmitChange = async () => {
//     await RegistrationService.ClientForm({
//       name: client.name,
//       companyName: client.companyName,
//       email: client.email,
//     });
//   };

//   const handleInputValue = (e: any, name: string) => {
//     setclient({ ...client, [name]: e.target.value });
//   };

//   return (
//     <>
//       <form>
//         <Input
//           label="Nome"
//           value={client.name}
//           className="border border-solid border-slate-400 mb-5"
//           placeholder="Nome"
//           onChange={(e: any) => handleInputValue(e, "name")}
//         />
//         <Input
//           label="Empresa"
//           value={client.companyName}
//           className={`border border-solid border-slate-400  mb-5`}
//           placeholder="Netflix..."
//           onChange={(e: any) => handleInputValue(e, "companyName")}
//         />
//         <Input
//           label="Email"
//           type="email"
//           value={client.email}
//           className={`border border-solid border-slate-400  mb-5`}
//           placeholder="Email@gmail.com"
//           onChange={(e: any) => handleInputValue(e, "email")}
//         />
//       </form>
//       <div className="flex justify-center mt-16">
//         <button
//           className="w-96 bg-[#0cbcbe] outline-none text-white font-bold py-4 border-none rounded-full"
//           type="button"
//           onClick={handleSubmitChange}
//         >
//           Salvar
//         </button>
//       </div>
//     </>
//   );
// };

// export default ClientForm;
