import { Link, usePage } from "@inertiajs/react";
import {
  ArrowLeftIcon,
  BookmarkIcon,
  PencilSquareIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";
import GroupDescriptionPopover from "./GroupDescriptionPopover";
import GroupUsersPopover from "./GroupUsersPopover";
import { useEventBus } from "@/EventBus";

const ConversationHeader = ({ selectedConversation }) => {
  const authUser = usePage().props.auth.user;
  const { emit } = useEventBus();

  const onDeleteGroup = () => {
    if (!window.confirm("Are you sure you want to delete this group?")) {
      return;
    }
    axios
      .delete(route("group.destroy", selectedConversation.id))
      .then((res) => {
        emit("toast.show", res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {selectedConversation && (
        <div className="p-3 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Link href={route("dashboard")} className="inline-block sm:hidden">
              <ArrowLeftIcon className="w-6" />
            </Link>
            {selectedConversation.is_user && (
              <>
                <UserAvatar user={selectedConversation} />
              </>
            )}

            {selectedConversation.is_group && <GroupAvatar />}
            <div>
              <h3>{selectedConversation.name}</h3>
              {selectedConversation.is_group && (
                <p className="text-xs text-gray-500">
                  {selectedConversation.users.length} membros
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {selectedConversation.is_user && (
              <button
                className="text-gray-400 hover:text-gray-200"
                onClick={() => {
                  
                }}
              >
                <PhoneIcon className="w-6" />
              </button>
            )}

            {selectedConversation.is_group && (
              <div className="flex gap-3">
                <div className="tooltip tooltip-left" data-tip="Tarefas">
                  <Link
                    href={route("group.tarefas", selectedConversation)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <BookmarkIcon className="w-4" />
                  </Link>
                </div>
                <GroupDescriptionPopover
                  description={selectedConversation.description}
                />
                <GroupUsersPopover users={selectedConversation.users} />
                {selectedConversation.owner_id == authUser.id && (
                  <>
                    <div className="tooltip tooltip-left" data-tip="Editar Grupo">
                      <button
                        onClick={(ev) =>
                          emit("GroupModal.show", selectedConversation)
                        }
                        className="text-gray-400 hover:text-gray-200"
                      >
                        <PencilSquareIcon className="w-4" />
                      </button>
                    </div>
                    <div className="tooltip tooltip-left" data-tip="Delete Group">
                      <button
                        onClick={onDeleteGroup}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        <TrashIcon className="w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationHeader;
