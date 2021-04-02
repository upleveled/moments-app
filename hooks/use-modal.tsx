import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, MouseEvent } from 'react';
import usePortal from 'react-cool-portal';

// Customize your hook based on react-cool-portal
export const useModal = (options = {}) => {
	const { Portal, hide, ...rest } = usePortal({
		...options,
		defaultShow: false,
		internalShowHide: false,
	});

	const handleClickBackdrop = useCallback(
		(e: MouseEvent) => {
			const { id } = e.target as HTMLDivElement;
			if (id === 'modal-container') hide();
		},
		[hide]
	);

	const Modal = useCallback(
		({ children, isShow }) => (
			<Portal>
				<AnimatePresence>
					{isShow && (
						<motion.div
							id="modal-container"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed z-40 bottom-0 left-0 right-0 top-0 flex items-center justify-center w-full bg-dark-50"
							onClick={handleClickBackdrop}
							tabIndex={-1}
						>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</Portal>
		),
		[handleClickBackdrop]
	);

	return { Modal, hide, ...rest };
};
