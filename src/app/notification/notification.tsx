// import { Roles } from "@/constants";
import { CloserNotification } from "@/page-ui";

const Notification = () => {
  return (
    <div className="pt-[15px]">
        {/* {localStorage.getItem("ROLE") === Roles.BAKER_TABLET ? (
          <CloserNotification />
        ) : (
          <>tablet</>
        )} */}
      <CloserNotification />
    </div>
  );
};

export default Notification;
