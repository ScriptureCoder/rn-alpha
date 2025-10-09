import React, { useEffect, useRef } from "react";
import { View } from "rn-alpha";
import BottomSheet from "@gorhom/bottom-sheet";
import useColor from "../../hooks/use-color";
import {BackHandler} from "react-native";

export type SheetProps = {
	children:any
	snapPoints:string[]
	open:boolean
	close:(value:boolean)=>void
	handle?:boolean
}

const Sheet: React.FC<SheetProps> = (props) => {
	const {snapPoints,children,open,close,handle=true} = props
	const bottomSheetRef = useRef<any>(null);
	const {colors} = useColor()
	const backHandler = useRef<any>(null);

	useEffect(()=>{
	    if (open){
			handleOpenPress()
		}else {
			handleClosePress()
		}
	},[open]);

	useEffect(() => {
		if (open){
			backHandler.current = BackHandler.addEventListener(
				'hardwareBackPress',
				() => {
					handleClosePress()
					return true;
				}
			);
		}else {
			backHandler.current?.remove?.();
		}
	}, [open]);

	const handleOpenPress = () => bottomSheetRef.current?.expand?.();
	const handleClosePress = () => {
		bottomSheetRef.current?.close?.();
	}

    return (
        <>
	        {open&&(
		        <View
			        inset={0}
			        onTouchStart={()=>{
			            close?.(false)
		            }}
			        color={"modal"}
		        />
	        )}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints||["50%"]}
				enablePanDownToClose
				backgroundStyle={{display:"none"}}
				onClose={()=>close?.(false)}
				handleIndicatorStyle={{display:"none"}}
			>
				<View flex={1} color={"background"} btlr={25} btrr={25}>
					{handle&&(
						<View w={50} align={"center"} color={"border"} h={5} mt={10} br={10}/>
					)}
					{children}
				</View>
			</BottomSheet>
		</>
    );
};

export default Sheet;
