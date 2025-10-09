import {useApp} from "../store/contexts/app-context";
import Colors, {ColorsProps} from "../constants/colors";
import {ColorModes} from "../types";

type Props = {
	colors:ColorsProps
	setColorMode:(colorMode:ColorModes)=>void
	colorMode:ColorModes
	systemColor:boolean
	setSystemColor:(systemColor:boolean)=>void
}

const useColor=():Props => {
	const {colorMode, setColorMode, systemColor, setSystemColor} = useApp()
	return {
		colors:Colors(colorMode),
		setColorMode,
		colorMode,
		systemColor,
		setSystemColor,
	}
};

export default useColor;
