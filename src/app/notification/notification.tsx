import { CloserNotification } from "@/page-ui";

const Notification = () => {
  return (
    <div className="pt-[15px]">
      {/* {localStorage.getItem("ROLE") === roles.YOPUVCHI ? (
        <CloserNotification />
      ) : (
        <>tablet</>
      )} */}
      <CloserNotification />
    </div>
  );
};

export default Notification;
