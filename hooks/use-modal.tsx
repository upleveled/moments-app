import { useCallback, useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export const useModal = () => {
	const [isShow, setIsShow] = useState(false);
	const cancelButtonRef = useRef<HTMLDivElement>(null);
	const hide = () => {
		setIsShow(false);
	};

	const show = () => {
		setIsShow(true);
	};

	const Modal = useCallback(({ children, isShow }) => {
		return (
			<Transition.Root show={isShow} as={Fragment}>
				<Dialog
					as="div"
					className="fixed z-50 inset-0 overflow-y-auto"
					open={isShow}
					initialFocus={cancelButtonRef}
					onClose={hide}
				>
					<div className="flex items-center justify-center pb-20 pt-4 px-4 min-h-screen text-center sm:block sm:p-0">
						<Transition.Child
							as="div"
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							className="z-10"
						>
							<Dialog.Overlay className="fixed z-10 inset-0 bg-dark-50 transition-opacity" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as="div"
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							className="z-20"
						>
							<div ref={cancelButtonRef}>{children}</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		);
	}, []);

	return { Modal, hide, isShow, show };
};
