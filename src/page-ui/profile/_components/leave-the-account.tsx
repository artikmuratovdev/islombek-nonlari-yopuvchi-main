import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStorage } from "@/utils";
import { BiUpload } from "react-icons/bi";

export const LeaveTheAccount = () => {
  const handleLogout = () => {
    useStorage.removeCredentials();
    window.location.href = "/login";
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          asChild
          className="w-full"
          aria-label="Open logout dialog"
        >
          <div
            className="rounded-[8px] p-[10px] bg-white flex items-center gap-[7px]"
            role="button"
            tabIndex={0} // Makes the div focusable
          >
            <BiUpload size={25} />
            <p className="text-[14px] font-[900]">Akkountdan chiqish</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <AlertDialogHeader>
            <AlertDialogTitle id="dialog-title">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription id="dialog-description">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel aria-label="Cancel">
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction aria-label="Proceed" onClick={handleLogout}>
              Davom etish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
