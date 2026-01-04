import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

export default function DialogModal({
    open,
    setOpen,
    children,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: React.ReactNode;
}) {
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/30 backdrop-blur-md transition-opacity
          data-closed:opacity-0
          data-enter:duration-300 data-enter:ease-out
          data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 mt-12 md:mt-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform rounded-lg bg-white text-left shadow-xl transition-all
            data-closed:translate-y-4 data-closed:opacity-0
            data-enter:duration-300 data-enter:ease-out
            data-leave:duration-200 data-leave:ease-in
            w-auto max-w-full"
                    >
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}