import { hideNotification, showNotification, cleanNotifications } from "@mantine/notifications";
import { useEffect } from "react";
import { constructErrorNotificationData } from "../../src/data/showNofification/notificationObjects";
import { useCrudSelectors } from "../../src/redux/features/crud/crudSlice";
import { sleep } from "../../src/utils/helpers/helper-functions";

// const useCrudStatusAlert = (entity) => {

//   const {
//     crudDocument: singleCrudDocument,
//     crudStatus,
//     crudError,
//   } = useCrudSelectors(entity);
//     /** runs every time crudStatus changed */
//     useEffect(() => {
//      if (submitting) {
//        if (crudStatus === 'loading') {
//          null;
//        }
//        /** define case for succeed */
//        if (crudStatus === 'succeed') {
//          handleSubmitSucceed();
//        }
//        if (crudError) {
//          hideNotification('submit');
//          showNotification(constructErrorNotificationData(crudError, 5000));
//          setSubmitting(false);
//          sleep(5000).then(() => cleanNotifications());
//        }
//      }
//    }, [crudStatus]);
//  }

// export default useCrudStatusAlert;
