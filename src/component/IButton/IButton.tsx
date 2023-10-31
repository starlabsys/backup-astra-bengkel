import { Button } from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";


interface Interface {
    size? : "small" | "medium" | "large";
    children : string | JSX.Element;
    rounded? : "full" | "lg";
    textColor? : string;
    status? : "primary" | "secondary" | "danger" | "success" | "warning" | "info";
    width? : "w-40" | "w-44" | "w-52" | "w-56" | "w-60" | "w-64" | "w-72";
    type? : "button" | "submit" | "reset";
    onClick? : (( e : PressEvent ) => void) | undefined;
}

const IButton = ( props : Interface ) => {
    return (
        <Button
            type = { 'submit' }
            flat
            size = {
                props.size === "small"
                    ? "sm"
                    : props.size === "medium"
                        ? "md"
                        : props.size === "large"
                            ? "lg"
                            : "md"
            }
            onPress = { props.onClick }
            className = { `w-full ${
                props.status === "primary"
                    ? "bg-primary hover:bg-blue-700"
                    : props.status === "secondary"
                        ? "bg-secondary2"
                        : props.status === "danger"
                            ? "bg-danger hover:bg-red-800"
                            : props.status === "success"
                                ? "bg-success hover:bg-green-900"
                                : props.status === "warning"
                                    ? "bg-warning hover:bg-amber-700"
                                    : props.status === "info"
                                        ? "bg-info hover:bg-blue-900"
                                        : "bg-primary hover:bg-blue-700"
            } text-white` }
        >
            { props.children }
        </Button>
    );
};
export default IButton;
