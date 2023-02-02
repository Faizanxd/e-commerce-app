import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  id: number;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
};

export default function Modal({
  title,
  description,
  image,
  price,
  category,
  id,
  isOpen,
  setIsOpen,
}: ModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={onClose} key={id}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-dark p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">{category}</p>
                  </div>
                  <div className="mt-2 h-[350px] w-[350px] ">
                    <img
                      src={image}
                      alt={title}
                      className="ml-6 h-full w-full rounded-md object-contain hover:object-fill"
                    />
                  </div>
                  <div>
                    <p className="pt-2 text-xl font-bold text-white">
                      {price}$
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-200 ">{description}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
