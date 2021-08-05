import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Loading from "./Loading";
import Toast from "./Toast";

function Alert() {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const closeToast = () => {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {},
    });
  };

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.success && (
        <Toast
          bgColor="bg-success"
          msg={{ title: "Success", body: alert.success }}
          handleShow={closeToast}
        />
      )}
      {alert.error && (
        <Toast
          bgColor="bg-danger"
          msg={{ title: "Error", body: alert.error }}
          handleShow={closeToast}
        />
      )}
    </div>
  );
}

export default Alert;
