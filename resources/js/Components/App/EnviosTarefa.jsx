import React from 'react';
import UserAvatar from './UserAvatar';
import MessageAttachments from './MessageAttachments';

const EnviosTarefa = ({ tarefa, attachmentClick }) => {
  return (
    <div className="p-6">
      <h1 className="text-[30px]">Envios</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div>
            {/* Dropdown menu */}
          </div>
          <label htmlFor="table-search" className="sr-only">Search</label>
         
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-tl-lg text-center">
                Usuário
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3 rounded-tr-lg text-center">
                Arquivos
              </th>
            </tr>
          </thead>
          <tbody>
            {tarefa.data.envios.map(envio => (
              <tr key={envio.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <td  className="flex  justify-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <UserAvatar user={envio.user} />
                  <div className="ps-3 flex flex-col ">
                    <div className="text-base font-semibold">{envio.user.name}</div>
                    <div className="font-normal text-gray-500">{envio.user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{envio.descricao}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <MessageAttachments attachments={envio.attachments} attachmentClick={attachmentClick} justify="start" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnviosTarefa;
