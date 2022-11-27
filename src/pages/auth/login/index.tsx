import LoginView from "../../../view/beforeLogin/Auth/Login/IndexView";
import IAlertDialog from "../../../core/utils/error/IAlertDialog";

const Login = () => {
	return (
		<IAlertDialog>
			<LoginView />
		</IAlertDialog>
	);
};
export default Login;
