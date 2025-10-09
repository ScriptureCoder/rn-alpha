import React from 'react';
import {TouchableWithoutFeedback, Modal as Mod} from "react-native";
import {ModalProps} from "types";
import View from 'rn-alpha/default/View';
import {height, ios} from "constants/layout.ts";
import KeyboardView from "rn-alpha/default/KeyboardView";
import {Svg, TouchableOpacity} from "rn-alpha";
import {chevronDown} from "assets/icons";

type Props = {
    close?:()=>void
    children:any
    full?:boolean
}

const Modal: React.FC<ModalProps&Props> = ({modal,setModal,close,full, children}) => {

    const closeFunc =()=>{
        close?.()
        setModal(false)
    }

    return (
        <>
            <Mod
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={closeFunc}
            >
                <KeyboardView>
                    <View flex={1} color={"modal"}>
                        <TouchableWithoutFeedback onPress={closeFunc}>
                            <View flex={full?0.1:1}/>
                        </TouchableWithoutFeedback>
                        <View
                            color={"background"}
                            btrr={22}
                            btlr={22}
                            style={full?{
                                flex:1,
                            }:{
                                position:"absolute",
                                bottom:0, left:0,right:0,
                                maxHeight:height*0.9
                            }}
                        >
                            <View pv={10} pb={25} onTouchStart={closeFunc}>
                                <View width={50} height={4} color={"medium"} br={3} align={"center"}/>
                            </View>
                            {children}
                            <View height={ios?40:0}/>
                        </View>
                    </View>
                </KeyboardView>
            </Mod>
        </>
    );
};

export default Modal;
